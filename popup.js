document.addEventListener('DOMContentLoaded', function() {
  const speedSelect = document.getElementById('speedSelect');
  const customSpeedContainer = document.getElementById('customSpeedContainer');
  const customSpeed = document.getElementById('customSpeed');
  const applySpeedButton = document.getElementById('applySpeed');
  const applyCustomSpeedButton = document.getElementById('applyCustomSpeed');
  const statusElement = document.getElementById('status');
  
  // Load saved speed from storage
  chrome.storage.local.get('savedSpeed', function(result) {
    if (result.savedSpeed) {
      // If the saved speed is one of our presets
      const option = Array.from(speedSelect.options).find(opt => opt.value === result.savedSpeed.toString());
      if (option) {
        speedSelect.value = result.savedSpeed;
      } else {
        // If it's a custom value
        speedSelect.value = 'custom';
        customSpeedContainer.style.display = 'flex';
        customSpeed.value = result.savedSpeed;
      }
    }
  });
  
  // Check if we're on YouTube
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    if (currentTab && currentTab.url && currentTab.url.includes('youtube.com')) {
      statusElement.textContent = 'Connected to YouTube';
      statusElement.style.color = '#0a0';
    } else {
      statusElement.textContent = 'Not connected to YouTube';
      statusElement.style.color = '#c00';
    }
  });
  
  // Show/hide custom speed input when "Custom..." is selected
  speedSelect.addEventListener('change', function() {
    if (speedSelect.value === 'custom') {
      customSpeedContainer.style.display = 'flex';
      // Get the last non-custom speed as the default for custom input
      chrome.storage.local.get('lastNonCustomSpeed', function(result) {
        if (result.lastNonCustomSpeed) {
          customSpeed.value = result.lastNonCustomSpeed;
        }
      });
    } else {
      customSpeedContainer.style.display = 'none';
      // Save the current selected speed as the last non-custom speed
      chrome.storage.local.set({lastNonCustomSpeed: speedSelect.value});
    }
  });
  
  // Apply selected speed
  applySpeedButton.addEventListener('click', function() {
    let speedValue = speedSelect.value;
    
    if (speedValue === 'custom') {
      speedValue = customSpeed.value;
    }
    
    applySpeedToYouTube(parseFloat(speedValue));
  });
  
  // Apply custom speed
  applyCustomSpeedButton.addEventListener('click', function() {
    applySpeedToYouTube(parseFloat(customSpeed.value));
  });
  
  function applySpeedToYouTube(speed) {
    // Save the speed for next time
    chrome.storage.local.set({savedSpeed: speed});
    
    // Send message to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "setPlaybackSpeed", speed: speed})
        .then(response => {
          if (response && response.success) {
            statusElement.textContent = `Speed set to ${speed}x`;
            statusElement.style.color = '#0a0';
          } else {
            statusElement.textContent = 'Error setting speed';
            statusElement.style.color = '#c00';
          }
        })
        .catch(error => {
          statusElement.textContent = 'Error: No video found';
          statusElement.style.color = '#c00';
        });
    });
  }
});