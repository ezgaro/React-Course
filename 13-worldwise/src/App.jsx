import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const URL = "http://localhost:8000";

export default function App() {
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
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="pricing" element={<Pricing />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          ></Route>
          <Route path="cities/:id" element={<City />}></Route>
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          ></Route>
          <Route path="form" element={<Form />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
