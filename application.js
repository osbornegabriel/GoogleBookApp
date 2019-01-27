$(document).ready(function(){
  bookSearch();
})

var bookSearch = function(){
  $('#button').on('click', function(e){
    var search = $('#search').val();
    console.log(search);
  })
}
