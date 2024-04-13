import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllPlayers } from "../api"; // Import the function to fetch players
import "./Home.css";

const Home = () => {
    const [players, setPlayers] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchAllPlayers();
                if (response.success) {
                    setPlayers(response.data.players);
                } else {
                    console.error("Failed to fetch players:", response.error);
                }
            } catch (error) {
                console.error("Failed to fetch players:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
        }, 3000); // Change player every 3 seconds

        return () => clearInterval(interval);
    }, [players.length]);

    return (
        <div className="home-container">
            <h1 className="title">PUPPY BOWL</h1>
            <h2 className="subtitle">Welcome to Puppy Bowl!</h2>
            <p className="description">Click below to navigate:</p>
            <div className="buttons-container">
                <Link to="/players" className="animated-button">View Players</Link>
                <Link to="/players/new" className="animated-button">Add New Player</Link>
            </div>
            <div className="featured-players">
                <h2 className="featured-description">Featured Players</h2>
                <div className="slideshow-container">
                    {players.map((player, index) => (
                        <div key={player.id} className={`player-card ${index === currentPlayerIndex ? 'active' : ''}`}>
                            <img src={player.imageUrl} alt={player.name} />
                            <div className="player-details">
                                <p className="player-name"><Link to={`/players/${player.id}`}>{player.name}</Link></p>
                                <p className="player-position">{player.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
