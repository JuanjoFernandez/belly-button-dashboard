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
    // Grabbing the id to filter
    var idSelected = d3.event.target.value;
    console.log (`id Selected: ${idSelected}`)

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

        // Plot area
        var barArea = d3.select("#bar");

        // Grabbing only the 10 most relevant bacterias, data is sorted accordingly
        xValues = filteredSamples.map(item => item.sample_values);
        xValues = xValues[0].slice(0, 10);
        console.log("x values:");
        console.log(xValues);
        
    })
}

// Event listener
var idDropdown = d3.select("#selDataset");
idDropdown.on("change", updateBarChart);