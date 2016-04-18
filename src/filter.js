function filter() {
  chrome.storage.local.get("state", function(result) {
      if(result["state"] == "on") {
          $("img.cover").remove()
      }
  });
}
// Make sure that when we navigate the site (which doesn't refresh the page), the filter is still run
$('#body_container').bind('DOMSubtreeModified',filter);
filter();
