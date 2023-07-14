import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import UpdateBoardModal from "../UpdateBoardModal"
import { useModal } from "../../context/Modal"
import { Link } from "react-router-dom"
import './UserBoards.css'

export default function CurrentUserBoard({ userBoardsArr, username, profileImage, user, current }) {
    const [hover, setHover] = useState(false)
    const [hoverDiv, setHoverDiv] = useState("")
    const { setModalContent, closeModal } = useModal();
    function pinDisplay(pins) {
        if (pins === 0 || pins > 1) {
            return `${pins} pins`
        } else {
            return "1 pin"
        }
    }

    function onHover(boards) {
        setHover(true)
        setHoverDiv(boards.id)
    }

    function offHover() {
        setHover(false)
        setHoverDiv("")
    }

    let editBoardClassName = hover ? `profile-edit-board-icon` : "profile-edit-board-icon hidden"


    const openUpdateModal = (hoverDiv, username, event, boards) => {
        event.preventDefault();
        const modalContent = (
            <div>
                <UpdateBoardModal id={hoverDiv} username={username} current={current} userBoardsArr={userBoardsArr} board={boards} />
            </div>
        );
        setModalContent(modalContent);
    };


    return (
        <div className="profile-boards-all">
            {userBoardsArr.map(boards => (
                <>
                    <Link className="profile-board-link" to={{ pathname: `/${username}/${boards.name.split(" ").join("_")}`, state: { boardName: boards.name, username: username, id: boards.id, pinCount: boards.pin_count, description: boards.description } }} >
                        <div className="profile-boards-wrapper" onMouseEnter={() => onHover(boards)} onMouseLeave={() => offHover()}>
                            <div className="profile-board-pics">
                                {boards.private ? <div className="profile-board-lock-icon-wrapper">
                                    <i className="fa-solid fa-lock"></i>
                                </div> : null}
                                <div className="profile-board-images-wrapper">
                                    <div>
                                        {
                                            boards.cover_image.length ?
                                                <img className="profile-board-cover-image" src={boards.cover_image[0]} />
                                                : boards.additional_images[0] ?
                                                    <img className="profile-board-cover-image" src={boards.additional_images[0]} /> :
                                                    <img className="profile-board-cover-image" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686021890/Untitled_design_1_xxxljj.png" />
                                        }
                                    </div>
                                    <div className="profile-board-additional-image-wrapper">
                                        {
                                            boards.additional_images[0] && boards.cover_image.length ?
                                                <img className="profile-additonal-image profile-image1" src={boards.additional_images[0]} />
                                                : boards.additional_images[1] ?
                                                    <img className="profile-additonal-image profile-image1" src={boards.additional_images[1]} />
                                                    : <img className="profile-additonal-image profile-image1" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686021890/Untitled_design_1_xxxljj.png" />
                                        }
                                        {
                                            boards.additional_images[1] && boards.cover_image.length ?
                                                <img className="profile-additonal-image profile-image2" src={boards.additional_images[1]} />
                                                : boards.additional_images[2] ?
                                                    <img className="profile-additonal-image profile-image2" src={boards.additional_images[2]} />
                                                    : <img className="profile-additonal-image profile-image2" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686021890/Untitled_design_1_xxxljj.png" />
                                        }
                                    </div>
                                </div>
                                {hoverDiv === boards.id ?
                                    <div onClick={(event) => openUpdateModal(hoverDiv, username, event, boards)} className={editBoardClassName}>
                                        <i className="fa-solid fa-pencil"></i>
                                    </div> : null}
                            </div>
                            <div className="profile-board-info">
                                <div>
                                    <h3 className="profile-board-name">{boards.name}</h3>
                                </div>
                                <div>
                                    <p className="profile-pins-on-board">
                                        {boards.pins ? pinDisplay(Object.values(boards.pins).length) : null}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </>
            ))}
        </div>
    )
}
