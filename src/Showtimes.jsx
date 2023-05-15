import React, { useState, useEffect } from 'react';

function textToTime(t) {
    const [time, am] = t.split(" ")
    let [h, m] = time.split(":")
    if (am === "pm" && h != 12) h = parseInt(h) + 12
    let now = new Date()

    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(h), parseInt(m))
}

function hasTimeCompleted(t) {
    if (!t) return false

    let given = textToTime(t)
    let now = new Date()

    return given.getTime() < now.getTime()
}
function Showtimes(props) {
    const [screenings, setScreenings] = useState({})
    const [timings, setTimings] = useState([])
    const [active, setActive] = useState("")
    useEffect(() => {
        let times = {}
        if (props.movie) {
            props.theaters.map(theater => {
                times[theater.id] = {
                    name: theater.name,
                    timings: theater.showtimes[props.movie.id]
                }
            })
            setActive(props.theaters[0]?.id)
        }
        setScreenings(times)
    }, [props.theaters])

    useEffect(() => {
        if (Object.keys(screenings).length !== 0) {
            if (screenings[active].timings) {
                setTimings(
                    screenings[active].timings
                    .sort(
                        (a, b) => textToTime(a).getTime() - textToTime(b).getTime()
                    )
                )
            } else {
                setTimings()
            }
        }
    }, [active])

    return (
        <>
            <div className="tabs">
                <ul>
                    {
                        Object.entries(screenings).map(e => (
                            <li
                                className={e[0] === active ? "is-active" : ""}
                                key={e[0]}
                                onClick={() => setActive(e[0])}
                            ><a>{e[1].name}</a></li>
                        ))
                    }
                </ul>
            </div>
            <div className="buttons are-small">
                {
                    timings ? timings.map(s => (
                        <button
                            key={s}
                            className="button is-rounded is-outlined"
                            disabled={hasTimeCompleted(s)}
                        >{s}</button>
                    )) : <span>No screenings available today.</span>
                }
            </div>
        </>
    )
}

export default Showtimes;