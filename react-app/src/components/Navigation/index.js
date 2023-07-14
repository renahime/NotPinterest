import { useEffect, useState, useRef } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateBoardModal from '../CreateBoardModal';
import './Navigation.css';


function Navigation({ isLoaded, setGrabString, setSearching, grabString, searchInput, setSearchInput }) {
	const history = useHistory()
	const location = useLocation()
	const sessionUser = useSelector((state) => state.session.user);
	const [openMenu, setOpenMenu] = useState(false)
	let menuClassName = openMenu ? "nav-profile-menu" : "hidden nav-profile-menu"

	let showMenu = () => {
		if (openMenu === true) {
			setOpenMenu(false)
		} else {
			setOpenMenu(true)
		}
	}

	useEffect(() => {
		setSearchInput("")
	}, [location])
	const handleFilter = (e) => {
		if (!location.pathname.includes('/feed')) {
			let grabString = searchInput
			setSearchInput("")
			setSearching(true)
			history.push({
				pathname: '/feed',
				state: grabString
			})
		} else {
			setSearchInput("")
			setGrabString("")
			setSearching(false)
		}
		return
	}

	const handleChanges = (e) => {
		setSearchInput(e.target.value)
		setGrabString(e.target.value)
	}


	const currentUser = useSelector(state => state.session.user)


	// If we click off of the Create tab, the modal will dissapear
	useEffect(() => {
		const handleClick = (event) => {
			if (openMenu === true) {
				setOpenMenu(false)
			}
		};
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [openMenu]);






	return (
		<>
			<nav className="nav-bar">

				{isLoaded && !sessionUser ? (
					<div className="left-section">
						<NavLink exact to="/" className="logo">
							<img className="pinterest-svg" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686471958/p-removebg-preview_ghygni.png" />
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
								<img className="pinterest-svg" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686471958/p-removebg-preview_ghygni.png" />
							</NavLink>
							<div className="tabs">
								<NavLink exact to="/feed" className="tab" activeClassName="active">
									Home
								</NavLink>
								<div className='nav-create-tab'>
									{openMenu && <div className={menuClassName}>
										{/* <div className="profile-dropdown-create-label">Create Idea Pin</div> */}
										<NavLink to="/create" className="nav-profile-dropdown-create" onClick={showMenu}>Create Pin</NavLink>
										<NavLink className="nav-profile-dropdown-create" onClick={showMenu} to={{
											pathname: `/${sessionUser.username}`,

										}} >My Boards</NavLink>

									</div>}
									<div className='tab flex-row' onClick={showMenu}>
										<div className='nav-create'>Create</div>
										<i className="fa-solid fa-angle-left fa-rotate-270 tab-arrow"></i>
									</div>
								</div>
							</div>
							<input value={searchInput} onChange={handleChanges} type="text" className="search-bar" placeholder="Search" />
							{location.pathname.includes("/feed") ? <button onClick={handleFilter} className='search-button'>Clear</button> : <button onClick={handleFilter} className='search-button'>Search</button>}
						</div>
					</>
				)}

				<div className="right-section">

					{isLoaded && sessionUser ? (
						<ProfileButton user={sessionUser} />
					) : (

						<div className="nav-right">
							<div>
								<button onClick={(() => history.push("/feed"))} className='nav-explore-pins-button'>
									Explore
								</button>
							</div>
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
			</nav >
		</>
	);
}

export default Navigation;
