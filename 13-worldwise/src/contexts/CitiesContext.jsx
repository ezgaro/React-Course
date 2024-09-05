import { createContext, useContext, useEffect, useState } from "react";

const URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetch(`${URL}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => alert("There was an error loading data" + err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function getCity(id) {
    setIsLoading(true);
    fetch(`${URL}/cities/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentCity(data))
      .catch((err) => alert("There was an error loading data" + err))
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
