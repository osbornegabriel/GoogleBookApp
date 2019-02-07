var Listeners = function(){
  var catalog = new SearchCatalog();

  this.setListeners = function(){
    scrollListeners();
    searchListeners();
    searchTypeListener();
  }

  searchListeners = function(){
    $('#search-button').on('click', function(e){
      catalog.bookSearch();
    })
    $('#search').on('keypress',function(e){
      if(e.which == 13){
        catalog.bookSearch();
      }
    })
  }

  searchTypeListener = function(){
    $('.tab-link').on('click', function(e){
      catalog.changeSearchType(this);
    })
  }

  scrollListeners = function(){
    scrollNextListener();
    scrollPreviousListener();
  }

  scrollNextListener = function(){
    $('#results-scroll').on('click', '.next', function(e){
      catalog.scrollNext();
    })
  }

  scrollPreviousListener = function(){
    $('#results-scroll').on('click', '.previous', function(e){
      catalog.scrollPrevious();
    })
  }

}