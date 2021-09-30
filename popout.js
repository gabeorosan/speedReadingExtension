let playButton = document.getElementById('playButton');
let pauseButton = document.getElementById('pauseButton');
let outputBox = document.getElementById('output');
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