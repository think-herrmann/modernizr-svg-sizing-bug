"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = registerPlugin;


/**
  Detects an obnoxous SVG sizing issue in IE11. Basically SVG's with width 100%
  and no defined height do not properly scale in IE11. The detect works by drawing
  a rect that should be 200px high, but is not in IE11. We then use the CSS class
  svg-width-sizing-bug to explicitly set a height on our svgs in IE11
*/

function registerPlugin(Modernizr) {
  Modernizr.addTest('svg-width-sizing-bug', function () {
    var document = window.document;
    var svgns = "http://www.w3.org/2000/svg";
    var div = document.createElement("div");
    div.setAttribute("style", "width:200px;");
    var svg = document.createElementNS(svgns, "svg");
    svg.setAttributeNS(null, "viewBox", "0 0 100 100");
    svg.setAttributeNS(null, "width", "100%");

    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', 0);
    rect.setAttributeNS(null, 'y', 0);
    rect.setAttributeNS(null, 'height', '100');
    rect.setAttributeNS(null, 'width', '100');
    svg.appendChild(rect);
    div.appendChild(svg);
    document.body.appendChild(div);
    var bounds = rect.getBoundingClientRect();
    document.body.removeChild(div);
    if (bounds.height != 200) {
      return true;
    }
    return false;
  });
}