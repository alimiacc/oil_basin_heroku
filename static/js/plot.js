// CSV file is locally stored in static/data folder but could also be hosted, in this case the unpack function should be placed locally inside the top Plotly.d3.csv() wrapper

// Defome three unique arrays with data for the CSV file, the y trace column name, and the chart title selections corresponding to different chart types
const csvFile = [ "Produced_WK_Data", "Supplied_WK_Data", "UNL_Gas_WK_Prices", "Diesel_WK_Prices", "WTI_DL_Spot_Prices" ];
const yTraceEntry = [ 'Produced', 'Supplied', 'Price', 'Price', 'Price' ];
const chartName = [ "US Weekly Oil Production (Thousand Barrels per Day)", "US Weekly Oil Consumption (Thousand Barrels per Day)", "US Weekly UNL Gasoline Prices ($US)", "US Weekly Diesel Prices ($US)", "Cushing WTI Daily Spot Prices ($US)" ];
const chartLegend = [ "Oil Production", "Oil Consumption", "Gasoline Prices", "Diesel Prices", "Oil Spot Prices" ];
/* Needs to change chart line colors */
const chartColor = [ '#17BECF', '#1a53ff', '#336600', '#003366', '#cc3300' ];

const comments = [ "US Weekly Oil Production is witnessing the largest and drop fastest in US history following the Covid-19 shutdown across the world. Normally a fall in oil prices would cause a slower drop in onshore oil production like we witnesses in 2016. However, this time spot prices for crude oil dropped into negative territory across many onshore oil basins in the US due to storage capacity becoming overwhelmed. This caused almost all US oil companies to shut ins some of their oil wells and it also caused the largest drop in US Completions Crews and US Rig Counts in modern history. The combination of these factors is causing US Oil Production to plummet.",
 "US Weekly Oil Consumption has witnessed the largest and fastest drop in US history due to the Covid-19 US shut down. Millions of Americans stopped driving to work, planes reduced flying, and less oil byproducts were being consumed. Even though jet fuel consumption is still down over 30% the US Oil Consumption is still recovering. The economy is starting open up again and many people are shunning public transportation to drive their cars, which is causing increased gasoline consumption in the US.",
 "US Gasoline prices have dropped dramatically during the Covid-19 shut down due to a combination of falling oil prices and less people driving to work. However, the US Gasoline prices are recovering quickly as the US economy opens up and more people are driving their cars instead of using public transit that is less gasoline intensive.",
 "US Diesel Prices have dropped from the Covid-19 shut downs but the drop has been less significant. The drop in Diesel Prices has been attributed to the drop in Oil Prices, however Diesel consumptions has only slightly decreased as semi-truck and truck driving has remained resilient as more products started being delivered to homes.",
 "Crude Oil Prices have seen the most significant drop in world history due to the Covid-19 shut downs. Western Texas Intermediate Oil Prices - based on oil prices in Cushing Oklahoma and Texas - had seen spot prices fall all the way to -$37 a barrel. It was the first time oil prices had traded negative in the US. This was cause by a loss in oil demand, oil wells continuing to produce too much oil, and oil storage capacity running out in many areas. As storage ran out many landlocked oil fields could only sell at negative oil prices. Oil companies were burning cash with every barrel of oil they produced, which forced widespread oil well shut ins." ];

// Chart Selector function to update the index value from [ 0 to 4 ] depeonding on the user's chart selection provided by HTML dropdown element
function chartSelection(index=0) {   
    Plotly.d3.csv(`./static/data/${csvFile[index]}.csv`, function(rows) {
        console.log("hello", comments[index])
        var trace1 = {
            type: "scatter",
            mode: "lines",
            x: unpack(rows, 'Date'),
            y: unpack(rows, yTraceEntry[index]),
            name: chartLegend[index],
            line: {color: chartColor[index]}
        };
        
        var data = [trace1];

        // To be defined via dialog box entry by the user if the time permits
        var startDate = '1994-03-21'; /* dynamic chart start date */
        var endDate = '2020-07-13';   /* dynamic chart end date */

        var layout = {
            title: chartName[index],
            xaxis: {
                range: [startDate, endDate],
                // Added Code begins
                rangeselector: {buttons: [
                    {
                      count: 1,
                      label: '1m',
                      step: 'month',
                      stepmode: 'backward'
                    },
                    {
                      count: 6,
                      label: '6m',
                      step: 'month',
                      stepmode: 'backward'
                    },
                    {step: 'all'}
                  ]},
                rangeslider: {range: [startDate, endDate]},
                // Added Code ends
                type: 'date'
            },
            yaxis: {
                autorange: true,
                type: 'linear'
            },
            showlegend: true
        };
        // Needs to use newPlot method to overwite the existing plot    
        Plotly.newPlot('plotdiv', data, layout);
        document.getElementById("commentary").innerHTML = comments[index]


    });
}

// Function unpacking row based CSV data into column based arrays
function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
}

// Initialize the chart
chartSelection();

// Implement an event listener to catch chart selection updates
document.getElementById("chartdropdown")
        .addEventListener("change", function() {
            chartSelection(this.value);
        }
);

