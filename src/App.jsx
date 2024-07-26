import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultIcon from './components/DefaultIcon';

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





function App() {

  const weatherBackgrounds = {
    Thunderstorm: 'url(/images/thunderstorm.jpg)',
    Rain: 'url(/images/Rain.webp)',
    Snow: 'url(/images/snow.jpg)',
    Clear: 'url(/images/Clear.jpg)',
    Clouds: 'url(/images/clouds.jpg)',
    Mist: 'url(/images/mist.jpg)',
    Haze: 'url(/images/haze.jpeg)',
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

  const HandleShowSearch = (CityName) => {
    setCityName(CityName);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${apiKey}`;
    axios.get(apiUrl)
      .then((res) => {
        console.log(res);
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
              <li>Temperature  -  {Math.round(area.main.temp - 273.15)}°C ({area.weather[0].main})</li>}
            <hr />
            {area &&
              <li>Humidity  -  {area.main.humidity}%</li>}
            <hr />
            {area &&
              <li>Visibility  -  {area.visibility}mi</li>}

            <hr />
            {area &&
              <li>wind speed  -  {area.wind.speed}Km/h</li>}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

