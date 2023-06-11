import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { setModalContent, closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };


  // const disableButton = email === "" || password === "";


  const handleDemoLogin = async (e) => {

    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }

    history.push('/feed')

  };


  return (
    <>
      <div className="login-form-modal-container">
        <div className="login-form-logo">
          <img className="pinterest-svg" src="https://res.cloudinary.com/djp7wsuit/image/upload/v1686471958/p-removebg-preview_ghygni.png" />

        </div>
        <h1 className="login-page-welcome">Welcome to threadterest</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li className="login-form-errors" key={idx}>{error}</li>
            ))}
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
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="login-form-button" type="submit">Log In</button>
          <p className="form-or">OR</p>
          <button className="login-form-demo-user-button" type="submit" onClick={handleDemoLogin} >Continue with Demo User</button>

          <p className="login-form-member">Not on threadterest yet?<span onClick={() => setModalContent(<SignupFormModal />)} className="login-form-login-text"> Sign up</span>
          </p>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
