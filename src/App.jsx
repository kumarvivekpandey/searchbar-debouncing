import './App.css'
import React, { useState, useCallback } from "react";

const API_URL = "https://demo.dataverse.org/api/search";

export default function App() {
  const [search, setSearch] = useState([]);

  let debounceTimer;

  const debounce = (func, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func();
    }, delay);
  };

  const fetchData = (value) => {
    fetch(`${API_URL}?q=${value}`)
      .then((res) => res.json())
      .then((json) => setSearch(json.data.items))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleChange = useCallback((e) => {
    const value = e.target.value;

    debounce(() => {
      if (value.trim() !== "") {
        fetchData(value);
      } else {
        setSearch([]);
      }
    }, 300); // Adjust the delay (in milliseconds) according to your needs
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        name={"search"}
        placeholder={"enter something"}
        className={"search"}
        onChange={handleChange}
      />

      {search.length > 0 && (
        <div className={"autocomplete"}>
          {search.map((el, i) => (
            <div key={i} className={"autocompleteItems"}>
              <span>{el.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
