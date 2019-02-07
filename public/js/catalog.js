var SearchCatalog = function(){
  var apiHandler = new ApiHandler();

  this.bookSearch = function(){
    updateBookSearch();
  }

  var updateBookSearch = function(){
    var search = $('#search').val();
    if (validSearch(search)){
      apiHandler.gbookSearch(search).done(function(response){
        resetResults();
        response.totalItems > 0 ? showResults(response) : noResults(search);
      })
    }
  }

  var showResults = function(bookList){
    showBooklistInfo(bookList);
    updateResultsIndex();
    updateResultsScroll(bookList.totalItems);
  }

  this.setActiveSearch = function(searchChoice){
    $('#active-search').removeAttr('id');
    $(searchChoice).attr('id','active-search');
    resetSearchIndex();
    updateBookSearch();
  }

  this.scrollNext = function(){
    $('#results-scroll').on('click', '.next', function(e){
      var index = $('#results-index').attr('data-index');
      index = parseInt(index) + 10;
      $('#results-index').attr('data-index', index);
      updateBookSearch();
      $(window).scrollTop(0); // need to come back to this, so scrollTop doesn't not resolve prior to the booksearch being updated
    })
  }

  this.scrollPrevious = function(){
    $('#results-scroll').on('click', '.previous', function(e){
      var index = $('#results-index').attr('data-index');
      index = parseInt(index) - 10;
      $('#results-index').attr('data-index', index);
      updateBookSearch();
      $(window).scrollTop(0); // need to come back to this, so scrollTop doesn't not resolve prior to the booksearch being updated
    })
  }

  var showBooklistInfo = function(bookList){
    var book;
    for(i = 0; i < bookList.items.length; i++){
      bookInfo = bookList.items[i].volumeInfo;
      book = new Book(bookInfo)
      $('#results').append(book.blurb);
    }
  }

  var resetResults = function(){
    $('#results').text('');
  }

  var noResults = function(query){
    $('#results').append("<p>No Results Found</p>");
  }

  var resetSearchIndex = function(){
    $('#results-index').attr('data-index', 0);
  }

  var updateResultsScroll = function(totalResults){
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

  updateResultsIndex = function(){
    var index = $('#results-index').attr('data-index');
    var indexInfo = (index / 10) + 1;
    $('#results-index').html("<p>Page " + indexInfo + " of Results</p>");
  }

}