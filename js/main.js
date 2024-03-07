$(function () {
  var siteSticky = function () {
    $(".js-sticky-header").sticky({ topSpacing: 0 });
  };
  siteSticky();

  var siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      var $this = $(this);
      $this
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      var counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter,
        });

        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter,
        });

        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function (e) {
      var $this = $(this);
      if ($this.closest("li").find(".collapse").hasClass("show")) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function () {
      var $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
      var $this = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
        $this.removeClass("active");
      } else {
        $("body").addClass("offcanvas-menu");
        $this.addClass("active");
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function (e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });
  };
  siteMenuClone();

  var limits = 15.0;

  $(".card").mousemove(function (e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
    var offsetX = x / rect.width;
    var offsetY = y / rect.height;

    var rotateY = offsetX * (limits * 2) - limits;
    var rotateX = offsetY * (limits * 2) - limits;

    var shadowOffsetX = offsetX * 32 - 16;
    var shadowOffsetY = offsetY * 32 - 16;

    $(this).css({
      "box-shadow":
        (1 / 6) * -shadowOffsetX +
        "px " +
        (1 / 6) * -shadowOffsetY +
        "px 3px rgba(0, 0, 0, 0.051), " +
        (2 / 6) * -shadowOffsetX +
        "px " +
        (2 / 6) * -shadowOffsetY +
        "px 7.2px rgba(0, 0, 0, 0.073), " +
        (3 / 6) * -shadowOffsetX +
        "px " +
        (3 / 6) * -shadowOffsetY +
        "px 13.6px rgba(0, 0, 0, 0.09), " +
        (4 / 6) * -shadowOffsetX +
        "px " +
        (4 / 6) * -shadowOffsetY +
        "px 24.3px rgba(0, 0, 0, 0.107), " +
        (5 / 6) * -shadowOffsetX +
        "px " +
        (5 / 6) * -shadowOffsetY +
        "px 45.5px rgba(0, 0, 0, 0.129), " +
        -shadowOffsetX +
        "px " +
        -shadowOffsetY +
        "px 109px rgba(0, 0, 0, 0.18)",
      transform:
        "perspective(1000px) rotateX(" +
        -rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg)",
    });

    var glarePos = rotateX + rotateY + 90;
    $(this)
      .children()
      .children()
      .css("left", glarePos + "%");
  });

  $(".card").mouseleave(function (e) {
    $(".card").css({
      "box-shadow":
        "0px 0px 3px rgba(0, 0, 0, 0.051), 0px 0px 7.2px rgba(0, 0, 0, 0.073), 0px 0px 13.6px rgba(0, 0, 0, 0.09), 0px 0px 24.3px rgba(0, 0, 0, 0.107), 0px 0px 45.5px rgba(0, 0, 0, 0.129), 0px 0px 109px rgba(0, 0, 0, 0.18)",
      transform: "scale(1.0)",
    });
    $(".glare").css("left", "100%");
  });
});
