import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const[apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTY0OGQ3MWMxMDI2ZGZiYmE4MWE3NGQ1M2IxOTEzOSIsIm5iZiI6MTcyODMxMTUyNC4yMzQxMTEsInN1YiI6IjY3MDNlZjhjNTM3NDQ2ZTIyMDc5NWI4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YnuVnmuXeVRqh7w3rx7Ck4HAeVNWB3B2874el4xaAws'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]) )
    .catch(err => console.error(err));

  },[])
  return (
    <div className='player'>
        <img onClick={()=>{navigate(-2)}} src={back_arrow_icon} alt="" />
        <iframe width='90%' height='90%' src={`http://www.youtube.com/embed/${apiData.key}`}
        title='trailer' frameBorder='0' allowFullScreen></iframe>
        <div className="player-info">
          <p>{apiData. published_at.slice(0,10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
    </div>
  )
}

export default Player