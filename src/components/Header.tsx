import React from 'react';
import { Sun, Moon, Share2 } from 'lucide-react';

interface HeaderProps {
  name: string;
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenShare: () => void;
  onOpenEdit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  name,
  darkMode,
  onToggleTheme,
  onOpenShare,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#top" 
          className="text-base md:text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
        >
          {name}
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-400">
          <a href="#about" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap shrink-0">
            About
          </a>
          <a href="#social-hub" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap shrink-0">
            Social Hub
          </a>
          <a href="#projects" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap shrink-0">
            Portfolio
          </a>
          <a href="#expertise" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap shrink-0">
            Expertise
          </a>
          <a href="#contact" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap shrink-0">
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action (+ subtle theme toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenShare}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0 active:scale-95 shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Hub</span>
          </button>
        </div>
      </div>
    </header>
  );
};
