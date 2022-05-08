import React, { useEffect, useState } from "react";
import loadingImage from '../../images/preloader.gif';
import Chart from 'chart.js/auto';
import styled, { withTheme } from 'styled-components';
import axios from "axios";
import { color } from 'chart.js/helpers';

import {TreemapController, TreemapElement} from 'chartjs-chart-treemap';


let myChart2;  

Chart.register(TreemapController, TreemapElement);
function colorFromRaw(ctx) {
    if (ctx.type !== 'data') {
      return 'transparent';
    }
    const value = ctx.raw.v;
    let alpha = (1 + Math.log(value)) / 5;
    const color2 = 'green';
    const c2 = color('green')
    return c2
      .alpha(alpha)
      .rgbString();
  }

const Treemap = (stockName) => {
    var constants = require('../../config')
    const [timeseries2, setTimeseries2] = useState(0);

    React.useEffect(() => {


        
        //console.log(stockName.stockName)
        let isCancelled = false;

        let nasdaq100=["AMD","ADBE","ABNB","ALGN","AMZN","AMGN","AEP","ADI","ANSS","AAPL","AMAT","ASML","TEAM","ADSK","ATVI","ADP","AZN","AVGO","BIDU","BIIB","BMRN","BKNG","CDNS","CHTR","CPRT","CRWD","CTAS","CSCO","CMCSA","COST","CSX","CTSH","DDOG","DOCU","DXCM","DLTR","EA","EBAY","EXC","FAST","FB","FISV","FTNT","GILD","GOOG","GOOGL","HON","ILMN","INTC","INTU","ISRG","MRVL","IDXX","JD","KDP","KLAC","KHC","LRCX","LCID","LULU","MELI","MAR","MTCH","MCHP","MDLZ","MRNA","MNST","MSFT","MU","NFLX","NTES","NVDA","NXPI","OKTA","ODFL","ORLY","PCAR","PANW","PAYX","PDD","PYPL","PEP","QCOM","REGN","ROST","SIRI","SGEN","SPLK","SWKS","SBUX","SNPS","TSLA","TXN","TMUS","VRSN","VRSK","VRTX","WBA","WDAY","XEL","ZM","ZS"]

     
    
        const fetchData3 = async () => {
            
            setTimeseries2({data: ''});
            const tickerResults=[]

            const resp3 =  await axios.get("https://api.appvis.co/getnasdaq100");
            //console.log(JSON.stringify(resp3.data.data, null, 2));
            if (!isCancelled) {
                setTimeseries2({data: 'yes'});
            }

            const ctx2 = document.getElementById('myChartTreemap');
        
            if (typeof myChart2 !== "undefined") myChart2.destroy();

            const treedata = [
                {tag:'AAPL', t2:'dd1', num: 1 },
                {tag:'MSFT', t2:'dd2',num: 2 },
                {tag:'TSLA', t2:'dd3',num: 3 },
                {tag:'NVDA', t2:'dd4',num: 4},
                {tag:'IBM', t2:'dd5', num: 5}
            ];

            function colorFromValue(value, border) {
                var alpha = (1 + Math.log(value)) / 5;
                var color2 = "green";
                if (border) {
                    alpha += 0.2;
                }
                return color(color2)
                    .alpha(alpha)
                    .rgbString();
                }

            const INTL_NUM_FORMAT = new Intl.NumberFormat('us', {
                style: 'unit',
                unit: 'kilometer',
                unitDisplay: 'short',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1});
            
            const companies = constants.companiesExtended2;
    
                    //  {ticker: 'CEG', value:'0.12'}
                let merged = [];

                for(let i=0; i<companies.length; i++) {
                    merged.push({
                    ...companies[i], 
                    ...(resp3.data.data.find((itmInner) => itmInner[0] === companies[i].ticker))}
                    );
                }
        
            

                //console.log(JSON.stringify(merged,null,2))
            if (typeof myChart2 !== "undefined") myChart2.destroy();
            let chartStatus = Chart.getChart("myChart2"); // <canvas> id
            if (chartStatus != undefined) {
            chartStatus.destroy();
            }
            myChart2 = new Chart(ctx2, {
                type: "treemap",
                data: {
                    datasets: [
                        {
                          tree: merged,
                          dividers: {
                            lineWidth: 2,
                            display:false,
                            lineColor:color('white').rgbString()
                          },
                          captions: {
                            align: 'left',
                            display: true,
                            color: 'black',
                            font: {
                              size: 8,
                            },
                            hoverFont: {
                              size: 10,
                              weight: 'bold'
                            },
                            padding: 5
                          },
                          groups: ['sector','ticker'],
                          key: 'value',
                          borderWidth: 1,
                          spacing: 2,
                          backgroundColor: function(context,raw) {

                            // if (context.type !== 'data') {
                            //     return color('blue').rgbString();
                            // }

                            // if(context.raw._data.children[context.dataIndex][1]>0)
                            //     return color('green').rgbString();
                            // else   
                            //     return color('red').rgbString();
                            
                            if(typeof context.dataIndex!=='undefined' && context.dataset.data !=='undefined' &&
                            typeof context.dataset.data[context.dataIndex].gs !=='undefined') {
                                if('1' in  context.dataset.data[context.dataIndex]._data.children[0]) {
                                    // console.log('exists')
                                    if(context.dataset.data[context.dataIndex]._data.children[0][1]>0 ) {
                                        let val = context.dataset.data[context.dataIndex]._data.children[0][1];
                                        let alpha
                                        if(val<1)
                                            alpha=0.2
                                        if(val<2)
                                            alpha=0.4
                                        if(val<3)
                                            alpha=0.6
                                        else
                                            alpha=0.9

                                        return color('green').alpha(alpha).rgbString();
                                    }
                                    else {
                                        let val = context.dataset.data[context.dataIndex]._data.children[0][1];
                                        let alpha =1;
                                        if(val<0)
                                            alpha=0.2;
                                        if(val<-0.01)
                                            alpha=0.4
                                        if(val<-0.03)
                                            alpha=0.6
                                        if(val<-0.05)
                                            alpha=0.9
                                      
                                        return color('red').alpha(alpha).rgbString();
                                    }
                                }
                                else {
                                    // console.log('not exists')
                                    return color('white').rgbString();
                                }
                            }
                            return color('white').rgbString();
                            // const index = context.dataIndex;
                            // const value = context.dataset.data[index];
                            // return value < 0 ? 'red' :  // draw negative values in red
                            //     index % 2 ? 'blue' :    // else, alternate values in blue and green
                            //     'green';
                        },
                          labels: {
                              display: true,
                              font: {
                                size: 8,
                              },
                              color: 'white',
                                formatter: function(context) {

                                
                                    if(typeof context.dataIndex!=='undefined' && typeof context.dataset.data[context.dataIndex].gs !=='undefined') {
                                        if('1' in   context.dataset.data[context.dataIndex]._data.children[0]) {
                                            // console.log('exists')
                                            //console.log("this is "+JSON.stringify(context.raw,null,2))
                                            return [context.dataset.data[context.dataIndex]._data.children[0]['ticker'],(100*context.dataset.data[context.dataIndex]._data.children[0][1]).toFixed(2)+"%"]
                                        
                                        }
                                        else {
                                            // console.log('not exists')
                                            return context.dataset.tree[context.dataIndex]['ticker']
                                        }
                                    }
                                    return ''
                                }
                        
                          }
                        }
                       
                      ]
                },
                options: {
                  maintainAspectRatio: false,
                  
                  
                  plugins: {
                    title: {
                        display: true,
                        text: "Gainers and losers"
                      },
                      legend: {
                        display: false
                      }
                    ,tooltip: {
                        enabled:true,
                        callbacks: {
                          title(items) {
                            //return items[0].dataset.key;
                            return '';
                          },
                          label: function(context) {
                            if(typeof context.dataIndex!=='undefined' && typeof context.dataset.data[context.dataIndex].gs !=='undefined') {

                           return context.dataset.data[context.dataIndex]._data.children[0]['name']+": "+(100*context.dataset.data[context.dataIndex]._data.children[0][1]).toFixed(2)+"%"
                            }
                            return ''
                        }
                        }
                      }
                  }
                }
              });



        };
        const mychart=fetchData3();
        return () => {
            isCancelled = true;
           // myChart2.destroy();
        };
        
        
    }, [])

    return (
        <Wrapper>
        {timeseries2.data? (
           <canvas id="myChartTreemap" width="400" height="400"></canvas>

        
        ) : (
         
           <img src={loadingImage} className='loading-img' alt='loding' />
        )}
      </Wrapper>
        
    )

}
const Wrapper = styled.div`
    #myChartTreemap{
        max-width:100%;
    }

    @media (min-width: 992px) {
        grid-row-start: 3;
        grid-row-end: 4; 
    }
    
    margin-bottom:1rem;
  /* align-items: start; */
`;
export default Treemap;