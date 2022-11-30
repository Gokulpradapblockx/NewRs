import "./App.css";
import Intro from "./components/Intro";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Voucher from "./components/Forms/Voucher";
import Afford from "./components/Forms/Afford";
import Users from "./components/Forms/Users";
import Property from "./components/Forms/Property";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import { Connect } from "@stacks/connect-react";
import { userSession } from "./components/Forms/ConnectWallet";

function App() {
  const authOption = {
    appDetails: {
      name: 'Todos',
      icon: window.location.origin + '/logo.svg',
    },
    redirectTo: '/',
    userSession: userSession,
  }
  return (
    <>
      <BrowserRouter>
        <NavBar />        
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/v" element={<Voucher />} />
          <Route path="/a" element={
             <Connect authOptions={authOption} >
             <Afford userSession={userSession} />
          </Connect>}/>
          <Route path="/u" element={<Users />} />
          <Route path="/p" element={<Property />} />
        </Routes>
      </BrowserRouter>     
      </>
  );
}

export default App;
