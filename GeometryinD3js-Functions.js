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
