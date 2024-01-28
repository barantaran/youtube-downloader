chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if (changeInfo && changeInfo.status == "complete"){
    chrome.tabs.sendMessage(tabId, { urlChanged: true });
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  chrome.tabs.sendMessage(details.tabId, { urlChanged: true });
});