---
layout:     post
title:      Setting the stage
date:       2043-06-09 12:31:19
summary:    Template HTML code, and the basics.
categories: D3 geometry
---

For those who don't know, using D3.js successfully requires some knowledge of HTML and CSS.
For the advanced topics, it helps to understand SVGs and how The Document Object Model (DOM) works.

For now, however, all we need to do is set the stage with some boilerplate HTML and CSS.

At the beginnning, let's combine everything in to one file. This is not the ***preferred*** way and we will split the files later as we progress, but it's the most straight-forward when starting out.

***
Create and save the following HTML file as “index.html”:
{% highlight html %}
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>D3 Sample</title>
    <style></style>
</head>

<body>
    <div id="D3js"></div>
    <script>
        var drawing = d3.select("#D3js") // select the 'D3js' element. Element name should not have a period.
        .append("svg")                   //Add SVG to the selected element

        // ----
        // This is where the D3 code will go, using 'drawing' as the main element
        // ----

    </script>
    <script src="http://d3js.org/d3.v3.min.js"></script>
</body>
</html>
{% endhighlight %}
***

Note: There are two ways to embed D3 in to an HTML page; one is via iframes (which does not fit well on mobile, I personally find), and the other is by targeting a CSS div, which we have done here.

To see the difference between the two embedding methods, refer to this excellent resource: [http://www.nicksuch.com/2014/03/26/d3-sample/](http://www.nicksuch.com/2014/03/26/d3-sample/)
