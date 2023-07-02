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


