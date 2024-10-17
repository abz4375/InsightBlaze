// /frontend/src/components/Chart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Chart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous data

    const width = 600;
    const height = 400;
    svg.attr('width', width).attr('height', height);

    // Set the margins for the chart
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create a group element to hold the inner elements
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create the scales
    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.title))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)]) // Use intensity here
      .nice()
      .range([innerHeight, 0]);

    // Initialize the force simulation
    const simulation = d3.forceSimulation(data)
      .force("x", d3.forceX((d) => xScale(d.title) + xScale.bandwidth() / 2).strength(0.5))
      .force("y", d3.forceY((d) => yScale(d.intensity)).strength(0.5))
      .force("collide", d3.forceCollide(30)) // Adjust collision radius as needed
      .on("tick", ticked);

    // Create rectangles (bars)
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
      .on("mouseover", handleMouseOver) // Mouse over event
      .on("mouseout", handleMouseOut); // Mouse out event

    // Tooltip creation
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("pointer-events", "none") // Prevent tooltip from capturing mouse events
      .style("opacity", 0); // Start with opacity 0

    // Function to handle mouse over
    function handleMouseOver(event, d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 1);
      tooltip.html(`Title: ${d.title}<br>Intensity: ${d.intensity}`)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
    }

    // Function to handle mouse out
    function handleMouseOut() {
      tooltip.transition()
        .duration(200)
        .style("opacity", 0);
    }

    // Function to update the bars on each tick
    function ticked() {
      bars
        .attr("x", (d) => d.x - xScale.bandwidth() / 2)
        .attr("y", (d) => d.y)
        .attr("height", (d) => innerHeight - d.y);
    }

    // Initial render to position bars correctly
    simulation.stop(); // Stop the simulation for the initial render
    bars.transition()
      .duration(800)
      .attr("y", (d) => yScale(d.intensity))
      .attr("height", (d) => innerHeight - yScale(d.intensity))
      .end()
      .then(() => {
        // Restart simulation after initial render
        simulation.restart();
      });

    // Add x-axis
    const xAxisGroup = g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`);

    // Add y-axis
    const yAxisGroup = g.append('g');

    // Render axes
    xAxisGroup.call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end');

    yAxisGroup.call(d3.axisLeft(yScale));

    // Add x-axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .text('Insight Title');

    // Add y-axis label
    svg.append('text')
      .attr('x', -innerHeight / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Intensity');

    // Add chart title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Intensity of Insights by Title');

  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default Chart;
