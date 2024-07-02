import React, { useEffect, useState, } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Characters = () => {
    const [chars, setChars] = useState();
    const navigate = useNavigate();

    const goToChar = (id)=>{
        navigate(`/user/${id}`)
    }

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
        <div id="charactersList">
            <h1>Star Wars Universe Lookup</h1>
            {chars && chars.map(character => (
                <div  key={character.id} onClick={()=>goToChar(character.id)}>{character.name} </div>
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