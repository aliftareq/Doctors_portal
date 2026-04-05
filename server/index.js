const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("colors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//uri & client
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.preca8g.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// connect DB once
async function run() {
  try {
    await client.connect();
    console.log("Database connected successfully".yellow.bold);
  } catch (error) {
    console.log(error.message.red.bold);
  }
}
run().catch((err) => console.log(err.message.red.bold));

//collections
const appointmentOptionsCollections = client
  .db("doctorsPortal")
  .collection("appointmentOptions");
const bookingsCollection = client.db("doctorsPortal").collection("bookings");
const usersCollection = client.db("doctorsPortal").collection("users");
const doctorsCollection = client.db("doctorsPortal").collection("doctors");
const paymentsCollection = client.db("doctorsPortal").collection("payments");

//middlewares

function verifyJwt(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

const verifyAdmin = async (req, res, next) => {
  const decodedEmail = req.decoded.email;
  const user = await usersCollection.findOne({ email: decodedEmail });

  if (user?.role !== "admin") {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

//routes

app.get("/", (req, res) => {
  res.send("doctors-portal-server is running");
});

app.get("/appointmentOptions", async (req, res) => {
  try {
    const date = req.query.date;

    const options = await appointmentOptionsCollections.find({}).toArray();
    const alreadyBooked = await bookingsCollection
      .find({ appointmentDate: date })
      .toArray();

    options.forEach((option) => {
      const optionBooked = alreadyBooked.filter(
        (book) => book.Treatment === option.name,
      );
      const bookedSlot = optionBooked.map((book) => book.slot);
      option.slots = option.slots.filter((slot) => !bookedSlot.includes(slot));
    });

    res.send(options);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/bookings", async (req, res) => {
  try {
    const booking = req.body;

    const query = {
      appointmentDate: booking.appointmentDate,
      Treatment: booking.Treatment,
      email: booking.email,
    };

    const existing = await bookingsCollection.find(query).toArray();

    if (existing.length) {
      return res.send({
        acknowledged: false,
        message: `You already have a booking on ${booking.appointmentDate}`,
      });
    }

    const result = await bookingsCollection.insertOne(booking);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/bookings", verifyJwt, async (req, res) => {
  const email = req.query.email;

  if (email !== req.decoded.email) {
    return res.status(403).send({ message: "forbidden access" });
  }

  const bookings = await bookingsCollection.find({ email }).toArray();
  res.send(bookings);
});

app.post("/users", async (req, res) => {
  const result = await usersCollection.insertOne(req.body);
  res.send(result);
});

app.get("/users", async (req, res) => {
  const users = await usersCollection.find({}).toArray();
  res.send(users);
});

app.get("/users/admin/:email", async (req, res) => {
  const user = await usersCollection.findOne({ email: req.params.email });
  res.send({ isAdmin: user?.role === "admin" });
});

app.put("/users/admin/:id", verifyJwt, verifyAdmin, async (req, res) => {
  const result = await usersCollection.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { role: "admin" } },
    { upsert: true },
  );
  res.send(result);
});

app.get("/jwt", async (req, res) => {
  const user = await usersCollection.findOne({ email: req.query.email });

  if (!user) {
    return res.status(403).send({ accessToken: "" });
  }

  const token = jwt.sign({ email: req.query.email }, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });

  res.send({ accessToken: token });
});

app.post("/create-payment-intent", async (req, res) => {
  const amount = req.body.price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount,
    payment_method_types: ["card"],
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});

app.post("/payments", async (req, res) => {
  const payment = req.body;

  await paymentsCollection.insertOne(payment);

  await bookingsCollection.updateOne(
    { _id: ObjectId(payment.bookingId) },
    {
      $set: {
        paid: true,
        transactionId: payment.transactionId,
      },
    },
  );

  res.send({ success: true });
});

// ✅ IMPORTANT FOR VERCEL
module.exports = app;
