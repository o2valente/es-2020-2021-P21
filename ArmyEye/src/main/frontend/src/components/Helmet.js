import React, { Component, useState, SyntheticEvent  } from "react";
import axios from "axios";
import styled from 'styled-components';
import {Line} from "react-chartjs-2";

const state = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }
    ]
}
const H0 = styled.h1({
    fontSize: 25,
    paddingBottom: 30,
    paddingTop: 20,
    color: 'black',
    textAlign: "center"
});

const H1 = styled.h1({
    paddingBottom: 30,
    fontSize: 12,
    paddingTop: 0,
    textAlign: "center"
});


class Helmet extends React.Component {

    constructor(props){
      super(props);
        this.state = {
            helmet:[]
        }
      this.loadData = this.loadData.bind(this);
    }

    componentDidMount(){
      this.loadData();
      setInterval(this.loadData, 20000);

    }

    async loadData() {
        try {
            axios.get("http://192.168.160.87:21001/helmet").then(response => {
                console.log("ola Helmet")
                this.setState({ helmet: response.data })
            });
        } catch (e) {
            console.log(e);
        }
    }

    render(){
        return(
            <div>
{/*                <Line
                    data={state}
                    options={{
                        title:{
                            display:true,
                            text:'Average Rainfall per month',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />*/}
                <H0 className="text-center" > Soldier Helmet Status </H0>

                <table className = "table table-striped">
                    <thead>
                    <tr>
                        <td>Timestamp (UTC)</td>
                        <td>Timestamp (ms)</td>
                        <td>Altitude</td>
                        <td>CO</td>
                        <td>NO2</td>
                        <td>Temperature</td>
                        {/*<td>Atmospheric pressure</td>
                        <td>Humidity</td>
                        <td>Luminosity</td>
                        <td>Battery</td>*/}

                    </tr>
                    </thead>
                    <tbody id="myTable"> { this.state.helmet.map( hel =>
                    {
                        if(hel.CO > 0.0){
                            return  <tr key = {hel.Timestampms}>
                                <td>{hel.TimestampUTC}</td>
                                <td>{hel.Timestampms}</td>
                                <td>{hel.Altitude}</td>
                                <td style={{ color:'red', fontWeight: 'bold'}}>{hel.CO}</td>
                                <td>{hel.NO2}</td>
                                <td>{hel.Environmentaltemperature}</td>
                                {/*<td>{hel.Atmosphericpressure}</td>
                                <td>{hel.Humidity}</td>
                                <td>{hel.Luminosity}</td>
                                <td>{hel.Battery}</td>*/}
                            </tr>
                        } else{
                            return  <tr key = {hel.Timestampms}>
                                <td>{hel.TimestampUTC}</td>
                                <td>{hel.Timestampms}</td>
                                <td>{hel.Altitude}</td>
                                <td style={{ color:'blue', fontWeight: 'bold'}}>{hel.CO}</td>
                                <td>{hel.NO2}</td>
                                <td>{hel.Environmentaltemperature}</td>
                                {/* <td>{hel.Atmosphericpressure}</td>
                               <td>{hel.Humidity}</td>
                                <td>{hel.Luminosity}</td>
                                <td>{hel.Battery}</td>*/}
                            </tr>
                        }
                    }
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Helmet