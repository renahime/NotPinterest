import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
// import { getPinsByCategory } from "../../store/pins";
import { createUserCategories } from "../../store/session"
import "./UserCategoriesForm.css"
import { } from "react-router-dom/cjs/react-router-dom.min";

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

    // if (currentUser.categories != null) history.push("/feed")

    let handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        if (!bohoImage && !athleisureImage && !darkImage && !formalImage && !oldMoneyImage && !streetWearImage) {
            return setErrors({ errors: "Must select at least one category." })
        }

        let interests = {
            boho: bohoImage,
            athleisure: athleisureImage,
            dark: darkImage,
            formalwear: formalImage,
            old_money: oldMoneyImage,
            streetware: streetWearImage
        }

        let categories = await dispatch(createUserCategories(interests))
        // console.log("categories", categories)
        // .then((res) => <Redirect to="/feed" pins={res} /> )
        // if (pins.errors){
        //     return setErrors(pins.errors)
        // }
    }

    return (
        <div className="user-category-wrapper">
            <div className="user-category-info">
                <h1>Hello!</h1>
                <h2>Welcome to Threadtrest</h2>
                <h3>It's like Pinterest, but for your clothes</h3>
                <h4>Share all of your favorite trends with us</h4>
                <h5>...but first, let us know what type of threads you favor so we can curate your feed!</h5>
                {Object.values(errors).length ? <p style={{ color: "red" }}>{errors.errors}</p> : null}
            </div>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className="all-user-category-images-wrapper">
                    <div className="individual-categories">
                        <label className="user-category-input-wrapper">
                            <input
                                className="user-category-input"
                                value={bohoImage}
                                type="checkbox"
                                onChange={() => setBohoImage(!bohoImage)}
                            />
                            <img className="user-category-image" src="https://threadterest.s3.us-east-2.amazonaws.com/a79f86920e602ad655536880de889680.jpg" />
                        </label>
                        <p>Boho</p>
                    </div>
                    <div className="individual-categories">
                        <label className="user-category-input-wrapper">
                            <input
                                className="user-category-input"
                                value={athleisureImage}
                                type="checkbox"
                                onChange={() => setAthleisureImage(!athleisureImage)}
                            />
                            <img className="user-category-image" src="https://threadterest.s3.us-east-2.amazonaws.com/Karma+Leggings.jpeg" />
                        </label>
                        <p>Athleisure</p>
                    </div>
                    <div className="individual-categories">
                        <label className="user-category-input-wrapper">
                            <input
                                className="user-category-input"
                                value={darkImage}
                                type="checkbox"
                                onChange={() => setDarkImage(!darkImage)}
                            />
                            <img className="user-category-image" src="https://threadterest.s3.us-east-2.amazonaws.com/a30d5641ff84aee5a8af247d80f671bd.jpg" />
                        </label>
                        <p>Dark</p>
                    </div>
                    <div className="individual-categories">
                        <label className="user-category-input-wrapper">
                            <input
                                className="user-category-input"
                                value={formalImage}
                                type="checkbox"
                                onChange={() => setFormalImage(!formalImage)}
                            />
                            <img className="user-category-image" src="https://threadterest.s3.us-east-2.amazonaws.com/Tailored+Suit.jpeg" />
                        </label>
                        <p>Formal</p>
                    </div>
                    <div className="individual-categories">
                        <label className="user-category-input-wrapper">
                            <input
                                className="user-category-input"
                                value={oldMoneyImage}
                                type="checkbox"
                                onChange={() => setOldMneyImage(!oldMoneyImage)}
                            />
                            <img className="user-category-image" src="https://threadterest.s3.us-east-2.amazonaws.com/b57a07ed28ab9aef13b768873cb90704.jpg" />
                        </label>
                        <p>Old Money</p>
                    </div>
                    <div className="individual-categories">
                        <label className="user-category-input-wrapper">
                            <input
                                className="user-category-input"
                                value={streetWearImage}
                                type="checkbox"
                                onChange={() => setStreetwearImage(!streetWearImage)}
                            />
                            <img className="user-category-image" src="https://threadterest.s3.us-east-2.amazonaws.com/69d784bab787d1a9bc1206b742b580af.jpg" />
                        </label>
                        <p>Streetwear</p>
                    </div>
                </div>
                <div className="category-button-wrapper">
                    <button className="category-button" >
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}
