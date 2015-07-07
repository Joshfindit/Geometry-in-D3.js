//Functions


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
  .attr("cx", parseInt(centreX))
  .attr("cy", parseInt(centreY))
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

function pointsOnACircle (whichpoint, numberOfPoints, cx, cy, radius) {
  //Returns a point along the outside of a circle, starting at (whichpoint=1) = 0 degress
  //Could be simpler, but ran in to problems when debugging: Adding all points to an array filled the array with a single point

  //Normally used with:
  //       for (var i = 1; i < (numberOfPoints+1); i++) {
  //           pointsOnACircleArray[pointsOnACircleArray.length] = new pointsOnACircle (i, numberOfPoints, cx, cy, radius);
  //       }

  eachpoint = whichpoint * 2 * Math.PI/numberOfPoints;
  this.cx = cx+radius*Math.sin(eachpoint);
  this.cy = cy-radius*Math.cos(eachpoint);
}