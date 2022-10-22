/* D3 Line Chart */

const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('long-term-interest-monthly.csv').then(data => {
    
    let timeParse = d3.timeParse("%Y-%m") // formatting stuff in console. THIS CREATES A FUNCTION
    for (let d of data) {
        d.Value = +d.Value
        d.Date = timeParse(d.Date); //convert ot a number by using our TIMEPARSE FUNCTION
    }

    console.log(data); // chekc that w'er getting SOMETHING in the CONSOLE (Hit f12 to open developer)

    // declare our x and y scales
    let x = d3.scaleTime() // give it the d3 scale time function.each scale gets 2 things - domain and range
        .domain(d3.extent(data, d => d.Date)) // domain is the data. get teh earliest and latest datse use D3 function "extent"
        // domain loops thru date and date is alredy formatted correctly
        .range([margin.left, width - margin.right]); // the amount of psace we want it to take up. is an array. 0,0 = margin left
        // wnat rnage to go full width minus margin.right

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Value)]) // building y scales, needs to start at zero. 2nd value = d3 function to get highest val
        .range([height, margin.bottom, margin.top]); // built from top down, start at top



    //TYPE HERE to 
    
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0)); // tell it what scale we're using
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
      .tickSizeOuter(0)
      .tickFormat(d => d + "%") // loop thru dataand return string wiht % sign
      .tickSize(-width)
      );

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Year");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");

    let line = d3.line() // setting up variable line. D3.line is a line generator
        .x(d => x(d.Date)) // give it data by looping thru data use scale x that we created above
        .y(d => y(d.Value)); // line isn't on the page yet. this is just hte avlue of the line.

    svg.append("path") 
        .datum(data) // only using 1 datapoints building 1 path. whenever you use a line use datum
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue");

  });