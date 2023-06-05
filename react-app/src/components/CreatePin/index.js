import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewPin } from "../../store/pins";

export default function CreatePin() {
    let [image, setImage] = useState("")
    const dispatch = useDispatch()

    let handleSubmit = async (e) => {
        e.preventDefault();
        const pinData = new FormData()

        pinData.append("image", image)

        // let pin_info = {
        //     image: image
        // }
        let new_pin  = await dispatch(createNewPin(pinData))

        console.log(new_pin)
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <label>
                Pin Image
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </label>
            <button>Create Pin</button>
        </form>
    )
}