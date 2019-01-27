$(document).ready(function(){
  bookSearch();
})

var bookSearch = function(){
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

var formatBookInfo = function(item){
  var info = "<h3 class='title'><em>" + item.title + "</em></h3>";
  info += "<p><strong>Author:</strong> " + item.authors;
  info += "<br><strong>Publisher:</strong> " + item.publisher;
  info += "<br><a target='_blank' href='" + item.infoLink + "'>More Info</a></p>";
  info += "<img class='thumbnail' src='" + item.imageLinks.smallThumbnail + "'>"
  return info;
}
