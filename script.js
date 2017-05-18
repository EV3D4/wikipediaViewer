$(document).ready(function() {
  var apiURL;
  var firstClick = 0;



  $('body').on('keypress', 'input', function(args) {
    if (args.keyCode == 13) {
      $("#getSearchString").click();
      return false;
    }
  });



  $("#getSearchString").on("click", function() {

    var apiSearchTearm = document.getElementById('searchString').value;
    apiSearchTearm = apiSearchTearm.replace(/\s/g, "+");
    apiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + apiSearchTearm + "&namespace=0&callback=?";

    $.ajax({
      type: "GET",
      url: apiURL,
      contentType: "application/json;",
      async: false,
      dataType: "json",
      success: function(data, textStatus, jqXHR) {

        html = "<div class=queryBackground><div class=queryTitle><h1>Search:</h1></div</div>";

        for (i = 0; i < data[1].length; i++) {
          html = html + "<a href=" + data[3][i] + "><div class=queryReturnBox><h4>" + data[1][i] + "</h4>";
          html = html + "<p>" + data[2][i] + "</p></div></a>";
        }
        html += "</div>"
        $(".queryReturn").html(html);
      },
      error: function(errorMessage) {}
    });
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
