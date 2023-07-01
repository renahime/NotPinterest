let store

store = {
    session: {
        user: {
            id: "id",
            username: "username",
            email: "email",
            first_name: "first name",
            last_name: "last name",
            about: "about",
            pronouns: "pronouns",
            website: "website",
            profile_image: "profile image",
            followers: ["user followers"], // if you need a count of this, just use the length
            following: ["users that the current user is following"],
            categories: ["user categories"]
        },
        // persist the above, clear the below when moving off the page
        // the only reason why i moved this into here is for the purpose
        // of following a user on their profile page
        currentProfile: {
            id: "id",
            username: "username",
            email: "email",
            first_name: "first name",
            last_name: "last name",
            about: "about",
            pronouns: "pronouns",
            website: "website",
            profile_image: "profile image",
            followers: ["user followers"], // if you need a count of this, just use the length
            following: ["users that the current user is following"],
            categories: ["user categories"]
        }
    },
    boards: {
        allBoads: {
            [boardId]: {
                id: "id",
                name: "name",
                private: "private",
                cover_image: "cover image",
                additional_images: "additional images",
                description: "desc",
                owner: {
                    id: "owner id",
                    username: "owner uername",
                    profile_image: "owner profile image"
                },
            }
        },
        singleBoard: {
            id: "id",
            name: "name",
            private: "private",
            cover_image: "cover image",
            additional_images: "additional images",
            description: "desc",
            owner: {
                id: "owner id",
                username: "owner uername",
                profile_image: "owner profile image"
            },
        },
        currentUserBoards: {
            [boardId]: {
                id: "id",
                name: "name",
                private: "private",
                cover_image: "cover image",
                additional_images: "additional images",
                description: "desc",
                numPins: "num",
            },
        },
        // my thought process here is that we can persit the above in 
        //storage, but clear the below when we move off a different users page
        currentProfileBoards: {
            [boardId]: {
                id: "id",
                name: "name",
                private: "private",
                cover_image: "cover image",
                additional_images: "additional images",
                description: "desc",
                numPins: "num",
            },
        }
    },
    pins: {
        allPins: {
            [pinId]: {
                id: "id",
                image: "image",
                title: "title",
                description: "description",
                alt_text: "alt_text",
                destination: "destination",
                categories: ["category name"],
                owner: {
                    id: "owner id",
                    username: "owner uername",
                    profile_image: "owner profile image"
                }
            }
        },
    },
    // if we pull all pins, can't we just key in from there? maybe, maybe not
    singlePin: {
        id: "id",
        image: "image",
        title: "title",
        description: "description",
        alt_text: "alt_text",
        destination: "destination",
        categories: ["category name"],
        owner: {
            id: "owner id",
            username: "owner uername",
            profile_image: "owner profile image"
        }
    },
    currentBoardPins: {
        [pinId]: {
            id: "id",
            image: "image",
            title: "title",
            description: "description",
            alt_text: "alt_text",
            destination: "destination",
            categories: ["category name"]
        }
    },
    currentUserPins: {
        [pinId]: {
            id: "id",
            image: "image",
            title: "title",
            description: "description",
            alt_text: "alt_text",
            destination: "destination",
            categories: ["category name"]
        }
    },
    // same idea as with the boards above
    currentProfilePins: {
        [pinId]: {
            id: "id",
            image: "image",
            title: "title",
            description: "description",
            alt_text: "alt_text",
            destination: "destination",
            categories: ["category name"]
        }
    },
}




{(currentUser && (sessionUser && sessionUser.boards.length)) ? (

    <>
        <div className="board-container-top-text">
            <div>Hey {sessionUser.first_name}, you have</div>
            <NavLink to={`/${sessionUser.username}`}>  {sessionUser && sessionUser.boards.length ? (sessionUser.boards.length) : 0} </NavLink>
            <div> boards. </div>
            {/* <NavLink to={`/${sessionUser.username}`}> {sessionUser && sessionUser.boards.length ? (sessionUser.boards.reduce(
                (total, board) => (board.pins.length ? total + board.pins.length : 0), 0)) : 0}pins</NavLink> */}
            <div>Check them out!</div>
        </div>

        <div className="full-board-container">

            <div className="board-container" ref={scrollContainerRef}>
                <div className="scroll-arrows left-arrow" onClick={handleScrollLeft}>
                    <i className="fa-solid fa-angle-left"></i>
                </div>
                <div className="scroll-arrows right-arrow" onClick={handleScrollRight}>
                    <i className="fa-solid fa-angle-left fa-rotate-180"></i>
                </div>

                {sessionUser.boards.map((board, index) => (

                    <div key={board.id} className="board-top" style={boardColors[index % boardColors.length]} onClick={() => viewIndividualBoard(sessionUser.username, board.name)} onMouseEnter={() => onHoverBoard(board)} onMouseLeave={() => offHoverBoard()}>
                        {/* <OpenModalButton
                buttonText={board.name}
                className="test-open-create-board-modal"
                modalComponent={<UpdateBoardModal id={board.id} />}
                onClick={() => history.push(`/boards/${board.id}`)}
              /> */}
                        <div>
                            {board.name}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    </>

) : ((currentUser && (sessionUser && sessionUser.boards.length)) ? (
    <>
        <div className="board-container-top-text">
            <div>Oh no, you have</div>
            <NavLink to={`/${sessionUser.username}`}> {boards.length} boards.</NavLink>
            <div>Let's change that!</div>
            <OpenModalButton
                buttonText="Create Board"
                className="feed-page-create-board"
                modalComponent={<CreateBoardModal username={sessionUser?.username} />}
            />
        </div>
    </>
) : (null)
)
}