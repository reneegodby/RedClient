import React, { useState } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import NavBar from "./components/Auth/NavBar";

export type Props = {
  tokenUpdate: any;
};

const App: React.FunctionComponent = () => {
  const [tokenUpdate, settokenUpdate] = useState<any>("");

  return (
    <div className="App">
      <NavBar clickLogout tokenUpdate={tokenUpdate} />
      <Auth tokenUpdate={tokenUpdate} />
    </div>
  );
};

export default App;
