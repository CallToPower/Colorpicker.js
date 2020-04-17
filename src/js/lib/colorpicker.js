/**
 * Colorpicker.js
 * Version: 1.0.0
 *
 *  Copyright (C) 2014-2015 Denis Meyer
 */
var ColorPicker = function(cfg) {
    /* config */
    var config = cfg || {};
    var debug = cfg.debug || false;
    var log = cfg.log || function(msg) {
        if (debug) {
            console.log(msg);
        }
    }; // message/log function
    var imgSrc = config.imgSrc || "img/color_wheel.png";
    var canvasId = config.canvasId || "";
    var livePreview = config.livePreview || false;
    var livePreviewId = config.livePreviewId || "";

    /* misc */
    var canvas = (canvasId != "") ? document.getElementById(canvasId) : null;
    var context;

    /* constructs */

    color = {
        r: 0,
        g: 0,
        b: 0,
        hex: "000000"
    }

    /* functions: No export */

    function toHex(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) return "00";
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
    }

    function rgbToHex(r, g, b) {
        return toHex(r) + toHex(g) + toHex(b);
    }

    function init_helper() {
        var img = new Image();
        img.src = imgSrc;

        $(img).on('load', function() {
            if (context) {
                context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height);
            }
        });

        if (canvasId && (canvasId != "") && context) {
            $("#" + canvasId).click(function(event) {
                var x = event.offsetX;
                var y = event.offsetY;

                var img_data = context.getImageData(x, y, 1, 1).data;
                if (img_data.length >= 3) {
                    color.r = img_data[0];
                    color.g = img_data[1];
                    color.b = img_data[2];
                    color.hex = rgbToHex(color.r, color.g, color.b);
                    $(document).trigger("cp:colorpicked", [color.r, color.g, color.b, color.hex]);
                }
            }).mousemove(function() {
                if (livePreview) {
                    var x = event.offsetX;
                    var y = event.offsetY;

                    var img_data = context.getImageData(x, y, 1, 1).data;
                    if (img_data.length >= 3) {
                        color.r = img_data[0];
                        color.g = img_data[1];
                        color.b = img_data[2];
                        color.hex = rgbToHex(color.r, color.g, color.b);
                    }
                    $("#" + livePreviewId).html("#" + color.hex).css("color", "#" + color.hex);
                }
            });
        }
    }

    /* functions: Export */

    function setColor(r, g, b, hex) {
        color.r = r;
        color.g = g;
        color.b = b;
        color.hex = hex;
        $(document).trigger("cp:colorpicked", [color.r, color.g, color.b, color.hex]);
    }

    function init() {
        if (canvas) {
            context = canvas.getContext("2d");
            context.fillStyle = "#000000";
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            init_helper();
            $(document).trigger("cp:colorpicked", [color.r, color.g, color.b, color.hex]);
        }
    }

    this.setColor = setColor;
    this.init = init;
};
