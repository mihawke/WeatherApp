import { useState, useEffect } from 'react'
import './App.css'
import MainPage from './Components/MainPage/MainPage'

const API_KEY = 'f8a6e6caf26f34169f0c6b33ec6a2fdc'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('Delhi')

  useEffect(() => {
    getData();
  }, [location])

  const handleLocation = (searchLocation) => {
    if(!searchLocation){
      alert('Please provide location')
    }
    setLocation(searchLocation)
  }

  const getData = async () => {
    if (!location) {
      console.error("No location provided")
      return;
    }
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + `${location}` + '&appid=' + API_KEY);
    const data1 = await response.json();
    if(data1.cod == '404'){
      alert('City not found')
      setLocation('Delhi')
    }
    setData(data1)
    console.log(data)
  }

  return (
    <div className='dashboard'>
      <MainPage handleLocation={handleLocation} data={data}></MainPage>
    </div>
  )
}

export default App
