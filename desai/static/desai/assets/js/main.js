var curIsotopeFilter = '*';
var curIsotopePage = '';
var ppp = 99; /*Set number of items in skills*/

jQuery(document).ready(function() {
	var src = '0';
	if(getCookie('body_bg')) {
		src = getCookie('body_bg');
		jQuery('body').css({'background':src});
		jQuery('#bg_col').css({'background':src});
	}
	else if(getCookie('body_img')) {
		src = getCookie('body_img');
		jQuery('body').css({'background':'url('+src+')'}).addClass('bg_img');
	}
	else if(getCookie('body_pt')) {
		src = getCookie('body_pt');
		jQuery('body').css({'background':'url('+src+')'}).removeClass('bg_img');
	}

	jQuery('#nav_tabs').tabs('#tab_section > .tab_content', {
		tabs: 'section > .section_header > .section_title',
			effect : 'slide',
			slideUpSpeed: 600,
			slideDownSpeed: 1000,
			initialIndex: 0,
			onClick: function (e, tabIndex) {
				var tabs = jQuery("#nav_tabs > li > a");
				var tab = tabs.eq(tabIndex);
				if(tab.attr('href') === '#skills') {
					if(tab.attr('href') === '#skills' && jQuery('.skills_items').length > 0) {
						jQuery('.skills_items').isotope({ filter: getIsotopeFilter() });
					}
				}
				if(tab.attr('href') === '#contacts') {
					function hider_over() {
						jQuery('.map_wrap .map_overlay').fadeOut();
					}
					setTimeout(hider_over, 1000);
					if (window.googlemap_refresh) {googlemap_refresh();}
						googlemap_refreshed = true;					
				}
				if(tab.attr('href') === '#profile') {
					skills_anim();
				}
			}
	});
	jQuery('#page:not(.print) #resume .section-header').click(function(){
		jQuery(this).toggleClass('opened').next().stop().slideToggle();
		var fTop = jQuery(this).offset().top;
		if(jQuery(this).hasClass('opened')){
			jQuery('html, body').animate({scrollTop: fTop-30});
		}
		return false;
	});
	if(jQuery('.skills_wrapper').length > 0) {
		jQuery('.skills_items')
			.isotope({ 
				itemSelector: '.skills_post',
				transformsEnabled : true,
				duration: 750,
				resizable: true,
				resizesContainer: true,
				layoutMode: 'fitRows'
			});
		jQuery('#skills_iso_filters li a').click(function(){
			var selector = jQuery(this).attr('data-filter');
			curIsotopeFilter = selector;
			jQuery('.skills_items').isotope({ filter: getIsotopeFilter() });
			jQuery(this).parents('#skills_iso_filters').find('a').removeClass('current');
			jQuery(this).addClass('current');
			return false;
		});
		jQuery('#skills_load_more').on('click', 'a', function(){
			if(!jQuery(this).hasClass('no_results')) {
				var selector = '.skills_items article.hidden'+(curIsotopeFilter!='*' ? curIsotopeFilter : '');
				jQuery(selector).each(function(idx) {
					if (idx<ppp) {
						jQuery(this).addClass('visible').removeClass('hidden');
					}
				});
				jQuery('.skills_items').isotope({ filter: getIsotopeFilter() });
		
				if(jQuery('.skills_items article.visible').length === jQuery('.skills_items article').length) {
					jQuery('#more_results').addClass('no_results');
				}
			}	
			return false;
		});
	}	

	// toTop link setup
	jQuery(window).scroll(function() {
		if(jQuery(this).scrollTop() >= 110) {
			jQuery('#toTop').show();	
		} else {
			jQuery('#toTop').hide();	
		}
	});
	jQuery('#toTop').click(function(e) {
		jQuery('body,html').animate({scrollTop:0}, 800);
		e.preventDefault();
	});
});

function getIsotopeFilter() {
	var flt = curIsotopeFilter!='*' ? curIsotopeFilter : '';
	flt += curIsotopePage!='' ? ((flt!='' ? '' : '') + curIsotopePage) : '';
	flt=='' ? '*' : '';
	return flt;
}
function skills_anim(){
	if(!jQuery('#page').hasClass('print')) {
		if(jQuery('#resume .widgets_section.section-header:visible').length > 0) {
			var wnd = jQuery(window).scrollTop()+jQuery(window).height();
			var oft = jQuery('#resume:visible .widgets_section.section-header').offset().top+
						jQuery('.widgets_section.section-header').height()+200;
			if(jQuery(window).scrollTop == ''){
				wnd = 800;
			}
			if(wnd >= oft){
				jQuery('.widget_skills .skills_row .progress').each(function(){
					var val = jQuery(this).find('.value').text();
						jQuery(this).animate({'width':val}, 1000, 'easeInQuint');
				});	
			}	
		}	
	}	
	else {
		return false;
	}
}
function formValidate(form, opt) {
	var error_msg = '';
	form.find(":input").each(function() {
		if (error_msg!='' && opt.exit_after_first_error) return;
		for (var i = 0; i < opt.rules.length; i++) {
			if (jQuery(this).attr("name") == opt.rules[i].field) {
				var val = jQuery(this).val();
				var error = false;
				if (typeof(opt.rules[i].min_length) == 'object') {
					if (opt.rules[i].min_length.value > 0 && val.length < opt.rules[i].min_length.value) {
						if (error_msg=='') jQuery(this).get(0).focus();
						error_msg += '<p class="error_item">' + (typeof(opt.rules[i].min_length.message)!='undefined' ? opt.rules[i].min_length.message : opt.error_message_text ) + '</p>'
						error = true;
					}
				}
				if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].max_length) == 'object') {
					if (opt.rules[i].max_length.value > 0 && val.length > opt.rules[i].max_length.value) {
						if (error_msg=='') jQuery(this).get(0).focus();
						error_msg += '<p class="error_item">' + (typeof(opt.rules[i].max_length.message)!='undefined' ? opt.rules[i].max_length.message : opt.error_message_text ) + '</p>'
						error = true;
					}
				}
				if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].mask) == 'object') {
					if (opt.rules[i].mask.value != '') {
						var regexp = new RegExp(opt.rules[i].mask.value);
						if (!regexp.test(val)) {
							if (error_msg=='') jQuery(this).get(0).focus();
							error_msg += '<p class="error_item">' + (typeof(opt.rules[i].mask.message)!='undefined' ? opt.rules[i].mask.message : opt.error_message_text ) + '</p>'
							error = true;
						}
					}
				}
				if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].equal_to) == 'object') {
					if (opt.rules[i].equal_to.value != '' && val!=jQuery(jQuery(this).get(0).form[opt.rules[i].equal_to.value]).val()) {
						if (error_msg=='') jQuery(this).get(0).focus();
						error_msg += '<p class="error_item">' + (typeof(opt.rules[i].equal_to.message)!='undefined' ? opt.rules[i].equal_to.message : opt.error_message_text ) + '</p>'
						error = true;
					}
				}
				if (opt.error_fields_class != '') jQuery(this).toggleClass(opt.error_fields_class, error);
			}
		}
	});
	if (error_msg!='' && opt.error_message_show) {
		error_msg_box = form.find(".result");
		if (error_msg_box.length == 0) {
			form.append('<div class="result"></div>');
			error_msg_box = form.find(".result");
		}
		if (opt.error_message_class) error_msg_box.toggleClass(opt.error_message_class, true);
		error_msg_box.html(error_msg).fadeIn();
		setTimeout("error_msg_box.fadeOut()", opt.error_message_time);
	}
	return error_msg!='';
}


function getCookie(name) {
	var defa = arguments[1]!='undefined' ? arguments[1] : null;
	var start = document.cookie.indexOf(name + '=');
	var len = start + name.length + 1;
	if ((!start) && (name != document.cookie.substring(0, name.length))) {
		return defa;
	}
	if (start == -1)
		return defa;
	var end = document.cookie.indexOf(';', len);
	if (end == -1)
		end = document.cookie.length;
	return unescape(document.cookie.substring(len, end));
}


function setCookie(name, value, expires, path, domain, secure) {
	var today = new Date();
	today.setTime(today.getTime());
	if (expires) {
		expires = expires * 1000;		// * 60 * 60 * 24;
	}
	var expires_date = new Date(today.getTime() + (expires));
	document.cookie = name + '='
			+ escape(value)
			+ ((expires) ? ';expires=' + expires_date.toGMTString() : '')
			+ ((path)    ? ';path=' + path : '')
			+ ((domain)  ? ';domain=' + domain : '')
			+ ((secure)  ? ';secure' : '');
}


function deleteCookie(name, path, domain) {
	if (getCookie(name))
		document.cookie = name + '=' + ((path) ? ';path=' + path : '')
				+ ((domain) ? ';domain=' + domain : '')
				+ ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

jQuery(window).scroll(function(){
	skills_anim();
});
jQuery(window).load(function(){
	skills_anim();
	pagesBuild();
	if(jQuery('.skills_items').length) {
		jQuery('.skills_items').isotope({ filter: getIsotopeFilter() });
		jQuery('.skills_items').css('height', '300px').find('article').css('transform' ,'none');
	}
});
$(function() {


    // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});