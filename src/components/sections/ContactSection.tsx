import { useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_CONTENT } from '../../data/content';
import { CornerMarks } from '../CornerMarks';
import { MagneticButton } from '../MagneticButton';
import { Mail, Linkedin, ExternalLink, Send, Check, Copy } from 'lucide-react';

export function ContactSection() {
  const { contact } = PORTFOLIO_CONTENT;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
    const mailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  const isGitHubPlaceholder = contact.github.includes('YOUR-USERNAME');

  return (
    <section
      id="contact"
      className="relative w-full py-24 px-4 sm:px-8 border-b border-[var(--grid-line)]"
    >
      <CornerMarks
        topLeft="08 / CONTACT"
        topRight="OPEN TO WORK"
        bottomLeft="TAMIL NADU, INDIA"
        bottomRight="INTERNSHIP READY"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Links & Statement */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono-tech uppercase tracking-widest text-[#6C2BD9] dark:text-[#A78BFA] font-bold">
                  08. Get In Touch
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C2BD9]" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[var(--text-ink)] leading-tight mb-4">
                Let's Build Something Impactful.
              </h2>
              <p className="text-base text-[var(--text-muted)] dark:text-[#C5B8E3] font-body leading-relaxed">
                {contact.tagline}
              </p>
            </div>

            {/* Direct Email Card with One-Click Copy */}
            <div className="p-6 rounded-[26px] bg-white dark:bg-[#1B1238] border border-slate-200 dark:border-white/10 shadow-xs">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-3 mt-1">
                <a
                  href={`mailto:${contact.email}`}
                  className="font-mono-tech font-bold text-sm sm:text-base text-[#6C2BD9] dark:text-[#A78BFA] hover:underline truncate"
                >
                  {contact.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-[#6C2BD9]/10 text-[var(--text-muted)] hover:text-[#6C2BD9] transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs font-mono-tech text-[var(--text-muted)] mt-2">
                {contact.responseTime}
              </p>
            </div>

            {/* Magnetic Social Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#0077B5] hover:bg-[#005f93] text-white text-xs font-mono-tech font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </MagneticButton>

              <MagneticButton
                href={`mailto:${contact.email}`}
                className="px-5 py-2.5 rounded-full bg-[#6C2BD9] hover:bg-[#5821B3] text-white text-xs font-mono-tech font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Send Mail</span>
              </MagneticButton>

              {!isGitHubPlaceholder && (
                <MagneticButton
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-mono-tech font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>GitHub</span>
                </MagneticButton>
              )}
            </div>
          </div>

          {/* Right Column: Mailto Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-[32px] bg-white dark:bg-[#1B1238] border border-slate-200 dark:border-white/10 shadow-lg"
            >
              <h3 className="font-display font-bold text-xl text-[var(--text-ink)] mb-6">
                Send A Direct Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono-tech uppercase tracking-wider text-[var(--text-muted)] mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-[var(--text-ink)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C2BD9] transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono-tech uppercase tracking-wider text-[var(--text-muted)] mb-1.5"
                    >
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-[var(--text-ink)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C2BD9] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono-tech uppercase tracking-wider text-[var(--text-muted)] mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Internship / Collaboration Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-[var(--text-ink)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C2BD9] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono-tech uppercase tracking-wider text-[var(--text-muted)] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the role, team, or project..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-[var(--text-ink)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6C2BD9] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#6C2BD9] hover:bg-[#5821B3] text-white font-mono-tech font-bold uppercase tracking-wider text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C2BD9]"
                >
                  <Send className="w-4 h-4" />
                  <span>Open in Mail Client</span>
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
