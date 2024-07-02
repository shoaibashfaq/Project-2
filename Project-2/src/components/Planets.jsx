
import React, { useEffect, useState, } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const Planet = () => {
    const [planetData, setPlanetData] = useState(null);
    const [appCh, setAppCh] = useState([]);


    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/planets/${id}`);
                const response2 = await axios.get(`http://localhost:3000/api/planets/${id}/characters`);
                setPlanetData(response.data[0]);
                setAppCh(response2.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [id])

    if (!planetData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h1>{planetData.name}</h1>
                <div>
                    <div><strong>Climate:</strong> {planetData.climate}</div>
                    <div><strong>Surface Water:</strong> {planetData.surface_water}</div>
                    <div><strong>Diameter:</strong> {planetData.diameter}</div>
                    <div><strong>Rotation Period:</strong> {planetData.rotation_period}</div>
                    <div><strong>Terrain:</strong> {planetData.terrain}</div>
                    <div><strong>Gravity:</strong> {planetData.gravity}</div>
                    <div><strong>Orbital Period:</strong> {planetData.orbital_period}</div>
                    <div><strong>Population:</strong> {planetData.population}</div>
                </div>
            </div>


            <h1>Appearing Characters</h1>

            {appCh.map(character => (
                <h3 key={character._id}>
                    <h2 onClick={() => goTo}>{character.name}</h2>
                    {/* <p>Gender: {character.gender}</p>
            <p>Skin Color: {character.skin_color}</p>
            <p>Hair Color: {character.hair_color}</p>
            <p>Height: {character.height} cm</p>
            <p>Eye Color: {character.eye_color}</p>
            <p>Mass: {character.mass} kg</p>
            <p>Birth Year: {character.birth_year}</p>
            <p>Homeworld: {character.homeworld}</p> */}
                </h3>
            ))}

        </div>
    );

};
export default Planet;
