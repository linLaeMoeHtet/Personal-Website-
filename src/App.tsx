/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DEFAULT_PROFILE } from './data/defaultProfile';
import { ProfileData, SocialCategory } from './types/profile';
import { Header } from './components/Header';
import { SocialCard } from './components/SocialCard';
import { SocialQuickBar } from './components/SocialQuickBar';
import { ProjectCard } from './components/ProjectCard';
import { ContactSection } from './components/ContactSection';
import { ShareModal } from './components/ShareModal';
import { ProfileEditModal } from './components/ProfileEditModal';
import { Toast } from './components/Toast';
import { 
  MapPin, 
  Clock, 
  ExternalLink, 
  ArrowUpRight, 
  Mail, 
  SlidersHorizontal, 
  Search, 
  Briefcase, 
  GraduationCap, 
  Sparkles,
  CheckCircle2,
  Share2,
  Edit3
} from 'lucide-react';
import { SocialIcon } from './components/SocialIcon';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('profile_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Profile data state with local storage persistence
  const [profile, setProfile] = useState<ProfileData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_profile_data');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_PROFILE;
        }
      }
    }
    return DEFAULT_PROFILE;
  });

  // Filter & Search states for Social Hub
  const [selectedCategory, setSelectedCategory] = useState<SocialCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Feedback
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  // Sync dark class with document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('profile_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('profile_theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3000);
  };

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    localStorage.setItem('user_profile_data', JSON.stringify(updated));
  };

  const handleResetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem('user_profile_data');
  };

  // Filter social links based on category and search query
  const filteredSocialLinks = profile.socialLinks.filter((link) => {
    const matchesCategory =
      selectedCategory === 'all' || link.category === selectedCategory;
    const matchesSearch =
      link.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="top" className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 transition-colors selection:bg-amber-500/20 selection:text-amber-900 dark:selection:text-amber-200">
      {/* 3-Zone Header Contract */}
      <Header
        name={profile.name}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenEdit={() => setIsEditOpen(true)}
      />

      <main className="max-w-6xl mx-auto px-6 pt-6 pb-20">
        {/* HERO SECTION */}
        <section className="mb-14">
          {/* Cover Banner */}
          <div className="relative h-48 md:h-72 w-full rounded-3xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800">
            <img
              src={profile.coverBannerUrl}
              alt="Profile Cover Banner"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/20 to-transparent" />
            
            {/* Quick action overlay in top-right of cover */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-stone-800 backdrop-blur-md text-xs font-semibold shadow-xs transition-all active:scale-95"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                <span>Customize Profile</span>
              </button>
            </div>
          </div>

          {/* Profile Identity Row */}
          <div className="relative px-4 sm:px-8 -mt-16 md:-mt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200/80 dark:border-stone-800">
              {/* Avatar + Primary Name Details */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                {/* Avatar with fallback */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border-4 border-stone-50 dark:border-stone-950 shadow-xl shrink-0">
                  {!avatarError ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold text-2xl font-serif-display">
                      {profile.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Name & Title */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono-data text-amber-700 dark:text-amber-400">
                    <span>Portfolio &amp; Direct Social Hub</span>
                    <span aria-hidden="true">·</span>
                    <span>{profile.pronouns}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
                    {profile.name}
                  </h1>

                  <p className="text-sm md:text-base font-medium text-stone-600 dark:text-stone-300">
                    {profile.title}
                  </p>

                  {/* Clean unboxed metadata with separators (no pill enclosures) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {profile.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      {profile.timezone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-all shadow-xs active:scale-95"
                >
                  <Mail className="w-4 h-4" />
                  <span>Direct Contact</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsShareOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-all shadow-xs active:scale-95"
                >
                  <Share2 className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Share Hub</span>
                </button>
              </div>
            </div>

            {/* Availability & Bio */}
            <div className="pt-6 space-y-4">
              {profile.availableForWork && (
                <div className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                  <span className="font-semibold text-amber-800 dark:text-amber-400 font-mono-data">STATUS:</span>
                  <span>{profile.availabilityNote}</span>
                </div>
              )}

              <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed max-w-3xl">
                {profile.bio}
              </p>

              {/* Direct Reach Quick Icons */}
              <SocialQuickBar socialLinks={profile.socialLinks} />
            </div>
          </div>
        </section>

        {/* 4-COLUMN STAT / PROOF STRIP (Full-width row below hero) */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs">
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold font-mono-data text-stone-900 dark:text-stone-100">
                06+
              </div>
              <div className="text-xs text-stone-500 font-medium">Years Product Design</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold font-mono-data text-amber-700 dark:text-amber-400">
                {profile.socialLinks.length}
              </div>
              <div className="text-xs text-stone-500 font-medium">Verified Direct Accounts</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold font-mono-data text-stone-900 dark:text-stone-100">
                14+
              </div>
              <div className="text-xs text-stone-500 font-medium">Shipped Web &amp; Apps</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold font-mono-data text-emerald-700 dark:text-emerald-400">
                100%
              </div>
              <div className="text-xs text-stone-500 font-medium">Direct Profile Reach</div>
            </div>
          </div>
        </section>

        {/* SOCIAL HUB SECTION */}
        <section id="social-hub" className="mb-16 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-mono-data text-amber-700 dark:text-amber-400 mb-1">
                Verified Direct Channels
              </p>
              <h2 className="text-2xl md:text-3xl font-serif-display font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Connect Directly on Social Media
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
                Click any channel to reach our authentic social account directly in a new tab.
              </p>
            </div>

            {/* Quick search input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter social accounts..."
                className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>

          {/* Interactive filter tabs / segmented controls */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 dark:bg-stone-900 rounded-xl mb-6 overflow-x-auto">
            {(
              [
                { id: 'all', label: 'All Channels' },
                { id: 'professional', label: 'Professional' },
                { id: 'creative', label: 'Creative & Media' },
                { id: 'social', label: 'Social & Chat' },
                { id: 'code', label: 'Code & Dev' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-white text-stone-900 dark:bg-stone-800 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Social Cards Grid */}
          {filteredSocialLinks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSocialLinks.map((link) => (
                <SocialCard
                  key={link.id}
                  link={link}
                  onCopyFeedback={showToast}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <p className="text-sm text-stone-500">
                No social channels found matching "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* ABOUT & TIMELINE SECTION */}
        <section id="about" className="mb-16 scroll-mt-24">
          <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-10">
            {/* Editorial Bio */}
            <div>
              <p className="text-xs font-mono-data text-amber-700 dark:text-amber-400 mb-2">
                About The Creator
              </p>
              <h2 className="text-2xl md:text-3xl font-serif-display font-bold text-stone-900 dark:text-stone-100 tracking-tight mb-4">
                Philosophy &amp; Background
              </h2>
              <p className="text-sm md:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
                {profile.aboutLong}
              </p>
            </div>

            {/* Experience & Education 2-Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-stone-100 dark:border-stone-800">
              {/* Career Experience */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                    Experience &amp; Roles
                  </h3>
                </div>

                <div className="space-y-6">
                  {profile.experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l border-stone-200 dark:border-stone-800 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {exp.role}
                        </h4>
                        <span className="text-[11px] font-mono-data text-stone-400">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                        {exp.company} · {exp.location}
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-1">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Credentials */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <GraduationCap className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                    Education &amp; Honors
                  </h3>
                </div>

                <div className="space-y-6">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {edu.degree}
                        </h4>
                        <span className="text-[11px] font-mono-data text-stone-500">
                          {edu.year}
                        </span>
                      </div>
                      <div className="text-xs text-stone-600 dark:text-stone-300">
                        {edu.institution}
                      </div>
                      {edu.details && (
                        <p className="text-xs text-stone-500 font-mono-data pt-1 border-t border-stone-200/50 dark:border-stone-700/50">
                          {edu.details}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Core Design Pillars */}
                  <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60 space-y-3">
                    <span className="text-xs font-mono-data text-stone-500 uppercase tracking-wider block">
                      Core Values
                    </span>
                    <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                      <div>
                        <strong className="text-stone-900 dark:text-stone-100">01. Systematic Craft</strong>: Clean tokens, modular React architectures, and zero slop.
                      </div>
                      <div>
                        <strong className="text-stone-900 dark:text-stone-100">02. Direct Reach</strong>: Transparent contact channels, open conversations, zero friction.
                      </div>
                      <div>
                        <strong className="text-stone-900 dark:text-stone-100">03. Accessibility First</strong>: WCAG compliant contrast, tactile responsiveness, and keyboard navigation.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO & WORKS SECTION */}
        <section id="projects" className="mb-16 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-mono-data text-amber-700 dark:text-amber-400 mb-1">
                Selected Works
              </p>
              <h2 className="text-2xl md:text-3xl font-serif-display font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Featured Case Studies
              </h2>
            </div>

            <a
              href="https://github.com/linlaemoehtet"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
            >
              <span>View All Repositories</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* SKILLS & EXPERTISE SECTION */}
        <section id="expertise" className="mb-16 scroll-mt-24">
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs">
            <div className="mb-6">
              <p className="text-xs font-mono-data text-amber-700 dark:text-amber-400 mb-1">
                Technical &amp; Creative Capabilities
              </p>
              <h2 className="text-2xl md:text-3xl font-serif-display font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Skills &amp; Methodologies
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {profile.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 flex flex-col justify-between gap-2"
                >
                  <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                    {skill.name}
                  </span>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono-data pt-1 border-t border-stone-200/40 dark:border-stone-700/40">
                    <span>{skill.category}</span>
                    <span className="text-amber-700 dark:text-amber-400">{skill.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIRECT CONTACT SECTION */}
        <ContactSection
          email={profile.email}
          phone={profile.phone}
          location={profile.location}
          timezone={profile.timezone}
          availabilityNote={profile.availabilityNote}
          onFeedback={showToast}
        />
      </main>

      {/* QUIET FOOTER */}
      <footer className="border-t border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-950 py-10 transition-colors">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
              {profile.name}
            </span>
            <span className="text-xs text-stone-400 font-mono-data">
              · All Rights Reserved © {new Date().getFullYear()}
            </span>
          </div>

          {/* Social quick links */}
          <div className="flex items-center gap-4 text-xs text-stone-500">
            {profile.socialLinks.slice(0, 6).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#top"
            className="text-xs font-mono-data text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            Back to Top ↑
          </a>
        </div>
      </footer>

      {/* Modals & Toast */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        profileName={profile.name}
        socialLinks={profile.socialLinks}
        onFeedback={showToast}
      />

      <ProfileEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
        onFeedback={showToast}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
