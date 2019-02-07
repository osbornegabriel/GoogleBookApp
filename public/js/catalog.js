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
      var index = $('#results-index').attr('data-index');
      newIndex = parseInt(index) + indexChange;
      $('#results-index').attr('data-index', newIndex);
      updateBookSearch();
      helper.scrollTop();// need to come back to this, so scrollTop doesn't not resolve prior to the booksearch being updated
  }

  function setActiveSearch(searchChoice){
    $('#active-search').removeAttr('id');
    $(searchChoice).attr('id','active-search');
  }

  function updateBookSearch(){
    var search = $('#search').val();
    try {
      if (helper.validSearch(search)){
        apiHandler.gbookSearch(search).done(function(response){
          resetResults();
          response.totalItems > 0 ? showResults(response) : noResults(search);
        }).fail(function(failResponse){
          console.log("Error: Google API did not respond with book data");
          console.log("Response: " + failResponse);
        })
      }
    } catch {
      console.log("Error: Api call failed");
    }
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

  function updateResultsIndex(){
    var index = $('#results-index').attr('data-index');
    var indexInfo = (index / 10) + 1;
    $('#results-index').html("<p>Page " + indexInfo + " of Results</p>");
  }

}