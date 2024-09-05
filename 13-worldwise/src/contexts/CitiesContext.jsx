import { createContext, useContext, useEffect, useState } from "react";

const URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState();

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
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function CitiesHook() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, CitiesHook };
