
import OpenModalButton from "../OpenModalButton";
import TodayPage from "../TodayPage";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { fetchPinsToday, getPinById} from "../../store/pins";
import { useModal } from "../../context/Modal";
import './SavePinsToBoard.css'



function SavePinsToBoardModal() {


  const dispatch = useDispatch();
  let pinsTodayObj = useSelector(state => state.pins.todayPins)
  const history = useHistory()
  let pinsToday
  if (pinsTodayObj) {
    pinsToday = shuffle(Object.values(pinsTodayObj))
    // dbLatestDate = pinsToday[0].created_at
  }
  const date = new Date();



  const month = date.toLocaleString('default', { month: 'long' });
  let year = date.getFullYear();
  let day = date.getDate();
  useEffect(() => {
    dispatch(fetchPinsToday())
  }, [dispatch])




  // const handleDemoLogin = async (e) => {

  //   const data = await dispatch(login("demo@aa.io", "password"));
  //   if (data) {
  //     setErrors(data);
  //   } else {
  //     closeModal()
  //   }

  //   history.push('/feed')

  // };


  // function onHover(board) {
  //   setHover(true)
  //   setHoverDiv(board.id)
  // }

  // function offHover() {
  //   setHover(false)
  //   setHoverDiv("")
  // }


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

  return (
    <>
      <div className="save-pins-to-board-modal-container">

        <h3 className="save-pins-to-new-board-text">Save some Pins to your new board</h3>

        <div className="save-pin-list-container">
          <div className="save-pins-board-list">
            {pinsToday.map((pin) => {
              return (


                < div className = "save-pins-to-board-modal-pins"
              style = {{
                backgroundImage: `url(${pin.image})`,
                    }

            }

            >
            <div className="save-pins-to-board-modal-text-container">
              hello

            </div>
                  </div>


          )
            })}

        </div>
      </div>

      <div className="bottom-done">
        <div className="bottom-done-text">Done</div>
      </div>



    </div >
    </>
  )

}


export default SavePinsToBoardModal
