import React, { useEffect, useState } from "react";
import loadingImage from '../../images/preloader.gif';
import Chart from 'chart.js/auto';
import axios from "axios";
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial'
import { DateTime } from "luxon";
import 'chartjs-adapter-luxon';
import styled from 'styled-components';

const Candlestick = () => {

let chart22;

Chart.register(CandlestickController, CandlestickElement,OhlcElement, OhlcController);

React.useEffect(() => {
    var barCount = 60;
    var initialDateStr = '25 Nov 2016 13:23:12 GMT';

    var ctx = document.getElementById('candlestick1').getContext('2d');
    ctx.canvas.width = 250;
    ctx.canvas.height = 250;

    var barData = getRandomData(initialDateStr, barCount);
    function lineData() { return barData.map(d => { return { x: d.x, y: d.c} }) };


    if (typeof chart22 !== "undefined") chart22.destroy();
    let chartStatus = Chart.getChart("candlestick1"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }

    chart22 = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: 'CHRT - Chart.js Corporation',
                data: barData
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

    document.getElementById('update').addEventListener('click', update);

    document.getElementById('randomizeData').addEventListener('click', function() {
        barData = getRandomData(initialDateStr, barCount);
        update();
    });

})

return (
<Wrapper>
    <div>
		<div >
			<canvas id="candlestick1"></canvas>
		</div>
		<div>
			Bar Type:
			<select id="type">
				<option value="candlestick" selected>Candlestick</option>
				<option value="ohlc">OHLC</option>
			</select>
			Scale Type:
			<select id="scale-type">
				<option value="linear" selected>Linear</option>
				<option value="logarithmic">Logarithmic</option>
			</select>
			Color Scheme:
			<select id="color-scheme">
				<option value="muted" selected>Muted</option>
				<option value="neon">Neon</option>
			</select>
			Border:
			<select id="border">
				<option value="true" selected>Yes</option>
				<option value="false">No</option>
			</select>
			Mixed:
			<select id="mixed">
				<option value="true">Yes</option>
				<option value="false" selected>No</option>
			</select>
			<button id="update">Update</button>
			<button id="randomizeData">Randomize Data</button>
		</div>
  </div>
</Wrapper>    
)

}

const Wrapper = styled.div`
    display:grid;
    grid-row-start: 2;
    grid-row-end: 3;
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