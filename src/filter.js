function hide_covers() {
    // Remove covers
    $(".mix_element div.cover").remove()
    // Add class so cards can be restyled
    $(".mix_card.half_card").addClass("ext-coverless_card")

    // Remove covers on track page
    $("#cover_art").remove()
    // Remove covers in the sidebar of a track page
    $(".card.sidebar_mix .cover").remove()
    $(".card.sidebar_mix").addClass("ext-coverless_card")

    // Remove covers in "suggested collections"
    $(".suggested_collection .covers").remove()
    $(".suggested_collection").addClass("ext-coverless_card")

    // Remove mini covers ("Because you liked ____")
    // Replace with 8tracks icon
    $(".card img.mini-cover")
        .replaceWith("<span class='avatar'><span class='i-logo'></span></span>")
}

function filter() {
    chrome.storage.local.get("state", function(result) {
        if(result["state"] == "on") {
            hide_covers()
        }
    });
}
// Make sure that when we navigate the site (which doesn't refresh the page), the filter is still run
var observer = new MutationObserver(filter)
observer.observe(document.getElementById("main"), {childList: true, subtree: true})
filter();
