let playButton = document.getElementById('playButton');
let fontSizeInput = document.getElementById('fontsize')
let setFontSize = document.getElementById('setFontSize')
let pauseButton = document.getElementById('pauseButton');
let outputBox = document.getElementById('output');
let wordRadio = document.getElementById('word')
var paused = false;
var timer
pauseButton.onclick = () => paused = true
setFontSize.onclick = () => outputBox.style.fontSize = parseInt(fontSizeInput.value) + "px"
playButton.onclick = function() {
  if (paused) {
    paused = false} 
  else{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript( tabs[0].id, {code:"var x = window.getSelection().toString(); x"},
    function(results){ 

      let text = wordRadio.checked ? results[0].split(" ") : results[0].split('')
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
        200
      );

        } );

}, 
    ) }
};
