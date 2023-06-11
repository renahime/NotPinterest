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
import SavePinsToBoardModal from "./components/CreateBoardModal/SavePinsToBoard";
import UserPins from "./components/UserPins";
import UserCategoriesForm from "./components/UserCategoriesForm";
import CaSandraFeed from "./components/FeedPage/casandra-feed"
import Settings from "./components/Forms/SettingsForm";
import TodayPage from "./components/TodayPage";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/setCategories">
            <UserCategoriesForm />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route path="/test/update">
            <SavePinsToBoardModal />
          </Route>
          <Route exact path="/today">
            <TodayPage />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/create">
            <CreatePin />
          </Route>
          <Route exact path="/feed">
            <FeedPage sessionUser={sessionUser} />
            {/* <CaSandraFeed /> */}
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          {/* <Route exact path="/boards/:id">
            <UpdateBoardModal sessionUser={sessionUser} />
          </Route> */}
          <Route exact path="/pin/:id">
            <IndividualPinPage />
          </Route>
          <Route path="/:username/_created">
            <UserPins />
          </Route>
          <Route path="/:username/_saved">
            <ProfilePage session={sessionUser} />
          </Route>
          <Route exact path="/:username/:boardName">
            <IndividualBoardPage />
          </Route>
          <Route path="/:username">
            <ProfilePage />
          </Route>
          <Route exact path="/oldfeed">
            <FeedPage sessionUser={sessionUser} />
            {/* <CaSandraFeed /> */}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
