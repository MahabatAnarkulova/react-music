import { Container, TextField } from "@mui/material"
import { useContext } from "react"
import { AudioContext } from "../../context/AppContext"



const Searchinput = () => {
    const {setSearchtext} = useContext(AudioContext)
  return (
   <Container maxWidth="md">
    <TextField
    onChange={( evt) => {
        const text = evt.target.value
        setSearchtext(text)
    }}
     fullWidth
    sx={{mb: "10px"}} 
    label=" Search Music " variant="standard"/> 
   </Container>
  )
}

export default Searchinput
