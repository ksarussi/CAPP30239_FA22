/* Bar chart of COVID cases */ 
/* fetching the data -> look at documentation of g3 */

// using a "promise" -> means first do this, then do this... "then" in the nxt line
// firt load data, then give it the data
// => are shorthand for function
// console.log is how we print stuff in the browser
// loop thur data and everywehre we see d.caess make sure its an int
// + turns numbres into integers
d3.csv("covid.csv").then(data => {
    
    for (let d of data) {
        d.cases = +d.cases;
    }

    const height = 400, 
            width = 600,
            margin = ({top: 25, right: 30, left: 50, bottom: 35}); // create height, width, margins of svg. make margin an object because it'll change depending on object on the page
   
    let svg = d3.select("#chart")
                .append("svg") // create an svg but append it to the chart div in our html. # puts in an id. 
                .attr("viewBox", [0,0, width, height]); // says start at 0,0. start at top left?
                // this just creates our empty shell

    const x = d3.scaleBand() // creating x-axis scale. scaleband is specificlaly meant for bar charts. 
    //scales allw you to do 2 thins: specify domain (categories) range (how much space you want it to tkae up on page)
    // define domain (valuse):
                .domain(data.map(d => d.country)) // map is a function in javasript that maps up values ot csv
                // d is the row we're on, d.country is the attribute of the row we are on. kind of like a loop. 
                // could also write this arrow as:
                // function(d) {d. country}
                // d could be called anything but commonly use "d" ot represent the row of data you're on in D3
    // set range
                .range([margin.left, width - margin.right]) // first value is where it starts 2nd value is where it ends
                // this says start at margin left. we already made the margin and left vars. go to full width of page minus margin right
    // adds styelistic padding
                .padding(0.1);

    // create y axis = cases (continuous variable - need a linear scale)
    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.cases)]).nice() // get max val using d3.max. first parameter is dataset, then rows we want. .nice = makes our values nice clean cut
                .range([height - margin.bottom, margin.top]); 

    // build x-axis
    const xAxis = g => g // shorthand...xAxis is a function we're making
            .attr("transform", `translate(0,${height - margin.bottom + 5})`) // transform lets us move the asxis
            .call(d3.axisBottom(x)); // to the xaxis function, ".call" runs the function as soon as we see ".call". d3axis bottom - funciton. input = scale
            
    const yAxis = g => g
            .attr("transform", `translate(${margin.left-5},0)`) // gives positioning of y axis
            .call(d3.axisLeft(y))

    svg.append("g")
        .call(xAxis);
            
    svg.append("g")
        .call(yAxis);

    let bar = svg.selectAll(".bar")
        .append("g") // appending svg element (Group) within it
        .data(data) // data is building bars using our data
        .join("g") // join is useful for joining the data to the rectangles on teh page
        .attr("class", "bar"); // we're selecting all things in class but add it at the end or something

    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("x", d => x(d.country))
        .attr("width", x.bandwidth()) // give each bar a width
        .attr("y", d => y(d.cases)) // set y-coordinate = y scale function (passing in the datapoint of d.cases)
        .attr("height", d => y(0) - y(d.cases)); // height should correspond with d.cases values. do it minus y(0) because it's built from top0down so need to reverse it

    //add values to top of bars
    bar.append("text") // two types of text: append text in svg
        .text(d => d.cases) // telling it what the textis that we want    
        .attr('x', d => x(d.country) + (x.bandwidth()/2))
        .attr('y', d => y(d.cases) + 15) // magic number 15.......talk about it later . To put text above you can change this number
        .attr('text-anchor', 'middle') // text anchor is where do we want them to be centered
        .style('fill', 'black');

    
});




