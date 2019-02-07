var Book = function(bookInfo){
  var helper = new Helpers();

  this.blurb = formatBookInfo(bookInfo);

  function formatBookInfo(item){
    var info = "<div class='book-info'>"
    info += titleLine(item);
    info += descriptionLines(item);
    info += "</div>";
    return info;
  }

  function descriptionLines(book){
    var description = new String();
    description += authorLine(book);
    description += publisherLine(book);
    description += bookInfoAndCover(book);
    return "<p>" + description + "</p>";
  }

  function publisherLine(book){
    return "<br><strong>Publisher:</strong> " + helper.infoCheck(book.publisher);
  }

  function bookInfoAndCover(book){
    return "<br><br><a target='_blank' href='" + book.infoLink + "'>" + bookImage(book) + "</a>";
  }

  function authorLine(book){
    return "<strong>Author:</strong> " + helper.infoCheck(book.authors);
  }

  function titleLine(book){
    var title = helper.infoCheck(book.title);
    return "<h3><span class='title'>" + title + "</span></h3>"
  }

  function bookImage(book){
    var link = book.imageLinks;
    var picture = link ? link.smallThumbnail : false;
    return picture ? "<img class='thumbnail' src='" + helper.secureContent(picture) + "'>" : "Click for Info";
  }

}
