// NewPlayer.jsx
import React, { useState } from "react";
import { createNewPlayer } from "../api";

const NewPlayer = ({ history }) => {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const newPlayer = { name, breed };
            await createNewPlayer(newPlayer);
            history.push("/players");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Breed"
                value={breed}
                onChange={e => setBreed(e.target.value)}
            />
            <button type="submit">Add Player</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default NewPlayer;
