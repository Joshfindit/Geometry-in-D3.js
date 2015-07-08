//Functions
var scale = 1000000000;

function point(centreX, centreY, label) {
  // Allows creating a point with a centre and a label.
  // reduces var A = {cx:80, cy:160, label:"A"}; to A = new point( 80, 160, "A");
  // Some debate about this method: The ideal method would not 'draw' a circle
  // Also, it's more convenient to write A.cx instead of A.attr("cx")

  myPoint = drawing.append("circle")
  .classed('point', true)
  .style("stroke", "none")
  .style("fill", "none")
  .attr("r", 0)
  .attr("cx", centreX)
  .attr("cy", centreY)
  .attr("label", label)

  return myPoint
}

function lineFromTwoPoints( A, B, strokeWidth, colour ) {
  if (typeof colour == 'undefined'){
    colour = "rgba(0,0,50,1)";
  }
  if (typeof strokeWidth == 'undefined'){
    strokeWidth = 1;
  }

  var myLine = drawing.append("svg:line")
  //x to the left
  .attr("x1", A.attr("cx"))
  .attr("y1", A.attr("cy"))
  .attr("x2", B.attr("cx"))
  .attr("y2", B.attr("cy"))
  .attr("stroke-width", strokeWidth)
  .style("stroke", colour);

  return myLine;
}

function circle(point, radius, colour){
  // Simply draws a circle. Returns an object such as "circle1 = new circle(A, 50)"
  if (typeof colour == 'undefined'){
    colour = "black";
  }
  myCircle = drawing.append("circle")
  .style("stroke", colour)
  .style("fill", "none")
  .attr("r", radius)
  .attr("cx", point.attr("cx"))
  .attr("cy", point.attr("cy"))
  .attr("label", point.attr("label"))

  return myCircle;
}

function circleFilled (point, radius, colour){
  // Simply draws a circle. Does not create variables such as "circle1 = new circle(A, 50)"

  if (typeof colour == 'undefined'){
    colour = "black";
  }
  myFilledCircle = drawing.append("circle")
  .style("stroke", "none")
  .style("fill", colour)
  .attr("r", radius)
  .attr("cx", point.attr("cx"))
  .attr("cy", point.attr("cy"))
  .attr("label", point.attr("label"));

  return myFilledCircle;
}

function pointsOnACircle (whichpoint, numberOfPoints, point, radius) {
  //Returns a point along the outside of a circle, starting at (whichpoint=1) = 0 degress
  //Could be simpler and return an array containing all points, but ran in to problems when debugging: Adding all points to an array filled the array with a single point
  //Edited to introduce a scale, which should help with rounding errors

  //Normally used with:
  //       for (var i = 1; i < (numberOfPoints+1); i++) {
  //           pointsOnACircleArray[pointsOnACircleArray.length] = new pointsOnACircle (i, numberOfPoints, cx, cy, radius);
  //       }
  eachpoint = whichpoint * 2 * Math.PI /numberOfPoints;

  //var thisPoint = new point (cx + (radius * Math.sin(eachpoint)), cy - (radius * Math.cos(eachpoint)))
  // ^ without scaling
  //  var scale = 1000000000; //defined globally
  var eachpoint = (whichpoint * 2 * Math.PI /numberOfPoints);
  //We don't want to scale eachpoint

  var cxScaled = point.attr("cx") * scale;
  var cyScaled = point.attr("cy") * scale;
  var radiusScaled = radius * scale;

  var thisPointScaled = new point (Math.round(cxScaled + (radiusScaled * Math.sin(eachpoint))) / scale, Math.round(cyScaled - (radiusScaled * Math.cos(eachpoint))) /scale);
  return thisPointScaled;

}

function polyFromPoints (arrayOfPolyPoints, colour) {
  //Takes an array of points, and creates a closed polygon that joins them (in order)
  if (typeof colour == 'undefined'){
    colour = "black";
  }
  var myPoly = drawing.selectAll("drawing")
  .data([arrayOfPolyPoints])
  .enter().append("polygon")
  .attr("points",function(d) {
    return d.map(function(d) {
      return [d.attr("cx"), d.attr("cy")].join(",");
    }).join(" ");
  })
  .attr("stroke", colour)
  .attr("stroke-width",.5)
  .attr("fill", "none");

  return myPoly;
}

function polyFromPointsFilled (arrayOfPolyPointsToFill, colour) {
  //Takes an array of points, and creates a closed polygon that joins them (in order)
  if (typeof colour == 'undefined'){
    colour = "black";
  }
  filledPoly = drawing.selectAll("drawing")
  .data([arrayOfPolyPointsToFill])
  .enter().append("polygon")
  .attr("points",function(d) {
    return d.map(function(d) {
      return [d.attr("cx"), d.attr("cy")].join(",");
    }).join(" ");
  })
  .attr("stroke","none")
  .attr("stroke-width", .5)
  .attr("fill", colour);

  return filledPoly;
}

function hexToRgba(hex, alpha) {

  // Not my origional. If you find the author, please let me know so they can be credited

  // Note: d3 includes colour handling such as:
  // d3.rgb(hex) = an object with r:, g:, and b:
  // d3.rgb("#c0c0c0") = mt: mt
  //                       b: 192
  //                       g: 192
  //                       r: 192
  //                       __proto__: ot
  // d3.rgb("#c0c0c0").toString() = #c0c0c0



  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var toString = function () {
    if (this.alpha == undefined) {
      return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }
    if (this.alpha > 1) {
      this.alpha = 1;
    } else if (this.alpha < 0) {
      this.alpha = 0;
    }
    return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.alpha + ")";
  }
  if (alpha == undefined) {
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      toString: toString
    } : null;
  }
  if (alpha > 1) {
    alpha = 1;
  } else if (alpha < 0) {
    alpha = 0;
  }
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    alpha: alpha,
    toString: toString
  } : null;
}

function grid(width, height, divisor, strokeWidth) {
  // Brute force method for drawing a grid
  // Possible improvements:
  // -Is there a Built-in function for D3 that will accomplish this?
  // -Ability to label the lines with numbers

  if (typeof strokeWidth == 'undefined'){
    strokeWidth = 0.5;
  }

  for (var i = 0; i < (divisor + 1); i++) {
    var myLine = drawing.append("svg:line")
    //Draw the horizontal grid
    .attr("x1", width / divisor * i)
    .attr("y1", 0)
    .attr("x2", width / divisor * i)
    .attr("y2", height)
    .attr("stroke-width",strokeWidth)
    .attr("class","horizontalGrid")
    .style("stroke", "rgb(0,0,50)");
  }

  for (var i = 0; i < (divisor + 1); i++) {
    //Draw the vertical grid
    var myLine = drawing.append("svg:line")
    .attr("y1", height / divisor * i)
    .attr("x1", 0)
    .attr("y2", height / divisor * i)
    .attr("x2", width)
    .attr("stroke-width",strokeWidth)
    .style("class", "veriticalGrid")
    .style("stroke", "rgb(0,0,50)");
  }
}

function gridFromCentrePoint(point, width, height, divisor, strokeWidth) {
  if (typeof strokeWidth == 'undefined'){
    strokeWidth = 0.5;
  }

  for (var i = 0; i < ((divisor / 2) + 1); i++) {
    var myLine = drawing.append("svg:line")
    //x to the left
    .attr("x1", parseInt(point.attr("cx")) - (width / divisor * i))
    .attr("y1", 0)
    .attr("x2", parseInt(point.attr("cx")) - (width / divisor * i))
    .attr("y2", height)
    .attr("stroke-width",strokeWidth)
    .style("stroke", "rgb(0,0,50)");
  }

  for (var i = 1; i < ((divisor / 2) + 1); i++) {
    var myLine = drawing.append("svg:line")
    //x to the right
    .attr("x1", parseInt(point.attr("cx")) + (width / divisor * i))
    .attr("y1", 0)
    .attr("x2", parseInt(point.attr("cx")) + (width / divisor * i))
    .attr("y2", height)
    .attr("stroke-width",strokeWidth)
    .style("stroke", "rgb(0,0,50)");
  }

  for (var i = 0; i < ((divisor / 2) + 1); i++) {
    var myLine = drawing.append("svg:line")
    //y to the top
    .attr("x1", 0)
    .attr("y1", parseInt(point.attr("cy")) - (height / divisor * i))
    .attr("x2", width)
    .attr("y2", parseInt(point.attr("cy")) - (height / divisor * i))
    .attr("stroke-width", strokeWidth)
    .style("stroke", "rgb(0,0,50)");
  }

  for (var i = 1; i < ((divisor / 2) + 1); i++) {
    var myLine = drawing.append("svg:line")
    //y to the bottom
    .attr("x1", 0)
    .attr("y1", parseInt(point.attr("cy")) + (height / divisor * i))
    .attr("x2", width)
    .attr("y2", parseInt(point.attr("cy")) + (height / divisor * i))
    .attr("stroke-width", strokeWidth)
    .style("stroke", "rgb(0,0,50)");
  }
}
