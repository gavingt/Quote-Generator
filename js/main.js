var backgroundColors = ["red", "lightblue", "salmon", "gray", "pink", "orange", "peachpuff", "darkkhaki", "plum", "palegreen", "darkseagreen", "cyan", "lightsteelblue", "bisque," +
"firebrick", "orangered", "gold", "khaki", "thistle", "mediumorchid", "slateblue", "chartreuse", "springgreen", "olivedrab"];
var colorIndex = Math.floor(Math.random()*backgroundColors.length);


function fetchQuote(changeColor) {
    $.ajax( {
        url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data) {

            colorIndex ++;

            if (changeColor) {
                $("body, .new-quote-button").css("background", backgroundColors[colorIndex % backgroundColors.length]);
            }

            $(".quote-container>p").css('visibility','visible').hide().fadeIn('slow');

            var post = data.shift(); // The data is an array of posts. Grab the first one.
            $('#quote-title').text(post.title);

            var content = post.content.replace('<p>', '').replace('</p>', '').replace(/&#8217;/gi, "'").replace(/&#8220;/gi, "'").replace(/&#8221;/gi, "'").trim();
            console.log(content);

            $(".twitter-link").attr("href", "https://twitter.com/intent/tweet?text=" + content);

            content = '<p>"' + content + '"</p>';
            $('#quote-content').html(content);

            // If the Source is available, use it. Otherwise hide it.
            if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
                $('#quote-source').html('Source: ' + post.custom_meta.Source);
            } else {
                $('#quote-source').text('');
            }
        },
        cache: false
    });
}



$(document).ready(function() {
    $("body, .new-quote-button").css("background", backgroundColors[colorIndex]);
   fetchQuote(false);
});


$('.new-quote-button').on('click', function() {
    fetchQuote(true);
});

