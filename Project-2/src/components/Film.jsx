import React, { useEffect, useState, } from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios';

const Film = () => {
    const [movieData, setFilm] = useState(null);
    const [appCh, setAppCh] = useState([]);
    const navigate = useNavigate();

    const goToFilm = (id)=>{
        navigate(`/film/${id}`)
    }

    
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/films/${id}`);
                const response2 = await axios.get(`http://localhost:3000/api/films/${id}/characters`);
                setFilm(response.data);
                setAppCh(response2.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [id])

    if (!movieData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h1>{movieData[0].title}</h1>
                <p>Episode: {movieData[0].episode_id}</p>
                <p>Director: {movieData[0].director}</p>
                <p>Producer: {movieData[0].producer}</p>
                <p>Release Date: {movieData[0].release_date}</p>
                <pre>{movieData[0].opening_crawl}</pre>
            </div>
            <h1>Appearing Characters</h1>
           
                {appCh.map(character => (
                    <h3 key={character._id}>
                        <h2>{character.name}</h2>
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
export default Film;
