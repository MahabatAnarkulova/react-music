
import {useContext} from 'react'
import {AudioContext} from './context/AppContext'
import MusicList from './components/MusicList/MusicList'
import Searchinput from './components/Searchinput/Searchinput'
import { Container, IconButton } from '@mui/material'

const App = () => {
  const value = useContext(AudioContext)
  return (
    <div className={value.theme}>
      <Container maxWidth="md">
        <IconButton onClick={value.toggleTheme}>
          {value.theme}
        </IconButton>
      </Container>
      <h1 style={{textAlign:'center'}}>{value.text}</h1>
      <Searchinput/>
      <MusicList/>
    </div>
  )
}

export default App
