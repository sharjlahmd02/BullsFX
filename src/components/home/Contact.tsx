import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  FacebookIcon,
  Instagram,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactProps {
  isDark: boolean;
}

const Contact = ({ isDark }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
      valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (formData.message.trim().length < 2) {
      newErrors.message = "Message must be at least 2 characters long.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await fetch("https://formspree.io/f/xzzjowla", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "bullsforexx@gmail.com",
      href: "mailto:bullsforexx@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (313) 639-6453",
      href: "tel:+13136396453",
    },

    {
      icon: MapPin,
      label: "Location",
      value: "Gulistan-e-Johar, Karachi, Pakistan",
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/sharjlahmd02", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sharjeel-ahmed-61051126b/",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:bullsforexx@gmail.com", label: "Email" },
    {
      icon: Instagram,
      href: "https://www.instagram.com/sharjlahmd.02",
      label: "Instagram",
    },
    {
      icon: FacebookIcon,
      href: "https://www.facebook.com/sharjeel.baloch.58118",
      label: "Facebook",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-16 md:py-24 transition-colors ${
        isDark ? "bg-neutral-950 text-white" : "bg-white text-neutral-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className={`h-0.5 w-14 mx-auto mb-8 ${isDark ? "bg-[#08CB00]" : "bg-neutral-900"}`}
          />
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 tracking-tight ${isDark ? "text-neutral-100" : "text-neutral-900"}`}
          >
            Get In Touch
          </h2>
          <p
            className={`text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-light px-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
          >
            Let's discuss your next investment or just have a conversation about
            market.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            {/* Contact Info */}
            <div
              className={`rounded-xl md:rounded-2xl p-6 md:p-8 border transition-colors ${isDark ? "bg-neutral-800 border-neutral-700" : "bg-gray-50 border-gray-200"}`}
            >
              <h3
                className={`text-xl md:text-2xl font-light mb-6 md:mb-8 ${isDark ? "text-neutral-100" : "text-neutral-900"}`}
              >
                Contact Information
              </h3>
              <div className="space-y-4 md:space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const Component = item.href ? motion.a : motion.div;
                  return (
                    <Component
                      key={index}
                      href={item.href || undefined}
                      whileHover={{ x: 5 }}
                      className={`flex items-center gap-4 md:gap-6 group ${item.href ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isDark ? "bg-neutral-100 text-black group-hover:bg-[#08CB00]" : "bg-neutral-900 text-white group-hover:bg-[#08CB00]"}`}
                      >
                        <Icon className={`w-4 h-4 md:w-5 md:h-5`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className={`text-base md:text-lg font-medium truncate ${isDark ? "text-neutral-100" : "text-neutral-900"}`}
                        >
                          {item.label}
                        </h4>
                        <p
                          className={`text-sm md:text-base truncate transition-colors ${isDark ? "text-neutral-400 group-hover:text-[#08CB00]" : "text-neutral-600 group-hover:text-[#08CB00]"}`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </Component>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div
              className={`rounded-xl md:rounded-2xl p-6 md:p-8 relative overflow-hidden transition-colors ${isDark ? "bg-black text-white" : "bg-neutral-900 text-white"}`}
            >
              <h3 className="text-xl md:text-2xl font-light mb-3 md:mb-4">
                Let's Connect
              </h3>
              <p
                className={`mb-4 md:mb-6 text-sm md:text-base ${isDark ? "text-neutral-400" : "text-gray-300"}`}
              >
                Follow our journey and connect with us on social platforms.
              </p>
              <div className="flex gap-3 md:gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20 backdrop-blur-sm transition-all duration-300 ${isDark ? "bg-white/10 hover:bg-[#08CB00]" : "bg-white/10 hover:bg-[#08CB00]"}`}
                    >
                      <Icon className={`w-4 h-4 md:w-5 md:h-5 text-white`} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className={`rounded-xl md:rounded-2xl p-6 md:p-8 relative transition-colors border ${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-gray-200"}`}
          >
            <h3
              className={`text-xl md:text-2xl font-light mb-6 md:mb-8 ${isDark ? "text-neutral-100" : "text-neutral-900"}`}
            >
              Send a Message
            </h3>

            <div className="space-y-4 md:space-y-6">
              {["name", "email", "message"].map((field, idx) => {
                const isTextArea = field === "message";
                return (
                  <div key={idx}>
                    <label
                      htmlFor={field}
                      className={`block text-sm font-medium mb-2 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                    >
                      {field === "name"
                        ? "Your Name"
                        : field === "email"
                          ? "Your Email"
                          : "Your Message"}
                    </label>
                    {isTextArea ? (
                      <textarea
                        id={field}
                        name={field}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg md:rounded-xl focus:outline-none resize-none transition-all text-sm md:text-base ${errors[field as keyof typeof errors] ? "border-red-500" : isDark ? "border-neutral-700 bg-neutral-900 text-neutral-100 focus:border-[#08CB00]" : "border-gray-200 bg-gray-50 text-neutral-900 focus:border-[#08CB00]"}`}
                        placeholder="Tell me about your project or idea..."
                      />
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        id={field}
                        name={field}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg md:rounded-xl focus:outline-none transition-all text-sm md:text-base ${errors[field as keyof typeof errors] ? "border-red-500" : isDark ? "border-neutral-700 bg-neutral-900 text-neutral-100 focus:border-[#08CB00]" : "border-gray-200 bg-gray-50 text-neutral-900 focus:border-[#08CB00]"}`}
                        placeholder={
                          field === "name"
                            ? "Enter your name"
                            : "Enter your email"
                        }
                      />
                    )}
                    {errors[field as keyof typeof errors] && (
                      <p className="text-red-500 text-xs md:text-sm mt-1 md:mt-2">
                        {errors[field as keyof typeof errors]}
                      </p>
                    )}
                  </div>
                );
              })}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-medium flex items-center justify-center gap-2 text-sm md:text-base transition-all ${isDark ? "bg-white text-neutral-900 hover:bg-[#08CB00] hover:text-white" : "bg-neutral-900 text-white hover:bg-[#08CB00]"}`}
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" /> Send Message
              </motion.button>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`absolute inset-0 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm transition-colors ${isDark ? "bg-neutral-900/95" : "bg-white/95"}`}
                >
                  <div className="text-center space-y-3 md:space-y-4 px-4">
                    <CheckCircle className="w-12 h-12 md:w-16 md:h-16 mx-auto text-[#08CB00]" />
                    <h4
                      className={`text-xl md:text-2xl font-light ${isDark ? "text-neutral-100" : "text-neutral-900"}`}
                    >
                      Message Sent!
                    </h4>
                    <p
                      className={`text-sm md:text-base ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                    >
                      I'll get back to you soon.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>

        {/* Footer */}
        {/* <div className={`text-center border-t pt-6 md:pt-8 transition-colors ${isDark ? "border-neutral-700" : "border-gray-200"}`}>
          <p className={`text-xs md:text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
            © 2025 Sharjeel Ahmed — All rights reserved.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default Contact;
