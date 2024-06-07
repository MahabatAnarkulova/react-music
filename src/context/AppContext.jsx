import React, { useState } from "react";

export const AudioContext = React.createContext();

const audio = new Audio()

const AppContext = (props) => {
    const [currentTrack, setCarrentTrack] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [name, setName] = useState("")
    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {
        if(theme === "light"){
            setTheme("dark")
        } else if (theme === "dark"){
            setTheme("light")
        }
    }

    
    const setAudio = (track) => {
        if(currentTrack?.id !== track.id){
            setCarrentTrack(track)
            audio.src = track.src;
            audio.play()
            setIsPlaying(true)
        } else{
            audio.pause()
        }
        if(isPlaying){
            audio.pause()
        } else {
            audio.play()
        }
        setIsPlaying(!isPlaying)
    }
     
    const setSearchtext = (name) => {
        console.log(name);
        setName(name)
    }
        
    const value = {
        toggleTheme,
        theme,
        setSearchtext,
        name,
        text: "music App theme: CONTEXT",
        setAudio,
        audio,
        currentTrack,
        isPlaying
    }
  return (
   <AudioContext.Provider value={value}>
    {props.children}
   </AudioContext.Provider>
  )
}

export default AppContext
