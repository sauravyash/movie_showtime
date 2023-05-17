import React, { useState, useEffect } from 'react';

// This function takes a string in the format "hh:mm am/pm" 
// and converts it to a Date object set to today's date. 
// Note that the timezone is assumed to be local.
function textToTime(t) {
    const [time, am] = t.split(" ")
    let [h, m] = time.split(":")
    if (am === "pm" && h != 12) h = parseInt(h) + 12
    let now = new Date()

    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(h), parseInt(m))
}

// Checks whether the given Date object `t` represents a 
// time that has already passed, relative to the current moment.
// Returns true if `t` is in the past, 
// false if it's in the future or equal to the current time.
function hasTimeCompleted(t) {
    if (!t) return false

    let given = textToTime(t)
    let now = new Date()

    return given.getTime() < now.getTime()
}

// Displays a list of showtimes for the given movies, 
// spilt into tabs based on the Cinema.
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
                    )) : <span className='pb-5'>No screenings available today.</span>
                }
            </div>
        </>
    )
}

export default Showtimes;