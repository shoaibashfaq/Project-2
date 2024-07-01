import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Characters = () => {
    const [chars, setChars] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/characters');
                setChars(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [])

    return (
        <div>
            <h1>Characters</h1>
            {chars && chars.map(character => (
                <button key={character.id}>{character.name} </button>
            ))}

        </div>
    );

};
export default Characters;
{/* <p>Gender: {character.gender}</p>
    <p>Skin Color: {character.skin_color}</p>
    <p>Hair Color: {character.hair_color}</p>
    <p>Height: {character.height} cm</p>
    <p>Eye Color: {character.eye_color}</p>
    <p>Mass: {character.mass} kg</p>
    <p>Homeworld: {character.homeworld}</p>
    <p>Birth Year: {character.birth_year}</p> */}