import React from 'react';
import { SocialLink } from '../types/profile';
import { SocialIcon } from './SocialIcon';

interface SocialQuickBarProps {
  socialLinks: SocialLink[];
}

export const SocialQuickBar: React.FC<SocialQuickBarProps> = ({ socialLinks }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-xs font-mono-data text-stone-500 dark:text-stone-400 mr-1 shrink-0">
        Direct Reach:
      </span>
      {socialLinks.slice(0, 7).map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Direct link to ${link.label} (${link.username})`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200 bg-stone-100/80 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-lg transition-all duration-150 hover:scale-105 active:scale-95 group shadow-2xs shrink-0"
        >
          <span 
            className="w-2 h-2 rounded-full inline-block shrink-0"
            style={{ backgroundColor: link.color || '#71717a' }}
          />
          <SocialIcon platform={link.platform} className="w-3.5 h-3.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
          <span className="whitespace-nowrap">{link.label}</span>
        </a>
      ))}
    </div>
  );
};
