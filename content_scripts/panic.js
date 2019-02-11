(function() {
  
  // /**
  //  * Check and set a global guard variable.
  //  * If this content script is injected into the same page again,
  //  * it will do nothing next time.
  //  */
  // if ( window.hasRun ) {
  //   return;
  // }
  // window.hasRun = true;

  function logOffFacebook() {
    FB.logout(function(response) {
   // Person is now logged out
});
  
  function deletePosts() {
    
    function selectCurrentlyVisiblePosts() {
      document.querySelectorAll("#pagelet_main_column_personal #timeline_overview  a button");
    }
    
  }

  function unfollowPages() {

    // do the thing
    alert("Not Yet Implemented");
  }

  function hideFeed() {

    // do the thing
    alert("Not Yet Implemented");
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "deletePosts") {
      // deletePosts();
    } else if (message.command === "unfollowPages") {
      unfollowPages();
    } else if (message.command === "hideFeed") {
      hideFeed();
    }
  });

})();
