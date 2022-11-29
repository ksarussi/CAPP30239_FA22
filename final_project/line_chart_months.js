/* Line Chart */
(function line_chart_allyrs() {
    const height = 500,
        width = 800,
        margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
        
    const svg = d3.select("#line_chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    d3.csv('data/line_chart_months.csv').then(data => {
        
        let timeParse = d3.timeParse("%Y-%m") 
        for (let d of data) {
            d.value = +d.value
            d.date = timeParse(d.date); 
        }

        console.log(data); 

        // declare our x and y scales
        let x = d3.scaleTime() 
            .domain(d3.extent(data, d => d.date))
            .range([margin.left, width - margin.right]); 

            // declare our y xcales 
            let y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x)
        .tickPadding([7])
        .tickSizeOuter(0)
        .ticks(d3.utcMonth.every(6))
            .tickFormat(d3.timeFormat("%b-%y"))); 
        
        svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickPadding([4])
        .tickSizeOuter(0)
        .tickFormat(d => d) 
        .tickSize(-width)
        );

        let line = d3.line() 
            .x(d => x(d.date)) 
            .y(d => y(d.value))

        svg.append("path") 
            .datum(data) 
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "#1c6aaf")
            .attr("stroke-width", 2);

        let lastEntry = data[data.length - 1];

        svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr("x", -margin.top/2)
        .attr("dx", "-0.5em")
        .attr("y", 8.9)
        .attr("transform", "rotate(-90)")
        .text("Number of People");

        svg.append("text") 
        .text("307")
        .attr("x", x(lastEntry.date) -10)
        .attr("y", y(lastEntry.value)-10)
        .attr("dominant-baseline", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold");

        let apr2022 = data[data.length - 31];
        svg.append("text") 
        .text("Apr '20: 112")
        .attr("x", x(apr2022.date)-45)
        .attr("y", y(apr2022.value)+19)
        .attr("dominant-baseline", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold"); 

        let oct2019 = data[data.length - 37];
        svg.append("text") 
        .text("Oct '19: 378")
        .attr("x", x(oct2019.date)-28)
        .attr("y", y(oct2019.value)-10)
        .attr("dominant-baseline", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold"); 

    });
})();