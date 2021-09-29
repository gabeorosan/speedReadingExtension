let playButton = document.getElementById('playButton');
let clearButton = document.getElementById('clearButton');
let textSpeedInput = document.getElementById('textspeed')
let fontSizeInput = document.getElementById('fontsize')
let setTextSpeed = document.getElementById('setTextSpeed') 
let setFontSize = document.getElementById('setFontSize')
let pauseButton = document.getElementById('pauseButton');
let outputBox = document.getElementById('output');
let wordRadio = document.getElementById('word')
var paused = false;
var timer
var textspeed = 200
var fontSize = 30
let text
chrome.storage.sync.get('speed', (data) => {
    if (typeof data.speed !== 'undefined') {
        textspeed = data.speed
    }
})
chrome.storage.sync.get('fontSize', (data) => {
    if (typeof data.fontSize !== 'undefined') {
        fontSize = data.fontSize
    }
    outputBox.style.fontSize = fontSize + "px"
})

pauseButton.onclick = () => paused = true
clearButton.onclick = () => {
    console.log(fontSize)
  clearInterval(timer)
  paused = false
}
setFontSize.onclick = () => outputBox.style.fontSize = parseInt(fontSizeInput.value) + "px"
setTextSpeed.onclick = () => textspeed = parseInt(textSpeedInput.value)
function playText() {
    chrome.storage.sync.get( "selectedText", ({ selectedText }) => {
        console.log(selectedText) 
          chrome.storage.sync.get("splitBy", ({splitBy}) => {
            if (splitBy == 'undefined'){
              text = selectedText.split(" ")
            } else {
              text = selectedText.split(splitBy)
            }
            console.log(text)
            console.log(splitBy)
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
              })
          })}
        
playButton.onclick = function() {
  if (paused) {
    paused = false} 
  else{
    playText()
    }
}
outputBox.onload = playText()