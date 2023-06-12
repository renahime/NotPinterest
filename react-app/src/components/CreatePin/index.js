import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPin } from "../../store/pins";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllBoardsThunk } from "../../store/boards";
import { useModal } from "../../context/Modal";
import CreateNewBoardOnPin from "./CreateNewBoardOnPin";
import "./CreatePin.css"


export default function CreatePin() {
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)
    const currentUserBoards = useSelector(state => state.session.user.boards)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState("")
    const [viewAltText, setViewAltText] = useState(false)
    const [altText, setAltText] = useState("")
    const [destinationLink, setDestinationLink] = useState("")
    const [loadingImage, setLoadingImage] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [board, setBoard] = useState("")
    const [titleActive, setTitleActive] = useState(false)
    const [descActive, setDescActive] = useState(false)
    const [altActive, setAltActive] = useState(false)
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    const [submit, setSubmit] = useState(false)
    const { setModalContent, setOnModalClose } = useModal();
    const dispatch = useDispatch()
    let userBoards = Object.values(currentUser.boards)

    function formatFollowers(num) {
        if (num === 1) return "1 follower"
        else return `${num} followers`
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(board)
        setErrors({})

        let validationErrors = {}

        if (!image) {
            validationErrors["image"] = "Image is required"
        }
        if (title.length > 100) {
            validationErrors.title = "Ooops! This title is getting long. Try trimming it down."
        }
        if (description.length > 225) {
            validationErrors.description = "Ooops! This description is getting long. Try trimming it down."
        }
        if (altText.length > 225) {
            validationErrors.altText = "Ooops! This alt text is getting long. Try trimming it down."
        }
        if (destinationLink.length > 225) {
            validationErrors.destinationLink = "Ooops! This link is getting long. Try trimming it down."
        }
        if (!board) {
            validationErrors.board = "Ooops! This pin must be added to a board!"
        }
        if (Object.values(validationErrors).length) {
            setErrors(validationErrors)
            return
        }
        setSubmit(true)
        setImage(previewImage)

        const pinData = new FormData()
        pinData.append("image", image)
        pinData.append("board", board)
        pinData.append("title", title)
        pinData.append("description", description)
        pinData.append("alt_text", altText)
        pinData.append("destination", destinationLink)
        setLoadingImage(true)

        let new_pin = await dispatch(createNewPin(pinData)).then(setLoadingImage(false))
        if (new_pin.errors) {
            setErrors(new_pin.errors)
            return
        } else {
            history.push(`/pin/${new_pin.pin.id}`)
        }

    }

    function openModal (e) {
        e.preventDefault()
        setModalContent(<CreateNewBoardOnPin />)
    }

    let altTextButtonClassName = viewAltText ? "hidden" : "create-pin-alt-text-button"
    let altTextInputClassName = viewAltText ? "create-pin-alt-text-input" : "hidden"
    let pinMenuClassName = showMenu ? "new-pin-menu" : "hidden"
    let activeTitleClassName = titleActive ? "" : "hidden"
    let activeDescClassName = descActive ? "" : "hidden"
    let activeAltClassName = altActive ? "" : "hidden"

    useEffect(() => {
        if (submit) {
            return
        }
        if (image) {
            let prev = URL.createObjectURL(image)
            setPreviewImage(prev)
            return () => {
                URL.revokeObjectURL(prev)
            }
        }
    }, [image])

    useEffect(() => {
        if (userBoards.length && !board) {
            setBoard(userBoards[0].name)
            console.log(userBoards)
        }
    }, [userBoards])

    console.log("bords", board)

    return (
        <div className="new-pin-wrapper">
            <form onSubmit={e => handleSubmit(e)} encType="multipart/form-data" className="new-pin-form">
                <div className="new-pin-image-side">
                    <i className="fa-solid fa-ellipsis new-pin-open-menu" onClick={() => setShowMenu(!showMenu)}></i>
                    <div className={pinMenuClassName}>
                        <p onClick={() => history.push("/feed")}>Delete</p>
                    </div>
                    <div className="file-input-wrapper-wrapper">
                        <div className="file-input-wrapper">
                            <label className="new-pin-image">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    required
                                />
                                <div className="new-pin-image-file-styled">
                                    {previewImage ? <img className="new-pin-preview-image" src={previewImage} /> : <div className="new-pin-default-image">
                                        <div className="new-pin-upload-caption">
                                            <i className="fa-solid fa-circle-arrow-up"></i>
                                            <p>Drag and drop or click to upload</p>
                                        </div>
                                        <p>We recommend using high quality .jpg files less than 20MB</p>
                                    </div>}
                                </div>
                            </label>
                        </div>
                    </div>
                    {errors.image ? <p className="create-pin-errors">{errors.image}</p> : null}
                    {loadingImage ? <h3>Wait while your image is uploaded</h3> : null}
                </div>
                <div className="new-pin-info-side">
                    {currentUserBoards.length ?
                        <div className="new-pin-save-and-board">
                            <label>
                                <select
                                    value={board}
                                    onChange={(e) => setBoard(e.target.value)}
                                >
                                    {currentUserBoards.map(boardValue => (
                                        <option
                                            key={boardValue.name}>
                                            {boardValue.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.board ? <p className="create-pin-errors">{errors.board}</p> : null}
                            </label>
                            <button>Save</button>
                        </div>
                        :
                        <button onClick={openModal} className='open-modal-button'>
                            Create a Board
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    }
                    <div className="new-pin-title-input-wraper">
                        <label>
                            <input
                                onFocus={() => setTitleActive(true)}
                                onBlur={() => setTitleActive(false)}
                                className="new-pin-input new-pin-title"
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Add your title"
                            // maxLength={100}
                            />
                            {errors.title || title.length > 100 ?
                                <div className="new-pin-active-caption">
                                    <p className={`create-pin-errors`}>
                                        {errors.title ? errors.title : " Ooops! This title is getting long. Try trimming it down."
                                        }
                                    </p>
                                    <p className="create-pin-errors">{100 - title.length}</p>
                                </div>
                                :
                                <div className={`new-pin-active-caption ${activeTitleClassName}`}>
                                    <p>Your first 40 characters are what usually show up in feeds</p>
                                    <p>{100 - title.length}</p>
                                </div>
                            }
                        </label>
                    </div>
                    <div className="create-pin-owner-followers-image">
                        <div>
                            {currentUser.profile_image ? <img className="create-pin-profile-image" src={currentUser.profile_image} /> : <i className=" create-pin-default-image fa-solid fa-circle-user"></i>}
                        </div>
                        <div className="create-pin-owner-name-followers">
                            <p className="create-pin-owner">{currentUser.first_name} {currentUser.last_name}</p>
                            <p>{formatFollowers(currentUser?.followers.length)}</p>
                        </div>
                    </div>
                    <div className="new-pin-description-input-wrapper">
                        <label>
                            <input
                                onFocus={() => setDescActive(true)}
                                onBlur={() => setDescActive(false)}
                                className="new-pin-input new-pin-description"
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Tell everyone what your Thread is about"
                            // maxLength={225}
                            />
                            {errors.description || description.length > 225 ?
                                <div className="new-pin-active-caption">
                                    <p className="create-pin-errors ">
                                        {errors.description ? errors.description : " Ooops! This description is getting long. Try trimming it down."
                                        }
                                    </p>
                                    <p className="create-pin-errors">{225 - description.length}</p>
                                </div>
                                :
                                <div className={`new-pin-active-caption ${activeDescClassName}`}>
                                    <p>People will usually see the first 50 characters when they click on your pin</p>
                                    <p>{225 - description.length}</p>
                                </div>
                            }

                        </label>
                    </div>
                    <div className="new-pin-alt-text-input-wraper">
                        <p onClick={() => setViewAltText(true)} className={altTextButtonClassName}>Add alt text</p>
                        <div className="new-pin-alt-and-destination-wraper-with-button">
                            <label>
                                <input
                                    onFocus={() => setAltActive(true)}
                                    onBlur={() => setAltActive(false)}
                                    className={`new-pin-input ${altTextInputClassName}`}
                                    type="text"
                                    value={altText}
                                    onChange={e => setAltText(e.target.value)}
                                    placeholder="Explain what people can see in your Thread"
                                // maxLength={225}
                                />
                                {errors.altText || altText.length > 225 ?
                                    <div className="new-pin-active-caption">
                                        <p className="create-pin-errors ">
                                            {errors.altText ? errors.altText : " Ooops! This alternate text is getting long. Try trimming it down."
                                            }
                                        </p>
                                        <p className="create-pin-errors">{225 - altText.length}</p>
                                    </div>
                                    :
                                    <div className={`new-pin-active-caption ${activeAltClassName}`}>
                                        <p>This text will be read aloud by screen readers</p>
                                        <p>{225 - altText.length}</p>
                                    </div>
                                }
                            </label>
                        </div>
                    </div>
                    <div className="new-pin-alt-and-destination-wraper-with-button">
                        <label>
                            <input
                                className="new-pin-input"
                                type="url"
                                value={destinationLink}
                                onChange={e => setDestinationLink(e.target.value)}
                                placeholder="Add a destination link"
                            // maxLength={225}
                            />
                            {errors.destinationLink ? <p className="create-pin-errors">{errors.destinationLink}</p> : null}
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}


