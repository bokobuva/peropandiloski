import React, { useState, useEffect } from 'react';
import './form-style.css'
import Converter from "node-temperature-converter";
import Weather from "../app_component/weather.component.jsx"


const Form = (props) => {
    console.log(props)
    const [temperatureValues, setTemperatureValues] = useState({
        celsius: 0,
        kelvin: 0,
        fahrenheit: 0,
    });

    const [displayTemp, setDisplayTemp] = useState("celsius");


    useEffect(() => {
        if (props.temp_kelvin) {

            const kelvin = new Converter.Kelvin(props.temp_kelvin);

            setTemperatureValues({
                ...temperatureValues,
                celsius: Math.round(kelvin.toCelsius()),
                kelvin: Math.round(props.temp_kelvin),
                fahrenheit: Math.round(kelvin.toFahrenheit())
            })
        }
    }, [props.temp_kelvin]);

    useEffect(() => {
        console.log(temperatureValues[displayTemp])
    }, [displayTemp, temperatureValues]);
    return (
        <div className="container h-100">
            <form onSubmit={props.loadweather}>
                <div>{props.error ? error() : ""}</div>
                <div className="row">
                    <div className="col-md-3 offset-md-2">
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            autoComplete="off"
                            placeholder="City" />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            name="country"
                            autoComplete="off"
                            placeholder="Country" />
                    </div>
                    <div className="col-md-3 mt-md-0 text-md-left">
                        <button className="btn btn-warning">Get Weather</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="c">Celsius</label>
                        <input className="temp-type" type="radio" name="temperature" id="c" value="c" onChange={() => displayTemp !== "celsius" && setDisplayTemp("celsius")}></input>

                        <label htmlFor="k">Kelvin</label>
                        <input className="temp-type" type="radio" name="temperature" id="k" valiue="k" onChange={() => displayTemp !== "kelvin" && setDisplayTemp("kelvin")}></input>

                        <label htmlFor="f">Fahrenheit</label>
                        <input className="temp-type" type="radio" name="temperature" id="f" value="f" onChange={() => displayTemp !== "fahrenheit" && setDisplayTemp("fahrenheit")}></input>

                    </div>

                </div>
            </form>
            <div className="container text-light">
                <div className="Card">
                    <h1 className="text-white py-3">{props.cityname}</h1>
                    <h5 className="py-4">
                        <i className={`wi ${props.weatherIcon} display-1`} />
                    </h5>

                    {/* Get Celsius */}
                    {temperatureValues.kelvin !== 0 && (
                        <h1 className="py-2">{temperatureValues[displayTemp]}&#x2103;</h1>
                    )}

                    {/* show max and min temp */}
                    {/* {maxminTemp(props.temp_min, props.temp_max)} */}

                    {/* Weather description */}
                    <h4 className="py-3">
                        {/*desctiption with first letter uppercaser */}
                        {props.description.charAt(0).toUpperCase() +
                            props.description.slice(1)}
                    </h4>
                </div>
            </div>
        </div>
    );
};

function error() {
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Plese Enter City and Country...
        </div>
    )
}



export default Form;