import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Character = () => {
    const [character, setCharacter] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/characters/${id}`);
                setCharacter(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 key={character.id}>{character.name}</h1>
            <p>Gender: {character.gender}</p>
            <p>Skin Color: {character.skin_color}</p>
            <p>Hair Color: {character.hair_color}</p>
            <p>Height: {character.height} cm</p>
            <p>Eye Color: {character.eye_color}</p>
            <p>Mass: {character.mass} kg</p>
            <p>Homeworld: {character.homeworld}</p>
            <p>Birth Year: {character.birth_year}</p>
        </div>
    );
};

export default Character;
