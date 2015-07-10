function point(centreX, centreY, label) {

  myPoint = drawing.append("circle")
  .style("stroke", "none") // Do not draw the line
  .style("fill", "none")   // Do not fill
  .attr("r", 0)            //radius = 0
  .attr("cx", centreX)
  .attr("cy", centreY)
  .attr("label", label)    //This is optional.
                           //It follows geometry textbooks

  return myPoint
}

function circle(centrePoint, radius, colour){
  // Simply draws a circle. Returns an object such as "circle1 = new circle(A, 50)"
  if (typeof colour == 'undefined'){
    colour = "black";
  }
  
  myCircle = drawing.append("circle")
  .style("stroke", colour)
  .style("fill", "none")
  .attr("r", radius)
  .attr("cx", centrePoint.attr("cx"))
  .attr("cy", centrePoint.attr("cy"))
  .attr("label", "Circle".concat(centrePoint.attr("label"))) //This returns "CircleA" if point A has a label of "A"
  ;

  return myCircle;
}


function circleFilled (centrePoint, radius, colour){
  // Simply draws a circle. Returns an object such as "circle1 = new circleFilled(A, 50)"
  if (typeof colour == 'undefined'){
    colour = "black";
  }
  
  myFilledCircle = drawing.append("circle")
  .style("stroke", "none")
  .style("fill", colour)
  .attr("r", radius)
  .attr("cx", centrePoint.attr("cx"))
  .attr("cy", centrePoint.attr("cy"))
  .attr("label", "Circle".concat(centrePoint.attr("label"))) //This returns "CircleA" if point A has a label of "A"

  return myFilledCircle;
}
