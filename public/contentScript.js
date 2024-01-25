chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
function addButton() {
    console.log("Adding button");
    const existingButton = document.getElementById('subscribe-button');
    const downloadButton = document.getElementById('downloadButton');
    const buttonContainer = document.querySelector('.ytd-menu-renderer');
    
    if (existingButton && buttonContainer) {
      if (!downloadButton) {
        const newButton = document.createElement('button');
        newButton.id = 'downloadButton';
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
  };
  setTimeout(window.onload = addButton, 3000)
});


