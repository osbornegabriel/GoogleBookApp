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
var validSearch;
var showResults;
var resultsIndex;
var updateResultsIndex;
var updateResultsScroll;
var scrollNext;
var scrollPrevious;
var resetSearchIndex;


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

bookSearch = function(){
  var search = $('#search').val();
  if (validSearch(search)){
    apiCall(search).done(function(response){
      resetResults();
      response.totalItems > 0 ? showResults(response) : noResults(search);
    })
  }
}

noResults = function(query){
  $('#results').append("<p>No Results Found</p>");
}

resetSearchIndex = function(){
  $('#results-index').attr('data-index', 0);
}

setActiveSearch = function(){
  $('.tab-link').on('click', function(e){
    $('#active-search').removeAttr('id');
    $(this).attr('id','active-search');
    resetSearchIndex();
    bookSearch();
  })
}

apiCall = function(search){
  return $.ajax({
    method: 'GET',
    url: "https://www.googleapis.com/books/v1/volumes?q=" + searchFormat() + styleSearch(search) + resultsIndex(),
    datatype: "json"
  })
}

resultsIndex = function(){
  var page = $('#results-index').attr('data-index')
  return "&startIndex=" + page;
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

showResults = function(bookList){
  showBookInfo(bookList);
  updateResultsIndex();
  updateResultsScroll(bookList.totalItems);
}

updateResultsIndex = function(){
  var index = $('#results-index').attr('data-index');
  var indexInfo = (index / 10) + 1;
  $('#results-index').html("<p>Page " + indexInfo + " of Results</p>");
}

updateResultsScroll = function(totalResults){
  var indexTabs = '';
  var index = $('#results-index').attr('data-index');
  if (index > 0){
    indexTabs += "<button class='previous'>Previous</button>";
  }
  if (index < (totalResults - 10)){
    indexTabs += "<button class='next'>Next</button>";
  }
  $('#results-scroll').html(indexTabs);
}

scrollNext = function(){
  $('#results-scroll').on('click', '.next', function(e){
    console.log("Next button clicked");
    var index = $('#results-index').attr('data-index');
    index = parseInt(index) + 10;
    $('#results-index').attr('data-index', index);
    bookSearch();
    $(window).scrollTop(0); // need to come back to this, so scrollTop doesn't not resolve prior to the booksearch being updated
  })
}

scrollPrevious = function(){
  $('#results-scroll').on('click', '.previous', function(e){
    console.log("Previous button clicked");
    var index = $('#results-index').attr('data-index');
    index = parseInt(index) - 10;
    $('#results-index').attr('data-index', index);
    bookSearch();
    $(window).scrollTop(0); // need to come back to this, so scrollTop doesn't not resolve prior to the booksearch being updated
  })
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

validSearch = function(search){
  var re = /\S/;
  return re.test(search);
}