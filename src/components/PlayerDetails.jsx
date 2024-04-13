import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPlayerDetails } from "../api";
import "./PlayerDetails.css";

const PlayerDetails = () => {
    const { playerId } = useParams();
    const [playerDetails, setPlayerDetails] = useState({
        name: "",
        imageUrl: "",
        breed: ""
    });

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetchPlayerDetails(playerId);
                console.log("API Response:", response); // Log API response object
                if (response.success) {
                    setPlayerDetails(response.data);
                } else {
                    console.error("Failed to fetch player details:", response.error);
                }
            } catch (error) {
                console.error("Failed to fetch player details:", error);
            }
        };

        fetchDetails();
    }, [playerId]);

    console.log("Image URL:", playerDetails.imageUrl); // Log image URL for debugging

    return (
        <div className="player-details-container">
            <h2 className="player-details-title">Player Details</h2>
            <div className="player-details">
                <div className="player-image-container">
                    <img src={playerDetails.imageUrl} alt={playerDetails.name} className="player-details-image" />
                </div>
                <div className="player-details-info">
                    <h3 className="player-details-name">{playerDetails.name}</h3>
                    <p className="player-details-breed">{playerDetails.breed}</p>
                </div>
            </div>
        </div>
    );
};

export default PlayerDetails;
