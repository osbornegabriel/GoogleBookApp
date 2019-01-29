describe("api call", function() {
  var searchResults;
  var firstResult;

  beforeEach(function() {
    apiCall("Words").done(function(response){
      that = response;
    });
    searchResults = that;
    console.log(that);
  });

  it("has a title", function(){
    console.log(searchResults);
    expect(searchResults).toEqual("Words");
  });

});
