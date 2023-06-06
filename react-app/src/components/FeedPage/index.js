import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { getAllBoardThunks } from "../../store/boards-mikey";

import './FeedPage.css'



function FeedPage() {

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getAllBoardThunks())
  }, [dispatch])

  const boardsSelector = useSelector((state) => state.board.allBoards)
  console.log("GET ALL BOARDS STATE TEST", boardsSelector)


  const boards = Object.values(boardsSelector)
  console.log("GET ALL BOARDS DATA", boards)

  // test colors and pins for feed

  const [boardColors] = useState([
    { backgroundColor: "rgb(233, 212, 212)" },
    { backgroundColor: "rgb(190, 205, 193)" },
    { backgroundColor: "rgb(229, 235, 209)" },
    { backgroundColor: "rgb(244, 230, 219)" },
    { backgroundColor: "rgb(233, 212, 212)" },
    { backgroundColor: "rgb(190, 205, 193)" },
    { backgroundColor: "rgb(229, 235, 209)" },
    { backgroundColor: "rgb(244, 230, 219)" },
    // { backgroundColor: "rgb(233, 212, 212)" },
    // { backgroundColor: "rgb(190, 205, 193)" },

  ]);

  const scrollContainerRef = React.useRef(null);

  const handleScrollLeft = () => {

    const scrollContainer = scrollContainerRef.current;

    scrollContainer.scrollLeft -= 200;

  };


  const handleScrollRight = () => {

    const scrollContainer = scrollContainerRef.current;

    scrollContainer.scrollLeft += 200;

  };

  if (boards.length < 1) {
    return <h1>loading</h1>
  }

  return (
    <>
      <div className="feed-container">

        <div className="board-container" ref={scrollContainerRef}>

          <div className="scroll-arrows left-arrow" onClick={handleScrollLeft}>
            &lt;
          </div>

          {boardColors.map((color, index) => (

            // <div className="board-top">
            //   <img className="board-top-container-image" src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
            <div
              key={index}
              className="board-top"
              style={color}
            >
              {boards[index].name}
            </div>


            // </div>
          ))}

          <div className="scroll-arrows right-arrow" onClick={handleScrollRight}>
            &gt;
          </div>

        </div>


        <div className="feed-test-container">

          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              <button className="gallery-photo-button">Save</button>
              <NavLink to="https://www.google.com" target="_blank" className="feed-test-link">
                google.com
              </NavLink>
              <p className="feed-test-board-link">
                Street Wear <span className="arrow-down">&lt;</span>
              </p>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/474x/60/47/d2/6047d21562d5987476b46c752577b714.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

          </div>


          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/d2/a9/1d/d2a91dac35bebb61531dad0d10e2d453.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/02/6a/e5/026ae51de6667442616920e2f1922467.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/d2/a9/1d/d2a91dac35bebb61531dad0d10e2d453.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/474x/60/47/d2/6047d21562d5987476b46c752577b714.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>


          </div>




          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/6f/a6/e1/6fa6e1cf1d653f0af05500966670b19e.jpg" />
              <button className="gallery-photo-button">Save</button>

            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/a0/10/99/a0109904e0c64c9349af920824161fc0.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/85/00/f6/8500f61d2686c9bc7310c39034c66437.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://cdn.shopify.com/s/files/1/0743/1575/9923/products/b4f15ed3ee7747f39b133a66ba3e2bff-Max_1080x.jpg?v=1683763998" />
              <button className="gallery-photo-button">Save</button>
            </div>


          </div>



          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/474x/e6/44/09/e644093a7ddb208e51b1a34d6dca1839.jpg" />
              <button className="gallery-photo-button">Save</button>

            </div>


            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/474x/e6/44/09/e644093a7ddb208e51b1a34d6dca1839.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>


            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
              <button className="gallery-photo-button">Save</button>
            </div>

          </div>


          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/d2/a9/1d/d2a91dac35bebb61531dad0d10e2d453.jpg" />
            </div>


            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/02/6a/e5/026ae51de6667442616920e2f1922467.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/02/6a/e5/026ae51de6667442616920e2f1922467.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
            </div>
          </div>


          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/6f/a6/e1/6fa6e1cf1d653f0af05500966670b19e.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
            </div>

          </div>


          <div style={{ flex: 1 }}>
            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/474x/e6/44/09/e644093a7ddb208e51b1a34d6dca1839.jpg" />
            </div>


            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
            </div>


            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/564x/95/37/a9/9537a91068b3e44e5a9ee4b912b06882.jpg" />
            </div>

            <div className="feed-test-photo">
              <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
            </div>

          </div>


        </div>





        {/*
        <div className="pin-container">

          <div className="gallery-container">

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
                <img src="https://i.pinimg.com/474x/60/47/d2/6047d21562d5987476b46c752577b714.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>

            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/d2/a9/1d/d2a91dac35bebb61531dad0d10e2d453.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/02/6a/e5/026ae51de6667442616920e2f1922467.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/564x/6f/a6/e1/6fa6e1cf1d653f0af05500966670b19e.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/736x/e1/6f/46/e16f46b30163cae38d8be85dcf2c0b0f.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>

          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/474x/e6/44/09/e644093a7ddb208e51b1a34d6dca1839.jpg" />
              </div>
              <button className="gallery-photo-button">Save</button>
            </div>
          </div>


          <div className="gallery-container">
            <div className="gallery-item">
              <div className="photo">
                <img src="https://i.pinimg.com/736x/d2/eb/2e/d2eb2ee1a96270af89570fb7e3ac3f3f.jpg" />
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






        </div> */}



      </div>
    </>
  )
}



export default FeedPage;
