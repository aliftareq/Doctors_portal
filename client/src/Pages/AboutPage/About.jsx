import React, { useState } from "react";

const faqs = [
  {
    question: "What is Doctors Portal?",
    answer:
      "Doctors Portal helps patients book appointments with doctors easily.",
  },
  {
    question: "How can I book an appointment?",
    answer:
      "You can select a doctor, choose a time slot, and confirm your booking.",
  },
  {
    question: "Can I cancel my appointment?",
    answer: "Yes, you can cancel or reschedule from your dashboard.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Frequently Asked Questions
      </h2>

      {faqs.map((faq, index) => (
        <div
          key={index}
          onClick={() => toggleFAQ(index)}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "10px",
            padding: "15px",
            cursor: "pointer",
          }}
        >
          {/* Question row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>{faq.question}</h4>

            {/* Arrow */}
            <span
              style={{
                transition: "0.3s",
                transform:
                  openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                fontSize: "18px",
              }}
            >
              ▼
            </span>
          </div>

          {/* Answer */}
          {openIndex === index && (
            <p style={{ marginTop: "10px", color: "#555" }}>{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
