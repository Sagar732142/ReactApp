import React from 'react';

export default function ContactPage() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <p className="text-center mb-5 text-muted">
        We'd love to hear from you! Whether it's about your event, puja essentials, or anything else.
      </p>

      <div className="row">
        {/* Contact Form */}
        <div className="col-md-7">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input type="text" className="form-control" id="subject" placeholder="What’s the subject?" />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows="5" placeholder="Write your message here..." required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="col-md-5 mt-4 mt-md-0">
          <div className="border p-4 rounded bg-light h-100">
            <h5>Our Store</h5>
            <p>123 Festive Bazaar Road<br />Kolkata, West Bengal, India</p>

            <h5>Phone</h5>
            <p><a href="tel:+911234567890">+91 12345 67890</a></p>

            <h5>Email</h5>
            <p><a href="mailto:contact@eventbazaar.com">contact@eventbazaar.com</a></p>

            <h5>Hours</h5>
            <p>Monday – Saturday: 10am – 8pm<br />Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
