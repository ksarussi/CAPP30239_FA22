let height = 400,
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 });

    // html id = chart, select that and insert an svg object along with a viewbox
    // viewbox changes the size based on your screensize
    // appending svg into div id chart
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

    // loads your ata
d3.csv('penguins.csv').then(data => {
  
    // declare x and y scales. domain = data. range = space it takes up on teh page
  let x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.body_mass_g)).nice()
    .range([margin.left, width - margin.right]);

    // y scale uses domain = data, range = 
  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice()
    .range([height - margin.bottom, margin.top]);

    // create teh axis 
    // tick size is drawing the lines all the way across
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom))

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))
 
  svg.append("g") // taking a variable, adding "group" and adding circles
    .attr("fill", "black")
    .selectAll("circle") // select circle before putting circle on the page
    .data(data)
    .join("circle")
    .attr("cx", d => x(d.body_mass_g)) // position it with cx and cy 
    .attr("cy", d => y(d.flipper_length_mm))
    .attr("r", 2)
    .attr("opacity", 0.75);

    // everything from here ot the end creates a mouse over tool
  const tooltip = d3.select("body").append("div")
    .attr("class", "svg-tooltip") // comes fro mcss  - see styles.css
    .style("position", "absolute")
    .style("visibility", "hidden");

  d3.selectAll("circle")
    .on("mouseover", function(event, d) {
      d3.select(this).attr("fill", "red");
      tooltip
        .style("visibility", "visible")
        .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`);
    })
    .on("mousemove", function(event) { // these tlast wto chunks give us our legend/label for the tool tip
      tooltip // so it's close ot hte circle
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill", "black");
      tooltip.style("visibility", "hidden");
    }) // use css to make tooltips look better
    
});