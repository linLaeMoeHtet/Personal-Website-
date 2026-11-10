import React, { useState } from 'react';
import { Project } from '../types/profile';
import { ExternalLink, Layers } from 'lucide-react';
import { SocialIcon } from './SocialIcon';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 overflow-hidden transition-all duration-200 hover:shadow-xl hover:border-stone-300 dark:hover:border-stone-700 flex flex-col justify-between">
      <div>
        {/* Media Container with resilient styled fallback */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
          {!imageError ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-stone-400 bg-stone-100 dark:bg-stone-800">
              <Layers className="w-10 h-10 mb-2 stroke-[1.5]" />
              <p className="text-xs font-medium text-stone-500">{project.title}</p>
            </div>
          )}

          {/* Year in top corner */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-stone-900/80 text-white backdrop-blur-md text-[11px] font-mono-data">
            {project.year}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-mono-data text-stone-500 dark:text-stone-400 mb-2">
            <span>{project.category}</span>
          </div>

          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tags using zero-pill clean unboxed inline text with separators */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            {project.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                {idx < project.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Action link */}
      <div className="p-6 pt-0 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-3 mt-4">
        <span className="text-xs text-stone-400 dark:text-stone-500 font-mono-data">
          Featured Work
        </span>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="View source on GitHub"
            >
              <SocialIcon platform="github" className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors"
            >
              <span>Explore</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
