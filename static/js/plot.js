// CSV file is locally stored in static/data folder but could also be hosted, in this case
// the unpack function should be placed locally inside the top Plotly.d3.csv() wrapper below
Plotly.d3.csv("../static/data/Produced_WK_Data.csv", function(rows) {
    // Plotly.d3.csv("/static/data/Supplied_WK_Data.csv", function(rows) {
    // Plotly.d3.csv("/static/data/UNL_Gas_WK_Prices.csv", function(rows) {
    // Plotly.d3.csv("/static/data/Diesel_WK_Prices.csv", function(rows) { 
    // Plotly.d3.csv("/static/data/WTI_DL_Spot_Prices.csv", function(rows) {   
console.log(rows)
    var trace1 = {
        type: "scatter",
        mode: "lines",
        x: unpack(rows, 'Date'),
        y: unpack(rows, 'Produced'),
        // y: unpack(rows, 'Supplied'),
        // y: unpack(rows, 'Price'),
        line: {color: '#17BECF'}
    };

    var data = [trace1];

    var layout = {
        title: 'Custom Range Chart',
        xaxis: {
            range: ['2010-07-10', '2016-07-10'],
            type: 'date'
        },
        yaxis: {
            autorange: true,
            type: 'linear'
        }
    };
        
    Plotly.plot('plotdiv', data, layout);

//   Plotly.newPlot("plot", data);
});

// Function unpacking row based CSV data into column based arrays
function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
}


  