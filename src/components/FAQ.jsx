import React, { useState } from 'react';
import '../styles/FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What's the difference between an LLC and a corporation?",
      answer: "Both protect owners so they're not personally on the hook for business liabilities or debts. But, key differences include how they're owned (LLCs have one or more individual owners and corporations have shareholders) and maintained (corporations generally have more formal record-keeping and reporting requirements)."
    },
    {
      question: "What's the difference between a C corporation and an S corporation?",
      answer: "The way you're taxed. C corporation income is taxed twice—the business pays taxes on its net income, and then the shareholders also pay taxes on the profits they receive. With S corporation income, only the shareholders pay taxes on profits received."
    },
    {
      question: "What's the main difference between a sole proprietorship and an LLC?",
      answer: "Personal liability protection. An LLC protects owners from being personally on the hook for business liabilities or debts. A sole proprietorship doesn't."
    },
    {
      question: "How are different business types taxed?",
      answer: "LLCs, S corporations, and sole proprietorships are taxed once on profits received. C corporations are taxed twice; the business pays taxes at the corporate level, and shareholders pay taxes on income received."
    },
    {
      question: "Which business types give me personal liability protection?",
      answer: "LLCs and corporations. You don't get personal liability protection with sole proprietorships or DBAs."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </button>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ; 