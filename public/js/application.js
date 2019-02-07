var searchListeners;
var apiCall;
var infoCheck;
var secureContent;
var validSearch;


$(document).ready(function(){
  setActiveSearch();
  searchListeners();
  scrollNext();
  scrollPrevious();
})

searchListeners = function(){
  $('#search-button').on('click', function(e){
    bookSearch();
  })
  $('#search').on('keypress',function(e){
    if(e.which == 13){
      bookSearch();
    }
  })
}

apiCall = function(search){
  return $.ajax({
    method: 'GET',
    url: "https://www.googleapis.com/books/v1/volumes?q=" + searchFormat() + styleSearch(search) + resultsIndex(),
    datatype: "json"
  })
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