var infoCheck;
var secureContent;
var validSearch;
var catalog = new SearchCatalog();
var listeners = new Listeners();

$(document).ready(function(){
  // catalog.setActiveSearch();
  listeners.setListeners();
})

infoCheck = function(info){
  return info ? info : "Not Available";
}

secureContent = function(webAddress){
  return webAddress.replace("http://", "https://");
}

validSearch = function(search){
  var re = /\S/;
  return re.test(search);
}