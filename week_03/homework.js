/* Bar chart of number of visits to Chicago libraries on January 22*/ 

d3.csv("library_visits_jan22.csv").then(data => {

    for (let d of data) {
        d.num = +d.num; // force a number
    };

    // Create the height, width, and margins of SVG
    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    // Create an empty shell for our chart
    let svg = d3.select("#chart")
        .append("svg") // Create an SVG and append it to our div
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser

    // Create the x-axis scale (specifically for bar charts)
    let x = d3.scaleBand()
        .domain(data.map(d => d.branch)) // map values from csv
        .range([margin.left, width - margin.right]) // pixels on page
        .padding(0.1); // Specify the width of the bars

    // Construct y-axis with linear scale
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.num)]).nice() // use "max" to find what top value should be and round up with "nice"
        .range([height - margin.bottom, margin.top]); // svgs are built from top down, so this is reversed
    
    // Add x-axis and labels on the bottom
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 10})`) // 10 refers to distance from bars
        .attr("font-size","200")
        .call(d3.axisBottom(x));
    
    // Add y-axis on the left
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`) // 5 refers to distance from bars
        .call(d3.axisLeft(y));

    // Create bar groups
    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    // Put rectangle on the page for each bar group
    bar.append("rect")
        .attr("fill", "darkslateblue")
        .attr("x", d => x(d.branch)) // x position attribute
        .attr("width", x.bandwidth()) // this width is the width attr on the element
        .attr("y", d => y(d.num)) // y position attribute
        .attr("height", d => y(0) - y(d.num)); // this height is the height attr on element
    
    // Add value labels to top of each bar
    bar.append('text')
        .text(d => d.num) // specify "num" column as the value for text
        .attr('x', d => x(d.branch) + (x.bandwidth()/2))
        .attr('y', d => y(d.num) + -10)
        .attr('text-anchor', 'middle')
        .style('fill', 'black')

    // Add title to chart
        bar.append('text')
        .text(d => d.num)
        .attr('x', (width / 1.9))  
        .attr('y', 0 - (margin.top / 1))
        .attr('text-anchor', 'middle')
        .style('fill', 'black')
        .text("Library Visits on January 22")
        .style("font-size", "25px");

});