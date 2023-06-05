import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo, clearProfile } from "../../store/profile"
import "./ProfilePage.css"

export default function ProfilePage() {
    const { username } = useParams()
    const dispatch = useDispatch()
    const currentProfile = useSelector(state => state.profile.currentProfile)

    useEffect(() => {
        dispatch(getUserInfo(username))
        return (() => dispatch(clearProfile()))
    }, [dispatch, username])

    return (
        <div>
            {currentProfile &&
                <div className="profile-page-base">
                    {currentProfile.profile_image ? <img className="profile-image" src={currentProfile.profile_image} /> :
                        <i className="fa-solid fa-circle-user profile-image-default"></i>
                    }
                    <h2>{currentProfile.first_name} {currentProfile.last_name}</h2>
                    <h4>
                        @{currentProfile.username}
                        {
                            currentProfile.pronouns ?
                                <div>
                                    <i className="fa-solid fa-circle"></i>
                                    {currentProfile.pronouns}
                                </div>
                                : null
                        }
                    </h4>
                    {currentProfile.about ? <h5>{currentProfile.about}</h5> : null}
                    <h5>
                        <div>
                            {currentProfile.follower_count} followers

                        </div>
                        <i className="fa-solid fa-circle"></i>
                        <div>
                            {currentProfile.following_count} following
                        </div>
                    </h5>
                    <button>Edit Profile</button>
                    <div>
                        <button>Created</button>
                        <button>Saved</button>
                    </div>
                </div>
            }
        </div>
    )
}