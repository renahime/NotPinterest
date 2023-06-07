import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import FeedPage from "./components/FeedPage";
import ProfilePage from "./components/ProfilePage"
import CreatePin from "./components/CreatePin"
import UpdateBoardModal from "./components/UpdateBoardModal";
import IndividualBoardPage from "./components/IndividualBoardPage";
import IndividualPinPage from "./components/IndividualPinPage";

import Settings from "./components/Forms/SettingsForm";
import TodayPage from "./components/TodayPage";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  console.log("SESSION USER IS...", sessionUser)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/feed">
            <FeedPage />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/today">
            <TodayPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/new_pin">
            <CreatePin />
          </Route>
          <Route path="/pin/:id">
            <IndividualPinPage />
          </Route>

          <Route exact path="/boards/:id">
            <UpdateBoardModal sessionUser={sessionUser} />
          </Route>
          <Route path="/:username">
            <ProfilePage />
          </Route>

          <Route path="/:username/:boardName">
            <IndividualBoardPage />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
