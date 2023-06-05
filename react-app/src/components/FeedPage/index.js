import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './FeedPage.css'










function FeedPage() {



  return (
    <>
      <div className="feed-container">

        <div className="board-container">

          <div className="board-top">Old Money</div>
          <div className="board-top">Athlesiure</div>
          <div className="board-top">Formal Wear</div>
          <div className="board-top">Street Wear</div>
        </div>


        <div className="pin-container">

          <div className="gallery-container">
            {/* <div className="column"> */}
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
              <p className="gallery-photo-board-text">Clothing</p>
            </div>

          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>

            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>


          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>


          {/* </div> */}



        </div>



      </div>
    </>
  )
}



export default FeedPage;
