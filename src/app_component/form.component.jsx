import React, { useState, useEffect } from 'react';
import './form-style.css'
import Converter from "node-temperature-converter";


const Form = (props) => {
    const [temperatureValues, setTemperatureValues] = useState({
        celsius: null,
        kelvin: null,
        fahrenheit: null,
    });

    const [max, setMax] = useState({
        celsius: null,
        kelvin: null,
        fahrenheit: null
    });
    const [min, setMin] = useState({
        celsius: null,
        kelvin: null,
        fahrenheit: null
    });
    const [displayTemp, setDisplayTemp] = useState("celsius");


    useEffect(() => {
        if (!isNaN(props.temp_kelvin)) {

            const kelvin = new Converter.Kelvin(props.temp_kelvin);
            console.log(kelvin)
            setTemperatureValues({
                ...temperatureValues,
                celsius: Math.round(kelvin.toCelsius()),
                kelvin: Math.round(props.temp_kelvin),
                fahrenheit: Math.round(kelvin.toFahrenheit())
            })
        }
    }, [props.temp_kelvin]);

    useEffect(() => {
        if (!isNaN(props.temp_max) && props.temp_max !== null) {
            const kelvin = new Converter.Kelvin(Math.round(props.temp_max));
            setMax({
                ...max,
                celsius: Math.round(kelvin.toCelsius()),
                kelvin: Math.round(props.temp_max),
                fahrenheit: Math.round(kelvin.toFahrenheit())
            })
        }
        if (!isNaN(props.temp_min) && props.temp_min !== null) {
            const kelvin = new Converter.Kelvin(Math.round(props.temp_max));
            setMin({
                ...min,
                celsius: Math.round(kelvin.toCelsius()),
                kelvin: Math.round(props.temp_min),
                fahrenheit: Math.round(kelvin.toFahrenheit())
            })
        }
        console.log(props.temp_max, props.temp_min)
    }, [props.temp_max, props.temp_min]);

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
                        <input className="temp-type" type="radio" name="temperature" id="c" value="c" checked={displayTemp === "celsius"} onChange={() => displayTemp !== "celsius" && setDisplayTemp("celsius")}></input>

                        <label htmlFor="k">Kelvin</label>
                        <input className="temp-type" type="radio" name="temperature" id="k" valiue="k" checked={displayTemp === "kelvin"} onChange={() => displayTemp !== "kelvin" && setDisplayTemp("kelvin")}></input>

                        <label htmlFor="f">Fahrenheit</label>
                        <input className="temp-type" type="radio" name="temperature" id="f" value="f" checked={displayTemp === "fahrenheit"} onChange={() => displayTemp !== "fahrenheit" && setDisplayTemp("fahrenheit")}></input>

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
                        <h1 className="py-2">{temperatureValues[displayTemp]}
                            <span className={displayTemp === "celsius" && temperatureValues.celsius !== null ? "inline" : "hide"}>&#8451;</span>
                            <span className={displayTemp === "fahrenheit" && temperatureValues.fahrenheit !== null ? "inline" : "hide"}>&#8457;</span>
                            <span className={displayTemp === "kelvin" && temperatureValues.kelvin !== null ? "inline" : "hide"}>&#8490;</span>
                        </h1>
                    )}

                    {/* show max and min temp */}
                    {min.celsius !== null && min[displayTemp]}{max.celsius !== null && max[displayTemp]}



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