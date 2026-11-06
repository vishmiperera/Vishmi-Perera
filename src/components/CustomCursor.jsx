import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Disable custom cursor for touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 992) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let animId;
    let hasMoved = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        followerX = mouseX;
        followerY = mouseY;
        document.body.classList.add('cursor-active');
      }

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const render = () => {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;

      if (followerRef.current) {
        followerRef.current.style.left = `${followerX}px`;
        followerRef.current.style.top = `${followerY}px`;
      }

      animId = requestAnimationFrame(render);
    };

    // Smooth delegation for interactive hover targets
    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], .btn, .card, .service-card, .tool-card, .filter-btn, .social-icon-btn, .stamp-badge, .nav-link, .nav-action-btn, .theme-swatch, .interactive-target, [data-cursor="hover"]';

    const onMouseOver = (e) => {
      if (e.target && e.target.closest && e.target.closest(interactiveSelector)) {
        document.body.classList.add('cursor-hover');
      }
    };

    const onMouseOut = (e) => {
      const currentTarget = e.target && e.target.closest ? e.target.closest(interactiveSelector) : null;
      if (currentTarget) {
        const nextTarget = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest(interactiveSelector) : null;
        if (!nextTarget) {
          document.body.classList.remove('cursor-hover');
        }
      }
    };

    const onMouseDown = () => document.body.classList.add('cursor-down');
    const onMouseUp = () => document.body.classList.remove('cursor-down');

    const onMouseLeaveWindow = () => document.body.classList.remove('cursor-active');
    const onMouseEnterWindow = () => {
      if (hasMoved) {
        document.body.classList.add('cursor-active');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow);
    document.documentElement.addEventListener('mouseenter', onMouseEnterWindow);

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', onMouseEnterWindow);
      cancelAnimationFrame(animId);
      document.body.classList.remove('cursor-active', 'cursor-hover', 'cursor-down');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}

