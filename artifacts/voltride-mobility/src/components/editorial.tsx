import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function MotionReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ type: 'spring', stiffness: 82, damping: 19, delay }}
    >
      {children}
    </motion.div>
  );
}

export function EditorialMedia({
  src,
  alt,
  caption,
  className = '',
  priority = false,
  fit = 'cover',
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  fit?: 'cover' | 'contain';
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className={`editorial-media ${className}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ type: 'spring', stiffness: 70, damping: 20 }}
    >
      <div className="editorial-media-rings" aria-hidden="true">
        {[0, 1, 2].map((ring) => (
          <motion.span
            className="editorial-media-ring"
            key={ring}
            animate={reduceMotion ? undefined : { scale: [0.9, 1.12], opacity: [0.46, 0] }}
            transition={{ duration: 4.8, delay: ring * 1.35, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </div>
      <div className={`editorial-media-image fit-${fit}`}>
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </motion.figure>
  );
}

export function PageIntro({
  number,
  eyebrow,
  title,
  children,
  action,
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="wrap editorial-intro">
      <MotionReveal className="editorial-intro-copy">
        <div className="eyebrow">{number} / {eyebrow}</div>
        <h1 className="display">{title}</h1>
        <p>{children}</p>
        {action ? <div className="editorial-actions">{action}</div> : null}
      </MotionReveal>
    </section>
  );
}

export function EditorialSection({
  number,
  eyebrow,
  title,
  children,
  className = '',
}: {
  number?: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`editorial-section ${className}`}>
      <div className="wrap">
        <MotionReveal className="editorial-section-heading">
          <div>
            <div className="eyebrow">{number ? `${number} / ` : ''}{eyebrow}</div>
            <h2 className="display">{title}</h2>
          </div>
        </MotionReveal>
        {children}
      </div>
    </section>
  );
}