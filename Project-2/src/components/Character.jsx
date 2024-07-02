import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Character = () => {
    const [character, setCharacter] = useState(null);
    const [films, setFilms] = useState([]);  // Initialize as an empty array
    const [planets, setPlanets] = useState([]);  // Initialize as an empty array

    const navigate = useNavigate();

    const goToFilm = (id) => {
        navigate(`/film/${id}`)
    }

    const { id } = useParams();

    useEffect(() => {
        const fetchChar = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/characters/${id}`);
                setCharacter(response.data[0]);
            } catch (error) {
                console.error('Error fetching character data:', error);
            }
        };

        const fetchFilms = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/characters/${id}/films`);
                setFilms(response.data);
            } catch (error) {
                console.error('Error fetching films data:', error);
            }
        };

        fetchChar()
        fetchFilms();
    }, [id]);

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div id="generalInfo">
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

            <div>
                <h1>Films Appeared In</h1>
                {films.map(film => (
                    <div key={film._id} onClick={() => goToFilm(film.id)}>
                        <h3>{film.title}</h3>
                        {/* <p><strong>Episode ID:</strong> {film.episode_id}</p>
                        <p><strong>Director:</strong> {film.director}</p>
                        <p><strong>Producer:</strong> {film.producer}</p>
                        <p><strong>Release Date:</strong> {film.release_date}</p>
                        <p><strong>Opening Crawl:</strong></p>
                        <p>{film.opening_crawl}</p> */}
                        <hr />
                    </div>
                ))}
            </div>

            <div>
                {planets.map(planet => (
                    <div key={planet._id}>
                        <h2>{planet.name}</h2>
                        <p><strong>Climate:</strong> {planet.climate}</p>
                        <p><strong>Diameter:</strong> {planet.diameter}</p>
                        <p><strong>Gravity:</strong> {planet.gravity}</p>
                        <p><strong>Orbital Period:</strong> {planet.orbital_period}</p>
                        <p><strong>Population:</strong> {planet.population}</p>
                        <p><strong>Rotation Period:</strong> {planet.rotation_period}</p>
                        <p><strong>Surface Water:</strong> {planet.surface_water}</p>
                        <p><strong>Terrain:</strong> {planet.terrain}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Character;
