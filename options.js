let page = document.getElementById("buttonDiv");
let saveRadioButton = document.getElementById("save-radio-button")
let textSpeedInput = document.getElementById('textspeed')
let fontSizeInput = document.getElementById('fontsize')
let setTextSpeed = document.getElementById('setTextSpeed')
let setFontSize = document.getElementById('setFontSize')
var output = document.getElementById("demo");
let wordRadio = document.getElementById('word')

let fontSize = 30
let speed = 300
let splitBy = ''
let temp = 0
chrome.storage.sync.get('speed', (data => {
    if (typeof data.speed !== 'undefined') speed = data.speed
}))
chrome.storage.sync.get('fontSize', (data => {
    if (typeof data.fontSize !== 'undefined') fontSize = data.fontSize
}))
chrome.storage.sync.get('splitBy', (data => {
    if (typeof data.splitBy !== 'undefined') splitBy = data.splitBy
}))
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
saveRadioButton.onclick = () => {
    splitBy = wordRadio.checked ? " " : ""
    chrome.storage.sync.set({splitBy})
}
