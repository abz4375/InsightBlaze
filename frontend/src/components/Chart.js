import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Chart({ data, chartType }) {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous data
    const tooltip = d3.select(tooltipRef.current);

    const width = 600;
    const height = 400;
    svg.attr('width', width).attr('height', height);

    // Set the margins for the chart
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create a group element to hold the inner elements
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Function to handle mouseover (show tooltip)
    const handleMouseOver = (event, d) => {
        tooltip.style('visibility', 'visible')
          .style('top', `${event.pageY - 10}px`)
          .style('left', `${event.pageX + 10}px`)
          .html(`Title: ${d.title || d.region}<br/>Value: ${d.intensity || d[1] || d.relevance}`);
      };
      
  
      // Function to handle mouseout (hide tooltip)
      const handleMouseOut = () => {
        tooltip.style('visibility', 'hidden');
      };

    if (chartType === 'bar') {
      renderBarChart(g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut);
    } else if (chartType === 'line') {
      renderLineChart(g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut);
    } else if (chartType === 'pie') {
      renderPieChart(g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut);
    } else if (chartType === 'bubble') {
      renderBubbleChart(g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut);
    } else if (chartType === 'scatter') {
      renderScatterPlot(g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut);
    } else if (chartType === 'heatmap') {
      renderHeatmap(g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut);
    } else if (chartType === 'timeline') {
      renderTimeline(g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut);
    }
    
  }, [data, chartType]);

  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  const renderBarChart = (g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut) => {
    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.title))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)]) // Use intensity here
      .nice()
      .range([innerHeight, 0]);

    const bars = g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.title))
      .attr("y", innerHeight) // Start from the bottom
      .attr("width", xScale.bandwidth())
      .attr("height", 0) // Start with height 0
      .attr("fill", "#69b3a2")
      .on("mouseover", function (event,d) {handleMouseOver(event,d);
        d3.select(this).attr("fill", "#ff5722"); // Change color on hover
      })
      .on("mouseout", function () {handleMouseOut();
        d3.select(this).attr("fill", "#69b3a2"); // Revert color on mouse out
      });

    // Animate the bars
    bars.transition()
      .duration(750)
      .attr("y", (d) => yScale(d.intensity))
      .attr("height", (d) => innerHeight - yScale(d.intensity));

    // Create axes with labels
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));
    
    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));

    // Add labels
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .text("Categories");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .text("Intensity");

    // Add chart title
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("class", "chart-title")
      .text("Bar Chart Title");
  };

  const renderLineChart = (g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut) => {
    const xScale = d3.scaleBand()
  .domain(data.map((d) => d.title))
  .range([0, innerWidth])
  .padding(0.1);


    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)]) // Use intensity here
      .nice()
      .range([innerHeight, 0]);

      const line = d3.line()
      .x((d) => xScale(d.title) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.intensity));
    

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", line)
      .on("mouseover", function (event,d) {handleMouseOver(event,d);
        d3.select(this).attr("stroke", "#ff5722"); // Change color on hover
      })
      .on("mouseout", function () {handleMouseOut();
        d3.select(this).attr("stroke", "#69b3a2"); // Revert color on mouse out
      });

    // Create axes with labels
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));
      
    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));

    // Add labels
    g.append("text")
  .attr("x", innerWidth / 2)
  .attr("y", innerHeight + margin.bottom - 10)
  .attr("text-anchor", "middle")
  .text("Title");


    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .text("Intensity");

    // Add chart title
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("class", "chart-title")
      .text("Line Chart Title");
  };

  const renderPieChart = (g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut) => {
    // Rollup data to aggregate by region, counting occurrences
    const pieData = Array.from(d3.rollup(data, v => v.length, d => d.region), ([key, value]) => ({ region: key, value }));

    const radius = Math.min(innerWidth, innerHeight) / 2;
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    
    // Pie layout based on value (count)
    const pie = d3.pie().value(d => d.value);
  
    const arcs = pie(pieData);
  
    const arcGroup = g.append("g")
      .attr("transform", `translate(${innerWidth / 2}, ${innerHeight / 2})`);

    arcGroup.selectAll(".arc")
      .data(arcs)
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
      .on("mouseover", function (event,d) {
        handleMouseOver(event, d);
        d3.select(this).attr("opacity", 0.7); // Change opacity on hover
      })
      .on("mouseout", function () {
        handleMouseOut();
        d3.select(this).attr("opacity", 1); // Revert opacity on mouse out
      });

    // Add labels for each arc
    arcGroup.selectAll(".label")
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => d.data.region); // Label based on region


    // Add chart title
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("class", "chart-title")
      .text("Relevance vs Region Pie Chart");
};


  const renderBubbleChart = (g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut) => {
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([innerHeight, 0]);

    const bubbles = g.selectAll(".bubble")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "bubble")
      .attr("cx", d => xScale(d.intensity))
      .attr("cy", d => yScale(d.intensity))
      .attr("r", 5)
      .attr("fill", "#69b3a2")
      .on("mouseover", function (event,d) {handleMouseOver(event,d);
        d3.select(this).attr("fill", "#ff5722"); // Change color on hover
      })
      .on("mouseout", function () {handleMouseOut();
        d3.select(this).attr("fill", "#69b3a2"); // Revert color on mouse out
      });

    // Create axes with labels
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));
      
    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));

    // Add labels
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .text("Intensity");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .text("Intensity");

    // Add chart title
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("class", "chart-title")
      .text("Bubble Chart Title");
  };

  const renderScatterPlot = (g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut) => {
    const xScale = d3.scaleBand()
  .domain(data.map((d) => d.topic))
  .range([0, innerWidth])
  .padding(0.1);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, (d) => d.intensity)])
  .nice()
  .range([innerHeight, 0]);


  const points = g.selectAll(".point")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "point")
  .attr("cx", d => xScale(d.topic) + xScale.bandwidth() / 2)
  .attr("cy", d => yScale(d.intensity))
  .attr("r", 5)
  .attr("fill", "#69b3a2")

      .on("mouseover", function (event,d) {handleMouseOver(event,d);
        d3.select(this).attr("fill", "#ff5722"); // Change color on hover
      })
      .on("mouseout", function () {handleMouseOut();
        d3.select(this).attr("fill", "#69b3a2"); // Revert color on mouse out
      });

    // Create axes with labels
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));
      
    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));

    // Add labels
    g.append("text")
  .attr("x", innerWidth / 2)
  .attr("y", innerHeight + margin.bottom - 10)
  .attr("text-anchor", "middle")
  .text("Topic");

g.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 20)
  .attr("x", -innerHeight / 2)
  .attr("text-anchor", "middle")
  .text("Intensity");


    // Add chart title
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("class", "chart-title")
      .text("Scatter Plot Title");
  };

  const renderHeatmap = (g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut) => {
    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.region))
      .range([0, innerWidth])
      .padding(0.05);

    const yScale = d3.scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, innerHeight])
      .padding(0.05);

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(data, (d) => d.intensity)]);

    g.selectAll(".tile")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "tile")
      .attr("x", d => xScale(d.region))
      .attr("y", d => yScale(d.category))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", d => colorScale(d.intensity))
      .on("mouseover", function (event,d) {handleMouseOver(event,d);
        d3.select(this).attr("opacity", 0.7); // Change opacity on hover
      })
      .on("mouseout", function () {handleMouseOut();
        d3.select(this).attr("opacity", 1); // Revert opacity on mouse out
      });

    // Create axes with labels
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));
      
    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));

    // Add labels
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .text("Regions");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .text("Categories");

    // Add chart title
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("class", "chart-title")
      .text("Heatmap Title");
  };

  const renderTimeline = (g, innerWidth, innerHeight, data, handleMouseOver, handleMouseOut) => {
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.published)))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)]) // Use intensity here
      .nice()
      .range([innerHeight, 0]);

    g.selectAll(".line")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "line")
      .attr("cx", d => xScale(new Date(d.published)))
      .attr("cy", d => yScale(d.intensity))
      .attr("r", 5)
      .attr("fill", "#69b3a2")
      .on("mouseover", function (event,d) {handleMouseOver(event,d);
        d3.select(this).attr("fill", "#ff5722"); // Change color on hover
      })
      .on("mouseout", function () {handleMouseOut();
        d3.select(this).attr("fill", "#69b3a2"); // Revert color on mouse out
      });

    // Create axes with labels
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));
      
    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));

    // Add labels
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .text("Time");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .text("Intensity");

    // Add chart title
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("class", "chart-title")
      .text("Timeline Chart Title");
  };

  return (<>
    <svg ref={svgRef} />
    <div ref={tooltipRef} className="tooltip" style={{ position: 'absolute', visibility: 'hidden', backgroundColor: '#fff', border: '1px solid #ccc', padding: '5px', borderRadius: '3px', pointerEvents: 'none' }}></div>
  </>
  );
}

export default Chart;
