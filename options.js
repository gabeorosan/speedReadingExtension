let page = document.getElementById("buttonDiv");
let saveButton = document.getElementById("save-button")
let textSpeedInput = document.getElementById('textspeed')
let fontSizeInput = document.getElementById('fontsize')
let setTextSpeed = document.getElementById('setTextSpeed')
let setFontSize = document.getElementById('setFontSize')
let fontSize = 30
let speed = 300
let temp
setFontSize.onclick = () => {
    temp = parseInt(fontSizeInput.value)
    if (temp){
        fontSize = temp
    }
    chrome.storage.sync.set({fontSize})
}
setTextSpeed.onclick = () => {
    temp = parseInt(textSpeedInput.value)
    if (temp){
        speed = temp
    }
    chrome.storage.sync.set({speed})
}
saveButton.onclick = () => {
    temp = parseInt(fontSizeInput.value)
    if (temp){
        fontSize = temp
    }
    temp = parseInt(textSpeedInput.value)
    if (temp){
        speed = temp
    }
    chrome.storage.sync.set({fontSize, speed})
}
