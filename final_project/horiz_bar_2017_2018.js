// set the dimensions and margins of the graph
const margin = {top: 20, right: 30, bottom: 40, left: 130},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Parse the Data
//d3.csv("data/location_2017.csv").then(function(data) {

Promise.all([
    d3.csv('data/location_2017.csv'),
    d3.json('data/location_2018.csv'),
    d3.json('data/location_2017.csv')
]).then((data) => {  


    // Add X axis
    const x = d3.scaleLinear()
    .domain([0, 1000])
    .range([ 0, width]);

    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y axis
    const y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(d => d.PEDPEDAL_LOCATION))
    .padding(.1);

    svg.append("g")
    .call(d3.axisLeft(y))
  
//   const something = svg.append("g")
//     .attr("class");

  //Bars
    function updateChart(i) {
    //Bars
        svg.selectAll("myRect")
            .data(data)
            .join("rect")
            .attr("x", x(0) )
            .attr("y", d => y(d.PEDPEDAL_LOCATION))
            .attr("width", d => x(d.value))
            .attr("height", y.bandwidth())
            .attr("fill", "#002051")

        update => {
            update.select("rect")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length))
                .attr("height", d => height - margin.bottom - y(d.length));

            update.select("text")
                .text(d => d.length)
                .transition()
                .duration(750)
                .attr("y", d => y(d.length) - 5);
            },

        exit => {
            exit.select("rect")
                .transition()
                .duration(750)
                .attr("height", 0)
                .attr("y", height - margin.bottom);

            exit.select("text")
                .text("");

            exit.transition()
                .duration(750)
                .remove();
            }
        // );
    }
    updateChart(0);

    d3.selectAll("select")
        .on("change", function (event) {
        const i = parseInt(event.target.value);
        updateChart(i);
    });
});