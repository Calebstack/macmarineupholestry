const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const comparison = document.querySelector('.comparison');
const comparisonRange = document.querySelector('.comparison-range');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  }
});

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelector('#current-year').textContent = new Date().getFullYear();

comparisonRange.addEventListener('input', () => {
  comparison.style.setProperty('--split', `${comparisonRange.value}%`);
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