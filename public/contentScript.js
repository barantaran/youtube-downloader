let newButton;

let isVideoPage = () => {
  let el = document.getElementById('player');
  if (!el || el.offsetParent === null) return false;
  return true;
};

function addButton() {
  console.log("Adding button");
  const existingButton = document.getElementById('subscribe-button');
  const downloadButton = document.getElementById('downloadButton');
  const youtubeHead = document.querySelector('ytd-masthead'); // Контейнер с поисковиком и логотипом YouTube

  if (existingButton && youtubeHead) {
    if (!downloadButton) {
      let buttonContainer = document.createElement('div');
      youtubeHead.appendChild(buttonContainer);
      // Check if the target element exists
      // Create a shadow root for the target element
      const shadowRoot = buttonContainer.attachShadow({ mode: 'open' });

      // Create the button element
      newButton = document.createElement('button');
      newButton.id = 'downloadButton';
      newButton.classList.add('button-30');
      newButton.addEventListener('click', async () => {
        const videoUrl = window.location.href; // URL текущей страницы YouTube

        try {
          const response = await fetch('https://co.wuk.sh/api/json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
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

      // Append the button to the shadow root
      shadowRoot.appendChild(newButton);

      // Create a style tag for the shadow root
      const style = document.createElement('style');
      style.textContent = `
    #downloadButton {
      position: absolute;
      top: 17px;
      right: 1240px;
      display: none;
}
            .button-30:hover {
              box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
              transform: translateY(-2px);

          }
          
          .button-30:focus {
              box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
          }
          .button-30 {
            background-image:url('https://cdn-icons-png.flaticon.com/256/189/189249.png');
            background-repeat: no-repeat;
            background-size: 16px;
              align-items: center;
              appearance: none;
              background-color: #FCFCFD;
              border-radius: 4px;
              border-width: 0;
              box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
              box-sizing: border-box;
              color: #36395A;
              cursor: pointer;
              display: inline-flex;
              font-family: "JetBrains Mono",monospace;
              height: 48px;
              justify-content: center;
              line-height: 1;
              list-style: none;
              overflow: hidden;
              padding-left: 16px;
              padding-right: 16px;
              position: relative;
              text-align: left;
              text-decoration: none;
              transition: box-shadow .15s,transform .15s;
              user-select: none;
              -webkit-user-select: none;
              touch-action: manipulation;
              white-space: nowrap;
              will-change: box-shadow,transform;
              font-size: 18px;
          }
          .button-30:active {
              box-shadow: #D6D6E7 0 3px 7px inset;
              transform: translateY(2px);
    }
  `;

      // Append the style to the shadow root
      shadowRoot.appendChild(style);
      // Append the button to the shadow root
      shadowRoot.appendChild(newButton);

    }
  }
}

addButton(); // Вызов функции без setTimeout

// Добавление setInterval для периодической проверки isVideoPage
setInterval(function () {
  if (isVideoPage()) {
    console.log('This is a video page');
    // let newButton = document.querySelector("#masthead").shadowRoot.querySelector("#downloadButton")
    newButton.style.display = 'block'; // Показать кнопку, если это страница с видео
  } else {
    console.log('This is not a video page');
    newButton.style.display = 'none'; // Скрыть кнопку, если это не страница с видео
  }
}, 300); // каждые 300 миллисекунд (5 минут)
