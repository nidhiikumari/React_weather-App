import React, { useState, useEffect } from 'react';
import '../App.css'
// for random images url from UNSPLASH ----- https://source.unsplash.com/random/600x900/?wallpaper,landscape';

// CDN for fontawesome - ---<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>


const SearchWeather = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    let componentMounted = true;
    

   
      
                useEffect(() => {
                    const fetchWeather = async () => {
                        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=639c69873a2b4f1a95e4730788eaf1ca`);
                        // const resJson = await response.json();
                        // setInput(resJson);
                        if (componentMounted) {
                            setData(await response.json());
                            
                            console.log(data);
            
                        }
                        return () => {
                            componentMounted = false;
                        }
                        
            
                    }
                    fetchWeather();
                    
            
                    // console.log(data.name);
            
            
                },[search]);

        
            
           

        

    

   

    

    let emoji = null;
    if (typeof data.main !== "undefined") {
        if (data.weather[0].main == "Clouds") {
            emoji = "fa-cloud"
        } else if (data.weather[0].main == "Thounderstorm") {
            emoji = "fa-bolt"
        } else if (data.weather[0].main == "Drizzle") {
            emoji = "fa-cloud-rain"
        } else if (data.weather[0].main == "Rain") {
            emoji = "fa-cloud-shower-heavy"
        } else if (data.weather[0].main == "Snow") {
            emoji = "fa-snow-flake"
        } else {
            emoji = "fa-smog"

        }

     } else {
        return (
            <div>...Loading</div>


        )
    }

    let temp = (data.main.temp - 273.15).toFixed(2);
    let temp_min = (data.main.temp_min - 273.15).toFixed(2);
    let temp_max = (data.main.temp_max - 273.15).toFixed(2);
    let feels_like = (data.main.feels_like - 273.15).toFixed(2);

    // Date
    let d = new Date()
    let date = d.getDate();
    let month = d.toLocaleString("default", { month: 'long' });
    let day = d.toLocaleString("default", { weekday: 'long' });
    let year = d.getFullYear();

    // Time
    let time = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'

    });

    const handleSubmit = (event) => {
        event.preventDefaut();
        setSearch(input);
        
        // console.log("hello",input);
             
    }
    
    console.log("input", input);
    console.log("search",search);
    console.log("setsearch", search);
    
    return (




        <div className='container mt-3'>
            <div className="row justify-content-center">
                <div className="col-md-4 text-center border-0">
                    <div className="card bg-dark text-white">
                        <img src={`https://source.unsplash.com/random/550x900/?${data.weather[0].main}`} className="card-img" alt="..." />
                        <div className="card-img-overlay">
                            <h2 className=" gradient-text" >Weather App</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-4 w-75 mx-auto">
                                    <input type="search"
                                        className="form-control"
                                        placeholder="Search City"
                                        aria-label="Search City"
                                        aria-describedby="basic-addon2"
                                        name="search"
                                        value={input}
                                        onChange={(e) => {setInput(e.target.value)}}
                                        required />
                                    <button type="submit" className="input-group-text" id="basic-addon2" >
                                        <i className='fas fa-search'></i>
                                    </button>
                                </div>

                            </form>
                            <div className="bg-dark bg-opacity-50 py-3">

                                <h2 className="card-title">{data.name}</h2>
                                <p className="card-text lead">{day},  {date}  {month}, {year}
                                    <br />
                                    {time}
                                </p>
                                <hr />
                                <i className={`fas ${emoji} fa-4x`}></i>
                                <h1 className="fa-bolder mb-5">{temp} &deg;C</h1>
                                <p className="load">Feels Like: {feels_like} &deg;C</p>
                                <p className="load fa-bolder mb-0">{data.weather[0].main}</p>
                                <p className="load">min temp:{temp_min} &deg;C | max temp: {temp_max} &deg;C</p>


                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default SearchWeather