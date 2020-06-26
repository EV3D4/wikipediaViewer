$(document).ready(function() {
  var apiURL;
  var firstClick = 0;



  $('body').on('keypress', 'input', function(args) {
    if (args.keyCode == 13) {
      $("#getSearchString").click();
      return false;
    }
  });




  function ajax (keyword) { //AJAX request
    $.ajax({ 
      url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
      dataType: "jsonp",
      success: function(response) {
        console.log(response.query);
        if (response.query.searchinfo.totalhits === 0) {
          showError(keyword);
        }
  
        else {
          showResults(response);
        }
      },
      error: function () {
        alert("Error retrieving search results, please refresh the page");
      }
    });
  }
  
  function showResults (callback) {
  
    for (var i = 0; i <= 9; i++) {
      $(".queryReturn").append("<div class='result-list result-" + i + "'>" + "<div class='result-title title-" + i + "'></div><div class='result-snippet snippet-" + i + "'></div>" + "<br>" + "<span class='result-metadata metadata-" + i + "'></span>" + "</div>" );
    }


          $('#ID0').removeClass('backgroundLayer').addClass('backgroundLayerX');
  
          $('#ID1').removeClass('center').addClass('content');
          $('#ID2').removeClass('appTitle').addClass('appTitleX');
          $('#ID3').removeClass('searchform').addClass('searchformX');
          $('#ID3').removeClass('borderframe').addClass('borderframeX');
  
  
          $('#getSearchString').addClass('invisble');
          $('#getRandomEntry').addClass('invisble');
  
    for (var m = 0; m <= 9; m++) {
      var title = callback.query.search[m].title;
      var url = title.replace(/ /g, "_");
      var timestamp = callback.query.search[m].timestamp;
      timestamp = new Date(timestamp);
      //"Wed Aug 27 2014 00:27:15 GMT+0100 (WAT)";
      console.log(timestamp);
      $(".title-" + m).html("<a href='https://en.wikipedia.org/wiki/" + url + "' target='_blank'>" + callback.query.search[m].title + "</a>");
      $(".snippet-" + m).html(callback.query.search[m].snippet);
   //   $(".metadata-" + m).html((callback.query.search[m].size/1000).toFixed(0) + "kb (" + callback.query.search[m].wordcount + " words) - " + timestamp);
    }
  }
  
  function showError(keyword) {
    $(".display-results").append( "<div class='error'> <p>Your search <span class='keyword'>" + keyword + "</span> did not match any documents.</p> <p>Suggestions:</p><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></div> ");
  }





  $("#getSearchString").on("click", function() {

    var apiSearchTearm = document.getElementById('searchString').value;
    apiSearchTearm = apiSearchTearm.replace(/\s/g, "+");

    
    apiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + apiSearchTearm + "&namespace=0&callback=?";


    window.onload = function() {
      document.getElementById("wiki-search-input").focus();
  };
  
  
  ajax (apiSearchTearm)


    
  });

  $("#getRandomEntry").on("click", function() {

    $.ajax({
      type: "GET",
      url: "https://en.wikipedia.org//w/api.php?action=query&format=json&prop=&list=random&titles=&rnnamespace=0&rnfilterredir=nonredirects&rnlimit=1&callback=?",
      contentType: "application/json;",
      async: false,
      dataType: "json",
      success: function(data, textStatus, jqXHR) {


        var randomTitle = data.query.random[0].title;
        randomTitle = randomTitle.replace(/\s/g, "_");
        var randomURL = "https://en.wikipedia.org/wiki/" + randomTitle;


        window.location.replace(randomURL);



      },
      error: function(errorMessage) {}
    });
  });

});
