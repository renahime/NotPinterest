import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory()
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal, setModalContent } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history.push("/setCategories")
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<div className="signup-form-modal-container" >
				<div className="signup-form-logo">
					<img className="pinterest-svg" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686471958/p-removebg-preview_ghygni.png" />

				</div >
				<h1 className="signup-page-welcome">Welcome to threadterest</h1>
				<p className="signup-page-ideas">Find new ideas to try</p>
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => <li className="login-form-errors" key={idx}>{error}</li>)}
					</ul>
					<label>
						Email
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<label>
						Username
						<input
							type="text"
							value={username}
							maxLength={40}
							minLength={6}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
					<label>
						Password
						<input
							type="password"
							value={password}
							maxLength={40}
							minLength={5}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<label>
						Confirm Password
						<input
							type="password"
							value={confirmPassword}
							maxLength={40}
							minLength={5}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
					<button type="submit" className="login-form-signup-button">Continue</button>
					<p className="signup-form-member">Already a member? <span onClick={() => setModalContent(<LoginFormModal />)} className="login-form-login-text">Log in</span></p>
				</form>
			</div >
		</>
	);
}

export default SignupFormModal;
