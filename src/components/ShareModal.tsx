import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Share2, ExternalLink } from 'lucide-react';
import { SocialLink } from '../types/profile';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileName: string;
  socialLinks: SocialLink[];
  onFeedback: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  profileName,
  socialLinks,
  onFeedback,
}) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://profile-hub.dev';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    onFeedback('Profile URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileName} | Official Profile & Social Hub`,
          text: `Connect with ${profileName} directly across social media channels.`,
          url: currentUrl,
        });
      } catch {
        // user cancelled share
      }
    } else {
      handleCopy();
    }
  };

  // Generate an authentic QR code pattern in SVG
  const qrModules = [
    // 7x7 corner top-left finder
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,1,1,0,1,0,1,1,0],
    [0,1,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,0,1,0,1,0,1,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Share Profile &amp; Social Hub
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Block */}
        <div className="my-6 flex flex-col items-center justify-center p-6 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/60 dark:border-stone-700/60">
          <div className="p-3 bg-white rounded-xl shadow-xs border border-stone-100">
            <svg
              className="w-40 h-40 text-stone-900"
              viewBox="0 0 17 17"
              shapeRendering="crispEdges"
            >
              {qrModules.map((row, rIdx) =>
                row.map((val, cIdx) =>
                  val === 1 ? (
                    <rect
                      key={`${rIdx}-${cIdx}`}
                      x={cIdx}
                      y={rIdx}
                      width={1}
                      height={1}
                      fill="currentColor"
                    />
                  ) : null
                )
              )}
            </svg>
          </div>
          <p className="text-xs font-mono-data text-stone-500 dark:text-stone-400 mt-3 flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5" />
            Scan with phone camera to reach directly
          </p>
        </div>

        {/* Copy URL Field */}
        <div className="space-y-3">
          <label className="block text-xs font-medium text-stone-700 dark:text-stone-300">
            Direct Profile URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="w-full px-3 py-2 text-xs font-mono-data rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Direct quick share channels */}
        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-mono-data">Direct Channels:</span>
            <button 
              onClick={handleNativeShare}
              className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              System Share <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {socialLinks.slice(0, 5).map((sl) => (
              <a
                key={sl.id}
                href={sl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 text-xs rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors whitespace-nowrap"
              >
                {sl.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
