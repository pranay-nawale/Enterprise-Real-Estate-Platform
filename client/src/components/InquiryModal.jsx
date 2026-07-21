import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

function InquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I would like to know more about this project. Please contact me.'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_BASE}/api/inquiries`, formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: 'I would like to know more about this project. Please contact me.'
        });
        onClose();
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary-dark/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="bg-beige rounded-sm shadow-2xl z-10 max-w-md w-full border border-accent/30 overflow-hidden transform transition-all duration-300">
        <div className="bg-primary text-beige px-6 py-4 flex justify-between items-center border-b border-accent/20">
          <div>
            <h3 className="font-bold tracking-widest text-xs uppercase text-accent-light">ENQUIRE NOW</h3>
            <p className="text-white text-base font-semibold">Get Brochure & Pricing</p>
          </div>
          <button
            onClick={onClose}
            className="text-beige hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-primary">Inquiry Submitted!</h4>
            <p className="text-xs text-primary/70 max-w-xs">
              Thank you for showing interest. Our representative will contact you shortly with brochure and price list.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border-l-2 border-red-500 text-red-700 text-xs rounded-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-primary/70 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Mehta"
                className="w-full bg-beige-light border border-accent/20 px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-primary/70 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul.mehta@example.com"
                className="w-full bg-beige-light border border-accent/20 px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-primary/70 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="w-full bg-beige-light border border-accent/20 px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-primary/70 mb-1">
                Your Message
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-beige-light border border-accent/20 px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 text-xs uppercase font-bold tracking-widest transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>SUBMITTING...</span>
                </>
              ) : (
                <span>REQUEST PRICING & BROCHURE</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default InquiryModal;
