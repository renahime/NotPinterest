import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import FeedPage from "./components/FeedPage";
<<<<<<< HEAD
import FeedPageTest from "./components/FeedPageTest";
=======
import ProfilePage from "./components/ProfilePage"
import CreatePin from "./components/CreatePin"
>>>>>>> dev

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/feed">
            <FeedPage />
          </Route>
<<<<<<< HEAD
          <Route exact path="/feed/test">
            <FeedPageTest />
=======
          <Route path="/new_pin">
            <CreatePin />
          </Route>
          <Route path="/:username">
            <ProfilePage />
>>>>>>> dev
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
