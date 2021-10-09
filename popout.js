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

        chrome.storage.sync.get("splitBy", ({splitBy}) => {
          if (splitBy == 'undefined'){
            //replace new line characters
            
            while (selectedText.match(/[\r\n]+/)) selectedText=selectedText.replace(/[\r\n]+/, ' ');
            text = selectedText.split(" ")
          } else {
            //replace new line characters
            while (selectedText.match(/[\r\n]+/)) selectedText=selectedText.replace(/[\r\n]+/, ' ');
            text = selectedText.split(splitBy)
          }
          // for (let i = 0; i<selectedText.length; i++){
          //   console.log(selectedText[i].charCodeAt(0) + selectedText[i])
          // }
          // console.log(selectedText)
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