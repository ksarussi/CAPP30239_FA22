/* Horizontal bar chart for COVID country cases */

// what's a promise? we control flow of data wtih a 'promise'
// need to first get the data that's why we do .thne(data) this gets our dat afirst off


d3.csv("covid.csv").then(data => {

    // converts a string to an integer
    // d is each row of the ata
    // cases is the relevant column 
    for (let d of data) {
        d.cases = +d.cases; //force a number
    };

    // putting our bars in ordered ranking
    // also useful tpo use horizontal bar if your x-axis labels are too long
    // take a and compare it to b, and take b and subtract a 
    data.sort((a, b) => b.cases - a.cases); // this is ordering numbres
    // this is equivalent to this line above 
    data.sort((a,b) => d3.ascending(a.country, b.country)); // this is alphabetical

    // when are width and heights attributes vs variables
    // if hegiht and width are blue - variable
    // if red strings = attribute that will go on html page
    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 55, left: 50 }); // adjust margins if labels are falling off!

        ///svg append is adding something to the svg variable
    let svg = d3.select("#horizontal-chart") // resizing
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser

    let x = d3.scaleLinear() // we flipped x and y axis, so this is flipped to linear (if it was rgular bar it would be scaleband still)
        .domain([0, d3.max(data, d => d.cases)]).nice()
        .range([margin.left, width - margin.right]);
    
    let y = d3.scaleBand()
        .domain(data.map(d => d.country)) // d => is a loop. d = row of data. d.country = cell corresponding to country
        .range([margin.top, height - margin.bottom]) // data.map takes this and converts to an array (this is javasdript)
        .padding(0.1);

    svg.append("g") // "g" is a string part of the html. 
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`) // an attribute actually goes on the page
        .call(d3.axisLeft(y)); // call 

    let bar = svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(data)
        .join("g") // join is a d3 powerhouse...inter,update,exit...you can 'enter' data, putit on the page, update something, then exit/remove something off the page
        .attr("class", "bar");

    // width here gets put right into html
    bar.append("rect") // add rect to bar group
        .attr("fill", "steelblue")
        .attr("x", margin.left) // x positioning
        .attr("width", d => x(d.cases)) // how wide bars are
        .attr("y", d => y(d.country)) // y positioning
        .attr("height", y.bandwidth()); // badnwdth can only be used wiht scaled band bar chart
    
    bar.append('text') // add labels
        .text(d => d.cases)
        .attr('x', d => margin.left + x(d.cases) - 10)
        .attr('y', d => y(d.country) + (y.bandwidth()/2))
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'white')

    svg.append('text') // svgs grow downward
        .attr("class", "x-label")
        .attr('text-anchor', 'end')
        .attr("x", width-margin.right)
        .attr("y", height)
        .text("Country Code");
});