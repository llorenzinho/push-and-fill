import React, { useState, useEffect } from 'react';
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import LiquidFillGauge from 'react-liquid-gauge';
import '../css/progress.css';
import { onProgressUpdate } from '../services/socketService';

export const Progress = ({team}) => {
    var [state, setState] = useState({ value: 0 });
    // start color and end color based on team value (wine or beer)
    console.log(team);
    useEffect(() => {
        onProgressUpdate((teams) => {
            var teamData = teams.filter((t) => t.teamName === team)[0];
            setState({ value: teamData.percScore * 100 });
        })
    })

    const startColor = team === 'WINE' ? '#610080' : '#e2e200';
    const endColor = team === 'WINE' ? '#6f0045' : '#e2c700';
 
    const radius = 200;
    const interpolate = interpolateRgb(startColor, endColor);
    const fillColor = interpolate(state.value / 100);
    const gradientStops = [
        {
            key: '0%',
            stopColor: color(fillColor).darker(0.5).toString(),
            stopOpacity: 1,
            offset: '0%'
        },
        {
            key: '50%',
            stopColor: fillColor,
            stopOpacity: 0.75,
            offset: '50%'
        },
        {
            key: '100%',
            stopColor: color(fillColor).brighter(0.5).toString(),
            stopOpacity: 0.5,
            offset: '100%'
        }
    ];
 
    return (
        <div style={{ textAlign: 'center', padding: '10%' }}>
            <LiquidFillGauge
                style={{ margin: '0 auto' }}
                width={radius * 2}
                height={radius * 2}
                value={state.value}
                percent="%"
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={(props) => {
                    const value = Math.round(props.value);
                    const radius = Math.min(props.height / 2, props.width / 2);
                    const textPixels = (props.textSize * radius / 2);
                    const valueStyle = {
                        fontSize: textPixels
                    };
                    const percentStyle = {
                        fontSize: textPixels * 0.6
                    };

                    return (
                        <tspan>
                            <tspan className="value" style={valueStyle}>{value}</tspan>
                            <tspan style={percentStyle}>{props.percent}</tspan>
                        </tspan>
                    );
                }}
                riseAnimation
                waveAnimation
                waveFrequency={1}
                waveAmplitude={2}
                gradient
                gradientStops={gradientStops}
                circleStyle={{
                    fill: fillColor
                }}
                waveStyle={{
                    fill: fillColor
                }}
                textStyle={{
                    fill: color('#444').toString(),
                    fontFamily: 'Arial'
                }}
                waveTextStyle={{
                    fill: color('#fff').toString(),
                    fontFamily: 'Arial'
                }}
            />
            <div
                style={{
                    margin: '20px auto',
                    width: 120
                }}
            >
            </div>
        </div>
    );
}
