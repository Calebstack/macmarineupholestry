const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const comparison = document.querySelector('.comparison');
const comparisonRange = document.querySelector('.comparison-range');
const aboutVideo = document.querySelector('.about-video');
const videoSoundToggle = document.querySelector('.video-sound-toggle');
const galleryLightbox = document.querySelector('.gallery-lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const galleryItems = [...document.querySelectorAll('.gallery-item')];
let activeGalleryIndex = 0;

const showGalleryPhoto = (index) => {
  activeGalleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeGalleryIndex];
  const image = item.querySelector('img');
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
};

galleryItems.forEach((item, index) => {
  const imageButton = item.querySelector('.gallery-art');
  imageButton.setAttribute('role', 'button');
  imageButton.setAttribute('tabindex', '0');
  imageButton.setAttribute('aria-label', `View project photo ${index + 1}`);
  imageButton.style.setProperty('--reveal-delay', `${(index % 4) * 65}ms`);
  imageButton.addEventListener('click', () => {
    showGalleryPhoto(index);
    galleryLightbox.showModal();
  });
  imageButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      imageButton.click();
    }
  });
});

document.querySelector('.lightbox-close').addEventListener('click', () => galleryLightbox.close());
document.querySelector('.lightbox-previous').addEventListener('click', () => showGalleryPhoto(activeGalleryIndex - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => showGalleryPhoto(activeGalleryIndex + 1));
galleryLightbox.addEventListener('click', (event) => {
  if (event.target === galleryLightbox) galleryLightbox.close();
});
galleryLightbox.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') galleryLightbox.close();
  if (event.key === 'ArrowLeft') showGalleryPhoto(activeGalleryIndex - 1);
  if (event.key === 'ArrowRight') showGalleryPhoto(activeGalleryIndex + 1);
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  document.querySelectorAll('.section-kicker, .about-copy, .about-video-wrap, .services-heading, .service-row, .transformation-heading, .comparison, .gallery-heading, .gallery-item, .contact-heading, .contact-form, .map-column').forEach((target, index) => {
    target.classList.add('reveal-target');
    target.style.setProperty('--reveal-delay', `${(index % 3) * 75}ms`);
    revealObserver.observe(target);
  });
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
  navigation.inert = isOpen;
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
    navigation.inert = true;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
    navigation.inert = true;
    menuButton.focus();
  }
});

navigation.inert = window.matchMedia('(max-width: 620px)').matches;

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelector('#current-year').textContent = new Date().getFullYear();

comparisonRange.addEventListener('input', () => {
  comparison.style.setProperty('--split', `${comparisonRange.value}%`);
});

videoSoundToggle.addEventListener('click', () => {
  aboutVideo.muted = !aboutVideo.muted;
  videoSoundToggle.setAttribute('aria-pressed', String(!aboutVideo.muted));
  videoSoundToggle.setAttribute('aria-label', aboutVideo.muted ? 'Turn shop video sound on' : 'Turn shop video sound off');
  videoSoundToggle.setAttribute('title', aboutVideo.muted ? 'Turn sound on' : 'Turn sound off');
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const details = new FormData(contactForm);
  const subject = `Upholstery enquiry from ${details.get('name')}`;
  const body = [
    `Name: ${details.get('name')}`,
    `Email: ${details.get('email')}`,
    `Project: ${details.get('project')}`,
    '',
    details.get('message')
  ].join('\n');
  const emailLink = document.createElement('a');
  emailLink.href = `mailto:macmarineupholstery@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  emailLink.textContent = 'Open your email app to send this enquiry.';
  formStatus.replaceChildren(emailLink);
});