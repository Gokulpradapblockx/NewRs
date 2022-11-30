import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./Style.css";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks React Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const Intro = () => {
  if (userSession.isUserSignedIn()) {
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="text-center entry-page">
            <h3>STEP ONE</h3>
          </div>
          <section>
            <div className="btn1">
              <Link to="/page1">
                <Button name="AFFORDABLE HOUSING PLATFORM USER" />
              </Link>
            </div>
            <div className="btn2">
              <Link to="/page2">
                <button style={{ backgroundColor: "rgb(105, 200, 31)" }}>
                  OPEN MARKET USER
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="text-center entry-page">
            <h3>STEP ONE</h3>
          </div>
          <section>
            <div className="btn1">
              {/* <Link to="page1"><Button  name="AFFORDABLE HOUSING PLATFORM USER"/></Link> */}
  
              <button
                onClick={() => {
                  alert("Please connect to the HIRO Wallet");
                }}
              >
                AFFORDABLE HOUSING PLATFORM USER
              </button>
            </div>
            <div className="btn2">
              {/* <Link to="page2"><button onClick={authenticate} disabled   style={{backgroundColor : "rgb(105, 200, 31)"}}>OPEN MARKET USER</button></Link> */}
              <button
                onClick={() => {
                  alert("Please connect to the HIRO Wallet");
                }}
                style={{ backgroundColor: "rgb(105, 200, 31)" }}
              >
                OPEN MARKET USER
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }
 
};

export default Intro;