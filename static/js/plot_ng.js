// CSV file is locally stored in static/data folder but could also be hosted, in this case the unpack function should be placed locally inside the top Plotly.d3.csv() wrapper

// Defome three unique arrays with data for the CSV file, the y trace column name, and the chart title selections corresponding to different chart types
                
const csvNG = ["NG_Production1", "NG_Consumption", "US_Storage","US_Price","NG_Rig_Count"]
const chartNameNG = ["US Natural Gas Production (Million Cubic Feet, Monthly)","US Natural Consumption (Million Cubic Feet, Monthly)", "US Natural Gas Storage (Billion Cubic Feet, Weekly)", "US Natural Gas Prices ($US, Weekly)","US Natural Gas Rig Count(Weekly)"]
const chartLegendNG = [ "Natural Gas Production", "Natural Gas Consumption", "Natural Gas Storage", "Natural Gas Prices", "Natural Gas Rig Count" ];
const yTraceEntryNG = [ 'Production', 'Consumption', 'Storage', 'Price', 'Gas' ];
const chartColorNG = [ '#17BECF', '#1a53ff', '#336600', '#003366', '#cc3300' ];
const date2 = ["Month","Month","Week","Week","Date"]
const yPriceNG = ['Price','Price','Price','Price','Price']

const newCsv = ["US_Price","US_Price","US_Price","US_Price","US_Price"]
const dateChart2 = ["Week","Week","Week","Week","Week"]
const yPriceLegend = ['Price Natural Gas($)','Price Natural Gas($)','Price Natural Gas($)','Price Natural Gas($)','Price Natural Gas($)']
const chartPriceColor = ['#cc3300', '#336600','#003366', '#1a53ff','#17BECF'];
 //For Nisha
const regression = [ "Replace with Regression1","Replace with Regression2" ,"Replace with Regression3" ,"Replace with Regression4" ,"Replace with Regression5" ]


// Plotly.d3.csv(`./static/data/US_Price.csv`, function(row2) {
//     var trace2 = {
//         type: "scatter",
//         mode: "lines",
//         x: unpack2(row2, "Week"),
//         y: unpack2(row2, "Price"), //problem unpack needed?
//         name: 'Price Natural Gas($)',
//         line: {color: '#17BECF'}
    
        
//       };
//       return trace2
//     })

    var weekrow = []
    var pricerow = []
    d3.csv('./static/data/US_Price.csv', function(loadedRows){
        weekrow.push(loadedRows.Week)
        pricerow.push(loadedRows.Price)
    })
    var colweekrow = data.map(function(d){ return d.weekrow})
    console.log("coolbeans", colweekrow)

// Chart Selector function to update the index value from [ 0 to 4 ] depeonding on the user's chart selection provided by HTML dropdown element
function chartSelection(index=0) {   
    Plotly.d3.csv(`./static/data/${csvNG[index]}.csv`,   function(rows) {
       
        poo = Plotly.d3.csv('./static/data/US_Price.csv')
        console.log(poo)
        console.log("hello hello",csvNG[index])
        console.log(rows)
        console.log(`static/data/${csvNG[index]}.csv`)
        var trace1 = {
            type: "scatter",
            mode: "lines",
            x: unpack(rows, date2[index]),
            y: unpack(rows, yTraceEntryNG[index]),
            name: chartLegendNG[index],
            line: {color: chartColorNG[index]}
        };
        
     

          var data = [trace1, trace2];
        console.log("data here", data)
        // To be defined via dialog box entry by the user if the time permits
        var startDate = '2010-01-01'; /* dynamic chart start date */
        var endDate = '2020-09-01';   /* dynamic chart end date */

        var layout = {
            title: chartNameNG[index],
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
                    // {
                    //     count: 3,
                    //     label: '3y',
                    //     step: 'year',
                    //     stepmode: 'backward'
                    //   },
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
            yaxis2: {
                      title: 'Price Natural Gas ($)',
                      titlefont: {color: 'rgb(148, 103, 189)'},
                      tickfont: {color: 'rgb(148, 103, 189)'},
                      overlaying: 'y',
                      side: 'right'
                    },
            showlegend: true
        };
        // Needs to use newPlot method to overwite the existing plot    
        Plotly.newPlot('plotdiv2', data, layout);
        document.getElementById("regression").innerHTML = regression[index]


    });
}

// Function unpacking row based CSV data into column based arrays
function unpack(rows, key) {

    return rows.map(function(row) { return row[key]; });
    //return poo.map(function(row) { return row[key]; });
}
function unpack2(row2, key) {
    return row2.map(function(row3) { return row3[key]; });
}

// Initialize the chart
chartSelection();

// Implement an event listener to catch chart selection updates for NG Page
document.getElementById("chartdropdownNG")
        .addEventListener("change", function() {
            chartSelection(this.value);
        }
);