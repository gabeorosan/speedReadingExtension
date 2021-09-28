let playButton = document.getElementById('playButton');
let clearButton = document.getElementById('clearButton');
let textSpeedInput = document.getElementById('textspeed')
let fontSizeInput = document.getElementById('fontsize')
let setTextSpeed = document.getElementById('setTextSpeed') 
let setFontSize = document.getElementById('setFontSize')
let pauseButton = document.getElementById('pauseButton');
let outputBox = document.getElementById('output');
let wordRadio = document.getElementById('word')
let popoutButton = document.getElementById('popout-button')
var paused = false;
var timer
var textspeed = 300
popoutButton.onclick = () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('popout.html'),
    active: false,
    
}, function(tab) {
    // After the tab has been created, open a window to inject the tab
    chrome.windows.create({
        tabId: tab.id,
        type: 'popup',
        focused: true,
        height: 500,
        width: 500,
        left: 0,
        // incognito, top, left, ...
    });
});
}
pauseButton.onclick = () => paused = true
clearButton.onclick = () => {
  clearInterval(timer)
  paused = false
}
setFontSize.onclick = () => outputBox.style.fontSize = parseInt(fontSizeInput.value) + "px"
setTextSpeed.onclick = () => textspeed = parseInt(textSpeedInput.value)
playButton.onclick = function() {
  if (paused) {
    paused = false} 
  else{
    chrome.storage.sync.get( "selectedText", ({ selectedText }) => {

      let text = wordRadio.checked ? selectedText.split(" ") : selectedText.split('')
      let wordIndex = 0
      timer = setInterval(
        () => 
        {
          if (!paused){
            wordIndex + 1 > text.length ? clearInterval(timer) : (
              outputBox.textContent = text[wordIndex],
              wordIndex++
            )
          }
        },
        textspeed
      );

        } );

      }}
