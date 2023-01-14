
let toggleNavStatus = false;

let toggleNav = function () {
    let getSidebar = document.querySelector(".navbar-menu");
    let getSidebarUL = document.querySelector(".side-nav ul");
    let getSidebarLinks = document.querySelectorAll(".side-nav a");
    let getSidebarVisibility = document.querySelector(".side-nav");
		var body = document.getElementsByTagName("body");
    var htmlGrab = document.querySelector("html");

    const hamburger = document.querySelector('.hamburger');

    hamburger.classList.toggle('is-active');

    if (toggleNavStatus === false) {
			
      getSidebarVisibility.style.visibility = "visible";
      getSidebarVisibility.style.pointerEvents = "initial";

      getSidebarLinks.forEach((item, index)=>{
        console.log(item);
        item.style.opacity = "1";
        item.style.visibility = "visible";
        });
      getSidebar.classList.add("menu-open");
      htmlGrab.classList.add("clicked");
      toggleNavStatus = true;
      getSidebarUL.classList.add("clicked");
			body[0].classList.add("pos-fixed");
    } 

    else if (toggleNavStatus === true) {

        //  getSidebarLinks.forEach((item, index)=>{
        //   item.style.opacity = "0";
        //   item.style.transitionDelay = "0s";
        //   item.style.visibility = "hidden";
        //  });
        
        htmlGrab.classList.remove("clicked");
        toggleNavStatus = false;
				getSidebar.classList.remove("menu-open");
				body[0].classList.remove("pos-fixed");
        servicesUL.classList.remove("clicked");
        getSidebarVisibility.style.pointerEvents = "none";
    }
}


// ------------------------------------------------- DARK MODE -----------------------------

/* Body and Core Elements */
var body = document.querySelector("body");

// Dark Mode Action
let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector('.dark-mode-button');
// for an optional footer dark mode button as well
const darkModeToggleFooter = document.querySelector('footer .dark-mode-button');

// This is where you add the dakr mode class.  When the dark mode is enabled as true in localstorage,
// it will add all the dark-mode classes to the elements we created in the variables above
const enableDarkMode = () => {

// Core dark mode styles
body.classList.add("dark-mode");
localStorage.setItem("darkMode", "enabled")
}

// This is where we remove dark mode.  Just copy and paste all the lines where you added a class
// and paste them into this function, then change "addClass" to "removeClass"
const disableDarkMode = () => {

body.classList.remove("dark-mode");
localStorage.setItem("darkMode", null)
}

if (darkMode == "enabled") {
enableDarkMode();
}

// add event listener to the dark mode button toggle
darkModeToggle.addEventListener('click', () => {
// on click, check localstorage for the dark mode value
darkMode = localStorage.getItem("darkMode");
if (darkMode !== "enabled") {
  // if dark mode is not enabled, run this function to set it to enabled
  enableDarkMode();
} else {
  // if dark mode is enabled, run this function to set it to disabled
  disableDarkMode();
}
})




// FAQ BLOCK

jQuery(document).ready(function($){
	//update these values if you change these breakpoints in the style.css file (or _layout.scss if you use SASS)
	var MqM= 768,
		MqL = 1024;

	var faqsSections = $('.cd-faq-group'),
		faqTrigger = $('.cd-faq-trigger'),
		faqsContainer = $('.cd-faq-items'),
		faqsCategoriesContainer = $('.cd-faq-categories'),
		faqsCategories = faqsCategoriesContainer.find('a'),
		closeFaqsContainer = $('.cd-close-panel');
	
	//select a faq section 
	faqsCategories.on('click', function(event){
		event.preventDefault();
		var selectedHref = $(this).attr('href'),
			target= $(selectedHref);

		// if
		// ( $(window).width() < MqM) 
		{
			faqsContainer.scrollTop(0).addClass('slide-in').children('ul').removeClass('selected').end().children(selectedHref).addClass('selected');
			closeFaqsContainer.addClass('move-left');
			$('body').addClass('cd-overlay');
		} 
		// else 
		// {
	  //       $('body,html').animate({ 'scrollTop': target.offset().top - 20}, 400); 
		// }
	});

	//close faq lateral panel - mobile only
	$('body').bind('click touchstart', function(event){
		if( $(event.target).is('body.cd-overlay') || $(event.target).is('.cd-close-panel')) { 
			closePanel(event);
		}
	});
	faqsContainer.on('swiperight', function(event){
		closePanel(event);
	});

	//show faq content clicking on faqTrigger
	faqTrigger.on('click', function(event){
		event.preventDefault();
		$(this).next('.cd-faq-content').slideToggle(200).end().parent('li').toggleClass('content-visible');
	});

	//update category sidebar while scrolling
	$(window).on('scroll', function(){
		if ( $(window).width() > MqL ) {
			(!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory); 
		}
	});

	$(window).on('resize', function(){
		if($(window).width() <= MqL) {
			faqsCategoriesContainer.removeClass('is-fixed').css({
				'-moz-transform': 'translateY(0)',
			    '-webkit-transform': 'translateY(0)',
				'-ms-transform': 'translateY(0)',
				'-o-transform': 'translateY(0)',
				'transform': 'translateY(0)',
			});
		}	
		if( faqsCategoriesContainer.hasClass('is-fixed') ) {
			faqsCategoriesContainer.css({
				'left': faqsContainer.offset().left,
			});
		}
	});

	function closePanel(e) {
		e.preventDefault();
		faqsContainer.removeClass('slide-in').find('li').show();
		closeFaqsContainer.removeClass('move-left');
		$('body').removeClass('cd-overlay');
	}

	function updateCategory(){
		updateCategoryPosition();
		updateSelectedCategory();
	}

	function updateCategoryPosition() {
		var top = $('.cd-faq').offset().top,
			height = jQuery('.cd-faq').height() - jQuery('.cd-faq-categories').height(),
			margin = 20;
		if( top - margin <= $(window).scrollTop() && top - margin + height > $(window).scrollTop() ) {
			var leftValue = faqsCategoriesContainer.offset().left,
				widthValue = faqsCategoriesContainer.width();
			faqsCategoriesContainer.addClass('is-fixed').css({
				'left': leftValue,
				'top': margin,
				'-moz-transform': 'translateZ(0)',
			    '-webkit-transform': 'translateZ(0)',
				'-ms-transform': 'translateZ(0)',
				'-o-transform': 'translateZ(0)',
				'transform': 'translateZ(0)',
			});
		} else if( top - margin + height <= $(window).scrollTop()) {
			var delta = top - margin + height - $(window).scrollTop();
			faqsCategoriesContainer.css({
				'-moz-transform': 'translateZ(0) translateY('+delta+'px)',
			    '-webkit-transform': 'translateZ(0) translateY('+delta+'px)',
				'-ms-transform': 'translateZ(0) translateY('+delta+'px)',
				'-o-transform': 'translateZ(0) translateY('+delta+'px)',
				'transform': 'translateZ(0) translateY('+delta+'px)',
			});
		} else { 
			faqsCategoriesContainer.removeClass('is-fixed').css({
				'left': 0,
				'top': 0,
			});
		}
	}

	function updateSelectedCategory() {
		faqsSections.each(function(){
			var actual = $(this),
				margin = parseInt($('.cd-faq-title').eq(1).css('marginTop').replace('px', '')),
				activeCategory = $('.cd-faq-categories a[href="#'+actual.attr('id')+'"]'),
				topSection = (activeCategory.parent('li').is(':first-child')) ? 0 : Math.round(actual.offset().top);
			
			if ( ( topSection - 20 <= $(window).scrollTop() ) && ( Math.round(actual.offset().top) + actual.height() + margin - 20 > $(window).scrollTop() ) ) {
				activeCategory.addClass('selected');
			}else {
				activeCategory.removeClass('selected');
			}
		});
	}
});

// FAQ REVEAL CODE




$(document).ready(function(){
	let expanded = false;
  $("#web-faq-block").click(function(){

		if (expanded == false )
    {$("#web-faq-block.faq-block").addClass("is-open")
			$(".web-reveal").addClass("expand");
		expanded = true}
		else {$("#web-faq-block.faq-block").removeClass("is-open")
			$(".web-reveal").removeClass("expand")
		expanded = false;}
  });
});
$(document).ready(function(){
	let expanded = false;
	$("#e-commerce-faq-block").click(function(){

		if (expanded == false )
    {$("#e-commerce-faq-block.faq-block").addClass("is-open");
			$(".e-commerce-reveal").addClass("expand");
		expanded = true}
		else {$("#e-commerce-faq-block.faq-block").removeClass("is-open")
			$(".e-commerce-reveal").removeClass("expand")
		expanded = false;}
  });
});
$(document).ready(function(){
	let expanded = false;
	$("#seo-faq-block").click(function(){

		if (expanded == false )
    {$("#seo-faq-block.faq-block").addClass("is-open");
			$(".seo-reveal").addClass("expand");
		expanded = true}
		else {$("#seo-faq-block.faq-block").removeClass("is-open");
			$(".seo-reveal").removeClass("expand");
		expanded = false;}
  });
});

// $(document).ready(function(){
// 	let expanded = false;
// $("#e-commerce-faq-block").click(function(){

// 	if (expanded == false )
// 	{$(".reveal").addClass("expand");
// 	expanded = true}
// 	else {$(".reveal").removeClass("expand")
// 	expanded = false;}
// });
// });
// CONTACT FORM SELECT ALL SCRIPT

function toggle() {
	if ($('#formSelectAll').prop("checked") == true) {
		if (
			$('.formCheckbox').prop("checked", true)) {
			$("#selectAllLabel")[0].innerText = "Deselect All";
			$$('.formCheckbox').click();

		}


	}

	else if ($('#formSelectAll').prop("checked", false)) if ($('.formCheckbox').prop("checked", true)) {
		$("#selectAllLabel")[0].innerText = "Select All"
		$('.formCheckbox').click()

	}
}

