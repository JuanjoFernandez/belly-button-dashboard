// Use the D3 library to read in samples.json.
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

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

        // Time to plot

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

        var hoverText = filteredSamples.map(item=>item.otu_labels);
        hoverText = hoverText[0].slice(0,10);
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


    })
}

// Event listener
var idDropdown = d3.select("#selDataset");
idDropdown.on("change", updateBarChart);