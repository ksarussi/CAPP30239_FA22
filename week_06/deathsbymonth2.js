
(function symbol() {
    // create variables for margins
    const height = 500,
        width = 800,
        margin = ({ top: 15, right: 30, bottom: 35, left: 70 });
        
    const svg = d3.select("#chart_line")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    // open up the data
    d3.csv('deathsbymonth.csv').then(data => {
        
        let timeParse = d3.timeParse("%Y-%m") // create time Parse function
        for (let d of data) {
            d.Num = +d.Num
            d.Month = timeParse(d.Month); //convert ot a number by using our TIMEPARSE FUNCTION
        }

        // check that we're getting SOMETHING in the console (f12 to open developer)
        console.log(data); 

        // declare our x scales
        let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Month))
        .range([margin.left, width - margin.right]);
        
        // declare our y xcales 
        let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Num)]).nice()
        .range([height - margin.bottom, margin.top]);

        svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0)); // tell it what scale we're using
        
        // adjust formatting of axes
        svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickPadding([14])
        .tickSizeOuter(0)
        .tickSize(-width)
        );

        // Add the points to the line
        svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.Month) } )
            .attr("cy", function(d) { return y(d.Num) } )
            .attr("r", 3)
            .attr("fill", "navy");

        // add the x-axis label
        svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height)
        .attr("dx", "0.5em")
        .attr("dy", "-0.08em") 
        .text("Month");
        
        // add the y-axis label
        svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr("x", -margin.top/2-5)
        .attr("dx", "-0.9em")
        .attr("y", 25)
        .attr("transform", "rotate(-90)")
        .text("Number of Deaths");

        let line = d3.line() // setting up variable line. D3.line is a line generator
            .x(d => x(d.Month)) // give it data by looping thru data use scale x that we created above
            .y(d => y(d.Num)); // line isn't on the page yet. this is just hte avlue of the line.

        svg.append("path") 
            .datum(data) // only using 1 datapoints building 1 path. whenever you use a line use datum
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "navy");

    });
})();