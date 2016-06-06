function processHandlebarsTemplate(templateId, data) {
	var templateSource = $('#' + templateId).html();
	var compiledTemplate = Handlebars.compile(templateSource);
	return compiledTemplate(data);
}

$( document ).ajaxError(function( event, request, settings ) { //ajax error message
  alert('error loading page')
});

$.ajax({ //Gets 10 digg articles
	type: 'GET',
	url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
	success: function(response) {
    var templateSource = $('#newsTemp').html()
    			var compiledTemplate = Handlebars.compile(templateSource)

				window.data = response.data.feed

        response.data.feed.forEach(function (article, index) {
          var data = article
					data.index = index

    			var generatedHtml = compiledTemplate(data) //#main
    			$('#main').append(generatedHtml)
        })

				var popUpTemplate = Handlebars.compile($('#popUpTemp').html()) //#popUp
				$('#popUp').append(popUpTemplate({
	 			data: response
 			}));
    }
})

var $loading = $('.loader').hide(); //loader circle
$(document)
.ajaxStart(function () {
	$loading.show();
})
.ajaxStop(function () {
	$loading.hide();
	});


$(document).ready(function() {

	$( "#main" ).on( "click", "a", function( event ) { //Load Popup
		var index = $(this).data('article-index')
		var article = window.data[index]
		console.log(article);
	$('#popUp').show()
	$('.hidden').removeClass()
	$('').appendTo('#popUp')
})

	$("#popUp").on("click", ".closePopUp", function(event) { //close popUp
	$("#popUp").hide()
	})

}) // end ready
