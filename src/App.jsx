import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultIcon from './components/DefaultIcon';





function App() {

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`;
  };

  const weatherBackgrounds = {
    Thunderstorm: 'url(/images/thunder1.jpg)',
    Rain: 'url(/images/rain1.jpg)',
    Snow: 'url(/images/snow1.jpg)',
    Clear: 'url(/images/Clear.jpg)',
    Clouds: 'url(/images/clouds1.jpg)',
    Mist: 'url(/images/mist.jpg)',
    Haze: 'url(/images/haze1.jpg)',
    Dust: 'url(/images/dust.jpg)',
    Fog: 'url(/images/fog.jpg)',
    Drizzle: 'url(/images/drizzle.webp)',
  };

  const Icons = {
    Clear: {
      icon: 'CLEAR_DAY',
      color: 'white',
      size: 70,
      animate: true
    },
    Rain: {
      icon: 'RAIN',
      color: 'white',
      size: 70,
      animate: true
    },
    Snow: {
      icon: 'SNOW',
      color: 'white',
      size: 70,
      animate: true
    },
    Clouds: {
      icon: 'CLOUDY',
      color: 'white',
      size: 70,
      animate: true
    },
    Mist: {
      icon: 'WIND',
      color: 'white',
      size: 70,
      animate: true
    },
    Fog: {
      icon: 'FOG',
      color: 'white',
      size: 70,
      animate: true
    },
    Haze: {
      icon: 'FOG',
      color: 'white',
      size: 70,
      animate: true
    },
    Drizzle: {
      icon: 'SLEET',
      color: 'white',
      size: 70,
      animate: true
    }
  };

  const apiKey = 'eaa9e04667afed90bd02d16d06aac488';
  const [cityName, setCityName] = useState('');
  const [area, setArea] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('')
  const [getIcon, setIcon] = useState('')

  useEffect(() => {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
            .then((response) => response.json())
            .then((data) => { setArea(data);
  
              // Set the background based on the weather condition
              const weatherCondition = data.weather[0].main;
              if (weatherBackgrounds[weatherCondition]) {
                setBackgroundImage(weatherBackgrounds[weatherCondition]);
              } else {
                setBackgroundImage('url(/images/default.jpg)');
              }
  
              // Set the weather icon
              const handleSetIcons = Icons[weatherCondition];
              if (handleSetIcons) {
                setIcon(
                  <DefaultIcon
                    icon={handleSetIcons.icon}
                    color={handleSetIcons.color}
                    size={handleSetIcons.size}
                    animate={handleSetIcons.animate}
                  />
                );
              } else {
                setIcon(<DefaultIcon />);
              }
            })
            .catch((error) => {
              console.error('Error fetching location-based weather:', error);
            });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    }
  }, []);

  const HandleShowSearch = (CityName) => {
    setCityName(CityName);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${apiKey}`;
    axios.get(apiUrl)
      .then((res) => {
        setArea(res.data);

        const weatherCondition = res.data.weather[0].main;
        if (weatherBackgrounds[weatherCondition]) {
          setBackgroundImage(weatherBackgrounds[weatherCondition]);
        } else {
          setBackgroundImage('url(/images/leftbox.jpeg)')
        }

        const handleSetIcons = Icons[weatherCondition];
        if (handleSetIcons) {
          setIcon(
            <DefaultIcon
              icon={handleSetIcons.icon}
              color={handleSetIcons.color}
              size={handleSetIcons.size}
              animate={handleSetIcons.animate}
            />
          );
        } else {
          setIcon(
            <DefaultIcon />
          );
        }

      })
      .catch((error) => {
        console.error('There was an error!', error);
        if (error) {
          alert("Enter correct area!!");
        } else {
          console.log(error);
        }
      });

  };

  useEffect(() => {
    if (backgroundImage) {
      document.body.style.backgroundImage = backgroundImage;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center center';
      document.body.style.height = '100vh';
      document.body.style.width = '100vw';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'hidden';
    }
  }, [backgroundImage]);

  const [time, SetTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      SetTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);



  return (
    <div className='box'>
      <div className='left-box' style={{ backgroundImage: backgroundImage, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
        <div className='location'>
          {area ? (
            <h1>{area.name}</h1>
          ) : (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {area && area.sys && (
            <h1>{area.sys.country}</h1>
          )}
        </div>


        <div className='bottom-content'>
          <div><h3>{time.toLocaleTimeString()}</h3></div>
          <div className='DateTemp'>
            <h2>{dateBuilder(new Date())}</h2>
            {area ? (
              <h1>{Math.round(area.main.temp - 273.15)}°C</h1> // Convert Kelvin to Celsius
            ) : (
              <img src='/images/WeatherIcons.gif' />
            )}
          </div>
        </div>
      </div>
      <div className='right-box'>
        <div className='weathericon'>
          {area ? getIcon : <DefaultIcon />}
          {area && area.weather && (
            <h1>{area.weather[0].main}</h1>
          )}
        </div>
        <hr className='hrr' />
        <div><SearchBar onSearch={HandleShowSearch} /> </div>
        <div className='list'>
         <ul>
            {area &&
              <li className='temp'>Temp  -  {Math.round(area.main.temp - 273.15)}°C ({area.weather[0].main})</li>}
            <hr />
            {area &&
              <li className='temp'>Humidity  -  {area.main.humidity}%</li>}
            <hr />
            {area &&
              <li className='temp'>Visibility  -  {area.visibility} mi</li>}

            {area &&
              <li className='temp'>Wind  -  {area.wind.speed} Km/h</li>}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

