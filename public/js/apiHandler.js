var ApiHandler = function(){

  this.gbookSearch = function(search){
    return apiCall(search);
  }

  function apiCall(search, searchType){
    return $.ajax({
      method: 'GET',
      url: "https://www.googleapis.com/books/v1/volumes?q=" + searchFormat(searchType) + styleSearch(search) + resultsIndex(),
      datatype: "json"
    })
  }

  function searchFormat(callType){
    // var callType = $('#active-search').text();
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

  function styleSearch(search){
    return search.replace(' ', '+');
  }

  function resultsIndex(){
    var page = $('#results-index').attr('data-index')
    return "&startIndex=" + page;
  }

}