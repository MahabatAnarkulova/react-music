import axios from "axios"
import { useEffect, useState, useContext } from "react"
import {AudioContext} from '../../context/AppContext'
import {Box, Container, CircularProgress, Card, CardContent} from '@mui/material'
import PLayBar from "../PLayBar/PLayBar"
import { formatMMSS } from "../../helpers/formatMMSS"

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";



const url = 'https://665b0c8a003609eda45fa87a.mockapi.io/api/v1/tracks'

const MusicList = () => {
    const [songs, setSongs] = useState([])
    const {setAudio, currentTrack, isPlaying, name} = useContext(AudioContext)

    useEffect(() => { 
        axios.get(url).then((response) => {
            console.log(response);
            setSongs(response.data)
        })
    }, [])

    if(songs.length === 0){
        return <Container maxWidth="md">
            <Box sx={{display: 'flex',
                justifyContent: 'center'
            }}>
                <CircularProgress/>
            </Box>
        </Container>

    }

  return (
    <div>
     <Container maxWidth="md">
       <Card>
        <CardContent>
            {songs.filter(el => el.artists.toLowerCase().includes(name.toLowerCase())).map((track) => {
                return (
                    <div className="music" key={track.id} style={{display:"flex", gap: 50, alignItems: "center"}}>
                        <button
                        onClick={() => {
                            setAudio(track)
                        }}>{currentTrack?.id === track.id && isPlaying ? <FaPause/> : <FaPlay/>}</button>
                        <img src={track.preview} alt="" />
                        <div>
                            <h4>{track.title}</h4>
                            <p>{track.artists}</p>
                        </div>
                        <p style={{marginLeft: 'auto'}}>{formatMMSS(track.duration)}</p>
                    </div>
                )
            })}
        </CardContent>
       </Card>
      {currentTrack &&  <PLayBar/> } 
     </Container>
    </div>
  )
}

export default MusicList
