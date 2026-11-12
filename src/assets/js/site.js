(function () {
  var items = document.querySelectorAll('[data-reveal]');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();

// Scroll-Progress: haarduenne Verlaufslinie oben, scroll-synchron
(function () {
  var bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  var ticking = false;
  var update = function () {
    var d = document.documentElement;
    var max = d.scrollHeight - d.clientHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? d.scrollTop / max : 0) + ')';
    ticking = false;
  };
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();
