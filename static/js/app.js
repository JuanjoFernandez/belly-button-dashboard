// Reading the json and building the id options
d3.json("../data/samples.json").then((data) => {
    var idDropdown = d3.select("#selDataset");
    var idArray = data.names;

    // Building the options
    idArray.forEach(element => {
        var row = idDropdown.append("option");
        row.text(element);
    });
})

// Update barchart with id selected
function updateBarChart() {
    // Console prints the plot info, will clear the console when graphic updates
    console.clear();

    // Grabbing the id to filter
    var idSelected = d3.event.target.value;
    console.log(`id Selected: ${idSelected}`)

    // Working with the json
    d3.json("../data/samples.json").then((data) => {

        // Mapping the samples data
        var filteredSamples = data.samples.map(item => item);

        // Filtering the data
        function filterSamples(sample) {
            return sample.id === idSelected;
        }
        filteredSamples = filteredSamples.filter(filterSamples);
        console.log("Filtered data by id:")
        console.log(filteredSamples);

        // Time to bar the plot (.reverse that)

        // Grabbing only the 10 most relevant bacterias, data is sorted accordingly
        var xValues = filteredSamples.map(item => item.sample_values);
        xValues = xValues[0].slice(0, 10);
        xValues = xValues.reverse()
        console.log("x values:");
        console.log(xValues);

        var yValues = filteredSamples.map(item => item.otu_ids);
        yValues = yValues[0].slice(0, 10);
        yValues = yValues.map(i => "OTU " + i);
        yValues = yValues.reverse()
        console.log("y values:");
        console.log(yValues);

        var hoverText = filteredSamples.map(item => item.otu_labels);
        hoverText = hoverText[0].slice(0, 10);
        console.log("Hover text:");
        console.log(hoverText);

        // Trace and data array
        var trace = {
            x: xValues,
            y: yValues,
            type: "bar",
            orientation: "h",
            text: hoverText
        };
        var data = [trace];

        // Plot layout and plotting
        var layout = {
            title: `Bacteria found in test subject ${idSelected}`,
            xaxis: { title: "Sample Values" },
            yaxis: { title: "Id" }
        };
        Plotly.newPlot("bar", data, layout);

        // Bubble time

        // X values
        var xBubble = filteredSamples.map(item => item.otu_ids);
        xBubble = xBubble[0];
        console.log("X values for bubbles:");
        console.log(xBubble);

        // Y values
        var yBubble = filteredSamples.map(item => item.sample_values);
        yBubble = yBubble[0];
        console.log("Y values for bubbles:");
        console.log(yBubble);

        // Marker sizes
        var markBubble = filteredSamples.map(item => item.sample_values);
        markBubble = markBubble[0];
        console.log("Sizes for bubbles:");
        console.log(markBubble);
        
        // Marker color
        var colorBubble = filteredSamples.map(item => item.otu_ids);
        colorBubble = colorBubble[0];
        console.log("Colors for bubbles:");
        console.log(colorBubble);

        // Hover text
        var hoverBubble = filteredSamples.map(item => item.otu_ids);
        hoverBubble = hoverBubble[0];
        console.log("Hover text for bubbles:");
        console.log(hoverBubble);
        
        // Bubble trace
        var traceBubble = {
            x: xBubble,
            y: yBubble,
            mode: 'markers',
            text: hoverBubble,
            marker: {
              color: colorBubble,
            //   opacity: [1, 0.8, 0.6, 0.4],
              size: markBubble,
            }
          };
          var dataBubble = [traceBubble];

          var layoutBubble = {
            title: 'Marker Size and Color',
            showlegend: false,
            // height: 600,
            // width: 600
          };
          
          Plotly.newPlot("bubble", dataBubble, layoutBubble);
    })
}

// Event listener
var idDropdown = d3.select("#selDataset");
idDropdown.on("change", updateBarChart);


