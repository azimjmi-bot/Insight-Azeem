import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-20 animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400">
            Have a question, a project, or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-serif font-bold text-green-800 dark:text-green-300 mb-4">Message Sent!</h3>
            <p className="text-green-700 dark:text-green-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-bold text-green-800 dark:text-green-300 underline">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Name</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  className="w-full border-b-2 border-zinc-200 dark:border-zinc-700 bg-transparent py-3 text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-zinc-100 outline-none transition-colors"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Email</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  className="w-full border-b-2 border-zinc-200 dark:border-zinc-700 bg-transparent py-3 text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-zinc-100 outline-none transition-colors"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Message</label>
              <textarea 
                id="message"
                required
                rows={6}
                className="w-full border-b-2 border-zinc-200 dark:border-zinc-700 bg-transparent py-3 text-zinc-900 dark:text-white focus:border-zinc-900 dark:focus:border-zinc-100 outline-none transition-colors resize-none"
                placeholder="How can I help you?"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <div className="text-center pt-8">
              <button type="submit" className="px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-lg hover:opacity-90 transition-opacity w-full md:w-auto">
                Send Message
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 mb-2">Prefer email?</p>
          <a href="mailto:hello@azeeminsights.com" className="text-xl font-serif font-bold text-zinc-900 dark:text-white hover:underline">hello@azeeminsights.com</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;