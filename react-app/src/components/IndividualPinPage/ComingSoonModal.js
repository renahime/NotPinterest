import React from "react";
import { useModal } from "../../context/Modal";

function ComingSoon() {
  const { closeModal } = useModal();
  const handleClose = (e) => {
    closeModal()
  };
  return (
    <div className="coming-soon-container">
      <h1>Coming Soon...</h1>
      <button onClick={handleClose}>
        Go Back
      </button>
    </div>
  )
}
export default ComingSoon;
