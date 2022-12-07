import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../styles/Home.module.css'
import { breakWords } from "../Utils/Words";

const Chart = ({data}) => {
    
    function CustomTooltip({ payload, label, active }) {
        if (active) {
            console.log(payload)
            return (
                <div className="custom-tooltip">
                <h1 className="label">{`"${label}"`}</h1>
                <p>{"count: "+payload[0].value}</p>
                </div>
            );}
    }

    const chartData = breakWords(data);
    console.log(chartData)
    return(
        <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="70%"> 
                <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Word" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />}/>
                    <Legend />
                    <Bar dataKey="Count" fill="hsla(276, 85%, 77%, 1)" stroke='black'/>
                </BarChart>
            </ResponsiveContainer>

            <h1>Top 20 words</h1>
        </div>
        
    )
}

export default Chart;