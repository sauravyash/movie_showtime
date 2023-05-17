import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import Showtimes from './Showtimes';
import Rating from './Rating';

// This componenet displays the list of movies with their poster, 
// title and rating, and allows filtering by rating and text search.
function Movies() {
    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [textFilter, setTextFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState("All");
    

    useEffect(() => {
        // Fetch theater data from API
        let movieURL = "http://localhost:3000/" + (
            textFilter.length > 0 ? `movies/find/${textFilter}` : 'movies'
        )

        fetch(movieURL)
            .then(response => response.json())
            .then(data => {
                if (ratingFilter !== "All") {
                    setMovies(data.filter(m => m.rating === ratingFilter))
                } 
                else setMovies(data)
            })

        fetch('http://localhost:3000/theaters')
            .then(response => response.json())
            .then(data => setTheaters(data))
    }, [textFilter, ratingFilter]);


    return (
        <div className="container">
            <h1>Movies</h1>

            <div className="field has-addons is-center p-6">
                <div className="control is-expanded">
                    <input className="input" type="text" placeholder="Search" value={textFilter} onChange={e => setTextFilter(e.target.value)} />
                </div>
                <p className="control">
                    <span className="select">
                        <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)}>
                            <option value="All">All</option>
                            <option value="PG-13">PG</option>
                            <option value="R">R</option>
                        </select>
                    </span>
                </p>
            </div>

            <div className="section">

                {movies.map(m => (
                    <div className="box movie" key={m.id}>
                        <div className="img">
                            <img src={m.poster} alt="movie image" />
                        </div>
                        <div className='content'>
                            <h1 className='title is-3'>{m.title}<Rating rating={m.rating} /></h1>
                            <Showtimes theaters={theaters} movie={m} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Movies;
