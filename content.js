chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "setPlaybackSpeed") {
    const videos = document.querySelectorAll('video');
    if (videos.length > 0) {
      videos.forEach(video => {
        video.playbackRate = message.speed;
      });
      sendResponse({success: true, speed: message.speed});
    } else {
      // Try to inject directly if no videos found (sometimes YouTube loads videos dynamically)
      const script = document.createElement('script');
      script.textContent = `
        const videos = document.querySelectorAll('video');
        if (videos.length > 0) {
          videos.forEach(video => {
            video.playbackRate = ${message.speed};
          });
        }
      `;
      document.head.appendChild(script);
      script.remove();
      sendResponse({success: true, speed: message.speed});
    }
  }
  return true; // Keep the message channel open for async response
});