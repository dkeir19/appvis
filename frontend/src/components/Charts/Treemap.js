import React, { useEffect, useState } from "react";
import loadingImage from '../../images/preloader.gif';
import Chart from 'chart.js/auto';
import styled from 'styled-components';
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

    const [timeseries2, setTimeseries2] = useState(0);

    React.useEffect(() => {


        
        //console.log(stockName.stockName)
        let isCancelled = false;

        let nasdaq100=["AMD","ADBE","ABNB","ALGN","AMZN","AMGN","AEP","ADI","ANSS","AAPL","AMAT","ASML","TEAM","ADSK","ATVI","ADP","AZN","AVGO","BIDU","BIIB","BMRN","BKNG","CDNS","CHTR","CPRT","CRWD","CTAS","CSCO","CMCSA","COST","CSX","CTSH","DDOG","DOCU","DXCM","DLTR","EA","EBAY","EXC","FAST","FB","FISV","FTNT","GILD","GOOG","GOOGL","HON","ILMN","INTC","INTU","ISRG","MRVL","IDXX","JD","KDP","KLAC","KHC","LRCX","LCID","LULU","MELI","MAR","MTCH","MCHP","MDLZ","MRNA","MNST","MSFT","MU","NFLX","NTES","NVDA","NXPI","OKTA","ODFL","ORLY","PCAR","PANW","PAYX","PDD","PYPL","PEP","QCOM","REGN","ROST","SIRI","SGEN","SPLK","SWKS","SBUX","SNPS","TSLA","TXN","TMUS","VRSN","VRSK","VRTX","WBA","WDAY","XEL","ZM","ZS"]

     
    
        const fetchData3 = async () => {
            
            setTimeseries2({data: ''});
            const tickerResults=[]

            const resp3 =  await axios.get("http://178.128.170.245/getnasdaq100");
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
                    alpha += 0.01;
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

            const companies= [{ticker: 'AAPL', value:'12.089'}, {ticker: 'MSFT', value:'10.175'}, {ticker: 'AMZN', value:'7.413'}, {ticker: 'TSLA', value:'4.227'}, {ticker: 'NVDA', value:'4.204'}, {ticker: 'GOOG', value:'3.901'}, {ticker: 'GOOGL', value:'3.699'}, {ticker: 'FB', value:'3.381'}, {ticker: 'AVGO', value:'1.874'}, {ticker: 'COST', value:'1.866'}, {ticker: 'CSCO', value:'1.743'}, {ticker: 'PEP', value:'1.688'}, {ticker: 'ADBE', value:'1.605'}, {ticker: 'CMCSA', value:'1.59'}, {ticker: 'INTC', value:'1.448'}, {ticker: 'AMD', value:'1.384'}, {ticker: 'QCOM', value:'1.301'}, {ticker: 'NFLX', value:'1.266'}, {ticker: 'TXN', value:'1.247'}, {ticker: 'TMUS', value:'1.191'}, {ticker: 'PYPL', value:'1.037'}, {ticker: 'INTU', value:'1.018'}, {ticker: 'HON', value:'1.001'}, {ticker: 'AMGN', value:'0.986'}, {ticker: 'AMAT', value:'0.895'}, {ticker: 'ISRG', value:'0.778'}, {ticker: 'SBUX', value:'0.772'}, {ticker: 'CHTR', value:'0.747'}, {ticker: 'ADP', value:'0.676'}, {ticker: 'BKNG', value:'0.67'}, {ticker: 'MU', value:'0.666'}, {ticker: 'ADI', value:'0.641'}, {ticker: 'MDLZ', value:'0.64'}, {ticker: 'CSX', value:'0.597'}, {ticker: 'LRCX', value:'0.569'}, {ticker: 'GILD', value:'0.558'}, {ticker: 'REGN', value:'0.549'}, {ticker: 'MRNA', value:'0.54'}, {ticker: 'FISV', value:'0.492'}, {ticker: 'VRTX', value:'0.475'}, {ticker: 'ABNB', value:'0.465'}, {ticker: 'ATVI', value:'0.46'}, {ticker: 'MRVL', value:'0.451'}, {ticker: 'MELI', value:'0.448'}, {ticker: 'PANW', value:'0.426'}, {ticker: 'ASML', value:'0.422'}, {ticker: 'MAR', value:'0.419'}, {ticker: 'KLAC', value:'0.412'}, {ticker: 'ILMN', value:'0.407'}, {ticker: 'KDP', value:'0.402'}, {ticker: 'FTNT', value:'0.386'}, {ticker: 'NXPI', value:'0.379'}, {ticker: 'SNPS', value:'0.365'}, {ticker: 'CTSH', value:'0.361'}, {ticker: 'WDAY', value:'0.358'}, {ticker: 'AEP', value:'0.355'}, {ticker: 'ADSK', value:'0.352'}, {ticker: 'PAYX', value:'0.346'}, {ticker: 'KHC', value:'0.345'}, {ticker: 'ORLY', value:'0.344'}, {ticker: 'IDXX', value:'0.343'}, {ticker: 'DXCM', value:'0.34'}, {ticker: 'CDNS', value:'0.33'}, {ticker: 'CRWD', value:'0.325'}, {ticker: 'MCHP', value:'0.322'}, {ticker: 'MNST', value:'0.32'}, {ticker: 'LCID', value:'0.318'}, {ticker: 'EXC', value:'0.318'}, {ticker: 'TEAM', value:'0.312'}, {ticker: 'CTAS', value:'0.311'}, {ticker: 'WBA', value:'0.306'}, {ticker: 'LULU', value:'0.293'}, {ticker: 'JD', value:'0.291'}, {ticker: 'DDOG', value:'0.289'}, {ticker: 'ODFL', value:'0.283'}, {ticker: 'XEL', value:'0.281'}, {ticker: 'AZN', value:'0.27'}, {ticker: 'BIDU', value:'0.27'}, {ticker: 'EA', value:'0.266'}, {ticker: 'DLTR', value:'0.265'}, {ticker: 'ALGN', value:'0.262'}, {ticker: 'VRSK', value:'0.252'}, {ticker: 'FAST', value:'0.25'}, {ticker: 'ROST', value:'0.247'}, {ticker: 'EBAY', value:'0.247'}, {ticker: 'ZS', value:'0.234'}, {ticker: 'PCAR', value:'0.231'}, {ticker: 'CPRT', value:'0.23'}, {ticker: 'BIIB', value:'0.23'}, {ticker: 'MTCH', value:'0.219'}, {ticker: 'ZM', value:'0.211'}, {ticker: 'ANSS', value:'0.208'}, {ticker: 'SGEN', value:'0.197'}, {ticker: 'OKTA', value:'0.194'}, {ticker: 'SIRI', value:'0.187'}, {ticker: 'VRSN', value:'0.182'}, {ticker: 'SWKS', value:'0.166'}, {ticker: 'SPLK', value:'0.152'}, {ticker: 'DOCU', value:'0.142'}, {ticker: 'NTES', value:'0.142'}, {ticker: 'PDD', value:'0.141'}]
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
                          groups: ['ticker'],
                          key: 'value',
                          borderWidth: 1,
                          spacing: 1,
                          backgroundColor: function(context,raw) {
                            // console.log("--new loop--"+context.dataIndex)
                            // console.log(JSON.stringify(context.dataset.tree[context.dataIndex],null,2) )
                            // console.log(context.dataIndex)
                            //console.log("this is"+JSON.stringify(raw,null,2))
                            if(typeof context.dataIndex!=='undefined') {
                                if('1' in  context.dataset.tree[context.dataIndex]) {
                                    // console.log('exists')
                                    if(context.dataset.tree[context.dataIndex][1]>0 ) {
                                        return 'green'
                                    }
                                    else {
                                        return 'red'
                                    }
                                }
                                else {
                                    // console.log('not exists')
                                    return 'blue'
                                }
                            }

                            // const index = context.dataIndex;
                            // const value = context.dataset.data[index];
                            // return value < 0 ? 'red' :  // draw negative values in red
                            //     index % 2 ? 'blue' :    // else, alternate values in blue and green
                            //     'green';
                        },
                          labels: {
                              display: true,
                              font: {
                                size: 6,
                              },
                                formatter: function(context) {
                                    if(typeof context.dataIndex!=='undefined') {
                                        if('1' in  context.dataset.tree[context.dataIndex]) {
                                            // console.log('exists')
                                            //console.log("this is "+JSON.stringify(context.raw,null,2))
                                            if(context.dataset.tree[context.dataIndex][1]<0 ) {
                                                return context.dataset.tree[context.dataIndex]['ticker']+": -"+(100*context.dataset.tree[context.dataIndex][1]).toFixed(2)+"%"
                                            }
                                            else {
                                                return context.dataset.tree[context.dataIndex]['ticker']+": +"+(100*context.dataset.tree[context.dataIndex][1]).toFixed(2)+"%"
                                            }
                                            return context.dataset.tree[context.dataIndex]['ticker']+": "+(100*context.dataset.tree[context.dataIndex][1]).toFixed(2)+"%"
                                        
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
                    tooltip: {
                      enabled: true,
                    },
                    legend: {
                        display: false,
                        enabled: false
                    },
                    tooltip: {
                        callbacks: {
                          title(items) {
                            //return items[0].dataset.key;
                            return '';
                          },
                          label: function(context) {
                            let label = context.dataset.label || '';
    
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                           return context.dataset.tree[context.dataIndex]['ticker']+": "+(100*context.dataset.tree[context.dataIndex]['1']).toFixed(2)+"%"
                            return label;
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
        
        
    }, [stockName])

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
    grid-row-start: 2;
    grid-row-end: 3;
  /* align-items: start; */
`;
export default Treemap;