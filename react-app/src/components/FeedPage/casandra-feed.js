// import { useDispatch, useSelector } from "react-redux"
// import { getPinsByCategory } from "../../store/pins"
// import { useEffect, useState } from "react"
// import { useHistory } from "react-router-dom"
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
// import { getAllPinsThunk } from "../../store/pins"
// import "./casandra-feed.css"


// export default function CaSandraFeed() {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     let [loading, setLoading] = useState(false)
//     let [finishedLoading, setFinished] = useState(false)
//     let pins = useSelector(state => state.pins.pins)
//     let sessionUser = useSelector(state => state.session.user)
//     console.log("pins", Object.values(pins))

//     let pinsArr = []
//     if (pins && Object.values(pins) != null) {
//         pinsArr = filterPins(Object.values(pins))
//         console.log("pinsArr", pinsArr)
//     }

//     function filterPins(pins) {
//         if (!sessionUser || sessionUser.categories.length === 0) {
//             let randomPins = shufflePins(pins)
//             return randomPins.splice(0, 30)
//         } else {
//             let filteredPins = []
//             let categories = sessionUser.categories
//             for (let pin of pins) {
//                 for (let category of categories) {
//                     if (pin.categories.includes(category))
//                     filteredPins.push(pin)
//                 }
//             }
//             let randomPins = shufflePins(filteredPins)
//             return randomPins.splice(0, 30)
//         }
//     }

//     function shufflePins(pins) {
//         let newPinOrder = []
//         let copy = [...pins]
//         while (copy.length) {
//             let i = Math.floor(Math.random() * copy.length)
//             newPinOrder.push(copy[i])
//             copy.splice(i, 1)
//         }
//         return newPinOrder
//     }


//     useEffect(() => {
//         dispatch(getAllPinsThunk()).then(() => setLoading(true))
//     }, [dispatch])

//     useEffect(() => {
//         if (!loading && !pins[0] && !pins[0]?.id) {
//             return
//         }
//         if (!Object.values(pins).length) {
//             return
//         }
//         else {
//             setTimeout(() => {
//                 setFinished(true)
//             }, 1000)
//         }
//     }, [loading, pins])



//     if (!pinsArr[0]?.id || !finishedLoading) return <h1>...Loading</h1>

//     return (
//         <div className="pins-feed-wrapper-wrapper">
//             <ResponsiveMasonry className="pins-feed-wrapper" options={{fitWidth: true}}
//                 columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1200: 5, 1900: 6 }}>
//                 <Masonry className="feed-pin-masonry" options={{fitWidth: true}}>
//                     {pinsArr.map(pin => (
//                         <div className="feed-individual-pin-wrapper">
//                             <div onClick={() => history.push(`/pin/${pin.id}`)}>
//                                 <img className="feed-pin-image" src={pin.image} alt={pin.alt_text ? pin.alt_text : ""} />
//                             </div>
//                             <div className="feed-individual-pin-info" onClick={() => history.push(`/${pin.user.username}`)}>
//                                 <div>
//                                     {pin.title ? <p className="feed-pin-title">{pin.title}</p> : null}
//                                 </div>
//                                 <div className="feed-individual-pin-user-info">
//                                 {pin.user.profile_image ? <img className="feed-profile-image" src={pin.user.profile_image} /> : null}
//                                 <p>{pin.user.username}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </Masonry>
//             </ResponsiveMasonry>
//         </div>
//     )
// }
