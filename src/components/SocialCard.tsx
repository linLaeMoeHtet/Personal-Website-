import React, { useState } from 'react';
import { SocialLink } from '../types/profile';
import { SocialIcon } from './SocialIcon';
import { ExternalLink, Copy, Check } from 'lucide-react';

interface SocialCardProps {
  link: SocialLink;
  onCopyFeedback?: (message: string) => void;
}

export const SocialCard: React.FC<SocialCardProps> = ({ link, onCopyFeedback }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    onCopyFeedback?.(`Copied ${link.label} link to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-stone-900/90 border border-stone-200/80 dark:border-stone-800 transition-all duration-200 hover:shadow-lg hover:border-stone-300 dark:hover:border-stone-700">
      <div>
        {/* Top bar of the card */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center justify-center w-11 h-11 rounded-xl text-white shadow-xs transition-transform duration-200 group-hover:scale-105"
              style={{ backgroundColor: link.color || '#18181b' }}
            >
              <SocialIcon platform={link.platform} className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  {link.label}
                </h3>
                {link.highlight && (
                  <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 font-mono-data">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs font-mono-data text-stone-500 dark:text-stone-400 truncate max-w-[180px]">
                {link.username}
              </p>
            </div>
          </div>

          {/* Quick copy URL button */}
          <button
            type="button"
            onClick={handleCopy}
            title={`Copy ${link.label} link`}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/80 transition-colors"
            aria-label={`Copy ${link.label} URL`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed mb-4">
          {link.description}
        </p>
      </div>

      {/* Direct Click Action */}
      <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-3">
        <span className="text-[11px] text-stone-400 dark:text-stone-500 flex items-center gap-1 font-mono-data">
          Direct Account Link
        </span>

        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors shrink-0 shadow-xs active:scale-95"
        >
          <span>Open Account</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
