import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    fetch(`${URL}/cities`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "cities/loaded", payload: data }))
      .catch((err) =>
        dispatch({
          type: "rejected",
          payload: "There was an error loading data" + err,
        })
      );
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      fetch(`${URL}/cities/${id}`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: "city/loaded", payload: data }))
        .catch((err) =>
          dispatch({
            type: "rejected",
            payload: "There was an error loading data" + err,
          })
        );
    },
    [currentCity.id]
  );

  function createCity(newCity) {
    dispatch({ type: "loading" });
    fetch(`${URL}/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: "city/created", payload: data }))
      .catch((err) =>
        dispatch({
          type: "rejected",
          payload: "There was an error loading data" + err,
        })
      );
  }

  function deleteCity(id) {
    dispatch({ type: "loading" });
    fetch(`${URL}/cities/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => dispatch({ type: "city/deleted", payload: id }))
      .catch((err) =>
        dispatch({
          type: "rejected",
          payload: "There was an error loading data" + err,
        })
      );
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
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
