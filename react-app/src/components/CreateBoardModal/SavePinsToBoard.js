
import OpenModalButton from "../OpenModalButton";
import TodayPage from "../TodayPage";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
// import { fetchPinsToday, getPinById } from "../../store/pins";
import { useModal } from "../../context/Modal";
import './SavePinsToBoard.css'
// import { addPinToBoardThunk, getBoardByName } from "../../store/boards";
import { pinThunk } from "../../store/boards";
import { getAllPinsThunkOld } from "../../store/pins";
import LoadingButton from "../LoadingButton";



function SavePinsToBoardModal({ pinsToday, username, boardName, setChange, change }) {


//   const dispatch = useDispatch();

  const [hover, setHover] = useState(false)
  const [hoverDiv, setHoverDiv] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const { setModalContent, closeModal } = useModal();
  const history = useHistory()

//   // console.log("PINS TODAY SAVE PINS TO BOARD MODAL", pinsToday)

  useEffect(() => {
    console.log("Before dispatch");
    dispatch(getAllPinsThunkOld())
      .then(() => console.log("ALL PINS FETCHED", pinsToday))
      .catch((error) => console.log("Error fetching pins:", error));
  }, [dispatch, change]);


  // useEffect(() => {
  //   dispatch(getBoardByName(username, boardName))
  // }, [username])

  // dispatch(fetchPinsToday())
  const currentBoard = useSelector(state => state.boards.singleBoard)
  const currentBoardState = useSelector(state => state.boards.singleBoard)
  const currentState = useSelector(state => state)
  // const allPins = useSelector(state => state.pins.pins)
  console.log("BOARD NAME AND ID", currentBoard)
  // console.log("ALL PINS SELECTOR", allPins)
  // let allPinsArr = Object.values(allPins)
  // console.log("PINS ARRAY", allPinsArr)


//   function onHover(pin) {
//     setHover(true)
//     setHoverDiv(pin)
//   }

//   function offHover() {
//     setHover(false)
//     setHoverDiv("")
//   }

//   // const handlePinHover = (e) => {
//   //   const target = e.target;
//   //   if (target.classList.contains("save-pins-to-board-modal-pins")) {
//   //     if (e.type === "mouseenter") {
//   //       // Handle hover in
//   //       const pinId = target.dataset.pinId; // Retrieve the pin ID from a data attribute
//   //       setHoverDiv(pinId);
//   //       setHover(true);
//   //     } else if (e.type === "mouseleave") {
//   //       // Handle hover out
//   //       setHoverDiv("");
//   //       setHover(false);
//   //     }
//   //   }
//   // };

//   async function addPinToBoard() {
//     // await dispatch(addPinToBoardThunk(currentBoard.id, pin, pin.id))
//     await dispatch(pinThunk(hoverDiv, currentBoard.id))
//   }


  const imagesForPinSelectionObj = {
    "22": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 6,
          "name": "Casual Outfits"
        }
      ],
      "categories": [
        "Athleisure"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": "Posing for the gym fam. Check out the gear.",
      "destination": null,
      "id": 22,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/Say+Cheese.jpeg",
      "owner_id": 3,
      "title": "Say Cheese",
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "23": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 6,
          "name": "Casual Outfits"
        }
      ],
      "categories": [
        "Athleisure"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": "We all know that Western society is facing a catastrophic health crisis. The solution is easier than you might think . . .",
      "destination": null,
      "id": 23,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/If+They+Can+Do+It.jpeg",
      "owner_id": 3,
      "title": "If They Can Do It",
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "24": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 6,
          "name": "Casual Outfits"
        }
      ],
      "categories": [
        "Athleisure"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": "Great top and shorts. Very comfy",
      "destination": null,
      "id": 24,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/Top+and+Shorts.JPEG",
      "owner_id": 3,
      "title": "Top and Shorts",
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "25": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 1,
          "name": "Summer Men Outfits"
        }
      ],
      "categories": [
        "Athleisure"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 25,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/Silver+Metallic+Sports+Bra.jpeg",
      "owner_id": 3,
      "title": "Silver Metallic Sports Bra",
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "26": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 26,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/5a8a5a22f7d11b935ce89a82eb23c319.jpg",
      "owner_id": 1,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "John",
        "followers": [
          "jane"
        ],
        "id": 1,
        "last_name": "Doe",
        "profile_image": null
      }
    },
    "27": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 27,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/7efeddfd860a56c548369587046017cc.jpg",
      "owner_id": 1,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "John",
        "followers": [
          "jane"
        ],
        "id": 1,
        "last_name": "Doe",
        "profile_image": null
      }
    },
    "28": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 28,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/82ea717af4a789e2afe663401ebef770.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "29": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 29,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/46ca097eaa32c524c983495b7841af57.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "30": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 30,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/0676c385c83c48a6913dcc0055951df9.jpg",
      "owner_id": 3,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "31": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 31,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/945725b9fe7d403c115a2e28fb79b460.jpg",
      "owner_id": 3,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "32": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 32,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/11059bc1bc4f88a328213fe0aa189111.jpg",
      "owner_id": 3,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "33": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 33,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/0304343e6ec6c5420de10ccd8432d71e.jpg",
      "owner_id": 3,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "34": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 34,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/a79f86920e602ad655536880de889680.jpg",
      "owner_id": 3,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "35": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 35,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/2178105ec74e7b0b6d4afff106453b79.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "36": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 36,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/bfba451391f982f7f4eaa2366acf51b7.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "37": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 37,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/b3b8c04f80201462a46baa11cf7e826c.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "38": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 38,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/ab8e1280361fb356f94de2244b48edfe.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "39": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 39,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/d2811aef5e9af5caea8b7b30c1ea9532.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },

  }

  const images = Object.values(imagesForPinSelectionObj)
  console.log("IMAGES FOR PIN SELECTION", images)

  if (Object.keys(images).length === 0) {
    console.log("WE ARE IN LOADING STATE")
    if (isLoading) {
      return (
        <LoadingButton
          isLoading={isLoading}
        // disabled={isLoading}
        />
      )
    }
  }


  const imagesForPinSelectionObj = {
    "22": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 6,
          "name": "Casual Outfits"
        }
      ],
      "categories": [
        "Athleisure"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": "Posing for the gym fam. Check out the gear.",
      "destination": null,
      "id": 22,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/Say+Cheese.jpeg",
      "owner_id": 3,
      "title": "Say Cheese",
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "23": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 6,
          "name": "Casual Outfits"
        }
      ],
      "categories": [
        "Athleisure"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": "We all know that Western society is facing a catastrophic health crisis. The solution is easier than you might think . . .",
      "destination": null,
      "id": 23,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/If+They+Can+Do+It.jpeg",
      "owner_id": 3,
      "title": "If They Can Do It",
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "24": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 6,
          "name": "Casual Outfits"
        }
      ],
      "categories": [
        "Athleisure"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": "Great top and shorts. Very comfy",
      "destination": null,
      "id": 24,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/Top+and+Shorts.JPEG",
      "owner_id": 3,
      "title": "Top and Shorts",
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "25": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 1,
          "name": "Summer Men Outfits"
        }
      ],
      "categories": [
        "Athleisure"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 25,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/Silver+Metallic+Sports+Bra.jpeg",
      "owner_id": 3,
      "title": "Silver Metallic Sports Bra",
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "26": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 26,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/5a8a5a22f7d11b935ce89a82eb23c319.jpg",
      "owner_id": 1,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "John",
        "followers": [
          "jane"
        ],
        "id": 1,
        "last_name": "Doe",
        "profile_image": null
      }
    },
    "27": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 27,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/7efeddfd860a56c548369587046017cc.jpg",
      "owner_id": 1,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "John",
        "followers": [
          "jane"
        ],
        "id": 1,
        "last_name": "Doe",
        "profile_image": null
      }
    },
    "28": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 28,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/82ea717af4a789e2afe663401ebef770.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "29": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 29,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/46ca097eaa32c524c983495b7841af57.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "30": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 30,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/0676c385c83c48a6913dcc0055951df9.jpg",
      "owner_id": 3,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "31": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 31,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/945725b9fe7d403c115a2e28fb79b460.jpg",
      "owner_id": 3,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "32": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 32,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/11059bc1bc4f88a328213fe0aa189111.jpg",
      "owner_id": 3,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "33": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 33,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/0304343e6ec6c5420de10ccd8432d71e.jpg",
      "owner_id": 3,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "34": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 34,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/a79f86920e602ad655536880de889680.jpg",
      "owner_id": 3,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Mike",
        "followers": [
          "rena"
        ],
        "id": 3,
        "last_name": "Johnson",
        "profile_image": "https://threadterest.s3.us-east-2.amazonaws.com/df0953acbb61863a94e1a003c07a24c5.jpg"
      }
    },
    "35": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 35,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/2178105ec74e7b0b6d4afff106453b79.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "36": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 36,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/bfba451391f982f7f4eaa2366acf51b7.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "37": {
      "alt_text": null,
      "boards_pinned_in": [
        {
          "id": 3,
          "name": "Summer outfits"
        }
      ],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 37,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/b3b8c04f80201462a46baa11cf7e826c.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "38": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 38,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/ab8e1280361fb356f94de2244b48edfe.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },
    "39": {
      "alt_text": null,
      "boards_pinned_in": [],
      "categories": [
        "Boho"
      ],
      "created_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "description": null,
      "destination": null,
      "id": 39,
      "image": "https://threadterest.s3.us-east-2.amazonaws.com/d2811aef5e9af5caea8b7b30c1ea9532.jpg",
      "owner_id": 2,
      "title": null,
      "updated_at": "Sat, 10 Jun 2023 20:16:29 GMT",
      "user": {
        "first_name": "Jane",
        "followers": [
          "Demo"
        ],
        "id": 2,
        "last_name": "Smith",
        "profile_image": null
      }
    },

  }

  const images = Object.values(imagesForPinSelectionObj)
  console.log("IMAGES FOR PIN SELECTION", images)

  if (Object.keys(images).length === 0) {
    console.log("WE ARE IN LOADING STATE")
    if (isLoading) {
      return (
        <LoadingButton
          isLoading={isLoading}
        // disabled={isLoading}
        />
      )
    }
  }




//   return (
//     <>
//       <div className="save-pins-to-board-modal-container">

//         <h3 className="save-pins-to-new-board-text">Save some Pins to your new board</h3>

        <div className="save-pin-list-container">
          {/* <div className="save-pins-board-list" onMouseEnter={handlePinHover} onMouseLeave={handlePinHover}> */}
          <div className="save-pins-board-list" >
            {images.map((pin) => {
              return (


//                 < div className="save-pins-to-board-modal-pins"
//                   data-pin-id={pin.id}
//                   onMouseEnter={() => onHover(pin)} onMouseLeave={() => offHover()}
//                   style={{ backgroundImage: `url(${pin.image})`, }
//                   }
//                 >
//                   <div className="save-pins-to-board-save-button"
//                     onClick={() => addPinToBoard()}

//                   >Save</div>
//                   <div className="save-pins-to-board-modal-text-container">
//                     {pin.description}
//                   </div>

//                 </div>


//               )
//             })}

//           </div>
//         </div>

//         <div className="bottom-done">
//           <div className="bottom-done-text" onClick={() => closeModal()}>Done</div>
//         </div>



//       </div >
//     </>
//   )

// }


// export default SavePinsToBoardModal
