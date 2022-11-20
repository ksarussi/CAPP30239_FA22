/* D3 Line Chart */
(function line_chart_allyrs() {
    const height = 500,
        width = 800,
        margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
        
    const svg = d3.select("#line_chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    d3.csv('data/line_chart_months.csv').then(data => {
        
        let timeParse = d3.timeParse("%Y-%m") // formatting stuff in console. THIS CREATES A FUNCTION
        for (let d of data) {
            d.value = +d.value
            d.date = timeParse(d.date); //convert ot a number by using our TIMEPARSE FUNCTION
        }

        console.log(data); // chekc that w'er getting SOMETHING in the CONSOLE (Hit f12 to open developer)

        // declare our x and y scales
        let x = d3.scaleTime() // give it the d3 scale time function.each scale gets 2 things - domain and range
            .domain(d3.extent(data, d => d.date)) // domain is the data. get teh earliest and latest datse use D3 function "extent"
            // domain loops thru date and date is alredy formatted correctly
            .range([margin.left, width - margin.right]); // the amount of psace we want it to take up. is an array. 0,0 = margin left
            // wnat rnage to go full width minus margin.right

            // declare our y xcales 
            let y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top]);



        //TYPE HERE to 
        
        svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        // .attr("font-weight", "bold")
        .call(d3.axisBottom(x)
        .tickPadding([7])
        .tickSizeOuter(0)
        .ticks(d3.utcMonth.every(6))
        //   .ticks(d3.time.months, 10)
        //   .tickFormat(d3.time.format('%b %Y'))
            .tickFormat(d3.timeFormat("%b-%y"))); // tell it what scale we're using
        
        svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        // .attr("font-weight", "bold")
        .call(d3.axisLeft(y).tickPadding([14])
        .tickSizeOuter(0)
        .tickFormat(d => d) // loop thru dataand return string wiht % sign
        .tickSize(-width)
        );

        // Add the points to the line
        // svg.append("g")
        // .selectAll("dot")
        // .data(data)
        // .enter()
        // .append("circle")
        //     .attr("cx", function(d) { return x(d.date) } )
        //     .attr("cy", function(d) { return y(d.value) } )
        //     .attr("r", 3)
        //     .attr("fill", "navy");

        // svg.append("text")
        //   .attr("class", "x-label")
        //   .attr("text-anchor", "end")
        //   .attr("x", width - margin.right)
        //   .attr("y", height)
        //   .attr("dx", "2.5em")
        //   .attr("dy", "-0.2em") 
        //   .text("Month-Year");
        
        // svg.append("text")
        //   .attr("class", "y-label")
        //   .attr("text-anchor", "end")
        //   .attr("x", -margin.top/2-5)
        //   .attr("dx", "-0.9em")
        //   .attr("y", 25)
        //   .attr("transform", "rotate(-90)")
        //   .text("Number of People");

        let line = d3.line() // setting up variable line. D3.line is a line generator
            .x(d => x(d.date)) // give it data by looping thru data use scale x that we created above
            .y(d => y(d.value))
            //.curve(d3.curveCardinal); // line isn't on the page yet. this is just hte avlue of the line.

        svg.append("path") 
            .datum(data) // only using 1 datapoints building 1 path. whenever you use a line use datum
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "navy")
            .attr("stroke-width", 2);

        let lastEntry = data[data.length - 1]; //last piece of data to position text x and y

        svg.append("text") // positioning of end-of-line-label
        .text("307")
        .attr("x", x(lastEntry.date) -10)
        .attr("y", y(lastEntry.value)-10)
        .attr("dominant-baseline", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold");

        let apr2022 = data[data.length - 31];
        svg.append("text") // positioning of end-of-line-label
        .text("Apr '20: 112")
        .attr("x", x(apr2022.date)-33)
        .attr("y", y(apr2022.value)+17)
        .attr("dominant-baseline", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold"); 

        let oct2019 = data[data.length - 37];
        svg.append("text") // positioning of end-of-line-label
        .text("Oct '19: 378")
        .attr("x", x(oct2019.date)-28)
        .attr("y", y(oct2019.value)-10)
        .attr("dominant-baseline", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold"); 


    });
})();