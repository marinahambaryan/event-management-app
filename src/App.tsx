import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { getCurrentUser } from "aws-amplify/auth";

import "@aws-amplify/ui-react/styles.css";

import amplifyconfiguration from "./amplifyconfiguration.json";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import PrivateLayout from "./components/layout/PrivateLayout";
import SignUp from "./pages/auth/signUp/SignUp";
import Events from "./pages/events/Events";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/signIn/SignIn";
import Validate from "./pages/auth/validate/Validate";
import { userAtom } from "./atoms/userAtom";

Amplify.configure(amplifyconfiguration);

function App() {
  const setUser = useSetAtom(userAtom);
  useEffect(() => {
    currentAuthenticatedUser();
  }, []);

  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      setUser({ id: userId, email: username });
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateLayout />}>
            <Route path="/events" element={<Events />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/validate" element={<Validate />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
