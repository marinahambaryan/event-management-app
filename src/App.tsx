import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import SignUp from "./pages/signUp/SignUp";
import Events from "./pages/events/Events";
import Home from "./pages/home/Home";
import SignIn from "./pages/signIn/SignIn";
import AuthLayout from "./components/layout/AuthLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="/events" element={<Events />} />
          </Route>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
