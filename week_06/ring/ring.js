d3.json('budget-2022.json').then((data) => {
  const height = 400,
    width = 600,
    innerRadius = 125,
    outerRadius = 175,
    labelRadius = 200;

    
  const arcs = d3.pie().value(d => d.amount)(data); // converts data into pieces of the pie
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius); // creates a generator
  // call arc, give inner and outer radius value, then 
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    // first thing is appending g (group) then 
    // stroke line width white all are related to white space bewteen shapes
  svg.append("g") 
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .selectAll("path") // selecting all the paths, use data arcs
    .data(arcs) // data is teh data after going thru the pie function (similar to d3.bin)
    .join("path")
    .attr("fill", (d, i) => d3.schemeCategory10[i])
    .attr("d", arc); // d is the path, passing in arc
// all this is to place text
  svg.append("g")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text") // label
    .attr("transform", d => `translate(${arcLabel.centroid(d)})`) // centroid find the center of the 
    //arc and hten gives us the center avleu
    .selectAll("tspan") // add second line to the label (aka a line break)
    .data(d => {
      return [d.data.category, d.data.amount];
    })
    .join("tspan")
    .attr("x", 0)
    .attr("y", (d, i) => `${i * 1.1}em`)
    .attr("font-weight", (d, i) => i ? null : "bold")
    .text(d => d);

  svg.append("text")
    .attr("font-size", 30)
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("2022")
    .style("font-size", 20);
});