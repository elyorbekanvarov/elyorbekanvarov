"use client";

import { useState } from "react";
import Image from "next/image";
import { contactInfo, socialLinks } from "@/data/getInTouch";
import { ContactService } from "@/lib/api/contactServices";

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await ContactService.sendContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Portfolio Contact",
        message: formData.message,
      });
      
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error: any) {
      console.error("Error sending message:", error);
      console.error("Error response:", error.response?.data);
      setStatus("error");
      setErrorMessage(error.response?.data?.message || "Failed to send message. Please try again.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="section6">
      <div className="container">
        <h2>Get In Touch</h2>
        <p>Let's build something great together! 🚀</p>

        <div className="section6-contacts">
          <form className="section6-contact" onSubmit={handleSubmit}>
            <label>
              Name
              <input id="input"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
              id="input"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Subject
              <input
              id="input"
                type="text"
                name="subject"
                placeholder="What is this about?"
                value={formData.subject}
                onChange={handleChange}
              />
            </label>

            <label>
              Message
              <textarea
              id="input"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            {status === "loading" && (
              <div className="form-status loading">
                Sending message...
              </div>
            )}
            
            {status === "success" && (
              <div className="form-status success">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {status === "error" && (
              <div className="form-status error">
                ✗ {errorMessage || "Failed to send message. Please try again."}
              </div>
            )}

            <button type="submit" disabled={status === "loading"}>
              <img src="/images/svg/send.svg" alt="send icon" width={16} />
              <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
            </button>
          </form>

          <div className="contact-information-wrapper">
            <div className="contact-information">
              <h4>Contact Information</h4>
              {contactInfo.map(({ icon, title, text }) => (
                <div className="contact" key={title}>
                  <div className="contact-img">
                    <Image
                      src={icon}
                      alt={`${title} icon`}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="contact-info">
                    <h5>{title}</h5>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="connect">
              <h4>Connect With Me</h4>
              <div className="connect-links">
                {socialLinks.map(({ href, icon, label }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="connect-link"
                    key={label}
                  >
                    <Image
                      src={icon}
                      alt={`${label} icon`}
                      width={24}
                      height={24}
                    />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="available">
              <h4>Available for Freelance</h4>
              <p>
                I'm currently available for freelance projects and
                collaborations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .form-status {
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 14px;
          text-align: center;
        }
        .form-status.loading {
          background: #e2e3e5;
          color: #383d41;
        }
        .form-status.success {
          background: #d4edda;
          color: #155724;
        }
        .form-status.error {
          background: #f8d7da;
          color: #721c24;
        }
        .section6-contact button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}