
// (3) IMPORT DATA (this data is from Observable example)
d3.csv('data/area_chart.csv').then(data => {
        
    for(let d of data) {
        d.date = new Date(d.date);
    }

    // (4) CALL FUNCTION WITH OPTIONAL PARAMS
    let area_chart_observable = StackedAreaChart(data, {
        x: d => d.date,
        y: d => d.value,
        z: d => d.Updated_Injury_Class,
        xlabel: "Month",
        xtype: d3.scaleTime, // try d3.scaleLog
        ylabel: "Injury Type",
        // title: d => `Month`,
        width: 1000,
        // marginTop: 40,
        height: 500,
    });
    
console.log(data)
    // (5) APPEND TO PAGE
    document.getElementById("area_chart_observable").appendChild(area_chart_observable);
});

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/stacked-area-chart
function StackedAreaChart(data, {
    x = ([x]) => x, // given d in data, returns the (ordinal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    z = () => 1, // given d in data, returns the (categorical) z-value
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xType = d3.scaleUtc, // type of x-scale
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    zDomain, // array of z-values
    offset = d3.stackOffsetDiverging, // stack offset method
    order = d3.stackOrderNone, // stack order method
    xFormat, // a format specifier string for the x-axis
    yFormat, // a format specifier for the y-axis
    yLabel, // a label for the y-axis
    //colors = d3.schemeTableau10, // array of colors for z
    //colors = ["#eff3ff","#bdd7e7","#6baed6","#3182bd","#08519c"]
    colors = ["#08306b","#1c6aaf","#3787c0","#82badb","#cadef0"]
    //["#f7fbff","#e1edf8","#cadef0","#abcfe6","#82badb","#59a1cf","#3787c0","#1c6aaf","#0b4d94","#08306b"]

  } = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);
  
    // Compute default x- and z-domains, and unique the z-domain.
    if (xDomain === undefined) xDomain = d3.extent(X);
    if (zDomain === undefined) zDomain = Z;
    zDomain = new d3.InternSet(zDomain);
  
    // Omit any data not present in the z-domain.
    const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));
  
    // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
    // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
    // each tuple has an i (index) property so that we can refer back to the
    // original data point (data[i]). This code assumes that there is only one
    // data point for a given unique x- and z-value.
    const series = d3.stack()
        .keys(zDomain)
        .value(([x, I], z) => Y[I.get(z)])
        .order(order)
        .offset(offset)
      (d3.rollup(I, ([i]) => i, i => X[i], i => Z[i]))
      .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));
  
    // Compute the default y-domain. Note: diverging stacks can be negative.
    if (yDomain === undefined) yDomain = d3.extent(series.flat(2));
  
    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
    const color = d3.scaleOrdinal(zDomain, colors);
    const xAxis = d3.axisBottom(xScale).ticks(width / 80, xFormat).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 50, yFormat);
  
    const area = d3.area()
        .x(({i}) => xScale(X[i]))
        .y0(([y1]) => yScale(y1))
        .y1(([, y2]) => yScale(y2));
  
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));
  
    svg.append("g")
      .selectAll("path")
      .data(series)
      .join("path")
        .attr("fill", ([{i}]) => color(Z[i]))
        .attr("d", area)
      .append("title")
        .text(([{i}]) => Z[i]);
  
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);


    // Handmade legend
    svg.append("circle").attr("cx",610).attr("cy",76).attr("r", 6).style("fill", "#cadef0")
    svg.append("circle").attr("cx",610).attr("cy",100).attr("r", 6).style("fill", "#82badb")
    svg.append("circle").attr("cx",610).attr("cy",122).attr("r", 6).style("fill", "#3787c0")

    svg.append("circle").attr("cx",610).attr("cy",145).attr("r", 6).style("fill", "#1c6aaf")
    svg.append("circle").attr("cx",610).attr("cy",167).attr("r", 6).style("fill", "#08306b")
    
    svg.append("text").attr("x", 620).attr("y", 79).text("Reported, Not Evident").style("font-size", "14px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 620).attr("y", 103).text("Non-Incapacitating").style("font-size", "14px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 620).attr("y", 125).text("No indication of Injury").style("font-size", "14px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 620).attr("y", 148).text("Incapacitating").style("font-size", "14px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 620).attr("y", 170).text("Fatal").style("font-size", "14px").attr("alignment-baseline","middle")

    ["#08306b","#1c6aaf","#3787c0","#82badb","#cadef0"]


    return Object.assign(svg.node(), {scales: {color}});
  }
  