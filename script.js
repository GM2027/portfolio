// 포트폴리오 v3: 기존 앵커 메뉴, 문의 폼 기능 유지 + 모바일 메뉴/스크롤 효과
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// 모바일 메뉴
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '메뉴 열기');
  }));
}

// 스크롤 시 부드럽게 등장. 모션 축소 설정이거나 미지원 환경이면 즉시 표시.
const revealItems = document.querySelectorAll('.reveal');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach(item => observer.observe(item));
}

// 개인 이메일을 공개하지 않으려면 기본 placeholder를 유지하세요.
// 아래 이메일을 변경하면 브라우저에서 사용자의 메일 앱을 열어 초안을 만듭니다.
const recipientEmail = 'YOUR_EMAIL@example.com';
const contactForm = document.getElementById('contact-form');
const statusText = document.getElementById('form-status');
if (contactForm && statusText) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    if (recipientEmail === 'YOUR_EMAIL@example.com') {
      statusText.textContent = '문의 기능을 사용하려면 script.js의 받는 사람 주소를 먼저 설정해야 합니다.';
      return;
    }
    const sender = document.getElementById('sender').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = encodeURIComponent(`[포트폴리오 문의] ${sender}`);
    const body = encodeURIComponent(`보낸 사람: ${sender}\n회신 이메일: ${email}\n\n${message}`);
    statusText.textContent = '이메일 앱에서 내용을 확인한 뒤 직접 전송해 주세요.';
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  });
}
