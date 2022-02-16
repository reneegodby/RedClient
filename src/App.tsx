// import APIURL from './helpers/environment'
import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import ClientIndex from "./components/createClients/ClientIndex";
import OrderIndex from "./components/createOrders/OrderIndex";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Orders } from "./components/createOrders/OrderIndex";
import CreateOrder from "./components/createOrders/CreateOrder";

export interface AppProps {
  createOrder: string;
  setCreateOrder: (createOrder: string) => void;
}

const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState<string>("");
  const [createOrder, setCreateOrder] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token") || "");
    }
  }, []);

  const updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    console.log("clearToken");
    localStorage.clear();
    setSessionToken("");
    navigate("/");
  };

  return (
    
      <Routes>
        <Route
          path="/"
          element={
            <Auth updateToken={updateToken} sessionToken={sessionToken} />
          }
        />
        <Route
          path="/clients"
          element={
            <ClientIndex
              token={sessionToken}
              clickLogout={clearToken}
              tokenUpdate={updateToken}
              clientId={clientId}
              setClientId={setClientId}
              createOrder={createOrder}
              setCreateOrder={setCreateOrder}
            />
          }
        />
        <Route
          path="/orders"
          element={
            <OrderIndex
              token={sessionToken}
              clickLogout={clearToken}
              tokenUpdate={updateToken}
            />
          }
        />
      </Routes>
   
  );
};

export default App;
