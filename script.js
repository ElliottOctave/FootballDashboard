document.addEventListener("DOMContentLoaded", function () {
    // Sample player data (Replace with actual data)
    const players = [
        { name: "Messi", rating: 94 },
        { name: "Ronaldo", rating: 93 },
        { name: "Mbappé", rating: 92 },
        { name: "Neymar", rating: 91 },
        { name: "De Bruyne", rating: 90 }
    ];

    const width = 600, height = 400;
    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const xScale = d3.scaleBand()
        .domain(players.map(d => d.name))
        .range([0, width])
        .padding(0.3);

    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    svg.selectAll("rect")
        .data(players)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d.rating))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.rating))
        .attr("fill", "#007bff");

    svg.selectAll("text")
        .data(players)
        .enter()
        .append("text")
        .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.rating) - 5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text(d => d.rating);
});
