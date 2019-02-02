var bookSearch;
var showBookInfo;
var formatBookInfo;
var resetResults;
var searchListeners;
var apiCall;
var infoCheck;
var descriptionLines;
var publisherLine;
var bookInfoAndCover;
var authorLine;
var titleLine;
var bookImage;
var styleSearch;
var searchFormat;
var noResults;
var setActiveSearch;
var secureContent;


$(document).ready(function(){
  setActiveSearch();
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
  apiCall(search).done(function(response){
    resetResults();
    response.totalItems > 0 ? showBookInfo(response) : noResults(search);
  })
}

noResults = function(query){
  $('#results').append("<p>No Results Found</p>");
}

setActiveSearch = function(){
  $('.tab-link').on('click', function(e){
    $('#active-search').removeAttr('id');
    $(this).attr('id','active-search');
  })
}

apiCall = function(search){
  return $.ajax({
    method: 'GET',
    url: "https://www.googleapis.com/books/v1/volumes?q=" + searchFormat() + styleSearch(search),
    datatype: "json"
  })
}

styleSearch = function(search){
  return search.replace(' ', '+');
}

searchFormat = function(){
  var callType = $('#active-search').text();
  switch(callType){
    case 'General':
      return '';
    case 'Title':
      return 'intitle:';
    case 'Author':
      return "inauthor:";
  }
  return '';
}

resetResults = function(){
  $('#results').text('');
}

showBookInfo = function(bookList){
  var itemInfo;
  for(i = 0; i < bookList.items.length; i++){
    itemInfo = bookList.items[i].volumeInfo;
    bookBlurb = formatBookInfo(itemInfo);
    $('#results').append(bookBlurb);
  }
}

formatBookInfo = function(item){
  var info = "<div class='book-info'>"
  info += titleLine(item);
  info += descriptionLines(item);
  info += "</div>";
  return info;
}

infoCheck = function(info){
  return info ? info : "Not Available";
}

descriptionLines = function(book){
  var description = new String();
  description += authorLine(book);
  description += publisherLine(book);
  description += bookInfoAndCover(book);
  return "<p>" + description + "</p>";
}

publisherLine = function(book){
  return "<br><strong>Publisher:</strong> " + infoCheck(book.publisher);
}

bookInfoAndCover = function(book){
  return "<br><br><a target='_blank' href='" + book.infoLink + "'>" + bookImage(book) + "</a>";
}

authorLine = function(book){
  return "<strong>Author:</strong> " + infoCheck(book.authors);
}

titleLine = function(book){
  var title = infoCheck(book.title);
  return "<h3><span class='title'>" + title + "</span></h3>"
}

bookImage = function(book){
  var link = book.imageLinks;
  var picture = link ? link.smallThumbnail : false;
  return picture ? "<img class='thumbnail' src='" + secureContent(picture) + "'>" : "Click for Info";
}

secureContent = function(webAddress){
  return webAddress.replace("http://", "https://");
}