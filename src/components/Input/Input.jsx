import { useState } from "react"
import { FiSearch } from 'react-icons/fi'
import './Input.css'

function Input({ onClick }) {

    const [local,setLocal] = useState('')

    const click = (e) => {
        e.preventDefault()
        onClick(local)
    }

    return (
        <>
            <h2 className="text-center ">Digite a cidade</h2>
            <form className="form container text-center d-flex justify-content-center align-items-center">
                <div className="form-floating">
                    <input className="form-control" onChange={(e) => setLocal(e.target.value)} value={local} type="text" />
                    <label>Local</label>
                </div>
                <div className="botao">
                    <button onClick={click} className="btn"><FiSearch /></button>
                </div>
            </form>
        </>
    )
}

export default Input