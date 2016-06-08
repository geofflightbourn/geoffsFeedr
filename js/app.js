function processHandlebarsTemplate(templateId, data) {
	var templateSource = $('#' + templateId).html();
	var compiledTemplate = Handlebars.compile(templateSource);
	return compiledTemplate(data);
}

$.ajax({ //Gets 10 digg articles
	type: 'GET',
	url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
	success: function(response) {
		var templateSource = $('#newsTemp').html()
		var compiledTemplate = Handlebars.compile(templateSource)

		var articles = response.data.feed

		articles.forEach(function(article) {
			var articleHtml = processHandlebarsTemplate('newsTemp', article)
			var $articleContainer = $(articleHtml).appendTo('#main')

			$articleContainer.on('click', 'h3.title', function(event) {
				console.log('You clicked on the following article:')
				$('#popUp').removeClass('hidden')
				$('#popUp').removeClass('loader')

				$('#popUp').append('<h1>'+ article.content.title +'</h1>')
				$('#popUp').append('<p>'+ article.content.description +'<p>')
				$('#popUp').append('<a href='+ article.content.original_url +' class="popUpAction" target="_blank">Read more from source</a>')
			})
		})
	}
}) //end Digg request


$.ajax({ //Gets 10 Reddit articles
	type: 'GET',
	url: 'https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/r/gaming.json',
	success: function(response) {
		var templateSource = $('#redditTemp').html()
		var compiledTemplate = Handlebars.compile(templateSource)

		var articles = response.data.children

		articles.forEach(function(article) {
			var articleHtml = processHandlebarsTemplate('redditTemp', article)
			var $articleContainer = $(articleHtml).appendTo('#main')

			$articleContainer.on('click', 'h3.title', function(event) {
				console.log('You clicked on the following article:')
				$('#popUp').removeClass('hidden')
				$('#popUp').removeClass('loader')

				$('#popUp').append('<h1>'+ article.data.title +'</h1>')
				$('#popUp').append('<p>'+ article.data.domain +'<p>')
				$('#popUp').append('<a href='+ article.data.url +' class="popUpAction" target="_blank">Read more from source</a>')
			})
		})
	}
}) //end Reddit request

$( document ).ajaxError(function( event, request, settings ) { //ajax error message
	alert('error loading page')
});

$(document).ready(function() {

	var $loading = $('.loader').hide(); //loader circle
	$(document).ajaxStart(function () {
		$loading.show();
	}).ajaxStop(function () {
		$loading.hide();
	});

	$( "#main" ).on( "click", "a", function( event ) { //Load Popup
		$('#popUp').show()
		$('.hidden').removeClass()
		$('').appendTo('#popUp')
	})

	$("#popUp").on("click", ".closePopUp", function(event) { //close popUp
		$("#popUp").hide()
		$('h1, p, .popUpAction').empty()
	})
}) // end ready
