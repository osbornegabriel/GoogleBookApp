var infoCheck;
var secureContent;
var validSearch;
var scrollTop;
var catalog = new SearchCatalog();
var listeners = new Listeners();

$(document).ready(function(){
  listeners.setListeners();
})

scrollTop = function(){
  $(window).scrollTop(0);
}

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