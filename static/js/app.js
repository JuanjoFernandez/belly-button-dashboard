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
    var idSelected = d3.event.target.value;
    console.log(idSelected);
}

// Event listener
var idDropdown = d3.select("#selDataset");
idDropdown.on("change", updateBarChart);