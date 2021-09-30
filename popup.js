let playButton = document.getElementById('playButton');
let clearButton = document.getElementById('clearButton');
let textSpeedInput = document.getElementById('textspeed')
let fontSizeInput = document.getElementById('fontsize')
let setTextSpeed = document.getElementById('setTextSpeed') 
let setFontSize = document.getElementById('setFontSize')
let pauseButton = document.getElementById('pauseButton');
let outputBox = document.getElementById('output');
let saveRadioButton = document.getElementById('save-radio-button')
let wordRadio = document.getElementById('word')
let letterRadio = document.getElementById('letter')
let saveAllButton = document.getElementById('save-all-button')
var optionsButton = document.getElementById("options-button");
var optionsContainer = document.getElementById('options-container');
var paused = false;
var timer
var speed = 300
var fontSize = 30
let splitBy
let text
chrome.storage.sync.get('speed', (data => {
  if (typeof data.speed !== 'undefined') speed = data.speed
  textSpeedInput.value = speed
}))
chrome.storage.sync.get('fontSize', (data => {
  if (typeof data.fontSize !== 'undefined') fontSize = data.fontSize
  fontSizeInput.value = fontSize
  outputBox.style.fontSize = fontSize + "px"
}))
chrome.storage.sync.get('splitBy', (data => {
  if (typeof data.splitBy !== 'undefined') splitBy = data.splitBy
  splitBy == "" ? letterRadio.checked = true : wordRadio.checked = true
}))
setFontSize.onclick = () => {
  temp = parseInt(fontSizeInput.value)
  if (temp){
      fontSize = temp
  }
  chrome.storage.sync.set({fontSize})
  outputBox.style.fontSize = fontSize + "px"
}
setTextSpeed.onclick = () => {
  temp = parseInt(textSpeedInput.value)
  if (temp){
      speed = temp
  }
  chrome.storage.sync.set({speed})
}
saveRadioButton.onclick = () => {
  splitBy = wordRadio.checked ? " " : ""
  chrome.storage.sync.set({splitBy})
}
saveAllButton.onclick = () => {
  temp = parseInt(fontSizeInput.value)
  if (temp){
      fontSize = temp
  }
  chrome.storage.sync.set({fontSize})
  temp = parseInt(textSpeedInput.value)
  if (temp){
      speed = temp
  }
  chrome.storage.sync.set({speed})

  splitBy = wordRadio.checked ? " " : ""
  chrome.storage.sync.set({splitBy})
}
pauseButton.onclick = () => paused = true
function getSelectedText() {
  let selectedText = window.getSelection().toString()
  if (selectedText=='undefined' || selectedText.length<2) selectedText = ''
  chrome.storage.sync.set({selectedText})
}
function playText() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: getSelectedText,
    })
    setTimeout(function(){
      chrome.storage.sync.get('selectedText', (data) => {
        console.log(data.selectedText) 
        if (splitBy == 'undefined'){
          text = data.selectedText.split(" ")
        } else {
          text = data.selectedText.split(splitBy)
        }
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
            speed
            );
          })
  }, 0);
  })
}

playButton.onclick = function() {
  if (paused) {
    paused = false} 
    else{
      playText()
    }
  }
optionsButton.addEventListener("click", function() {
  this.classList.toggle("active");
  if (optionsContainer.style.display === "block") {
    optionsContainer.style.display = "none";
    } else {
    optionsContainer.style.display = "block";
    }
});

outputBox.onload = playText()