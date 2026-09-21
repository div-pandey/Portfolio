import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORKS } from './data.ts';
import { ProjectItem } from './ProjectItem.tsx';
import styles from './SelectedWorks.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // On mobile (<= 768px), disable GSAP pinning — use native CSS scroll instead
      if (window.innerWidth <= 768) return;

      // Calculate how far the track needs to move horizontally
      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      // Create the pinning and horizontal scroll tween
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          // 1.5 scrub gives a heavy, premium, deliberate glide
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // The scroll distance equals the exact horizontal width
          end: () => `+=${track.scrollWidth}`,
        },
      });

      // Now apply individual animations for each project card as they enter
      // the screen horizontally, syncing it with the main track's tween via containerAnimation
      const slides = gsap.utils.toArray('.project-slide') as HTMLElement[];
      
      slides.forEach((slide) => {
        const content = slide.querySelector('[data-card-content]');
        if (!content) return;

        // Set initial state
        gsap.set(content, { opacity: 0.2, x: 30 });

        // Fade and slide in text as the card enters the viewport horizontally
        gsap.to(content, {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slide,
            containerAnimation: tween, // <--- This links it to the horizontal scroll!
            start: 'left 85%',
            end: 'left 50%',
            scrub: true,
          }
        });
      });

      return () => {
        tween.kill();
      };
    },
    { scope: sectionRef }
  );


  return (
    <section ref={sectionRef} className={styles.section} id="work">
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
    </section>
  );
}
