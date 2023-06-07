import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPin } from "../../store/pins";
import { getBoardsofCurrentUser } from "../../store/boards"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function CreatePin() {
    const history = useHistory()
    let [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState("")
    const [viewAltText, setViewAltText] = useState(false)
    const [altText, setAltText] = useState("")
    const [destinationLink, setDestinationLink] = useState("")
    const [loadingImage, setLoadingImage] = useState(false)
    const currentUserBoards = useSelector(state => state.boards.currentUserBoards)
    const currentUser = useSelector(state => state.session.user)
    const currentUserBoardsArr = Object.values(currentUserBoards)
    const [board, setBoard] = useState("")
    const dispatch = useDispatch()

    function formatFollowers(num) {
        if (num === 1) return "1 follower"
        else return `${num} followers`
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
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

        const pinData = new FormData()
        pinData.append("image", image)
        pinData.append("board", board)
        pinData.append("title", title)
        pinData.append("description", description)
        pinData.append("alt_text", altText)
        pinData.append("destination", destinationLink)
        setLoadingImage(true)
        
        let new_pin = await dispatch(createNewPin(pinData)).then(setLoadingImage(false))

        if ((new_pin.errors)) {
            setErrors(new_pin.errors)
            return
        } else{
            history.push(`/pin/${new_pin.pin.id}`)
        }

    }

    let altTextButtonClassName = viewAltText ? "hidden" : "create-pin-alt-text-button"
    
    let altTextInputClassName = viewAltText ? "create-pin-alt-text-input" : "hidden"
    
    
    useEffect(() => {
        dispatch(getBoardsofCurrentUser())

    }, [dispatch])

    useEffect(() => {
        if (Object.values(currentUserBoards).length) {
            setBoard(Object.values(currentUserBoards)[0].id)
        }
    }, [currentUserBoards])
    
    return (
        <form onSubmit={e => handleSubmit(e)} encType="multipart/form-data">
            <label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Add your title"
                    // maxLength={100}
                    />
                <p>Your first 40 characters are what usually show up in feeds</p>
                <p>{100 - title.length}</p>
                {errors.title ? <p>{errors.title}</p> : null}
            </label>
            
            <div >
                <div>
                    {currentUser.profile_image ? <img src={currentUser.profile_image} /> : <i className="fa-solid fa-circle-user"></i>}
                </div>
                <div>
                    <p>{currentUser.first_name} {currentUser.last_name}</p>
                    <p>{formatFollowers(currentUser.followers.length)}</p>
                </div>
            </div>
            <label>
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Add your title"
                    maxLength={225}
                    />
                <p>People will usually see the first 50 characters when they click on your pin</p>
                <p>{225 - description.length}</p>
                {errors.description ? <p>{errors.description}</p> : null}
            </label>
            <div>
                <button onClick={() => setViewAltText(true)} className={altTextButtonClassName}>Add alt text</button>
                <label>
                    <input
                        className={altTextInputClassName}
                        type="text"
                        value={altText}
                        onChange={e => setAltText(e.target.value)}
                        placeholder="Explain what people can see in your pin"
                        maxLength={225}
                        />
                    <p>This text will be read aloud by screen readers</p>
                    <p>{225 - altText.length}</p>
                    {errors.altText ? <p>{errors.altText}</p> : null}
                </label>
            </div>
            <label>
                    <input
                        type="url"
                        value={destinationLink}
                        onChange={e => setDestinationLink(e.target.value)}
                        placeholder="Add a destination link"
                        maxLength={225}
                    />
                    {errors.destinationLink ? <p>{errors.destinationLink}</p> : null}
                </label>
            <label>
                <select
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    >
                    {currentUserBoardsArr.map(boardValue => (
                        <option
                        key={boardValue.id}>
                            {boardValue.name}
                        </option>
                    ))}
                </select>
                {errors.board ? <p>{errors.board}</p> : null}
            </label>
            <label>
                Pin Image
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                    />
                {errors.image ? <p>{errors.image}</p> : null}
            </label>
            {loadingImage && <h3>Wait while your image is uploaded</h3>}
            <button>Create Pin</button>
        </form>
    )
}