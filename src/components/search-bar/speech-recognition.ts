let recognition;

function upgrade() {
  // start_button.style.visibility = 'hidden';
  console.warn('Upgrade your browser');
}

function dtSpeechRecognition() {
  if (recognition) {
    return recognition;
  }

  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
    return;
  }
  // @ts-ignore
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  return recognition;
}

export {
  dtSpeechRecognition
}
