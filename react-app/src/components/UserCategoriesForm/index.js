import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { getPinsByCategory } from "../../store/pins";
import "./UserCategoriesForm.css"
import {  } from "react-router-dom/cjs/react-router-dom.min";

export default function UserCategoriesForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    let [errors, setErrors] = useState({})
    let [bohoImage, setBohoImage] = useState(false)
    let [athleisureImage, setAthleisureImage] = useState(false)
    let [darkImage, setDarkImage] = useState(false)
    let [formalImage, setFormalImage] = useState(false)
    let [oldMoneyImage, setOldMneyImage] = useState(false)
    let [streetWearImage, setStreetwearImage] = useState(false)

    let bohoImageClassName = bohoImage ? "selected" : "notSelected"
    let athleisureImageClassName = athleisureImage ? "selected" : "notSelected"
    let darkImageClassName = darkImage ? "selected" : "notSelected"
    let formalImageClassName = formalImage ? "selected" : "notSelected"
    let oldMoneyImageClassName = oldMoneyImage ? "selected" : "notSelected"
    let streetwearImageClassName = streetWearImage ? "selected" : "notSelected"

    console.log("current user", currentUser)
    if (currentUser === null) history.push("/")
    if (currentUser.categories != null) history.push("/feed")

    let handleSubmit = async () => {
        console.log("i work")
        setErrors({})
        let interests = []
        if (bohoImage) interests.push("Boho")
        if (athleisureImage) interests.push("Athleisure")
        if (darkImage) interests.push("Dark")
        if (formalImage) interests.push("Formal Ware")
        if (oldMoneyImage) interests.push("Old Money")
        if (athleisureImage) interests.push("Athleisure")
        if (!interests.length) {
            return setErrors({errors: "Must select at least one category."})
        } else {
            let pins = await dispatch(getPinsByCategory(interests)).then((res) => <Redirect to="/feed" pins={res} /> )
            if (pins.errors){
                return setErrors(pins.errors)
            }
        }
    }

    return (
        <div className="user-category-wrapper">
            <div className="user-category-info">
                <h1>Hello!</h1>
                <h2>Welcome to Threadtrest</h2>
                <h3>It's like Pinterest, but for your clothes</h3>
                <h4>Share all of your favorite trends with us</h4>
                <h5>...but first, let us know what type of threads you favor so we can curate your feed!</h5>
                {Object.values(errors).length ? <p style={{color:"red"}}>{errors.errors}</p> : null}
            </div>
            <div className="all-user-category-images-wrapper">
                <div className="user-category-image-wrapper" onClick={() => setBohoImage(!bohoImage)}>
                    <img src="https://threadterest.s3.us-east-2.amazonaws.com/a79f86920e602ad655536880de889680.jpg" />
                    <p>Boho</p>
                    {bohoImage ? <i class={"fa-solid fa-check " + bohoImageClassName}></i> : null}
                </div>
                <div className="user-category-image-wrapper" onClick={() => setAthleisureImage(!athleisureImage)} >
                    <img src="https://threadterest.s3.us-east-2.amazonaws.com/Karma+Leggings.jpeg" />
                    <p>Athleisure</p>
                    {athleisureImage ? <i class={"fa-solid fa-check " + athleisureImageClassName}></i> : null}
                </div>
                <div className="user-category-image-wrapper" onClick={() => setDarkImage(!darkImage)}>
                    <img  src="https://threadterest.s3.us-east-2.amazonaws.com/a30d5641ff84aee5a8af247d80f671bd.jpg" />
                    <p>Dark</p>
                    {darkImage ? <i class={"fa-solid fa-check " + darkImageClassName}></i> : null}
                </div>
                <div className="user-category-image-wrapper" onClick={() => setFormalImage(!formalImage)}>
                    <img  src="https://threadterest.s3.us-east-2.amazonaws.com/Tailored+Suit.jpeg" />
                    <p>Formal</p>
                    {formalImage ? <i class={"fa-solid fa-check " + formalImageClassName}></i> : null}
                </div>
                <div className="user-category-image-wrapper" onClick={() => setOldMneyImage(!oldMoneyImage)}>
                    <img  src="https://threadterest.s3.us-east-2.amazonaws.com/b57a07ed28ab9aef13b768873cb90704.jpg" />
                    <p>Old Money</p>
                    {oldMoneyImage ? <i class={"fa-solid fa-check " + oldMoneyImageClassName}></i> : null}
                </div>
                <div className="user-category-image-wrapper" onClick={() => setStreetwearImage(!streetWearImage)}>
                    <img  src="https://threadterest.s3.us-east-2.amazonaws.com/69d784bab787d1a9bc1206b742b580af.jpg" />
                    <p>Streetwear</p>
                    {streetWearImage ? <i class={"fa-solid fa-check " + streetwearImageClassName}></i> : null}
                </div>
            </div>
            <div className="category-button-wrapper">
                <button className="category-button" onClick={() => handleSubmit()}>
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}