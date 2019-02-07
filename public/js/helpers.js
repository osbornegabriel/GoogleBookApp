var Helpers = function(){

  this.scrollTop = function(){
    $(window).scrollTop(0);
  }

  this.infoCheck = function(info){
    return info ? info : "Not Available";
  }

  this.reset = function(idString){
    $(idString).text('');
  }

  this.secureContent = function(webAddress){
    return webAddress.replace("http://", "https://");
  }

  this.validSearch = function(search){
    var re = /\S/;
    return re.test(search);
  }

}