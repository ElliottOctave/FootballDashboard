// /Home/static/js/playerChart.js
document.addEventListener('DOMContentLoaded', function() {
    // Set dimensions and margins
    const margin = {top: 40, right: 30, bottom: 100, left: 80};
    const container = d3.select('#player-chart');
    const containerWidth = container.node().getBoundingClientRect().width;
    const width = containerWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    // Append SVG
    const svg = container.append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Tooltip setup
    const tooltip = d3.select('#tooltip');
    const formatValue = d3.format(',.2f');
  
    // Load data
    d3.csv('/Home/static/data/players.csv').then(function(data) {
      // Data processing - convert market value to millions and filter valid entries
      data.forEach(d => {
        d.market_value_in_eur = +d.market_value_in_eur / 1000000; // Convert to millions
        d.highest_market_value_in_eur = +d.highest_market_value_in_eur / 1000000;
      });
  
      // Filter out players with 0 market value and sort
      const validPlayers = data.filter(d => d.market_value_in_eur > 0);
      const top10 = validPlayers.sort((a, b) => b.market_value_in_eur - a.market_value_in_eur).slice(0, 10);
  
      // X axis
      const x = d3.scaleBand()
        .range([0, width])
        .domain(top10.map(d => d.name))
        .padding(0.2);
  
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');
  
      // Y axis
      const y = d3.scaleLinear()
        .domain([0, d3.max(top10, d => d.market_value_in_eur) * 1.1]) // Add 10% padding
        .range([height, 0]);
  
      svg.append('g')
        .call(d3.axisLeft(y).tickFormat(d => `€${d}M`));
  
      // Y axis label
      svg.append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Market Value (€ millions)');
  
      // Create bars
      svg.selectAll('.bar')
        .data(top10)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.market_value_in_eur))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.market_value_in_eur))
        .on('mouseover', function(event, d) {
          tooltip.transition()
            .duration(200)
            .style('opacity', 0.9);
          tooltip.html(`
            <strong>${d.name}</strong>
            <div>Club: ${d.current_club_name}</div>
            <div>Position: ${d.position} (${d.sub_position})</div>
            <div>Nationality: ${d.country_of_citizenship}</div>
            <div>Current Value: €${formatValue(d.market_value_in_eur)}M</div>
            <div>Highest Value: €${formatValue(d.highest_market_value_in_eur)}M</div>
          `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        });
  
      // Add value labels on top of bars
      svg.selectAll('.value-label')
        .data(top10)
        .enter()
        .append('text')
        .attr('class', 'value-label')
        .attr('x', d => x(d.name) + x.bandwidth() / 2)
        .attr('y', d => y(d.market_value_in_eur) - 5)
        .attr('text-anchor', 'middle')
        .text(d => `€${formatValue(d.market_value_in_eur)}M`)
        .style('font-size', '12px')
        .style('fill', '#333');
  
      // Add chart title
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', 0 - (margin.top / 2))
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text('Top 10 Players by Current Market Value');
  
      // Add footnote
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('fill', '#666')
        .text('Data source: Transfermarkt');
  
    }).catch(function(error) {
      console.error('Error loading the CSV file:', error);
      container.html('<p class="error">Error loading player data. Please check the data file.</p>');
    });
  
    // Responsive behavior
    window.addEventListener('resize', function() {
      const newWidth = container.node().getBoundingClientRect().width;
      container.select('svg').attr('width', newWidth);
      // Note: For a fully responsive chart, you would need to redraw it completely
    });
  });