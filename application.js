var bookSearch;
var showBookInfo;
var formatBookInfo;
var resetResults;
var searchListeners;

$(document).ready(function(){
  searchListeners();
})

searchListeners = function(){
  $('#button').on('click', function(e){
    bookSearch();
  })
  $('#search').on('keypress',function(e){
    if(e.which == 13){
      bookSearch();
    }
  })
}

bookSearch = function(){
  var search = $('#search').val();
  $.ajax({
    method: 'GET',
    url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
    datatype: "json"
  }).done(function(response){
    resetResults();
    showBookInfo(response);
  })
}

resetResults = function(){
  $('#results').text('');
}

showBookInfo = function(bookList){
  var itemInfo;
  for(i = 0; i < bookList.items.length; i++){
    itemInfo = bookList.items[i].volumeInfo;
    $('#results').append(formatBookInfo(itemInfo));
  }
}

formatBookInfo = function(item){
  var info = "<div class='book-info'>"
  info += "<h3><span class='title'>" + item.title + "</span></h3>";
  info += "<p><strong>Author:</strong> " + item.authors;
  info += "<br><strong>Publisher:</strong> " + item.publisher;
  info += "<br><a target='_blank' href='" + item.infoLink + "'>";
  info += "<br><img class='thumbnail' src='" + item.imageLinks.smallThumbnail + "'></a>";
  info += "</p></div>";
  return info;
}
