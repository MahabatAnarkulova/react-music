

import {useState, useEffect, useContext} from 'react'
import { AudioContext } from '../../context/AppContext'
import { Container, IconButton, Box, Slider } from '@mui/material'
import { formatMMSS } from '../../helpers/formatMMSS'

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";


const PLayBar = () => {
    const {currentTrack, isPlaying, audio} = useContext(AudioContext)
    const [value, setValue] = useState(0)
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        let timer = setInterval( () => {
            let time = Math.floor(audio.currentTime)
            let duration = Math.floor(audio.duration)
            let currentPercent = (time / duration) * 100
            setValue(time)
            setPercent(currentPercent)
            console.log("tik", );
        }, 1000)

        if(isPlaying == false){
            clearInterval(timer)
        }
        return () => clearInterval(timer)

     }, [isPlaying])

     const playPause = () => {
      if(isPlaying){
        audio.pause()
      } else{
        audio.play()
      }
      // playPause(!isPlaying)
     }

  return (
    <div style={{
        position: 'fixed',
        width: '100%',
        left: 0,
        bottom: 0,
        height: 150,
        background: 'aqua',
        display: 'flex',
        alignItems: 'center'
    }}>
      <Container maxWidth='lg'>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <IconButton onClick={playPause}>{isPlaying ? <FaPause/> : <FaPlay/>}</IconButton>
            <img style={{margin: '0 10px'}} width={80} src={currentTrack.preview} alt="" />
            <div>
                <h4>{currentTrack.title}</h4>
                <p>{currentTrack.artists}</p>
            </div>
            <p style={{width: 100}}>{formatMMSS(value)}</p>
            <Slider onChange={(_, v) => {
              let second = currentTrack.duration;
              let time = (v / 100) * second
                console.log(time, '%');
                setPercent(v)
                setValue(time)
                audio.currentTime = time
            }} value={percent} min={0} max={100}/>
            <p style={{width: 100}}>{formatMMSS(currentTrack.duration-value)}</p>
        </Box>
      </Container>
    </div>
  )
}

export default PLayBar
