
function getSelectedText() {
  let selectedText = window.getSelection().toString()
  chrome.storage.sync.set({selectedText})
}
chrome.commands.onCommand.addListener(function(command, tab) {
  console.log("Command:", command);
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: getSelectedText,
  });
  let url = 'popout.html'
  let tabId
  chrome.windows.getAll({ populate: true }).then((windows) => {
   
      for (let i = 0; i < windows.length; i++){
      console.log(windows[i].tabs)
      for(let j = 0; j < windows[i].tabs.length; j++){
        console.log(windows[i].tabs[j].url)
        if(windows[i].tabs[j].url.includes(url)) {
          console.log(windows[i].tabs[j].id)
          return windows[i].tabs[j].id
        }
      }
    }
    return 0
  }).then((tabId) => {
    console.log(tabId)
    if (tabId) {
      chrome.tabs.remove(tabId, function(){});
    }
      chrome.tabs.create({
        url: chrome.runtime.getURL(url),
        active: false,
    }, function(tab) {
        chrome.windows.create({
            tabId: tab.id,
            type: 'popup',
            focused: true,
            height: 250,
            width: 500,
            left: 0,
            // incognito, top, left, ...
        });
      })
  })
  })