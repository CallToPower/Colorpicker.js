/**
 *  Copyright (C) 2014-2015 Denis Meyer
 */
var debug = false;

var colorPicker;

(function ($) {
	$(document).ready(function () {
		$(document).on("cp:colorpicked", function (e, r, g, b, hex) {
			$("#color_current").html("rgb(" + r + ", " + g + ", " + b + "), hex(#" + hex + ")").css("color", "#" + hex);
		});
		
		colorPicker = new ColorPicker({
			debug: debug,
			canvasId: "canvas_colorPicker",
			imgSrc: "img/color_wheel.png",
			livePreview: true,
			livePreviewId: "livePreview"
		});
		colorPicker.init();
	});
})(jQuery);
