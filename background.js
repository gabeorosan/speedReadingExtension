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
});

