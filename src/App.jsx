import './index.css'
import Input from './components/Input/Input'
import FetchData from './components/FetchData/FetchData'
import { useState } from 'react'

function App() {

  const [local, setLocal] = useState()

  const cliquePesquisa = (passadoLocal) => {
    setLocal(passadoLocal);
  }

  return (
    <div className='container d-flex justify-content-center align-items-center flex-column'>
      <Input onClick={cliquePesquisa} />
      <FetchData local={local} />
    </div>
  )
}

export default App
