import React, { useEffect, useState } from "react";
import loadingImage from '../../images/preloader.gif';
import Chart from 'chart.js/auto';
import axios from "axios";


let myChart;  



const Stock2 = (stockName) => {

    const [timeseries2, setTimeseries2] = useState(0);

    React.useEffect(() => {
        console.log(stockName.stockName)
        let isCancelled = false;

       
        const fetchData3 = async () => {
            
            setTimeseries2({data: ''});
            
            const resp3 =  await axios.get("https://appvis.co/api?ticker="+stockName.stockName);
            if (!isCancelled) {
                setTimeseries2({data: 'yes'});
            }
            console.log(resp3.data);
       

            //console.log(JSON.stringify(data, null, 2) );
            const temp=[]
            const appended=[]
            const labels=[]
            for(var i = 0; i < resp3.length; i++) {
                labels.append( resp3[i][0] )
            }
           
            //daysArray[i].toString().slice(1,10)
            //console.log(data.h);

            
            const ctx = document.getElementById('myChart');
        
            if (typeof myChart !== "undefined") myChart.destroy();
            let chartStatus = Chart.getChart("myChart"); // <canvas> id
            if (chartStatus != undefined) {
            chartStatus.destroy();
            }
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: resp3.data.timestamps,
                    datasets: [{
                        label: '# of Votes',
                        data: resp3.data.data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });



        };
        fetchData3();
        return () => {
            isCancelled = true;
        };
        
        
    }, [stockName])

    return (
        <div>
        {timeseries2.data? (
           <canvas id="myChart" width="400" height="400"></canvas>

        
        ) : (
         
           <img src={loadingImage} className='loading-img' alt='loding' />
        )}
      </div>
        
    )

}
  
export default Stock2;