import React, { useState, useEffect } from 'react';

const SearchWeather = () => {
    const [search, setSearch] = useState("delhi");
    const [data, setData] = useState([]);
    const [input, setInput] = useState(" ");
    let componentMounted = true;

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}
            &appid=639c69873a2b4f1a95e4730788eaf1ca`);
            if (componentMounted) {
                setData(await response.json());
                console.log(data);
            }
            return () => {
                componentMounted = false;
            }

        }
        fetchWeather();

    }, [search]);

    let emoji = null;
    if (typeof data.main != 'undefined') {
        if (data.weather[0].main == 'Clouds') {
            emoji = "fa-cloud"
        } else if (data.weather[0].main == "Thunderstorm") {
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
            <div>.....Can't fetch {search}</div>
        )

    }

    let temp = (data.main.temp - 273.15).toFixed(2);
    let temp_min = (data.main.temp_min - 273.15).toFixed(2);
    let temp_max = (data.main.temp_max - 273.15).toFixed(2);
    let feelslike = (data.main.feels_like - 273.15).toFixed(2);
    let speed = Math.floor((data.wind.speed * 18) / 5 );
    let deg = (data.wind.deg);
    let pressure = data.main.pressure;
    let humidity = data.main.humidity;


    // date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", { month: 'long' });
    let day = d.toLocaleString("default", { weekday: 'long' });

    // Time
    let time = d.toLocaleTimeString('en-US', {
        
        minute: "2-digit",
        hour: 'numeric', 
        hour12: true

    });
    console.log(
      d.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    ); 

    let sun_rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        minute: "2-digit",
        hour: 'numeric', 
        hour12: true
    });
    let sun_set = new Date(data.sys.sunset* 1000).toLocaleTimeString('en-US', {
        minute: "2-digit",
        hour: 'numeric', 
        hour12: true
    });

    

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);

    }
// 

    return (
        <div>
            <div className='container mt-5'>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card bg-dark text-white text-center border-0">
                            <img src={`https://source.unsplash.com/random/600x1300/?${data.weather[0].main}`} className="card-img img-fluid" alt="..." />
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 w-75 mx-auto">
                                        <input type="search"
                                            className="form-control"
                                            placeholder="Search City"
                                            aria-label="Search City"
                                            aria-describedby="basic-addon2"
                                            name={input}
                                            onChange={(e) => setInput(e.target.value)}

                                        />
                                        <button type='submit' className="input-group-text"
                                            id="basic-addon2">
                                            <i className='fas fa-search'></i>
                                        </button>
                                    </div>

                                </form>
                                <div className='bg-dark bg-opacity-50 py-3'>
                                    <h5 className="card-title">{data.name}  { data.sys.country}</h5>
                                    <p className="card-text"> <hr />
                                        {day} {date} {month},{year}  
                                        <br/>{time} <hr/>
                                    </p>
                                 <i className={`fas ${emoji} fa-4x `}></i>
                                    <h1 title="Temperature"className='fa-bolder mb-5'>{temp} &deg;C</h1>
                                    <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                                    <p title="Min.and Max Temp "className="lead">{temp_min} &deg;C | {temp_max} &deg;C</p>
                                    <p className='card-text'>Feels like:{feelslike} &deg;C</p>
                                    <p className='card-text'>Pressure:{pressure} hpa</p>
                                    <p className='card-text'>Humidity:{humidity } %</p>
                                    <p className='card-text'>Wind:{speed} km/hr</p>
                                    <p className='card-text'>Wind Direction:{deg} &deg;C</p>
                                    <p className='card-text'>Sunrise:{sun_rise} </p>
                                    <p className='card-text'>Sunset:{sun_set}</p>
                                    
                                    
                                    

                                </div>


                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )


}

export default SearchWeather;