(function(){
  const form = document.getElementById('contactForm');
  if(!form) return; // nothing to do

  // Ensure there's a message box; create if missing
  let msgBox = document.getElementById('formMessage');
  if(!msgBox){
    msgBox = document.createElement('div');
    msgBox.id = 'formMessage';
    msgBox.setAttribute('aria-live','polite');
    form.parentNode.insertBefore(msgBox, form.nextSibling);
  }

  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  function showMessage(text, type){
    msgBox.textContent = text;
    msgBox.className = '';
    if(type === 'success') msgBox.classList.add('success');
    if(type === 'error') msgBox.classList.add('error');
  }

  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = (form.name && form.name.value) ? form.name.value.trim() : '';
    const email = (form.email && form.email.value) ? form.email.value.trim() : '';
    const subject = (form.subject && form.subject.value) ? form.subject.value.trim() : '';
    const message = (form.message && form.message.value) ? form.message.value.trim() : '';

    if(!name || !email || !subject || !message){
      showMessage('Please complete all fields.', 'error');
      return;
    }
    if(!validateEmail(email)){
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // No backend: simulate success
    showMessage('Thanks, ' + (name.split(' ')[0] || '') + '! Your message has been recorded locally.', 'success');
    form.reset();
  });
})();