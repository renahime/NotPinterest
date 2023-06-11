import { useHistory, Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function NotUSerProfile({ userBoardsArr, username }) {
    const history = useHistory()
    const allPins = useSelector(state => state.pins.allPin)

    function pinDisplay(pins) {
        if (pins === 0 || pins > 1) {
            return `${pins} pins`
        } else {
            return "1 pin"
        }
    }

    function viewIndividualBoard(username, name) {
        let nameArr = name.toLowerCase().split(" ")
        let formattedName = nameArr.join("_")
        history.push(`/${username}/${formattedName}`)
    }

    return (
        <div className="profile-boards-all">
            {userBoardsArr.map(boards => (
                <Link to={{ pathname: `/${username}/${boards.name.split(" ").join("_")}`, state: { boardName: boards.name, username: username, id: boards.id, pinCount: boards.pin_count, description: boards.description } }}>
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
                    <div className="profile-board-info">
                        <div>
                            <h3 className="profile-board-name">{boards.name}</h3>
                        </div>
                        <div>
                            <p className="profile-pins-on-board">
                                {pinDisplay(boards.pin_count)}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
