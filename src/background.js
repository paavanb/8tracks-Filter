var icon_filter_off = {
    "19": "img/filter_off_19.png",
    "38": "img/filter_off_38.png"
}

var icon_filter_on = {
    "19": "img/filter_on_19.png",
    "38": "img/filter_on_38.png"
}

// make it easy to set the icon
icon = {"on": icon_filter_on, "off": icon_filter_off}

function initialize() {
    chrome.storage.local.set(({state: "on"}))
}

function setIcon(tabId) {
    chrome.storage.local.get("state", function (result) {
        chrome.pageAction.setTitle({tabId: tabId, title: "8tracks filter " + result["state"]})

        chrome.pageAction.setIcon({tabId: tabId, path: icon[result["state"]]})
    })
}

function checkValidUrl(tab) {
    if(tab.url.indexOf("8tracks.com") > 0) {
        chrome.pageAction.show(tab.id)
        // need to reset the icon to reflect the state
        setIcon(tab.id);
    }
}


//for the onUpdated listener
function checkValidUrlUpdated(tabId, changeInfo, tab) {
    checkValidUrl(tab)
}

//for the onReplaced listener (in case page is loaded from cache)
function checkValidUrlReplaced(addedTabId, removedTabId) {
    chrome.tabs.get(addedTabId, checkValidUrl)
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

chrome.tabs.onUpdated.addListener(checkValidUrlUpdated);
chrome.tabs.onReplaced.addListener(checkValidUrlReplaced);
chrome.pageAction.onClicked.addListener(toggle);
