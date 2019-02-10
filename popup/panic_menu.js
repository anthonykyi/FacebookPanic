/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {

    function callScript(command, tabs) {
      browser.tabs.sendMessage(tabs[0].id, { command });
    }
    
    function deletePosts(tabs) {
      callScript('deletePosts', tabs)
    }
    
    function unfollowPages(tabs) {
      callScript('unfollowPages', tabs)
    }
    
    function hideFeed(tabs) {
      callScript('hideFeed', tabs)
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not panic: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    if (e.target.classList.contains("delete-posts")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(deletePosts)
        .catch(reportError);
    }
    else if (e.target.classList.contains("unfollow-pages")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(unfollowPages)
        .catch(reportError);
    }
    else if (e.target.classList.contains("hide-feed")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(hideFeed)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute panic button content script: ${error}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/panic.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);