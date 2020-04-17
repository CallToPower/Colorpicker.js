# ColorPicker.js

An HTML5 color picker.

Note: Uses HTML5 canvas features:

* "Fingerprinting" may be blocke by your browser
* This script does not work without it
* You have to click on the image and select "Allow HTML5 canvcas image data".

## Copyright

Copyright (C) 2014-2015 Denis Meyer

## Version

1.0.0

## Screenshot

![Screenshot](img/screenshot.png?raw=true)

## Configuration

```javascript
{
  debug:          true/false,         // default: false
  log:            logFunction,        // default: console.log when debug == true
  canvasId:       "theImageCanvasId",
  imgSrc:         "path/to/the/image",
  livePreview:    true/false,         // default: false
  livePreviewId:  "thePreviewDivID"   // default: ""
}
```

## Events

Colorpicker.js uses events to publish when a color has been picked by the user.
Simply subscribe to the event to get the selected color.

### Event `cp:colorPicked`

#### Parameters

* r
* g
* b
* hex

#### Description

When a color has been picked

#### Example

```javascript
$(document).on("cp:colorpicked", function (e, r, g, b, hex) {
    // Do something...
});
```
