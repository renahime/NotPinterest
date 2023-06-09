import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { fetchPinsToday } from "../../store/pins";
import './Today.css'

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function TodayPage() {
  const dispatch = useDispatch()
  let pinsTodayObj = useSelector(state => state.pins.todayPins)
  let pinsToday

  const date = new Date();


  const month = date.toLocaleString('default', { month: 'long' });
  let year = date.getFullYear();
  let day = date.getDate();
  useEffect(() => {
    dispatch(fetchPinsToday())

  }, [dispatch])

  if (pinsTodayObj) {
    pinsToday = Object.values(pinsTodayObj)
    pinsToday = shuffle(pinsToday)
  }


  return (!pinsToday.length ? <h1>Loading...</h1> :
    <div className="main-div">
      <div className="date-div">
        <h3 className="date">{month} {day}, {year}</h3>
        <h1>Stay Inspired</h1>
      </div>
      <div className="pins-list-today">
        {pinsToday.map((pin) => {
          return (
            <NavLink key={pin.id} to={`/boards/${pin.id}`}>
              <div className="pin-today">
                <img src={pin.image} className="pin-today-image"></img>
                <div className="text-container">
                </div>
              </div>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default TodayPage
