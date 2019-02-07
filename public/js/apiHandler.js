var ApiHandler = function(){

  this.gbookSearch = function(search){
    return apiCall(search);
  }

  apiCall = function(search){
    return $.ajax({
      method: 'GET',
      url: "https://www.googleapis.com/books/v1/volumes?q=" + searchFormat() + styleSearch(search) + resultsIndex(),
      datatype: "json"
    })
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

  styleSearch = function(search){
    return search.replace(' ', '+');
  }

  resultsIndex = function(){
    var page = $('#results-index').attr('data-index')
    return "&startIndex=" + page;
  }

}