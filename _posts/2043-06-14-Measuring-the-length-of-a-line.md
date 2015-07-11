---
layout:     post
title:      Measuring the length of a line
date:       2043-06-14 12:31:19
summary:    (aka, the distance between the two end points)
categories: D3
---

We now have the ability to choose a point, and to draw a circle around that point. We also have the ability to draw a straight line from one point to another, but we're still missing some features of these basic tools.

Namely, the ability to adjust the compass to the distance between two points.

As we're using an (x, y) grid, we can use all sorts of well-tested equations. The "Distance Formula" is one such equation. As it's name implies, it finds the distance (between two points).

It's also known as the [Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem).

It goes like this: <img class="mwe-math-fallback-image-inline tex" alt=" c = \sqrt{a^2 + b^2}. \," src="http://upload.wikimedia.org/math/4/9/a/49a65217b7d35663efc6e558c0ffdba0.png">

If you want to understand how the distance (c) is found, I recommend reading through the linked article.

Following with previous articles, we're going to create a function that accepts two points:

```js
function distanceBetweenTwoPoints (pointA, pointB) {
  // Also known as "the distance formula" (a^2 + b^2 = c^2)
  // Note again that we're scaling the values in order to get accurate results

  distanceXScaled = ((pointB.attr("cx") *scale) - (pointA.attr("cx") *scale));
  distanceYScaled = ((pointB.attr("cy") *scale) - (pointA.attr("cy") *scale));

  lineLengthScaled = Math.sqrt(Math.pow(distanceXScaled, 2) + Math.pow(distanceYScaled, 2));

  lineLength = Math.round(lineLengthScaled) / scale;

  return lineLength;
}
```
This function returns the value, such as:

```js
pointA = new point(84, 84);
pointB = new point(168, 168);

result = distanceBetweenTwoPoints (pointA, pointB);

console.log(result); // 118.7939392393
```

<script>
    svgsize = 252;

    var margin = {top: 1, right: 1, bottom: 1, left: 1};

    var width = svgsize - margin.left - margin.right,
        height = svgsize - margin.top - margin.bottom;

    var drawing = d3.select(".D3Header").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    A = new point( 84, 84, "A (84, 84)");
    B = new point( 168, 168, "B (168, 168)");
    distance = distanceBetweenTwoPoints (A, B);
    distanceRounded = (Math.round(distance * 10))  /10;

    circleFilled(A, 7);
    circleFilled(B, 7);

    var myLine = drawing.append("svg:line")
    //x to the left
    .attr("x1", A.attr("cx"))
    .attr("y1", A.attr("cy"))
    .attr("x2", B.attr("cx"))
    .attr("y2", B.attr("cy"))
    .attr("stroke-width", 3)
	.style("font-size", "12px")
    .style("stroke", "black");
    
    drawing.append("text")
	.attr("x", parseInt(A.attr("cx")) + 7)
	.attr("y", parseInt(A.attr("cy")) - 7)
	.text(A.attr("label"))
	.style("font-size", "12px")
	.style("font-weight", "bold")

	drawing.append("text")
	.attr("x", parseInt(B.attr("cx")) + 7)
	.attr("y", parseInt(B.attr("cy")) - 7)
	.text(B.attr("label"))
	.style("font-size", "12px")
	.style("font-weight", "bold")
	
	drawing.append("text")
	.attr("x", 148)
	.attr("y", 30)
	.style("font-weight", "bold") //Usually we want labels to be bolded
	.style("font-size", "20px")
	.text(distanceRounded)
   .attr("transform", "rotate(45)");
</script>
