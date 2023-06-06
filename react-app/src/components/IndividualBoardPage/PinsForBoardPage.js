export default function PinsForBoardPage({pins}) {
    let pinsArr = Object.values(pins)
    return (
        <div>
            {pinsArr.map(pin => (
                <div>
                    <img src={pin.image} alt={pin.alt_text ? pin.alt_text : ""}/>
                    <div>{pin.name}</div>
                    <div>
                        {pin.owner_info.profile_image ? <img src={pin.owner_info.profile_image} /> : null}
                        {pin.owner_info.username}
                    </div>
                </div>
            ))}
        </div>
    )
}