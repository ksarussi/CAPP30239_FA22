    (function symbol() {
    d3.csv('data.csv').then((data) => {
        const height = 400,
        width = 600,
        innerRadius = 0,
        outerRadius = 165,
        labelRadius = 170;
        
        let localData = [
            {
                "state": "Mentally Ill",
                "total": 0
            },
            {
                "state": "Armed",
                "total": 0
            },
            {
                "state": "Ill and Armed",
                "total": 0
            },
            {
                "state": "Neither",
                "total": 0
            }
        ]

        for (let d of data) {
            if (d.Ill_v_armed == 'Mentally ill') {
                localData[0].total += 1
            } else if (d.Ill_v_armed == 'Armed') {
                localData[1].total += 1
            } else if (d.Ill_v_armed == 'Both') {
                localData[2].total += 1
            } else {
                localData[3].total += 1
            }
        }
        console.log(typeof(localData))

        const arcs = d3.pie().value(d => d.total)(localData);
        const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

        const svg = d3.select("#chart_pie")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    
        svg.append("g")
        .attr("stroke", "lightgray")
        .attr("stroke-width", 1.25)
        .attr("stroke-linejoin", "round")
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", (d, i) => d3.schemeCategory10[i+1])
        .attr("d", arc);

        svg.append("g")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .data(localData.map(d => {
            return [`${d.state}: ${d.total}`];
        }))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .text(d => d);
    
    });
})();