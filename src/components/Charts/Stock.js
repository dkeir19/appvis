// STEP 1 - Include Dependencies
// Include react
import React, { useEffect, useState } from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import TimeSeries from "fusioncharts/fusioncharts.timeseries";

// Include the theme as fusion
//  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";


// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);



// STEP 3 - Creating the JSON object to store the chart configurations

const Stock = ( data2 ) => {

  //const [results, setResults] = useState(0);
  const [timeseries, setTimeseries] = useState(0);

  React.useEffect(() => {
    console.log('in stock');
    console.log(JSON.stringify(data2, null, 2) );
     const fetchData = async () => {
        const resp1 =  await axios.get("https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/candlestick-chart-data.json");
    
        // setRes1(resp1.data)

        const resp2 =  await axios.get("https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json")
        // setRes2(resp2.data)

       const timeseries = {
          type: "timeseries",
          renderAt: "container",
          width: "600",
          height: "400",
          dataSource:  {
            chart: {
              caption: "Languages",
              captionFontColor: "#102a42",
              captionFontBold: 0,
              captionFontSize: 20,
              captionFont: "Roboto",
              baseFont: "Open Sans",
              baseFontSize: 16,
              baseFontColor: "#617d98",
              smartLineColor: "#617d98",
              showShadow: 0,
              showPlotBorder: 0,
              paletteColors:
                "#2caeba, #5D62B5, #FFC533, #F2726F, #8d6e63, #1de9b6, #6E80CA",
              use3DLighting: 0,
              useDataPlotColorForLabels: 0,
              bgColor: "#FFFFFF",
              showBorder: 0,
              decimals: 0,
              pieRadius: "45%",
            },
            caption: {
              text: "Apple Inc. Stock Price"
            },
            subcaption: {
              text: "Stock prices from January 1980 - November 2011"
            },
            yaxis: [
              {
                plot: {
                  value: {
                    open: "Open",
                    high: "High",
                    low: "Low",
                    close: "Close"
                  },
                  type: "candlestick"
                },
                format: {
                  prefix: "$"
                },
                title: "Stock Value"
              }
            ]
          
          }
      }
      console.log("resp1 "+resp1)
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data2.data,
        resp2.data
      );

      timeseries.dataSource.data = fusionTable;
      console.log(timeseries)
      setTimeseries(timeseries)
     
    }
 
    fetchData();
  
   }, [])


  return (
    <div>
    {timeseries.dataSource ? (
      <ReactFC {...timeseries} />
    ) : (
     
      "before loading"
    )}
  </div>
    
  )

}

  
  export default Stock;