chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.urlChanged) {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          addButton();
          break;
        }
      }
    });

    // Start observing changes to the entire document body
    observer.observe(document.body, { childList: true, subtree: true });
  }
});

function addButton() {
  console.log("Adding button");
  // ... existing code ...
  console.log("Button added");
  const existingButton = document.getElementById('subscribe-button');
  const downloadButton = document.getElementById('downloadButton');
  const buttonContainer = document.querySelector('.ytd-menu-renderer');
  
  if (existingButton && buttonContainer && !downloadButton) {
    const newButton = document.createElement('button');
    newButton.id = 'downloadButton';
    // Applying styles to the button
    newButton.style.backgroundColor = '#f67474';
    newButton.style.cursor = 'pointer'
    newButton.style.borderRadius = '17px';
    newButton.style.padding = '2px 25px';
    newButton.style.margin = '10px';
    newButton.style.borderStyle = 'none';
    newButton.style.color = 'white';
    newButton.style.fontFamily = 'sans-serif';
    newButton.style.fontWeight = '800';
    newButton.textContent = 'Download Video';
    newButton.addEventListener('click', async () => {
      const videoUrl = window.location.href; // URL текущей страницы YouTube
      
      try {
        const response = await fetch('https://co.wuk.sh/api/json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            url: encodeURI(videoUrl),
            vQuality: 'max',
            filenamePattern: 'basic',
            isAudioOnly: false,
            disableMetadata: true,
          }),
        });
      
        if (response.ok) {
          const responseData = await response.json();
          if (responseData && responseData.url) {
            location.href = responseData.url;
          } else {
            throw new Error('No URL found');
          }
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error(error);
      }          
    });

    buttonContainer.appendChild(newButton);
  }
}
