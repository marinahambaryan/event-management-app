import { Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import MainLayout from "./components/layout/MainLayout";
import PrivateLayout from "./components/layout/PrivateLayout";
import Events from "./pages/events/Events";
import Home from "./pages/home/Home";

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator signUpAttributes={["family_name", "given_name"]}>
      <Authenticator.Provider>
        {/* {({ signOut, user }) => ( */}
        <div className="App">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route element={<PrivateLayout />}>
                <Route path="/events" element={<Events />} />
              </Route>
            </Route>
          </Routes>
        </div>
        {/* )} */}
      </Authenticator.Provider>
    </Authenticator>
  );
}

export default App;
