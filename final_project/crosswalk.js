// grid chart for crosswalk fatalities 

//Source: https://lvngd.com/blog/building-pictogram-grids-d3js/

(function grid_crosswalk() {

	// number of circles to color in to visualize percent
	var percentNumber = 65; // 0.2719665*240

	// variables for the font family, and some colors
	var fontFamily = "helvetica";
	var twitterFill = "#999999";
	var twitterFillActive = "#feba4a"; // before used fdea45
	var svgBackgroundColor = '#002051';

	// width and height of the SVG
	const width = 600, height = 600;

	// create an svg with width and height
	var svg = d3.select('#grid-chart')
		.append('svg')
		.attr("width", width)
		.attr("height", height)
    	.style('background-color', svgBackgroundColor)
        .attr("viewBox", [0, 0, width, height]);;

	// 10 rows and 10 columns 
	var numRows = 15;
	var numCols = 16;

	// x and y axis scales
	var y = d3.scaleBand()
		.range([0,400])
		.domain(d3.range(numRows));

	var x = d3.scaleBand()
		.range([0, 400])
		.domain(d3.range(numCols));

	// the data is just an array of numbers for each cell in the grid
	var data = d3.range(numCols*numRows);

	// container to hold the grid
	var container = svg.append("g")
		.attr("transform", "translate(110,120)");
	
	container.selectAll("circle")
			.data(data)
			.enter().append("circle")
			.attr("id", function(d){return "id"+d;})
			.attr('cx', function(d){return x(d%numCols);})
			.attr('cy', function(d){return y(Math.floor(d/numCols));})
			.attr('r', 12)
			.attr('fill', function(d){return d < percentNumber ? twitterFillActive : twitterFill;})
			.style('stroke', 'black');
    const annotation1 = [
        {
            note: {
            label: "Test",
            // title: "Annotation title",
            //align: "left",  // try right or left
            //wrap: 200,  // try something smaller to see text split in several lines
            //padding: 10   // More = text lower
            },
            color: ["white"],
            x: 100,
            y: 100,
            dy: 100,
            dx: 100
        }
        ]
        
    // Add annotation to the chart
    const makeAnnotations = d3.annotation()
        .annotations(annotations)
    d3.select("#grid-chart")
        .append("g")
        .call(makeAnnotations)
        
})();