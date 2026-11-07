import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import './IntroSplash.css';

const INTRO_VIDEO_ALPHA = '/intro/agap-intro-alpha.webm';
const INTRO_VIDEO_FALLBACK = '/intro/agap-intro.mp4';
const FLIGHT_EASE = [0.76, 0, 0.24, 1];

/** Where the logo sits inside the square intro video (measured from the final frame). */
const LOGO_IN_VIDEO = {
  width: 0.8375,
  height: 0.5225,
  offsetY: -0.0508,
};

/**
 * A 4x4 VP9 clip: left half transparent, right half white.
 * Sampling it on a canvas tells us whether this browser keeps the alpha channel.
 */
const ALPHA_PROBE =
  'data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAK2EU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHYTbuMU6uEElTDZ1OsggEpTbuMU6uEHFO7a1OsggKg7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsirXsYMPQkBNgI1MYXZmNjAuMTYuMTAwV0GNTGF2ZjYwLjE2LjEwMESJiEB5AAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYh5iNRjT85DFpyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAX14QDglLCBBLqBBJqBAlPAgQFVsIRVuYEBElTDZ0CAc3OgY8CAZ8iaRaOHRU5DT0RFUkSHjUxhdmY2MC4xNi4xMDBzc9pjwItjxYh5iNRjT85DFmfIpUWjh0VOQ09ERVJEh5hMYXZjNjAuMzEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjAwLjQwMDAwMDAwMAAfQ7Z1QOvngQCgzaGggQAAAIJJg0IAADAANgA4JBwYQgAAICAAEb///5cQAAB1oaimpu6BAaWhgkmDQgAAMAA2ADgkHBhCAAAgIABvPUt//+wN83//zwAAoLGhk4EAZACGAECSnABJQAADIAAAS0B1oZamlO6BAaWPhgBAkpwASUAAAyAAAEtA+4GcoLGhk4EAyACGAECSnABKwAADIAAAS0B1oZamlO6BAaWPhgBAkpwASsAAAyAAAEtA+4GcoLGhk4EBLACGAECSnABJwAADIAAAS0B1oZamlO6BAaWPhgBAkpwAScAAAyAAAEtA+4GcHFO7a5G7j7OBALeK94EB8YIBr/CBAw==';

function supportsAlphaVideo() {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = 4;
    canvas.height = 4;

    let settled = false;
    const done = (supported) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      video.removeAttribute('src');
      video.load();
      resolve(supported);
    };
    const timer = window.setTimeout(() => done(false), 3000);

    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.addEventListener('error', () => done(false), { once: true });
    video.addEventListener(
      'loadeddata',
      () => {
        try {
          ctx.drawImage(video, 0, 0, 4, 4);
          const left = ctx.getImageData(0, 0, 1, 1).data[3];
          const right = ctx.getImageData(3, 0, 1, 1).data[3];
          done(left < 32 && right > 200);
        } catch {
          done(false);
        }
      },
      { once: true },
    );

    video.src = ALPHA_PROBE;
  });
}

export default function IntroSplash({ onDone }) {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState('playing');
  const [flight, setFlight] = useState(null);
  const [fast, setFast] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [source, setSource] = useState(null);
  const videoRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const finishedRef = useRef(false);
  const timerRef = useRef(null);

  // Keep the page still while the intro covers it. The class hides the scrollbar,
  // so reserve its width on the header and the site to avoid a layout jump at hand-off.
  useEffect(() => {
    const root = document.documentElement;
    const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);
    root.style.setProperty('--scrollbar-w', `${scrollbarWidth}px`);
    root.classList.add('intro-active');
    return () => {
      root.classList.remove('intro-active');
      root.style.removeProperty('--scrollbar-w');
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const finish = useCallback((isSkip = false) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFast(isSkip);
    setBlocked(false);

    const target =
      document.querySelector('.brand__logo') || document.querySelector('.brand');
    const startEl = logoRef.current;

    if (target && startEl) {
      const t = target.getBoundingClientRect();
      const s = startEl.getBoundingClientRect();
      setFlight({
        dx: t.left + t.width / 2 - (s.left + s.width / 2),
        dy: t.top + t.height / 2 - (s.top + s.height / 2),
        scale: t.width / s.width,
      });
    }

    setPhase('sinking');

    const duration = (isSkip ? 0.65 : 1.16) * 1000;
    timerRef.current = window.setTimeout(() => {
      setPhase('done');
      onDone?.();
    }, duration + 80);
  }, [onDone]);

  // Respect a user's reduced-motion preference: skip the intro entirely.
  useEffect(() => {
    if (!prefersReduced) return;
    finishedRef.current = true;
    setPhase('done');
    onDone?.();
  }, [prefersReduced, onDone]);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setBlocked(false);
    const started = video.play();
    if (started?.catch) started.catch(() => setBlocked(true));
  }, []);

  // Prefer the transparent WebM. Browsers that cannot decode its alpha channel
  // (Safari) get the MP4, whose blue background matches the overlay colour.
  useEffect(() => {
    if (prefersReduced) return;
    let cancelled = false;
    supportsAlphaVideo().then((alphaSupported) => {
      if (cancelled || finishedRef.current) return;
      setSource(alphaSupported ? INTRO_VIDEO_ALPHA : INTRO_VIDEO_FALLBACK);
    });
    return () => {
      cancelled = true;
    };
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced || !source) return;
    play();
    // If the clip cannot load, don't trap the visitor behind the overlay.
    const failsafe = window.setTimeout(() => {
      const video = videoRef.current;
      if (video && video.readyState < 2 && !finishedRef.current) finish(true);
    }, 9000);
    return () => window.clearTimeout(failsafe);
  }, [finish, play, prefersReduced, source]);

  const onVideoError = () => {
    // A browser may advertise WebM yet fail to decode it; retry with the MP4 once.
    if (source === INTRO_VIDEO_ALPHA) {
      setSource(INTRO_VIDEO_FALLBACK);
      return;
    }
    finish(true);
  };

  const onTimeUpdate = (event) => {
    const video = event.currentTarget;
    if (progressRef.current && video.duration) {
      progressRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
    }
  };

  if (phase === 'done') return null;

  const sinking = phase === 'sinking';
  const flightTime = fast ? 0.55 : 1.0;
  const flightDelay = fast ? 0.1 : 0.16;
  const total = flightTime + flightDelay;
  const backdropDelay = fast ? 0.14 : 0.35;
  const backdropTime = fast ? 0.32 : 0.5;

  return (
    <div
      className={`intro${source === INTRO_VIDEO_FALLBACK ? '' : ' intro--alpha'}`}
      role="dialog"
      aria-modal="true"
      aria-label="AGAP Foundation intro animation"
    >
      <motion.div
        className="intro__backdrop"
        initial={false}
        animate={{ opacity: sinking ? 0 : 1 }}
        transition={{ duration: backdropTime, delay: sinking ? backdropDelay : 0, ease: 'easeInOut' }}
      />

      {source && (
        <motion.video
          key={source}
          ref={videoRef}
          className="intro__video"
          src={source}
          muted
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onEnded={() => finish(false)}
          onError={onVideoError}
          onTimeUpdate={onTimeUpdate}
          initial={false}
          animate={{ opacity: sinking ? 0 : 1 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
        />
      )}

      <motion.div
        ref={logoRef}
        className="intro__logo"
        style={{
          '--intro-logo-w': `${LOGO_IN_VIDEO.width * 100}vmin`,
          '--intro-logo-h': `${LOGO_IN_VIDEO.height * 100}vmin`,
          '--intro-logo-left': `calc(50vw - ${LOGO_IN_VIDEO.width * 50}vmin)`,
          '--intro-logo-top': `calc(50vh + ${(LOGO_IN_VIDEO.offsetY - LOGO_IN_VIDEO.height / 2) * 100}vmin)`,
        }}
        initial={false}
        animate={
          sinking
            ? { x: flight?.dx ?? 0, y: flight?.dy ?? 0, scale: flight?.scale ?? 1 }
            : { x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: flightTime, delay: sinking ? flightDelay : 0, ease: FLIGHT_EASE }}
      >
        <motion.img
          className="intro__logo-img"
          src="/logo-white-lg.png"
          alt=""
          aria-hidden="true"
          draggable="false"
          initial={false}
          animate={
            sinking
              ? { opacity: [0, 1, 1, 0] }
              : { opacity: blocked ? 1 : 0 }
          }
          transition={
            sinking
              ? { duration: total, times: [0, 0.12, 0.8, 0.92], ease: 'easeInOut' }
              : { duration: 0.2 }
          }
        />
        <motion.img
          className="intro__logo-img"
          src="/logo-blue.png"
          alt=""
          aria-hidden="true"
          draggable="false"
          initial={false}
          animate={sinking ? { opacity: [0, 0, 0, 1] } : { opacity: 0 }}
          transition={
            sinking
              ? { duration: total, times: [0, 0.78, 0.86, 0.96], ease: 'easeInOut' }
              : { duration: 0.2 }
          }
        />
      </motion.div>

      <AnimatePresence>
        {!sinking && (
          <motion.button
            type="button"
            className="intro__skip"
            onClick={() => finish(true)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ duration: 0.4, delay: 0.25 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Skip intro
            <span aria-hidden="true">&rarr;</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!sinking && blocked && (
          <motion.button
            type="button"
            className="intro__play"
            onClick={play}
            initial={{ opacity: 0, x: '-50%', y: 10 }}
            animate={{ opacity: 1, x: '-50%', y: 0 }}
            exit={{ opacity: 0, x: '-50%', y: 10, transition: { duration: 0.18 } }}
            transition={{ duration: 0.35 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="intro__play-icon" aria-hidden="true" />
            Play intro
          </motion.button>
        )}
      </AnimatePresence>

      {!sinking && (
        <div className="intro__progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
      )}
    </div>
  );
}
