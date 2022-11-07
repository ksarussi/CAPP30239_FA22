d3.csv("data.csv").then(data => {

    const height = 500, // Define height, width and margin buffers for chart
          width = 750,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#chart") 
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // resizes chart based on window
    

    var data = d3.rollups(data, v => d3.sum(v, d => d.Fled), d => d.State)
        .sort(function(a, b){return b[1] - a[1]})
        .slice(0, 10);
    
    let states = []
    let counts = []
    for (let [state, count] of data) {
        states.push(state)
        count = +count
        counts.push(count)
    }

    let x = d3.scaleBand() // Provides data, positioning, and dimensions for elements on x-axis
        .domain(states)
        .range([margin.left, width - margin.right])
        .padding(0.1);
    
    let y = d3.scaleLinear() // Provides data and dimensions for elements on y-axis
        .domain([0, counts[0]]).nice()
        .range([height - margin.bottom, margin.top]);
    
    svg.append("g") // places x axis at bottom
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));
    
    svg.append("g") // places y-axis on left
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    let bar = svg.selectAll(".bar") // group bars for the chart
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");
    
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Individuals Killed While Fleeing Police");

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("State");

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Individuals killed");

    bar.append("rect") // add, color, and scale rectangles based on data
        .attr("fill", (d, i) => d3.schemeCategory10[i])
        .attr("x", d => x(d[0]))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d[1]))
        .attr("height", d => y(0) - y(d[1]));
    
    bar.append('text') // adds data labels at tops of rectangles
        .text(d => d[1]) // 
        .attr('x', d => x(d[0]) + (x.bandwidth()/2))
        .attr('y', d => y(d[1]) - 5)
        .attr('text-anchor', 'middle')
        .style('fill', 'steelblue');
});