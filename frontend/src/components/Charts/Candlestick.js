import React, { useEffect, useState } from "react";
import loadingImage from '../../images/preloader.gif';
import Chart from 'chart.js/auto';
import axios from "axios";
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial'
import { DateTime } from "luxon";
import 'chartjs-adapter-luxon';
import styled from 'styled-components';

import { GithubContext } from '../../context/context';

const Candlestick = () => {

const { currentStock, currentStockName } = React.useContext(GithubContext);

let chart22;

Chart.register(CandlestickController, CandlestickElement,OhlcElement, OhlcController);

React.useEffect(() => {
    var barCount = 60;
    var initialDateStr = '25 Nov 2016 13:23:12 GMT';

    var ctx = document.getElementById('candlestick1').getContext('2d');
    ctx.canvas.width = 250;
    ctx.canvas.height = 120;

    var barData = getRandomData(initialDateStr, barCount);
    function lineData() { return barData.map(d => { return { x: d.x, y: d.c} }) };


    if (typeof chart22 !== "undefined") chart22.destroy();
    let chartStatus = Chart.getChart("candlestick1"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }

    chart22 = new Chart(ctx, {
        type: 'candlestick',
        responsive:true,
        maintainAspectRatio: false, 
        data: {
            datasets: [{
                label: currentStockName,
                data: currentStock
            }]
        }
    });

    var getRandomInt = function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    };

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function randomBar(date, lastClose) {
        var open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
        var close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);
        var high = +randomNumber(Math.max(open, close), Math.max(open, close) * 1.1).toFixed(2);
        var low = +randomNumber(Math.min(open, close) * 0.9, Math.min(open, close)).toFixed(2);
        return {
            x: date.valueOf(),
            o: open,
            h: high,
            l: low,
            c: close
        };

    }

    function getRandomData(dateStr, count) {
        var date = DateTime.fromRFC2822(dateStr);
        var data = [randomBar(date, 30)];
        while (data.length < count) {
            date = date.plus({days: 1});
            if (date.weekday <= 5) {
                data.push(randomBar(date, data[data.length - 1].c));
            }
        }
        return data;
    }

    var update = function() {
        var dataset = chart22.config.data.datasets[0];

        // candlestick vs ohlc
        var type = document.getElementById('type').value;
        dataset.type = type;

        // linear vs log
        var scaleType = document.getElementById('scale-type').value;
        chart22.config.options.scales.y.type = scaleType;

        // color
        var colorScheme = document.getElementById('color-scheme').value;
        if (colorScheme === 'neon') {
            dataset.color = {
                up: '#01ff01',
                down: '#fe0000',
                unchanged: '#999',
            };
        } else {
            delete dataset.color;
        }

        // border
        var border = document.getElementById('border').value;
        var defaultOpts = Chart.defaults.elements[type];
        if (border === 'true') {
            dataset.borderColor = defaultOpts.borderColor;
        } else {
            dataset.borderColor = {
                up: defaultOpts.color.up,
                down: defaultOpts.color.down,
                unchanged: defaultOpts.color.up
            };
        }

        // mixed charts
        var mixed = document.getElementById('mixed').value;
        if(mixed === 'true') {
            chart22.config.data.datasets = [
                {
                    label: 'CHRT - Chart.js Corporation',
                    data: barData
                },
                {
                    label: 'Close price',
                    type: 'line',
                    data: lineData()
                }	
            ]
        }
        else {
            chart22.config.data.datasets = [
                {
                    label: 'CHRT - Chart.js Corporation',
                    data: barData
                }	
            ]
        }

        chart22.update();
    };


})

return (
<Wrapper>

			<canvas id="candlestick1"></canvas>

</Wrapper>    
)

}

const Wrapper = styled.div`

@keyframes moveInRight {
    0% {
        opacity: 0;
        transform: translateX(10rem);
    }

    80% {
        transform: translateX(2rem);
    }

    100% {
        opacity: 1;
        transform: translate(0);
    }
  }

  animation-name: moveInRight;
  animation-duration: 1s;
  animation-timing-function: ease-out;

    #candlestick1 {
        max-width:100%;
    }

    display:grid;
  
    position: relative;
   
    @media (min-width: 992px) {
        grid-row-start: 2;
        grid-row-end: 3; 
    }
    
    margin-bottom:1rem;

    background: var(--clr-white);
    border-top-right-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
    position: relative;
  
    &::before {
      content: 'Stock chart';
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      background: var(--clr-white);
      color: var(--clr-grey-5);
      border-top-right-radius: var(--radius);
      border-top-left-radius: var(--radius);
      text-transform: capitalize;
      padding: 0.5rem 1rem 0 1rem;
      letter-spacing: var(--spacing);
      font-size: 1rem;
    }

  /* align-items: start; */
`;
export default Candlestick;