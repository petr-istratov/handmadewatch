// JavaScript Document
(function($) {
	$(document).ready(function() {
		$( '#s' ).each( function(){
		$(this).attr( 'title', $(this).val() )
		  .focus( function(){
			if ( $(this).val() == $(this).attr('title') ) {
			  $(this).val( '' );
			}
		  } ).blur( function(){
			if ( $(this).val() == '' || $(this).val() == ' ' ) {
			  $(this).val( $(this).attr('title') );
			}
		  } );
		} );

		$('input#s').result(function(event, data, formatted) {
			$('#result').html( !data ? "No match!" : "Selected: " + formatted);
		}).blur(function(){		
		});			
	});
	$(document).ready(function() {		
		function format(mail) {
				return "<a href='"+mail.permalink+"'><img src='" +mail.image+ "' /><span class='title'>" +mail.title+"</span><br><span class='title'>" +mail.price+"</span></a>";				
		}
		
		function link(mail) {
			return mail.permalink;
		}

		function title(mail) {
			return mail.title;
		}
		
		$("#s").autocomplete(completeResults, {
			width: $("#s").outerWidth()-2,			
			max: 5,			
			scroll: false,
			dataType: "json",
			matchContains: "word",
			parse: function(data) {
				return $.map(data, function(row) {
					return {
						data: row,
						value: row.title,
						result: $("#s").val()
					}
				});
			},
			
			formatItem: function(item) {				
				return format(item);
			}
			}).result(function(e, item) {
				$("#s").val(title(item));
				if ($.browser.msie) {
					location.href = link(item);
				}else{
					location.href = mail.permalink;
				}
			});						
	});
})(jQuery);