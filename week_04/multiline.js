let height = 500,
    width = 800,
    margin = ({ top: 25, right: 30, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;

const svg = d3.select("#chart") // pick up svg and put inside 
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.csv("long-term-interest-G7.csv").then(data => {
  let timeParse = d3.timeParse("%Y-%m");

  let countries = new Set();

  for (let d of data) {
    d.Date = timeParse(d.Date); // loop thru and add new unique countries to the set
    d.Value = +d.Value;
    countries.add(d.Location);
  }

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Value))
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d + "%"));

  let line = d3.line() // defining what the generator should od
    .x(d => x(d.Date))
    .y(d => y(d.Value));
 
  for (let country of countries) {
    let countryData = data.filter(d => d.Location === country); // for each country that you're on, append

    let g = svg.append("g")
      .attr("class", "country")
      .on('mouseover', function () { // interactive element. ify ou're on the class it's blue else gray
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });

    if (country === "USA") {
      g.classed("highlight", true); // default = highlight blue
    }

    g.append("path")
      .datum(countryData) // give the generator the data
      .attr("fill", "none") // 
      .attr("stroke", "#ccc") // here we append the path
      .attr("d", line)

    let lastEntry = countryData[countryData.length - 1]; //last piece of data to position text x and y

    g.append("text") // positioning of end-of-line-label
      .text(country)
      .attr("x", x(lastEntry.Date) + 3)
      .attr("y", y(lastEntry.Value))
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999");
  }
  
});