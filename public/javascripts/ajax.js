$(function(){ //document ready

	$('.form').on('click', function(){
		console.log(this)
		// $(this).addClass('highlight');
		$('body').addClass('highlight');
	});

	$("#signup-form").submit(function(e){
		e.preventDefault();
		console.log(this);
		$('#message').empty();
		$('#loader').addClass('move');


		//make a post request to our /signup endpoint
		$.post('/signup', $(this).serialize(), function(data){
			console.log("posted");
			// stop the loader
			$('#loader').removeClass('move');


			//if there was an error, show the error
			if(data.error){
				// add the error text to the error div
				$('#message').text(data.error);

			}

			// if the request returned a success message, display it.
			if(data.success){
				
				$('#message').text(data.success);
				console.log(data.success, data.username, data.email);
				
			}
		});
	
	});
});