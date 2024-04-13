import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllPlayers, deletePlayer } from "../api";
import "./Home.css";

const AllPlayers = () => {
    const [players, setPlayers] = useState([]);
    const [searchParams, setSearchParams] = useState("");

    useEffect(() => {
        async function getAllPlayers() {
            try {
                const APIResponse = await fetchAllPlayers();
                if (APIResponse.success) {
                    const uniquePlayers = removeDuplicates(APIResponse.data.players, "id");
                    setPlayers(uniquePlayers);
                }
            } catch (error) {
                console.error("Failed to fetch players:", error);
            }
        }
        getAllPlayers();
    }, []);

    const removeDuplicates = (arr, key) => {
        return arr.reduce((prev, curr) => {
            if (!prev.find(item => item[key] === curr[key])) {
                prev.push(curr);
            }
            return prev;
        }, []);
    };

    const handleDeletePlayer = async (id) => {
        try {
            const response = await deletePlayer(id);
            if (response.success) {
                // Remove the deleted player from the list
                setPlayers(players.filter(player => player.id !== id));
            } else {
                console.error("Failed to delete player:", response.error);
            }
        } catch (error) {
            console.error("Failed to delete player:", error);
        }
    };

    const playersToDisplay = searchParams
        ? players.filter(player =>
            player.name.toLowerCase().includes(searchParams.toLowerCase())
        )
        : players;

    return (
        <div className="container">
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    {/* Add other nav links as needed */}
                </ul>
            </nav>
            <div className="content">
                <h2>Puppies List</h2>
                <div>
                    Search:
                    <input
                        type="text"
                        placeholder="Search players"
                        value={searchParams}
                        onChange={e => setSearchParams(e.target.value)}
                    />
                </div>
                <ul className="players-list">
                    {playersToDisplay.map(player => (
                        <li key={player.id}>
                            <div className="player-wrapper">
                                <Link to={`/players/${player.id}`}>
                                    <img src={player.imageUrl} alt={player.name} />
                                    <span>{player.name}</span>
                                </Link>
                                <button onClick={() => handleDeletePlayer(player.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AllPlayers;
