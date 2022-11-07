// Histogram & Joins

// TALKING ABOUT JOINS - joining on multiple stages
// in the HTML there's a "SELECT" adn "JANUARY" FEBRUAYR and MARCH
// we want o join when user changes this drop down. that's waht this does :
//    d3.selectAll("select")
// .on("change", function (event) {
//     const m = event.target.value;
//     updateChart(m); 
// events can be done in browser or by user (an event is moving a mouse or clicking a page or refreshing browser)
// so here, we're acknowledging the user made a selection/change, and then we get an event object
// event has a target value - matches to "january" "february" "march" options from .html
// m = the month we're picking
// january is in climate.json..so are feb and march...each month has it's own array of data


const height = 400,
    width = 600,
    margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
    padding = 1;

const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.json('climate.json').then((data) => {      
    console.log(data)

    const x = d3.scaleLinear()
        .range([margin.left, width - margin.right])
        .domain([0,65]);
  
    const y = d3.scaleLinear()
        .range([height - margin.bottom, margin.top])
        .domain([0,10]);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const binGroups = svg.append("g")
        .attr("class", "bin-group");

    function updateChart(m) {
        const bins = d3.bin()
            .thresholds(10)
            .value(d => d.average)(data[m]);

    // here in update chart m = jan feb march.
    // this will bin the data that the user selected
    // now we have to expand the join bc we have multiple events going on


        binGroups.selectAll("g")
            .data(bins, d => d.x0)
        .join(
            enter => {
            let g = enter.append("g")

            g.append("rect")
                .attr("x", d => x(d.x0) + padding / 2)
                .attr("y", height - margin.bottom)
                .attr("width", d => x(d.x1) - x(d.x0) - padding)
                .attr("height", 0)
                .attr("fill", "steelblue")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length))
                .attr("height", d => height - margin.bottom - y(d.length));

            g.append("text")
                .text(d => d.length)
                .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
                .attr("y", height - margin.bottom - 5)
                .attr("text-anchor", "middle")
                .attr("fill", "#333")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length) - 5);
            },
            update => {
            update.select("rect")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length))
                .attr("height", d => height - margin.bottom - y(d.length));

            // update trasntiions duration y height and text below for eahc chart

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
            // all the bars from teh month we don't pick have to be removed
            // 3 overall stepS: Enter, Update, Exit
            // checkboxes, slider, any type of input, could append this to an expanded join
            // if you're just loading just january and not 3 months we go back ot regular join
            exit.select("text")
                .text("");

            exit.transition()
                .duration(750)
                .remove();
            }
        );
            // foreign objects = annotations, you can give it an x and y position to put on teh page
            // foreign objects take html
            // only time you can use line breaks within svg
            // line breaks on text are difficult
        svg.selectAll("foreignObject").remove();
        // we select all foreign objects and remove them so that we don't have february data
        // if we pick march

        let temp = d3.mean(data[m], d => d.average).toFixed(1); // to fixed rounds to 1 decimal
        let str = `The average temperature in 
                    <b style="text-transform:capitalize;">${m} 2020</b> was 
                    <b>${temp}℉</b>.`
            // use back ticks - use css to capitalize 
            //also ways to draw lines and arrows
        svg.append("foreignObject")
          .attr("x", 10)
          .attr("y", 100)
          .attr("width", 120)
          .attr("height", 100)
          .append('xhtml:div')
          .append("p")
          .html(str);
    }

    updateChart("january");

    d3.selectAll("select")
        .on("change", function (event) {
            const m = event.target.value;
            updateChart(m); 
        });
});