var SearchCatalog = function(){
  var apiHandler = new ApiHandler();
  var helper = new Helpers();

  this.bookSearch = function(){
    updateBookSearch();
  }

  this.changeSearchType = function(newType){
    setActiveSearch(newType);
    resetSearchIndex();
    updateBookSearch();
  }

  this.scrollNext = function(){
    scroll(10);
  }

  this.scrollPrevious = function(){
    scroll(-10);
  }

  function scroll(indexChange){
      updateDataIndex(indexChange);
      updateBookSearch();
      helper.scrollTop();
      // I experimented with ways to have the scrollTop activate after the updated search, but visually have not yet to find a result I preferred over this default of the scrollTop script resolving prior to updateBookSearch
  }

  function setActiveSearch(searchChoice){
    $('#active-search').removeAttr('id');
    $(searchChoice).attr('id','active-search');
  }

  function updateBookSearch(){
    var search = $('#search').val();
    var searchType = $('#active-search').text();
    if (helper.validSearch(search)){
      try {
        runSearch(search, searchType);
      } catch {
      console.log("Error: Api call failed");
      }
    }
  }

  function runSearch(search, searchType){
    apiHandler.gbookSearch(search, searchType)
    .done(function(response){
      resetResults();
      response.totalItems > 0 ? showResults(response) : noResults(search);
    })
    .fail(function(failResponse){
      console.log("Error: Google API did not return search info");
      console.log("Response: " + failResponse);
    })
  }

  function showResults(bookList){
    showBooklistInfo(bookList);
    updateResultsIndex();
    updateResultsScroll(bookList.totalItems);
  }

  function noResults(query){
    resetResults();
    resetResultsIndex();
    resetSearchIndex();
    resetResultsScroll();
    $('#results').append("<p>No Results Found</p>");
  }

  function showBooklistInfo(bookList){
    var book;
    for(i = 0; i < bookList.items.length; i++){
      bookInfo = bookList.items[i].volumeInfo;
      book = new Book(bookInfo)
      $('#results').append(book.blurb);
    }
  }

  function resetResults(){
    helper.reset('#results');
  }

  function resetResultsIndex(){
    helper.reset('#results-index');
  }

  function resetSearchIndex(){
    $('#results-index').attr('data-index', 0);
  }

  function resetResultsScroll(){
    helper.reset('#results-scroll');
  }

  function updateDataIndex(indexChange){
    var index = $('#results-index').attr('data-index');
    newIndex = parseInt(index) + indexChange;
    $('#results-index').attr('data-index', newIndex);
  }

  function updateResultsIndex(){
    var index = $('#results-index').attr('data-index');
    var indexInfo = (index / 10) + 1;
    $('#results-index').html("<p>Page " + indexInfo + " of Results</p>");
  }

  function updateResultsScroll(totalResults){
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

}