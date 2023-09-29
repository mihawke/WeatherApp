import React, { useEffect, useState } from 'react';
import './MainPage.css';
import { BsGeoAlt } from 'react-icons/bs';
import Header from '../Header/Header';


const MainPage = ({ handleLocation, data }) => {
  const [temp, setTemp] = useState('')
  const [mintemp, setminTemp] = useState('')
  const [maxtemp, setmaxTemp] = useState('')
  const [unit, setUnit] = useState('°C')
  const [temperature, setTemperature] = useState([temp, mintemp, maxtemp])

  useEffect(() => {
    if (data.main) {
      const x = (data.main?.temp || '') - 273.15
      const y = (data.main?.temp_min || '') - 273.15
      const z = (data.main?.temp_max || '') - 273.15
      setTemp(data.main?.temp || '')
      setminTemp(data.main?.temp_min || '')
      setmaxTemp(data.main?.temp_max || '')
      setTemperature([x.toFixed(0), y.toFixed(0), z.toFixed(0)])
    }
  }, [data])

  const handleCelcius = (temp, mintemp, maxtemp) => {
    const x = parseFloat(temp) - 273.15
    const y = parseFloat(mintemp) - 273.15
    const z = parseFloat(maxtemp) - 273.15
    const lis = [x.toFixed(0), y.toFixed(0), z.toFixed(0)]
    setTemperature(lis)
    setUnit('°C')
  }
  const handleFahrenheit = (temp, mintemp, maxtemp) => {
    const x = 1.8 * (parseFloat(temp) - 273) + 32
    const y = 1.8 * (parseFloat(mintemp) - 273) + 32
    const z = 1.8 * (parseFloat(maxtemp) - 273) + 32
    const lis = [x.toFixed(0), y.toFixed(0), z.toFixed(0)]
    setTemperature(lis)
    setUnit('°F')
  }
  return (
    <div className="main-page">
      <Header handleLocation={handleLocation}></Header>
      <div className='weather-container'>
        <div>
          <div className='location'>
            {data.name} , {data.sys?.country || ''} <BsGeoAlt />
          </div>
          <div className="dash"></div>
          <div>
            <input
              type='radio'
              value='C'
              name='option'
              onClick={() => handleCelcius(temp, mintemp, maxtemp)}
            ></input>
            <label htmlFor='C'>C</label>
            <input
              type='radio'
              value='F'
              name='option'
              onClick={() => handleFahrenheit(temp, mintemp, maxtemp)}
            ></input>
            <label htmlFor='F'>F</label>
            <div className="temp-container">
              <div className="temp-text">{temperature[0]}{unit}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="range">{temperature[1]}° / {temperature[2]}°</div>
                {data.main && <div className="description">{data.weather[0]?.description || ''}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className='box1'>
          <div className="wind">
            <label>Wind Speed</label>
            <div>{data.wind?.speed || ''} m/s</div>
          </div>
          <div className="humidity">
            <label>Humidity</label>
            <div>{data.main?.humidity || ''}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
