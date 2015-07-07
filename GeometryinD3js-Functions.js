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

function pointArray(centreX, centreY, label, array) {
  // Allows creating a point with a centre and a label.
  // An alternate version which adds the point to an already-defined array (such as var pointsArray = [ ]; )
  // reduces var A = {cx:80, cy:160, label:"A"}; to A = new point( 80, 160, "A");
  this.cx = centreX;
  this.cy = centreY;
  this.label = label;
  array.push(this);
}

function circle(point, radius){
  // Simply draws a circle. Does not create variables such as "circle1 = new circle(A, 50)"
  drawing.append("circle")
  .style("stroke", "black")
  .style("fill", "none")
  .attr("r", radius)
  .attr("cx", point.cx)
  .attr("cy", point.cy);
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