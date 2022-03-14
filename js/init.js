/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function () {
  /*----------------------------------------------------*/
  /*	Add Navigation icons
------------------------------------------------------*/
  $.get("pages.json", function (data, status) {
    let pages = data;
    let pagesHtml = "";
    let loc = $(location).attr("href");
    loc = loc.substring(loc.lastIndexOf("/") + 1);
    for (let i = 0; i < pages.length; i++) {
      let isCurrent = pages[i].file === loc;
      if (pages[i].children) {
        pagesHtml +=
          '<li><span><a href="' +
          pages[i].file +
          '">' +
          pages[i].displayLabel +
          "</a></span><ul>";
        for (let j = 0; j < pages[i].children.length; j++) {
          pagesHtml +=
            '<li><a href="' +
            pages[i].children[j].file +
            '">' +
            pages[i].children[j].displayLabel +
            "</a></li>";
        }
        pagesHtml += "</ul></li>";
      } else {
        pagesHtml += "<li";
        if (isCurrent) {
          pagesHtml += ' class="current"';
        }
        pagesHtml += ">";
        pagesHtml +=
          '<a href="' +
          pages[i].file +
          '">' +
          pages[i].displayLabel +
          "</a></li>";
      }
    }
    $("#nav").append(pagesHtml);
  });

  /*----------------------------------------------------*/
  /*	Navigation - Double Tap to Go
------------------------------------------------------*/

  $("#nav li:has(ul)").doubleTapToGo();

  /*----------------------------------------------------*/
  /*	Back To Top Button
/*----------------------------------------------------*/
  var pxShow = 300; //height on which the button will show
  var fadeInTime = 400; //how slow/fast you want the button to show
  var fadeOutTime = 400; //how slow/fast you want the button to hide
  var scrollSpeed = 300; //how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

  // Show or hide the sticky footer button
  jQuery(window).scroll(function () {
    if (jQuery(window).scrollTop() >= pxShow) {
      jQuery("#go-top").fadeIn(fadeInTime);
    } else {
      jQuery("#go-top").fadeOut(fadeOutTime);
    }
  });

  // Animate the scroll to top
  jQuery("#go-top a").click(function () {
    jQuery("html, body").animate({ scrollTop: 0 }, scrollSpeed);
    return false;
  });

  /*----------------------------------------------------*/
  /*	Flexslider
/*----------------------------------------------------*/
  $("#intro-slider").flexslider({
    namespace: "flex-",
    controlsContainer: "",
    animation: "fade",
    controlNav: false,
    directionNav: true,
    smoothHeight: true,
    slideshowSpeed: 7000,
    animationSpeed: 600,
    randomize: false,
  });

  /*----------------------------------------------------*/
  /*	contact form
------------------------------------------------------*/

  $("form#contactForm button.submit").click(function () {
    $("#image-loader").fadeIn();

    var contactName = $("#contactForm #contactName").val();
    var contactEmail = $("#contactForm #contactEmail").val();
    var contactSubject = $("#contactForm #contactSubject").val();
    var contactMessage = $("#contactForm #contactMessage").val();

    var data =
      "contactName=" +
      contactName +
      "&contactEmail=" +
      contactEmail +
      "&contactSubject=" +
      contactSubject +
      "&contactMessage=" +
      contactMessage;

    $.ajax({
      type: "POST",
      url: "inc/sendEmail.php",
      data: data,
      success: function (msg) {
        // Message was sent
        if (msg == "OK") {
          $("#image-loader").fadeOut();
          $("#message-warning").hide();
          $("#contactForm").fadeOut();
          $("#message-success").fadeIn();
        }
        // There was an error
        else {
          $("#image-loader").fadeOut();
          $("#message-warning").html(msg);
          $("#message-warning").fadeIn();
        }
      },
    });

    return false;
  });
});
