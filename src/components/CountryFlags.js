import { useEffect, useState } from "react";
import "./CountryFlags.css";

const CountryFlags = () => {
  const [countryData, setCountryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data);
        setResults(data); // initially show all
      })
       .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://xcountries-backend.azurewebsites.net/all");
  //       const data = await response.json();
  //       setCountryData(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchText(keyword);

    const filtered = countryData.filter((country) =>
      country.common.toLowerCase().includes(keyword.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <div className="container">
      <h1 className="title">Countries With Flags</h1>
      <input type="text" name="search" value={searchText} className="searchInput" placeholder="Search for countries" onChange={handleSearch}></input><br/>
      <hr/><br/>
      <div className="flags-grid">
        {results.map((country,index) => (
          //for countrySearch app
          <div key={country.common+index} className="countryCard">
            <img
            src={country.png}
            height="150px"
            width="200px"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            />
            <h4 className="country-name">{country.common}</h4>
          </div>
          // for country flag app
          // <div key={country.name+index} className="countryCard">
          //   <img
          //     src={country.flag}
          //     alt={country.abbr}
          //     height="150px"
          //     width="200px"
          //     style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          //   />
          //   <h4 className="country-name">{country.name}</h4>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default CountryFlags;
