import React, { useState, useEffect } from 'react';
import './App.css';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent
} from "@material-ui/core"
import InfoBox from './InfoBox';
import Map from "./Map"
import Table from "./Table"
import { sortData } from "./util"
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css"



function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('WorldWide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  console.log(">>>>>>>>>>>>>>>>>>>>", mapCountries)
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    //this will load ones when compontes load
    const getCountriesData = async () => {

      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())                                //this line stor data into one varible
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))
          const sortedData = sortData(data)
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)

    const url =
      countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      })
  }
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$", countryInfo);

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          {/* HEADER */}
          {/* Tilte + Select input(dropdown field) */}
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country} >
              <MenuItem value="WorldWide">WorldWide</MenuItem>

              {/*Loop through all the contries and show a deopdown list */}
              {
                countries.map((countries) => (

                  <MenuItem value={countries.value}>{countries.name}</MenuItem>
                ))
              }


              {/* this is hard codede loding of stuff
            <MenuItem value="worldwide"> worldwide</MenuItem>
            <MenuItem value="worldwide"> Options 1</MenuItem>
            <MenuItem value="worldwide"> Options 2</MenuItem>
            <MenuItem value="worldwide"> Options 3</MenuItem>

          */}

            </Select>
          </FormControl>
        </div>


        <div className="app_states">
          {/* InfoBoxs 1 coronavirus cases */}
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />

        </div>

        { /* map */}
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live case by Country</h3>
          {/* Table */}
          <Table countries={tableData} />

          {/* Graph 
          <LineGraph />*/}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
