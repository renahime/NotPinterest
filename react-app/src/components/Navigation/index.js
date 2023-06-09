import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateBoardModal from '../CreateBoardModal';
import './Navigation.css';


function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const [openMenu, setOpenMenu] = useState(false)
	let menuClassName = openMenu ? "nav-profile-menu" : "hidden nav-profile-menu"
	let showMenu = () => {
		setOpenMenu(!openMenu)
	}

	const currentProfile = useSelector(state => state.profile.currentProfile)
	const currentUser = useSelector(state => state.session.user)

	console.log("open Menu", openMenu)

	return (
		<>
			<nav className="nav-bar">

				{isLoaded && !sessionUser ? (
					<div className="left-section">
						<NavLink exact to="/" className="logo">
							<svg className="pinterest-svg">
								<path
									d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12"
								></path>
							</svg>
						</NavLink>
						<div className="pinterest-logo">
							<NavLink exact to="/" className="pinterest-logo">
								threadterest
							</NavLink>
						</div>
					</div>

				) : (
					<>
						<div className="left-section">
							<NavLink exact to="/feed" className="logo">
								<svg className="pinterest-svg">
									<path
										d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12"
									></path>
								</svg>
							</NavLink>
							<div className="tabs">
								<NavLink exact to="/feed" className="tab" activeClassName="active">
									Home
								</NavLink>
								<NavLink to="/today" className="tab tab-disabled" activeClassName="active" >
									Today
								</NavLink>
								<div className='nav-create-tab'>
								{openMenu && <div className={menuClassName}>
									{/* <div className="profile-dropdown-create-label">Create Idea Pin</div> */}
									<NavLink to="/create" className="nav-profile-dropdown-create">Create Pin</NavLink>
									<div className="nav-profile-dropdown-create" onClick={showMenu}>
										<OpenModalButton
											buttonText="Create Board"
											modalComponent={<CreateBoardModal username={currentUser?.username} />}
										/>
									</div>
								</div>}
								<div className='tab flex-row' onClick={showMenu}>
									<div className='nav-create'>Create</div>
									<i className="fa-solid fa-angle-left fa-rotate-270 tab-arrow"></i>
								</div>
								</div>
							</div>
							<input type="text" className="search-bar" placeholder="Search" />

						</div>
					</>
				)}

				<div className="right-section">

					{isLoaded && sessionUser ? (
						<ProfileButton user={sessionUser} />
					) : (
						<div className="nav-right">
							<div className="nav-log-in">
								<OpenModalButton
									buttonText="Log In"
									className="nav-log-in"
									modalComponent={<LoginFormModal />}
								/>
							</div>
							<div className="nav-sign-up">
								<OpenModalButton
									buttonText="Sign Up"
									modalComponent={<SignupFormModal />}
								/>
							</div>
						</div>
					)}
				</div>
			</nav>
		</>
	);
}

export default Navigation;
