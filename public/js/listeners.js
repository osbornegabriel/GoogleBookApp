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
      catalog.setActiveSearch(this);
    })
  }

  scrollListeners = function(){
    catalog.scrollNext();
    catalog.scrollPrevious();
  }

}