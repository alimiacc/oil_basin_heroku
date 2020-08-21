const csvNG = ["NG_Production1", "NG_Consumption", "US_Storage","NG_Rig_Count"]
const chartNameNG = ["US Natural Gas Production (Million Cubic Feet, Monthly)","US Natural Consumption (Million Cubic Feet, Monthly)", "US Natural Gas Storage (Billion Cubic Feet, Weekly)","US Natural Gas Rig Count(Weekly)"]
const chartLegendNG = [ "Natural Gas Production", "Natural Gas Consumption", "Natural Gas Storage", "Natural Gas Rig Count" ];
const yTraceEntryNG = [ 'Production', 'Consumption', 'Storage', 'Gas' ];
const chartColorNG = [ '#cc3300','#cc3300', '#cc3300', '#cc3300'];
const date2 = ["Month","Month","Week","Date"]
const yPriceNG = ['Price','Price','Price','Price']

const newCsv = ["US_Price","US_Price","US_Price","US_Price"]
const dateChart2 = ["Week","Week","Week","Week"]
const yPriceLegend = ['Price Natural Gas($)','Price Natural Gas($)','Price Natural Gas($)','Price Natural Gas($)']
const chartPriceColor = ['#cc3300', '#336600','#003366','#17BECF'];

const regression = [ '<h3>Statistically Significant Moderate Negative Correlation</h3><Sample size: 125<br>  The correlation coefficient:-0.56<br>  slope=-194585.045<br> intercept=3105533.785<br>  rvalue -0.561 <br> pvalue 9.899628808064528e-12 <br> r-squared 0.31497588367743423',
"<h3>Statistically Significant Weak Negative Correlation</h3>Sample size: 125<br> The correlation coefficient:-0.23<br> slope=-128885.379<br> intercept=2885601.063<br> rvalue=-0.226<br> pvalue=0.0111<br> stderr=49989.945<br> r-squared: 0.0512" ,
"<h3>Statistically Significant Weak Negative Correlation</h3>Sample size: 554<br> The correlation coefficient:-0.2<br> slope=-164.53893583334747<br> intercept=3250.3688074381325<br> rvalue=-0.1986<br> pvalue=2.464239202284745e-06<br> stderr=34.559<br> r-squared: 0.0394" ,
"<h3>Statistically Significant Moderate Positive Correlation</h3>Sample size: 522<br> The correlation coefficient:0.57<br> slope=183.778<br> intercept=-216.070<br> rvalue=0.571<br> pvalue=1.6411252882405985e-46<br> stderr=11.584<br> r-squared: 0.326" ]
const regressionImages = ['<img src="https://data-bootcamp-dt.s3.us-east-2.amazonaws.com/Images/production.png"></img>', '<img src="https://data-bootcamp-dt.s3.us-east-2.amazonaws.com/Images/consumption.png"></img>','<img src="https://data-bootcamp-dt.s3.us-east-2.amazonaws.com/Images/storage.png"></img>','<img src="https://data-bootcamp-dt.s3.us-east-2.amazonaws.com/Images/rig.png"></img>']
const predictingPrice = ['<img src=""></img>','','','<img src=""></img>',]

var weekrow = []
var pricerow = []
d3.csv('./static/data/US_Price.csv', function(loadedRows){
weekrow.push(loadedRows.Week)
pricerow.push(loadedRows.Price)
})

// Chart Selector function to update the index value from [ 0 to 4 ] depeonding on the user's chart selection provided by HTML dropdown element
function chartSelection(index=0) {   
    Plotly.d3.csv(`./static/data/${csvNG[index]}.csv`,   function(rows) {

        var trace1 = {
            type: "scatter",
            mode: "lines",
            x: unpack(rows, date2[index]),
            y: unpack(rows, yTraceEntryNG[index]),
            name: chartLegendNG[index],
            line: {color: chartColorNG[index]}
        };
        var trace2 = {
            type: "scatter",
            mode: "lines",
            x: weekrow,
            y: pricerow, 
            name: 'Price Natural Gas($)',
            line: {color: '#336600'},
            yaxis: 'y2'
            
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
                
                rangeselector: {buttons: [
                    { count: 1,
                      label: '1m',
                      step: 'month',
                      stepmode: 'backward'},
                    { count: 6,
                      label: '6m',
                      step: 'month',
                      stepmode: 'backward'},
                    { count: 3,
                      label: '3y',
                      step: 'year',
                      stepmode: 'backward'},
                    {step: 'all'}
                ]},
            rangeslider: {range: [startDate, endDate]},
            type: 'date'},
            yaxis: {title: "price"},
            yaxis2: { titlefont: {color: 'rgb(148, 103, 189)'},
                      tickfont: {color: 'rgb(148, 103, 189)'},
                      overlaying: 'y',
                      side: 'right'},
           showlegend: true
        };
        // Needs to use newPlot method to overwite the existing plot    
        Plotly.newPlot('plotdiv2', data, layout);
        document.getElementById("regression").innerHTML = regression[index]
        document.getElementById("regressionImage").innerHTML = regressionImages[index]
        document.getElementById("predictionImage").innerHTML = predictingPrice[index]
    });
}

// Function unpacking row based CSV data into column based arrays
function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
}
// function unpack2(row2, key) {
//     return row2.map(function(row3) { return row3[key]; });
// }

// Initialize the chart
chartSelection();

// Implement an event listener to catch chart selection updates for NG Page
document.getElementById("chartdropdownNG")
        .addEventListener("change", function() {
            chartSelection(this.value);
        }
);