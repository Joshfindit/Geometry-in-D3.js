---
layout:     post
title:      Mise en place
date:       2043-06-13 12:31:19
summary:    Wrapping what we have in to functions.
categories: D3
---

So far, we've covered points, lines, and circles. Now let's wrap them in to functions that we can call as we move forward:



```js
function point(centreX, centreY, label) {
  // Creates a point and returns it

  var myPoint = drawing.append("circle")
  .style("stroke", "none") // Do not draw the line
  .style("fill", "none")   // Do not fill
  .attr("r", 0)            //radius = 0
  .attr("cx", centreX)
  .attr("cy", centreY)
  .attr("label", label)    //This is optional.
                           //It follows geometry textbooks

  return myPoint
}
```

```js
function lineFromTwoPoints( A, B, strokeWidth, colour ) {
  // Draws a line from two points, and returns the line

  var myLine = drawing.append("svg:line")
  .attr("x1", A.attr("cx"))
  .attr("y1", A.attr("cy"))
  .attr("x2", B.attr("cx"))
  .attr("y2", B.attr("cy"))
  .attr("stroke-width", strokeWidth)
  .style("stroke", colour);

  return myLine;
}
```

```js
function circle(centrePoint, radius){
  // Simply draws a circle and returns that circle
  
  var myCircle = drawing.append("circle")
    .style("stroke", "Black")
    .style("fill", "none")
    .attr("r", radius)
    .attr("cx", centrePoint.attr("cx"))
    .attr("cy", centrePoint.attr("cy"))

  return myCircle;
}
```

If you're starting out with Javascript (like I did when getting in to this), I suggest leaving everything as one file. It's easier to keep your hands on the code and understand what it's doing. It's also less cognitive load.

At some point, your explorations will grow too large to still be clear at a glance, and then you will want to split the functions in to a .js file. At that time, feel free to use the one on the repository. It's got a few extra features that may be confusing if you have not yet done your own exploring.
