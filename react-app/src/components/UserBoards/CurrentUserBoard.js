import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { getBoardsByUsername } from "../../store/boards"
import UpdateBoardModal from "../UpdateBoardModal"
import { useModal } from "../../context/Modal"
import './UserBoards.css'

export default function CurrentUserBoard({ userBoardsArr }) {
    const [hover, setHover] = useState(false)
    const [hoverDiv, setHoverDiv] = useState("")
    const { setModalContent, closeModal } = useModal();
    console.log("HOVER DIV", hoverDiv)
    console.log("USER BOARDS ARR",userBoardsArr)

    const history = useHistory()

    function pinDisplay(pins) {
        if (pins === 0 || pins > 1) {
            return `${pins} pins`
        } else {
            return "1 pin"
        }
    }

    function onHover(board) {
        setHover(true)
        setHoverDiv(board.id)
    }

    function offHover() {
        setHover(false)
        setHoverDiv("")
    }

    function viewIndividualBoard(username, name) {
        let nameArr = name.toLowerCase().split(" ")
        let formattedName = nameArr.join("_")
        history.push(`/${username}/${formattedName}`)
    }

    let editBoardClassName = hover ? `profile-edit-board-icon` : "profile-edit-board-icon hidden"


    const openUpdateModal = (hoverDiv, username, event) => {
        event.stopPropagation();
        const modalContent = (
          <div>
           <UpdateBoardModal id = {hoverDiv} username={username} userBoardsArr ={userBoardsArr}/>
          </div>
        );
        setModalContent(modalContent);
      };


    return (
        <div className="profile-boards-all">
            {userBoardsArr.map(boards => (
                <div onClick={() => viewIndividualBoard(boards.user.username, boards.name)} className="profile-boards-wrapper" onMouseEnter={() => onHover(boards)} onMouseLeave={() => offHover()}>

                    <div className="profile-board-pics">
                        {boards.private ? <div className="profile-board-lock-icon-wrapper">
                            <i className="fa-solid fa-lock"></i>
                        </div> : null}
                        <div className="profile-board-images-wrapper">
                            <div>
                                {
                                    boards.cover_image.length ?
                                        <img className="profile-board-cover-image" src={boards.cover_image[0]} />
                                        :
                                        <img className="profile-board-cover-image" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686021890/Untitled_design_1_xxxljj.png" />
                                }
                            </div>
                            <div className="profile-board-additional-image-wrapper">
                                {
                                    boards.additional_images[0] ?
                                        <img className="profile-additonal-image profile-image1" src={boards.additional_images[0]} />
                                        :
                                        <img className="profile-additonal-image profile-image1" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686021890/Untitled_design_1_xxxljj.png" />
                                }
                                {
                                    boards.additional_images[1] ?
                                        <img className="profile-additonal-image profile-image2" src={boards.additional_images[1]} />
                                        :
                                        <img className="profile-additonal-image profile-image2" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686021890/Untitled_design_1_xxxljj.png" />
                                }
                            </div>
                        </div>
                        {hoverDiv === boards.id ?
                            <div className={editBoardClassName}>
                                <i className="fa-solid fa-pencil" onClick={(event) => openUpdateModal(hoverDiv,boards.user.username, event)}></i>
                            </div> : null}
                    </div>
                    <div className="profile-board-info">
                        <div>
                            <h3 className="profile-board-name">{boards.name}</h3>
                        </div>
                        <div>
                            <p className="profile-pins-on-board">
                                {pinDisplay(boards.pins.length)}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
