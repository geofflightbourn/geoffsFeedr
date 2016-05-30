function processHandlebarsTemplate(templateId, data) {
	var templateSource = $('#' + templateId).html();
	var compiledTemplate = Handlebars.compile(templateSource);

	return compiledTemplate(data);
}

$.ajax({
	type: 'GET',
	url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
	success: function(response) {
    var templateSource = $('#newsTemp').html()
    			var compiledTemplate = Handlebars.compile(templateSource)
        response.data.feed.forEach(function (article) {
          var data = article
    			var generatedHtml = compiledTemplate(data)
    			$('#main').append(generatedHtml)
        })
    }
})

$.ajax({
	type: 'GET',
	url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
	success: function(response) {
    var templateSource = $('#popUpTemp').html()
    			var compiledTemplate = Handlebars.compile(templateSource)
        response.data.feed.forEach(function (article) {
          var data = article
    			var generatedHtml = compiledTemplate(data)
    			$('#popUp').append(generatedHtml)
        })
    }
})

$(document).ready(function() {

	$( "#main" ).on( "click", "a", function( event ) {
		console.log('clicked');
	$( this ).removeClass('hidden, loader')
	});

  })
