import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { createBoardThunk } from "../../store/boards";
import ChangeBoardCoverModal from "../UpdateBoardModal/ChangeBoardCoverModal";
// import { fetchPinsToday } from "../../store/pins";
import SavePinsToBoardModal from "./SavePinsToBoard";
import './CreateBoardModal.css'
import { getAllPinsThunkOld } from "../../store/pins";
import CreateBoardFromPinModal from "../IndividualPinPage/CreateBoardModal";


function CreateBoardModal({ username }) {

  const dispatch = useDispatch();
  const history = useHistory()
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState([]);
  const [description, setDescription] = useState("")
  const { setModalContent, closeModal } = useModal();
  const [change, setChange] = useState(false)
  const userBoards = useSelector(state => state.boards.currentUserBoards)




  const stateCheck = useSelector((state) => state)


  const allpins = useSelector(state => state.pins.pins)

  useEffect(() => {
  }, [name, isPrivate])

  //   let pinsTodayObj = useSelector(state => state.pins.todayPins)
  let testUsername = useSelector(state => state.session.user)







  // let pinsArr = []
  // for (const key in allpins) {
  //   const pin = allpins[key]
  //   pinsArr.push(pin)

  // }

  // console.log("PINSARR", pinsArr)

  // shuffle(pinsArr)


  //   let pinsToday
  //   if (pinsTodayObj) {
  //     pinsToday = shuffle(Object.values(pinsTodayObj))
  //     // dbLatestDate = pinsToday[0].created_at
  //   }
  //   const date = new Date();

  // useEffect(() => {
  //   dispatch(fetchPinsToday())
  // }, [])

  let pinsTodayObj = useSelector(state => state)
  // let testUsername = useSelector(state => state.session.user)


  useEffect(() => {
    const referrer = document.referrer;
    if (referrer.includes('/create')) {
      // Do something if the page is coming from example.com/profile

    } else {
      // Do something else if the page is coming from somewhere else or without /profile
    }
  }, []);




  const date = new Date();



  const month = date.toLocaleString('default', { month: 'long' });
  let year = date.getFullYear();
  let day = date.getDate();




  const disabledButton = name === "";

  const handlePrivateChange = (e) => {
    setIsPrivate(e.target.checked);
  };


  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission


    //VALIDATIONS

    // check if board name is already taken
    if (Object.values(testUsername)) {
      // const userBoards = testUsername.boards
      for (const board of Object.values(userBoards)) {
        if (board.name.toLowerCase() === name.toLowerCase()) {
          setErrors(["This board name is already taken, please choose another name."])
          return
        }
      }
    }

    //create form data
    const formData = {
      name,
      private: isPrivate,
      description: description
    }
    //log formData

    await dispatch(createBoardThunk(formData)).then(() => history.push(`/${username}/${formData.name}`))
    // await dispatch(createBoardFromPinPage(formData)).then(() => history.push(`/${username}/${formData.name}`))


    // if (response && response.errors) {
    //   setErrors(response.errors);
    //   console.log("ERRORS",errors)
    // } else {
    //   history.push(`/${username}/${formData.name}`);
    //   closeModal();
    //   openModal();
    // }

    closeModal()

    openModal()

    // openModal(<SavePinsToBoardModal />);

    // history.push('/boards/1')
  };

  const openModal = () => {
    const modalContent = (
      <div>
        <SavePinsToBoardModal pinsArr={Object.values(allpins)} username={username} setChange={setChange} change={change} boardName={name} />
      </div>
    );
    setModalContent(modalContent);
  };

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
      <div className="create-board-modal-container">

        <div className="create-board-modal-header">
          Create board
        </div>

        <form onSubmit={onSubmit}>

          <label className="create-board-modal-name">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="create-board-modal-name-input"

            ></input>
          </label>

          <label>
            <div className="create-board-modal-flex-row">

              <input type="checkbox" checked={isPrivate} onChange={handlePrivateChange} className="checkbox-input" />

              <div>
                <p className="create-board-modal-private-text bold">Keep this board secret</p>
                <p className="create-board-modal-private-text">So only you and collaborators can see it. Learn more</p>
              </div>

            </div>
          </label>
          <ul>
            {errors.map((error, idx) => (
              <li className="login-form-errors" key={idx}>{error}</li>
            ))}
          </ul>

          {/* <button type="submit" className="create-board-modal-create-button" disabled={disabledButton} onClick={openModal}> */}
          <button type="submit" className="create-board-modal-create-button" disabled={disabledButton}>
            Create
          </button>

        </form>
      </div>
    </>
  )

}


export default CreateBoardModal
