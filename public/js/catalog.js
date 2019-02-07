var SearchCatalog = function(){
  var apiHandler = new ApiHandler();

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
      scrollTop();// need to come back to this, so scrollTop doesn't not resolve prior to the booksearch being updated
  }

  function setActiveSearch(searchChoice){
    $('#active-search').removeAttr('id');
    $(searchChoice).attr('id','active-search');
  }

  function updateBookSearch(){
    var search = $('#search').val();
    if (validSearch(search)){
      apiHandler.gbookSearch(search).done(function(response){
        resetResults();
        response.totalItems > 0 ? showResults(response) : noResults(search);
      })
    }
  }

  function showResults(bookList){
    showBooklistInfo(bookList);
    updateResultsIndex();
    updateResultsScroll(bookList.totalItems);
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
    $('#results').text('');
  }

  function noResults(query){
    $('#results').append("<p>No Results Found</p>");
  }

  function resetSearchIndex(){
    $('#results-index').attr('data-index', 0);
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