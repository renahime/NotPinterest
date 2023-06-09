import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import { getCurrentUserBoards } from "./store/boards";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage"
import CreatePin from "./components/CreatePin"
import UpdateBoardModal from "./components/UpdateBoardModal";
import IndividualBoardPage from "./components/IndividualBoardPage";
import IndividualPinPage from "./components/IndividualPinPage";
import SavePinsToBoardModal from "./components/CreateBoardModal/SavePinsToBoard";
import UserPins from "./components/UserPins";
import UserCategoriesForm from "./components/UserCategoriesForm";
import Settings from "./components/Forms/SettingsForm";
import AboutLinks from "./components/AboutLinks";
import SignupFormModal from "./components/SignupFormModal";
import LoginError from "./components/LoginError";
import OpenModalButton from "./components/OpenModalButton";
import CurrentUserBoardProfile from "./components/ProfilePage/CurrentUserBoardProfile";
import CaSandraFeed from "./components/FeedPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [grabString, setGrabString] = useState("")
  const [searchInput, setSearchInput] = useState(grabString)
  const [searching, setSearching] = useState(false)
  const [path, setPath] = useState(window.location.pathname)
  const sessionUser = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(authenticate()).then((data) => {
      if (data && data["message"]) {
        dispatch(getCurrentUserBoards())
      }
    }).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation setGrabString={setGrabString} grabString={grabString} searchInput={searchInput} setSearchInput={setSearchInput} isLoaded={isLoaded} setSearching={setSearching} />
      <AboutLinks />
      {isLoaded && (
        <Switch>
          <Route exact path="/setCategories">
            <UserCategoriesForm />
          </Route>
          <Route exact path="/settings">
            {sessionUser ? <Settings /> : <LoginError></LoginError>}
          </Route>
          <Route path="/test/update">
            <SavePinsToBoardModal />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/create">
            {sessionUser ? <CreatePin /> : <LoginError></LoginError>}
          </Route>
          <Route exact path="/feed">
            <CaSandraFeed grabString={grabString} setGrabString={setGrabString} searching={searching} setSearching={setSearching} />
          </Route>
          <Route exact path="/" >
            {sessionUser ? <CaSandraFeed grabString={grabString} setGrabString={setGrabString} searching={searching} setSearching={setSearching} /> : <LandingPage />}
          </Route>
          <Route exact path="/pin/:id">
            {sessionUser ? <IndividualPinPage></IndividualPinPage> : <LoginError></LoginError>}
          </Route>
          <Route path="/:username/_created">
            <UserPins />
          </Route>
          < Route path='/:username/boards'>
            <CurrentUserBoardProfile />
          </Route>
          <Route path="/:username/_saved">
            {sessionUser ? <ProfilePage session={sessionUser} /> : <LoginError></LoginError>}
          </Route>
          <Route exact path="/:username/:boardName">
            {sessionUser ? <IndividualBoardPage /> : <LoginError></LoginError>}
          </Route>

          <Route path="/:username">
            {sessionUser ? <ProfilePage /> : <LoginError></LoginError>}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
