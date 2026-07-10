(() => {
  const sources = [
    'hero', 'community', 'supported', 'senior', 'home'
  ].map(name => `https://cdn.jsdelivr.net/gh/toufikghafir13-bit/evercare-support-services@f0abfcd7bb043991abf51ebf3d805c407fac2646/assets/photo-${name}.js`);

  Promise.all(sources.map(src => new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = resolve;
    document.head.appendChild(script);
  }))).then(() => {
    const photos = window.EVERCARE_PHOTOS || {};
    document.querySelectorAll('[data-service-photo]').forEach(img => {
      const photo = photos[img.dataset.servicePhoto];
      if (photo) img.src = photo;
    });
  });
})();
