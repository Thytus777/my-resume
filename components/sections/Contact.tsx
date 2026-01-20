"use client";

import React from "react";
import { FaLinkedin, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  const contacts = [
    {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/thytus-benjamin",
    icon: <FaLinkedin />,
    target: "_blank",
    },
    {
      label: "Phone",
      href: "tel:+61421223317",
      icon: <FaPhoneAlt />,
    },
    {
      label: "Email",
      href: "mailto:thytusben.7@gmail.com",
      icon: <FaEnvelope />,
    },
  ];

  return (
    <section id="contact" className="contact-section reveal">
      <div className="contact-container">
        {/* Left column: buttons */}
        <div className="contact-left">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.target}
              className="contact-card glare-button"
              rel={c.target === "_blank" ? "noopener noreferrer" : undefined}
            >
              <span className="glare-effect" />
              <span className="glare-content">
                <span className="contact-icon">{c.icon}</span>
                <span className="contact-label">{c.label}</span>
              </span>
            </a>
          ))}
        </div>

        {/* Right column: message */}
        <div className="contact-right">
          <h2>Let’s Create Something Great</h2>
          <p>
            I’d love to discuss opportunities where my expertise can make a 
            difference. Feel free to reach out.</p>
            <p> 
            I’m ready to contribute and learn.
          </p>
        </div>
      </div>
    </section>
  );
}
