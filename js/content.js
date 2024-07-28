// content.js
console.log('Content script loaded');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'play') {
    // Implement play logic
    console.log('Playing media');
    // Example: document.querySelector('video').play();
  } else if (message.action === 'pause') {
    // Implement pause logic
    console.log('Pausing media');
    // Example: document.querySelector('video').pause();
  }
});