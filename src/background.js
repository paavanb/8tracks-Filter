var icon_filter_off = {"19": "img/19_filter_off.png",
					  "38": "img/38_filter_off.png"}

var icon_filter_on = {"19": "img/19_filter_on.png",
					 "38": "img/38_filter_on.png"}
// make it easy to set the icon
icon = {"on": icon_filter_on, "off": icon_filter_off}

function initialize() {
	chrome.storage.local.set(({state: "on"}))
}

function setIcon(tabId) {
	chrome.storage.local.get("state", function (result) {
		chrome.pageAction.setTitle({tabId: tabId, title: "8tracks Filter " + result["state"]})

		chrome.pageAction.setIcon({tabId: tabId, path: icon[result["state"]]})
	})
}

function checkValidUrl(tabId, changeInfo, tab) {
  if(tab.url.indexOf("8tracks.com") > 0) {
    chrome.pageAction.show(tabId)
    // need to reset the icon to reflect the state
    setIcon(tabId);
  }
}

function toggle(tab) {
  	chrome.storage.local.get("state", function (result) {
  					newState = ""
					if(result["state"] == "on") {
					  newState = "off"
					} else {
					  newState = "on"
					}
					//update the little tooltip to reflect current state
					chrome.pageAction.setTitle({tabId: tab.id, title: "8tracks Filter " + newState})
					//so that we update the page with the new filter settings
					chrome.tabs.reload()
					//store the state of the new filter settings so we remember across browser sessions
					chrome.storage.local.set({state: newState})
})
}

chrome.runtime.onInstalled.addListener(initialize);

chrome.tabs.onUpdated.addListener(checkValidUrl);
chrome.pageAction.onClicked.addListener(toggle);