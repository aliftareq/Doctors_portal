import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckOutForm = ({ booking }) => {
  // states
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // hooks
  const stripe = useStripe();
  const elements = useElements();

  // booking data
  const { price, email, Patientname, _id } = booking;

  useEffect(() => {
    if (!price) return;

    fetch("https://doctors-portal-ruby.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("patient-token")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
        setCardError("Failed to initialize payment. Please try again.");
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // prevent duplicate submits
    if (processing) return;

    setCardError("");
    setSuccess("");
    setTransactionId("");

    if (!stripe || !elements) {
      setCardError("Stripe has not loaded yet. Please wait a moment.");
      return;
    }

    if (!clientSecret) {
      setCardError("Payment is not ready yet. Please wait and try again.");
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      setCardError("Card input not found.");
      return;
    }

    setProcessing(true);

    try {
      // optional validation step
      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (paymentMethodError) {
        setCardError(paymentMethodError.message);
        return;
      }

      // confirm payment only once
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: Patientname || "Unknown",
              email: email || "unknown@example.com",
            },
          },
        });

      if (confirmError) {
        setCardError(confirmError.message);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        const payment = {
          price,
          transactionId: paymentIntent.id,
          email,
          bookingId: _id,
        };

        const res = await fetch(
          "https://doctors-portal-ruby.vercel.app/payments",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("patient-token")}`,
            },
            body: JSON.stringify(payment),
          },
        );

        const data = await res.json();
        console.log(data);

        if (data.insertedId || data.acknowledged) {
          setSuccess("Congrats! Your payment completed successfully.");
          setTransactionId(paymentIntent.id);
        } else {
          setCardError("Payment succeeded, but saving payment info failed.");
        }
      }
    } catch (error) {
      console.error(error);
      setCardError("Something went wrong while processing payment.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className="btn btn-sm btn-primary mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? "Processing..." : "Pay"}
        </button>
      </form>

      <div>
        <p className="text-lg text-rose-600">{cardError}</p>
      </div>

      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p>
            Your TransactionId is :{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </section>
  );
};

export default CheckOutForm;
