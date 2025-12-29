document.addEventListener('DOMContentLoaded', () => {
  function toggleCode(id) {
    const block = document.getElementById(id);
    block.style.display = block.style.display === "block" ? "none" : "block";
  }
  window.toggleCode = toggleCode;

  const supportsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal for header, cards, and about
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('header, .card, .about, .nav').forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    observer.observe(el);
  });

  // Hero blob parallax interaction (pointer move) — respects reduced motion
  if (!supportsReducedMotion) {
    const hero = document.getElementById('hero');
    const blobGroup = document.querySelector('.blob-group');
    if (hero && blobGroup) {
      hero.addEventListener('pointermove', (e) => {
        const rect = hero.getBoundingClientRect();
        const mx = (e.clientX - rect.left) / rect.width - 0.5;
        const my = (e.clientY - rect.top) / rect.height - 0.5;
        const tx = mx * 20;
        const ty = my * 12;
        blobGroup.style.transform = `translate(${tx}px, ${ty}px)`;
      });
      hero.addEventListener('pointerleave', () => {
        blobGroup.style.transform = '';
      });
    }
  }
});
