(function($){
	'use strict';

	var defaults = {
	};
	var templates = {
		episodeContainer: createTemplate(''
			+ '<h1>${title}</h1>'
			+ '<video>'
  			+ '<source src="${src}#t=${startTime},${endTime}" type="video/ogg">'
			+ 'Your browser does not support the video tag.'
			+ '</video>'
			+ '<h3>${text}</h3>'
		)
	};

	function createTemplate(template) {
        return $.template(template);
    }

    $.fn.Story = function () {
		// Attach the API
	    $.extend(this, $.fn.Story.API);
		return this;
	};

	$.fn.Story.API = {

		init : function (params) {
			// Merge the default parameters
	        params = $.extend({}, defaults, params);
			// event handlers ?
			return this;
		},
		addEpisode: function(episodeParams) {
			var el = $(this);
			// Add new video
			$("<div />")
				.addClass('well')
				.appendTo(el).Episode().init(episodeParams);
		}
	};

	$.fn.Episode = function () {
    	// Attach the API
        $.extend(this, $.fn.Episode.API);
        return this;
    };
    $.fn.Episode.API = {
    	init : function(params) {
    		var self = this,
    			el = $(this);
    		// render Episode
    		$.tmpl(templates.episodeContainer, params)
    			.appendTo(el);

    		// event handlers
    		this
    			.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
    				var video = $(this).find('video').get(0);
    				if (isInView) {
    					if (visiblePartY == 'top') {
					      // top part of element is visible
					    } else if (visiblePartY == 'bottom') {
					      // bottom part of element is visible
					    } else {
					    	if (video.currentTime < params.endTime) {
					    		video.play();
					    	}
					    }
    				} else {
    					// Maybe reset currentTime to 0?
    					video.pause();
    				}
    			});
    	}
    }
}(jQuery));