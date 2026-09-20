import { useState, useRef, useEffect } from 'react';
import type { Project } from './data.ts';
import styles from './SelectedWorks.module.css';

interface ProjectItemProps {
  project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const useIframe = !project.forceImage && !iframeBlocked;
  const imageFilename = project.name.toLowerCase().replace(/\s+/g, '-');

  // Calculate and apply the correct scale factor so the iframe
  // fills the container at 1440px virtual width.
  useEffect(() => {
    if (!useIframe) return;

    const update = () => {
      if (!containerRef.current || !iframeRef.current) return;
      const w = containerRef.current.clientWidth;
      const scale = w / 1440;
      iframeRef.current.style.setProperty('--iframe-scale', String(scale));
      iframeRef.current.style.transform = `scale(${scale})`;
      // Also set the height so the visible crop looks like a landing page hero
      const h = containerRef.current.clientHeight;
      iframeRef.current.style.height = `${h / scale}px`;
    };

    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [useIframe]);

  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const el = e.currentTarget;
    el.setAttribute('data-loaded', '');
    try {
      const doc = el.contentDocument;
      if (doc && doc.body && doc.body.innerHTML.trim() === '') {
        setIframeBlocked(true);
      }
    } catch {
      // Cross-origin: can't read — site loaded fine, ignore
    }
  };

  return (
    <div className={`project-slide ${styles.projectItem}`}>
      {/* ── Preview Area ──────────────────────────────── */}
      <a
        ref={containerRef}
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.imageWrap}
        tabIndex={-1}
        aria-hidden="true"
      >
        {useIframe ? (
          <div className={styles.iframeContainer}>
            <iframe
              ref={iframeRef}
              src={project.preview}
              title={`${project.name} live preview`}
              loading="lazy"
              className={styles.previewIframe}
              onLoad={handleIframeLoad}
              onError={() => setIframeBlocked(true)}
            />
            {/* Click overlay routes to live site */}
            <div className={styles.iframeOverlay} />
          </div>
        ) : !imageError ? (
          <img
            src={`/images/${imageFilename}.png`}
            alt={`${project.name} preview`}
            loading="lazy"
            className={styles.projectImage}
            onError={(e) => {
              const img = e.currentTarget;
              // Try different extensions before giving up
              if (img.src.endsWith('.png')) {
                img.src = `/images/${imageFilename}.webp`;
              } else if (img.src.endsWith('.webp')) {
                img.src = `/images/${imageFilename}.jpg`;
              } else {
                setImageError(true);
              }
            }}
          />
        ) : (
          <div className={styles.imageFallback}>
            <span className={styles.imageFallbackName}>{project.name}</span>
          </div>
        )}
      </a>

      {/* ── Text Content ──────────────────────────────── */}
      <div data-card-content className={styles.cardContent}>
        <div className={styles.projectTop}>
          <span className={styles.projectIndex}>{project.num}</span>
          <div className={styles.projectLinks}>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              Live ↗
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
              onClick={(e) => e.stopPropagation()}
            >
              Code ↗
            </a>
          </div>
        </div>

        <h3 className={styles.projectName}>{project.name}</h3>
        <p className={styles.projectDesc}>{project.desc}</p>

        <div className={styles.projectMeta}>
          <span className={styles.projectTech}>
            {project.tech.slice(0, 3).join(' · ')}
          </span>
          <span className={styles.projectYear}>{project.year}</span>
        </div>
      </div>
    </div>
  );
}
