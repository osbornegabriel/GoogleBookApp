var bookSearch;
var formatBookInfo;

$(document).ready(function(){
  bookSearch();
})

bookSearch = function(){
  $('#button').on('click', function(e){
    var search = $('#search').val();
    $.ajax({
      method: 'GET',
      url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
      datatype: "json"
    }).done(function(response){
      $('#results').text('');
      for(i = 0; i < 10; i++){
        var item = response.items[i].volumeInfo;
        $('#results').append(formatBookInfo(item));
      }    })
  })
}

// var handleJson = function(){

// }

formatBookInfo = function(item){
  var info = "<h3><span class='title'>" + item.title + "</span></h3>";
  info += "<p><strong>Author:</strong> " + item.authors;
  info += "<br><strong>Publisher:</strong> " + item.publisher;
  info += "<br><a target='_blank' href='" + item.infoLink + "'>";
  info += "<br><img class='thumbnail' src='" + item.imageLinks.smallThumbnail + "'></a>";
  info += "</p>";
  return info;
}
