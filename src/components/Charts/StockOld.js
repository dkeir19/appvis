// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import TimeSeries from "fusioncharts/fusioncharts.timeseries";

// Include the theme as fusion
//  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, TimeSeries);


// STEP 3 - Creating the JSON object to store the chart configurations

const Stock = ({ data }) => {
   console.log(data)
    const chartConfigs = {

      type: "timeseries",
      renderAt: "container",
      width: "600",
      height: "400",
      dataSource: data,

    }
    return <ReactFC {...chartConfigs} />;
  };

  
  export default Stock;
  