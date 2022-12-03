// set the dimensions and margins of the graph
const margin = {top: 20, right: 30, bottom: 50, left: 120},
    width = 300,
    height = 200;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("viewBox", [0, 0, width, height]);

svg.append('text') // svgs grow downward
    .attr("class", "x-label")
    .attr('text-anchor', 'end')
    .attr("x", width - margin.right + 25)
    .attr("y", height + 45)
    .text("Percent")


// Parse the Data
//d3.csv("data/location_2017.csv").then(function(data) {

Promise.all([
    d3.csv('data/location_all_years.csv'),
    d3.csv('data/location_2017.csv'),
    d3.csv('data/location_2018.csv'),
    d3.csv('data/location_2019.csv'),
    d3.csv('data/location_2020.csv'),
    d3.csv('data/location_2021.csv'),
    d3.csv('data/location_2022.csv')

]).then((data) => {  
    // Add X axis
    const x = d3.scaleLinear()
    .domain([0, 50])
    .range([ 0, width]);

    const binGroups = svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

  //Bars
    function updateChart(i) {
    //Bars
    console.log(data[i])

        // Y axis
        const y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data[i].map(d => d.PEDPEDAL_LOCATION))
        .padding(.1);
    
         // Remove exisiting left axis using id name
         d3.select('#horiz_bar_axis_container').remove();

         // Creates a <g> with horiz_bar_axis_container id name to make it easier to remove
         const leftAxis = svg.append("g").attr('id', 'horiz_bar_axis_container');
         leftAxis.call(d3.axisLeft(y));
 
         svg.selectAll("rect")
             .data(data[i])
             .join(
                 enter => {
                   return enter.append("rect")
                 },

                
         ).transition()
         .duration(750)
         .attr("x", x(0) )
         .attr("y", d => y(d.PEDPEDAL_LOCATION))
         .attr("width", d => x(d.value))
         .attr("height", y.bandwidth())
         .attr("fill", "#002051")



            // .join("rect")
        // );
    }
    updateChart(0);

    d3.selectAll("select")
        .on("change", function (event) {
            const i = parseInt(event.target.value);
            console.log(i)
        updateChart(i);
    });
    // 
});

