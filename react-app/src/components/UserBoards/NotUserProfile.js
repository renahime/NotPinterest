export default function NotUSerProfile({userBoardsArr}) {
    function pinDisplay(pins) { 
        if (pins === 0 || pins > 1) {
            return `${pins} pins`
        } else {
            return "1 pin"
        }
    }

    return (
        <div className="profile-boards-all">
        {userBoardsArr.map(boards => (
            <div className="profile-boards-wrapper">
                <div className="profile-board-pics">
                    <div className="profile-board-images-wrapper">
                        {
                            boards.cover_image.length ? 
                            <img className="profile-board-images1" src={boards.cover_image[0]} />
                            : 
                            boards.additional_images[0] ?
                            <img className="profile-board-images1" src={boards.additional_images[0]} />
                            :
                            <img className="profile-board-images1" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686021890/Untitled_design_1_xxxljj.png" />
                        }
                        {
                            boards.additional_images[0] ?
                            <img className="profile-board-images1" src={boards.additional_images[0]} />
                            :
                            boards.additional_images[1] ? 
                            <img className="profile-board-images2" src={boards.additional_images[1]} />
                            :
                            <img className="profile-board-images2" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686021890/Untitled_design_1_xxxljj.png" />
                        }
                        {
                            boards.additional_images[0] ?
                            <img className="profile-board-images1" src={boards.additional_images[0]} />
                            :
                            boards.additional_images[1] ? 
                            <img className="profile-board-images2" src={boards.additional_images[1]} />
                            :
                            boards.additional_images[2] ? 
                            <img className="profile-board-images3" src={boards.additional_images[2]} /> 
                            :
                            <img className="profile-board-images3" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686021890/Untitled_design_1_xxxljj.png" />
                        }
                    </div>
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
