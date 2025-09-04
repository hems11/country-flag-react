import { useEffect, useState } from "react";
import "./CountryFlags.css";

const CountryFlags = () => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://xcountries-backend.azurewebsites.net/all");
        const data = await response.json();
        setCountryData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Countries With Flags</h1>
      <hr/><br/>
      <div className="flags-grid">
        {countryData.map((country,index) => (
          <div key={country.name+index} className="flag-card">
            <img
              src={country.flag}
              alt={country.abbr}
              height="150px"
              width="200px"
              style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            />
            <h4 className="country-name">{country.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryFlags;
