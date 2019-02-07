var bookSearch;
var resetSearchIndex;
var setActiveSearch;
var noResults;
var searchFormat;
var resetResults;
var styleSearch;
var updateResultsIndex;
var updateResultsScroll;
var scrollNext;
var scrollPrevious;
var resultsIndex;
var showResults;


resultsIndex = function(){
  var page = $('#results-index').attr('data-index')
  return "&startIndex=" + page;
}

styleSearch = function(search){
  return search.replace(' ', '+');
}

resetResults = function(){
  $('#results').text('');
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

noResults = function(query){
  $('#results').append("<p>No Results Found</p>");
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
    var index = $('#results-index').attr('data-index');
    index = parseInt(index) + 10;
    $('#results-index').attr('data-index', index);
    bookSearch();
    $(window).scrollTop(0); // need to come back to this, so scrollTop doesn't not resolve prior to the booksearch being updated
  })
}

scrollPrevious = function(){
  $('#results-scroll').on('click', '.previous', function(e){
    var index = $('#results-index').attr('data-index');
    index = parseInt(index) - 10;
    $('#results-index').attr('data-index', index);
    bookSearch();
    $(window).scrollTop(0); // need to come back to this, so scrollTop doesn't not resolve prior to the booksearch being updated
  })
}

updateResultsIndex = function(){
  var index = $('#results-index').attr('data-index');
  var indexInfo = (index / 10) + 1;
  $('#results-index').html("<p>Page " + indexInfo + " of Results</p>");
}

showResults = function(bookList){
  showBookInfo(bookList);
  updateResultsIndex();
  updateResultsScroll(bookList.totalItems);
}