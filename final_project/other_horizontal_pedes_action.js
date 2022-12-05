/* Horizontal bar source - CAPP30239 Course */

d3.csv("data/action_all_years.csv").then(data => {

    for (let d of data) {
        d.value = +d.value;
    };

    data.sort((a, b) => b.value - a.value);
    const height = 550,
        width = 1200,
        margin = ({ top: 25, right: 150, bottom: 100, left: 450 }); 

    let svg = d3.select("#horizontal-chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); 

    let x = d3.scaleLinear() 
        .domain([0, 28])
        .range([margin.left, width - margin.right]);

    let y = d3.scaleBand()
        .domain(data.map(d => d.PEDPEDAL_ACTION)) 
        .range([margin.top, height - margin.bottom]) 
        .padding(0.1);

    svg.append("g") 
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) 
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`) 
        .call(d3.axisLeft(y)); 

    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g") 
        .attr("class", "bar");

    bar.append("rect") 
        .attr("fill", "#002051")
        .attr("x", margin.left)
        .attr("width", d => x(d.value) - margin.left)
        .attr("y", d => y(d.PEDPEDAL_ACTION)) 
        .attr("height", y.bandwidth());

    bar.append('text') // add labels
        .text(d => d.value)
        .attr('x', d => margin.left + x(d.value) - margin.left + 60)
        .attr('y', d => y(d.PEDPEDAL_ACTION) + (y.bandwidth() / 2) + 1)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'black')

    svg.append('text') // svgs grow downward
        .attr("class", "x-label")
        .attr('text-anchor', 'end')
        .attr("x", width - margin.right)
        .attr("y", height)
        .text("Percent");

});