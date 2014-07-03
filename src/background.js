var sfw = "sfw"
var nsfw = "nsfw"

function opposite(result) {
	if(result["state"] != sfw) {
		newState = sfw
		bgcolor = "#00AA00"
	}
	else {
		newState = nsfw
		bgcolor = "#DD0000"
	}
	chrome.browserAction.setBadgeText({text: newState})
	chrome.browserAction.setBadgeBackgroundColor({color: bgcolor})
	chrome.storage.local.set({state: newState})
}

function toggle() {
	chrome.storage.local.get("state", opposite)
}

chrome.browserAction.onClicked.addListener(toggle)
toggle();