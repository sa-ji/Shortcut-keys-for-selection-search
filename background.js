chrome.commands.onCommand.addListener(function(command) {
    if (command == "search_selection_in_Google_1Foreground") {
    openSearchTab(baseURL_bef="https://www.google.com/search?q=", baseURL_aft="",  f_Active=true);
  }
  else if (command == "search_selection_in_Google_2Background") {
    openSearchTab(baseURL_bef="https://www.google.com/search?q=", baseURL_aft="",  f_Active=false);
  }
});

function openSearchTab(baseURL_bef, baseURL_aft="", f_Active){
  chrome.tabs.executeScript(null, {
    'code': 'encodeURI( document.selection ? document.selection.createRange().text\
              : window.getSelection ? window.getSelection()\
              : document.getSelection ? document.getSelection()\
              : "" );'
    },
    function(results) {
      if(!results)
        return false
      var searchString = decodeURI(results[0]);
      var searchURL = baseURL_bef + searchString + baseURL_aft;
      chrome.tabs.create({
        'url':searchURL,
        'active':f_Active
      });
    }    
  )
  return true
}