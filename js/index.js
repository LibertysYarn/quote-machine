  // get random quotes from forismatic //
  var url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

  var getQuote = function(data) {
    $(".quote-text").text(data.quoteText);
    $(".author-text").text(data.quoteAuthor);
    $(".author-link").text(link, data.quoteAuthor); {
      if (data.quoteAuthor === ' ')
        data.quoteAuthor = 'Unknown';

      // get link to author on wikipedia //  
      var link = 'https://en.wikipedia.org/wiki/' + data.quoteAuthor;
      $(".wiki-button").attr("href", link);
      // tweet quote currently displayed //
      var quot = 'https://twitter.com/intent/tweet?text=' + data.quoteText + ' Author ' + data.quoteAuthor + ' @libertymontano';
      $(".twitter-share-button").attr("href", quot);
    }
    // trying to get pageimage from auhor's wikipedia page //
    //var getImage = function(data) {
    //$(".image-wiki").text(data.pageImage);
    //}

    //var imageWiki = 'https://www.mediawiki.org/w/api.php?action=query&prop=pageimages&titles=' + data.quoteAuthor;
    //$(".image-wiki").attr("href", imageWiki);

  };

  // important stuff //
  $(document).ready(function() {
    $.getJSON(url, getQuote, 'jsonp');

  });
  $("#quote").click(function() {
    $.getJSON(url, getQuote, 'jsonp');
  });

  $("#wiki-image").click(function() {
    $.getJSON(imageWiki, getImage);
  })

  // Google Font //
  WebFontConfig = {
    google: {
      families: ['Lobster+Two::latin']
    }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  // gradiant //
  var colors = new Array(
    [62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0]);

  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0, 1, 2, 3];

  //transition speed
  var gradientSpeed = 0.002;

  function updateGradient() {

    if ($ === undefined) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    $('#gradient').css({
      background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    }).css({
      background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    });

    step += gradientSpeed;
    if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];

      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

    }
  }

  setInterval(updateGradient, 10);