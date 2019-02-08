var ApiHandler = function(){

  this.gbookSearch = function(search,searchType){
    return apiCall(search,searchType);
  }

  function apiCall(search, searchType){
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + searchFormat(searchType) + styleSearch(search) + resultsIndex();
    console.log(url);
    return $.ajax({
      method: 'GET',
      url: url,
      datatype: "json"
    })
  }

  function searchFormat(callType){
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