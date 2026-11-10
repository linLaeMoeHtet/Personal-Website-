import React, { useState } from 'react';
import { X, Plus, Trash2, RotateCcw, Check, User, Link as LinkIcon } from 'lucide-react';
import { ProfileData, SocialLink, SocialPlatform, SocialCategory } from '../types/profile';
import { SocialIcon } from './SocialIcon';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updated: ProfileData) => void;
  onReset: () => void;
  onFeedback: (msg: string) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
  onFeedback,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'socials'>('info');
  const [formData, setFormData] = useState<ProfileData>({ ...profile });

  if (!isOpen) return null;

  const handleInfoChange = (field: keyof ProfileData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (index: number, field: keyof SocialLink, value: any) => {
    setFormData((prev) => {
      const updated = [...prev.socialLinks];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, socialLinks: updated };
    });
  };

  const handleAddSocial = () => {
    const newLink: SocialLink = {
      id: `custom-${Date.now()}`,
      platform: 'website',
      label: 'New Website / Link',
      username: '@username',
      url: 'https://',
      category: 'social',
      description: 'Direct link to my profile',
      highlight: false,
      color: '#4b5563',
    };
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newLink],
    }));
  };

  const handleDeleteSocial = (index: number) => {
    setFormData((prev) => {
      const updated = prev.socialLinks.filter((_, i) => i !== index);
      return { ...prev, socialLinks: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onFeedback('Profile & direct links updated successfully!');
    onClose();
  };

  const handleResetToDefault = () => {
    if (confirm('Reset all profile details and social links back to initial defaults?')) {
      onReset();
      onFeedback('Profile reset to defaults.');
      onClose();
    }
  };

  const availablePlatforms: SocialPlatform[] = [
    'linkedin',
    'github',
    'instagram',
    'x',
    'telegram',
    'youtube',
    'facebook',
    'tiktok',
    'threads',
    'behance',
    'dribbble',
    'whatsapp',
    'email',
    'website',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Customize Profile &amp; Direct Links
            </h2>
            <p className="text-xs text-stone-500">
              Update your personal informations and direct social account URLs.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-stone-100 dark:border-stone-800 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`inline-flex items-center gap-2 pb-3 px-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-amber-600 text-amber-700 dark:text-amber-400'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Informations</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('socials')}
            className={`inline-flex items-center gap-2 pb-3 px-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'socials'
                ? 'border-amber-600 text-amber-700 dark:text-amber-400'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Direct Social Links ({formData.socialLinks.length})</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'info' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInfoChange('name', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Professional Title / Role
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInfoChange('title', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Short Bio (Headline Intro)
                </label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => handleInfoChange('bio', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  About Me (Detailed Narrative)
                </label>
                <textarea
                  rows={4}
                  value={formData.aboutLong}
                  onChange={(e) => handleInfoChange('aboutLong', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Direct Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInfoChange('email', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Direct Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => handleInfoChange('phone', e.target.value)}
                    placeholder="+95 9 123 456 789"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInfoChange('location', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Timezone Label
                  </label>
                  <input
                    type="text"
                    value={formData.timezone}
                    onChange={(e) => handleInfoChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Availability Note
                </label>
                <input
                  type="text"
                  value={formData.availabilityNote}
                  onChange={(e) => handleInfoChange('availabilityNote', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Ensure all URLs start with https:// so visitors reach your account directly.
                </span>
                <button
                  type="button"
                  onClick={handleAddSocial}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Social Account</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.socialLinks.map((link, idx) => (
                  <div
                    key={link.id || idx}
                    className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg text-white flex items-center justify-center"
                          style={{ backgroundColor: link.color || '#333' }}
                        >
                          <SocialIcon platform={link.platform} className="w-3.5 h-3.5" />
                        </div>
                        <select
                          value={link.platform}
                          onChange={(e) =>
                            handleSocialChange(idx, 'platform', e.target.value as SocialPlatform)
                          }
                          className="text-xs font-semibold px-2 py-1 rounded bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-900 dark:text-stone-100"
                        >
                          {availablePlatforms.map((plat) => (
                            <option key={plat} value={plat}>
                              {plat.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={link.category}
                          onChange={(e) =>
                            handleSocialChange(idx, 'category', e.target.value as SocialCategory)
                          }
                          className="text-xs px-2 py-1 rounded bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-700 dark:text-stone-300"
                        >
                          <option value="professional">Professional</option>
                          <option value="social">Social</option>
                          <option value="creative">Creative</option>
                          <option value="code">Code</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDeleteSocial(idx)}
                          className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Remove social link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-stone-500 mb-0.5">Label</label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleSocialChange(idx, 'label', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-900 dark:text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-500 mb-0.5">Handle / Username</label>
                        <input
                          type="text"
                          value={link.username}
                          onChange={(e) => handleSocialChange(idx, 'username', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs font-mono-data rounded bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-900 dark:text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-500 mb-0.5">Direct URL (Opens directly)</label>
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs font-mono-data rounded bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-900 dark:text-stone-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
