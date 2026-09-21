import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORKS } from './data.ts';
import { ProjectItem } from './ProjectItem.tsx';
import styles from './SelectedWorks.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SelectedWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Calculate how far the track needs to move horizontally
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      // Create the pinning and horizontal scroll tween
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Scroll distance precisely matches track traversal
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 500)}`,
        },
      });

      // Individual project card reveal animations
      const slides = gsap.utils.toArray('.project-slide') as HTMLElement[];

      slides.forEach((slide) => {
        const content = slide.querySelector('[data-card-content]');
        if (!content) return;

        gsap.set(content, { opacity: 0.25, x: 25 });

        gsap.to(content, {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slide,
            containerAnimation: tween,
            pinnedContainer: section,
            start: 'left 85%',
            end: 'left 50%',
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={styles.sectionWrapper} id="work">
      <div ref={sectionRef} className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Selected Work</h2>
          <span className={styles.sectionNum}>04</span>
        </div>

        <div className={styles.sliderViewport}>
          <div ref={trackRef} className={styles.track}>
            {WORKS.map((project, i) => (
              <ProjectItem
                key={`${project.num}-${i}`}
                project={project}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
