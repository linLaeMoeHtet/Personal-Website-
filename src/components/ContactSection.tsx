import React, { useState, useEffect } from 'react';
import { Mail, Clock, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { SocialIcon } from './SocialIcon';

interface ContactSectionProps {
  email: string;
  phone?: string;
  location: string;
  timezone: string;
  availabilityNote: string;
  onFeedback: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  email,
  phone,
  location,
  timezone,
  availabilityNote,
  onFeedback,
}) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sentStatus, setSentStatus] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live clock formatted for local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Calculate Myanmar Time (UTC+6:30)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const mmtTime = new Date(utc + 6.5 * 3600000);
      setCurrentTime(
        mmtTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail || !formMessage) return;

    // Direct mailto trigger so the user reaches the email directly
    const subjectEncoded = encodeURIComponent(formSubject || `Project Inquiry from ${formName || 'Website Visitor'}`);
    const bodyEncoded = encodeURIComponent(
      `Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`
    );
    const mailtoUrl = `mailto:${email}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    // Open default mail client directly
    window.location.href = mailtoUrl;

    setSentStatus(true);
    onFeedback('Email client opened with prefilled message!');
    setTimeout(() => {
      setSentStatus(false);
      setFormName('');
      setFormEmail('');
      setFormSubject('');
      setFormMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 border-t border-stone-200/80 dark:border-stone-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-xs font-mono-data text-amber-700 dark:text-amber-400 mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl font-serif-display font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Direct Contact &amp; Inquiries
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-2xl">
            {availabilityNote}. Feel free to drop a message or reach out across any of the verified channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct channels info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Email Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Direct Email
                  </h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-xs font-mono-data text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`mailto:${email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </a>
              </div>
            </div>

            {/* Quick Chat Channels */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
              <h3 className="text-xs font-mono-data text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Instant Chat Channels
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://t.me/linlaemoehtet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 transition-all border border-stone-200/60 dark:border-stone-700/60"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#26A5E4] text-white flex items-center justify-center shrink-0">
                    <SocialIcon platform="telegram" className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate">Telegram</div>
                    <div className="text-[10px] text-stone-500 font-mono-data">Instant Chat</div>
                  </div>
                </a>

                {phone && (
                  <a
                    href="https://wa.me/959798123456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 transition-all border border-stone-200/60 dark:border-stone-700/60"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                      <SocialIcon platform="whatsapp" className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate">WhatsApp</div>
                      <div className="text-[10px] text-stone-500 font-mono-data">Direct Line</div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Location & Timezone live card */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 text-xs space-y-3">
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0" />
                <span>{location}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-200/60 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Local Time ({timezone}):</span>
                </div>
                <span className="font-mono-data font-semibold text-stone-900 dark:text-stone-200">
                  {currentTime || '07:35 AM'}
                </span>
              </div>
            </div>
          </div>

          {/* Direct message composer */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  Compose a Direct Message
                </h3>
              </div>

              {sentStatus ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-3" />
                  <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-1">
                    Opening Your Email Client
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm">
                    Your message has been formatted directly into your email composer to reach {email}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      placeholder="Project Inquiry / Collaboration"
                      className="w-full px-3.5 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Hi Lin Lae, I would love to discuss a design system project..."
                      className="w-full px-3.5 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono-data">
                      Direct transmission to {email}
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors active:scale-95 shadow-xs"
                    >
                      <span>Send Direct Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
