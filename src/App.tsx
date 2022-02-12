// import APIURL from './helpers/environment'
import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import ClientIndex from "./components/createClients/ClientIndex";
import OrderIndex from "./components/createOrders/OrderIndex";


const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState<any>("");

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
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <>
      <ClientIndex
     token={sessionToken}
       clickLogout={clearToken}
       tokenUpdate={updateToken}
     />
     <OrderIndex
       token={sessionToken}
       clickLogout={clearToken}
       tokenUpdate={updateToken}
     />
      
      </>
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return <div className="App">{protectedViews()}</div>;
};

export default App;
