// app/support/contact/page.tsx
"use client";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Instagram,
  Mail,
  MapPin,
  Phone,
  XCircle
} from "lucide-react";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  contactId?: string;
  timestamp?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const apiPayload = {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await fetch(
        "https://backend.majesticsofts.com/api/contact-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiPayload),
        }
      );

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to send message. Please try again."
        );
      }

      console.log("🎉 Contact Form Submitted Successfully!", {
        contactId: result.contactId || "CONTACT-" + Date.now(),
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        status: "received",
      });

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Modal
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-obsidian/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-graphite rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl shadow-black/60 border border-hairline-strong"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-bronze rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-obsidian" />
          </div>

          <h3 className="font-display text-2xl font-semibold text-marble mb-2">
            Quote request received
          </h3>
          <p className="text-marble-dim mb-6">
            Thanks {formData.name}, our sourcing team will contact you shortly
            with natural stone availability and pricing.
          </p>

          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-white/5 border border-hairline text-marble py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
          >
            Close Window
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-obsidian text-marble">
      <Navigation />
      <AnimatePresence>{isSubmitted && <SuccessModal />}</AnimatePresence>

      <div className="pt-40 pb-20 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT COLUMN: Content & Info (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-40 space-y-12">
            {/* Header Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-bronze animate-pulse"></span>
                <span className="eyebrow">Sourcing &amp; Cutting Inquiries</span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-light text-marble leading-[0.98] mb-6 tracking-tight">
                Let&apos;s source your{" "}<br />
                <span className="italic text-vein">perfect stone.</span>
              </h1>
              <p className="text-marble-dim text-lg leading-relaxed border-l-2 border-bronze/40 pl-6">
                Whether you need marble slabs, granite blocks, or want to discuss
                sourcing and cutting specifications, our team is ready to assist.
              </p>
            </motion.div>

            {/* Contact Details List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                {/* Email */}
                <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-graphite border border-transparent hover:border-hairline transition-all duration-300">
                  <div className="p-3 bg-graphite-light border border-hairline text-bronze rounded-xl group-hover:bg-bronze group-hover:text-obsidian transition-colors duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-marble mb-1">Email us</h4>
                    <p className="text-sm text-marble-dim mb-1">
                      Our team responds within 24 hours.
                    </p>
                    <a
                      href="mailto:President.Gfive@hotmail.com"
                      className="text-sm font-semibold text-bronze-light hover:underline"
                    >
                      President.Gfive@hotmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-graphite border border-transparent hover:border-hairline transition-all duration-300">
                  <div className="p-3 bg-graphite-light border border-hairline text-bronze rounded-xl group-hover:bg-bronze group-hover:text-obsidian transition-colors duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-marble mb-1">Contact Numbers</h4>
                    <p className="text-sm text-marble-dim mb-2">Reach us directly</p>
                    <div className="space-y-1">
                      <a
                        href="tel:+8613760113545"
                        className="text-sm font-semibold text-marble hover:text-bronze-light transition-colors block"
                      >
                        📞 +86 13760113545
                      </a>
                      <a
                        href="tel:+85260602415"
                        className="text-sm font-semibold text-marble hover:text-bronze-light transition-colors block"
                      >
                        📞 +852 60602415
                      </a>
                    </div>
                  </div>
                </div>

                {/* Head Office China */}
                <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-graphite border border-transparent hover:border-hairline transition-all duration-300">
                  <div className="p-3 bg-graphite-light border border-hairline text-bronze rounded-xl group-hover:bg-bronze group-hover:text-obsidian transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-marble mb-1">Head Office China</h4>
                    <p className="text-sm text-marble-dim">
                      4 / F, Building K, No. 8, East Shangxue Science Park,<br />
                      Bantian, Longgang District, Shenzhen, China
                    </p>
                  </div>
                </div>

                {/* Hong Kong Office */}
                <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-graphite border border-transparent hover:border-hairline transition-all duration-300">
                  <div className="p-3 bg-graphite-light border border-hairline text-bronze rounded-xl group-hover:bg-bronze group-hover:text-obsidian transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-marble mb-1">Hong Kong Office</h4>
                    <p className="text-sm text-marble-dim">
                      3/F Flat/RM B Chun Wah Commercial Building<br />
                      30 Minden Avenue TST Kowloon, Hong Kong
                    </p>
                  </div>
                </div>

                {/* USA Office */}
                <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-graphite border border-transparent hover:border-hairline transition-all duration-300">
                  <div className="p-3 bg-graphite-light border border-hairline text-bronze rounded-xl group-hover:bg-bronze group-hover:text-obsidian transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-marble mb-1">USA Office</h4>
                    <p className="text-sm text-marble-dim">
                      5619 Jarist Drive Clifton Virginia, USA 20124
                    </p>
                  </div>
                </div>

                {/* UAE Office */}
                <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-graphite border border-transparent hover:border-hairline transition-all duration-300">
                  <div className="p-3 bg-graphite-light border border-hairline text-bronze rounded-xl group-hover:bg-bronze group-hover:text-obsidian transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-marble mb-1">UAE Office</h4>
                    <p className="text-sm text-marble-dim">
                      Office # S1-214 Property Investments Office 4
                      Dubai Investment Park Dubai UAE.
                    </p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-8 border-t border-hairline">
                <h4 className="eyebrow mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-hairline-strong text-marble hover:bg-bronze hover:text-obsidian hover:border-bronze transition-all duration-300"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-hairline-strong text-marble hover:bg-bronze hover:text-obsidian hover:border-bronze transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/"
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-hairline-strong text-marble hover:bg-bronze hover:text-obsidian hover:border-bronze transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="w-4 h-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The Form Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-graphite rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/40 border border-hairline relative overflow-hidden grain"
            >
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-bronze/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="mb-10">
                  <h2 className="font-display text-3xl font-light text-marble">
                    Request a quote
                  </h2>
                  <div className="h-1 w-12 bg-bronze mt-4 rounded-full"></div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 rounded-r-lg flex items-center gap-3"
                    >
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-300 text-sm">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold text-marble-faint uppercase tracking-wider mb-3 group-focus-within:text-bronze-light transition-colors"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pb-3 border-b border-hairline-strong bg-transparent focus:border-bronze outline-none transition-all duration-300 placeholder:text-marble-faint text-marble text-lg"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div className="group">
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-marble-faint uppercase tracking-wider mb-3 group-focus-within:text-bronze-light transition-colors"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pb-3 border-b border-hairline-strong bg-transparent focus:border-bronze outline-none transition-all duration-300 placeholder:text-marble-faint text-marble text-lg"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-marble-faint uppercase tracking-wider mb-3 group-focus-within:text-bronze-light transition-colors"
                      >
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pb-3 border-b border-hairline-strong bg-transparent focus:border-bronze outline-none transition-all duration-300 placeholder:text-marble-faint text-marble text-lg"
                        placeholder="+86 300..."
                      />
                    </div>

                    <div className="group">
                      <label
                        htmlFor="subject"
                        className="block text-xs font-semibold text-marble-faint uppercase tracking-wider mb-3 group-focus-within:text-bronze-light transition-colors"
                      >
                        Topic
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pb-3 border-b border-hairline-strong bg-transparent focus:border-bronze outline-none transition-all duration-300 text-marble text-lg cursor-pointer [&>option]:bg-graphite [&>option]:text-marble"
                      >
                        <option value="" className="text-marble-faint">
                          Select a subject...
                        </option>
                        <option value="product-inquiry">Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-marble-faint uppercase tracking-wider mb-3 group-focus-within:text-bronze-light transition-colors"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full p-4 bg-obsidian rounded-xl border border-hairline focus:border-bronze focus:ring-0 outline-none transition-all duration-300 resize-none text-marble placeholder:text-marble-faint leading-relaxed"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-bronze text-obsidian px-10 py-6 rounded-full font-bold uppercase tracking-[0.12em] text-sm hover:bg-bronze-light transition-all duration-300 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin"></div>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
