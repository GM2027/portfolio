// 푸터 연도 자동 표시
 document.getElementById('year').textContent = new Date().getFullYear();

// 원하는 이메일 주소로 바꾸면 방문자의 기본 메일 앱에서 문의 초안을 만들 수 있습니다.
const recipientEmail = 'YOUR_EMAIL@example.com';
const contactForm = document.getElementById('contact-form');
const statusText = document.getElementById('form-status');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  if (recipientEmail === 'YOUR_EMAIL@example.com') {
    statusText.textContent = '먼저 script.js에서 YOUR_EMAIL@example.com을 본인의 이메일로 변경하세요.';
    return;
  }

  const sender = document.getElementById('sender').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`[포트폴리오 문의] ${sender}`);
  const body = encodeURIComponent(`보낸 사람: ${sender}\n회신 이메일: ${email}\n\n${message}`);
  statusText.textContent = '이메일 앱에서 내용을 확인하고 직접 전송해 주세요.';
  window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
});
