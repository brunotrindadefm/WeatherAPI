import { useState, useEffect } from "react"
import { FiSearch } from 'react-icons/fi'
import './Input.css'

import AOS from "aos"
import 'aos/dist/aos.css';

function Input({ onClick }) {

    const [local,setLocal] = useState('')

    const click = (e) => {
        e.preventDefault()
        onClick(local)
    }

    useEffect(() => {
        AOS.init()
    })

    return (
        <>
            <h2 className="text-center" data-aos="fade-right">Digite a cidade</h2>
            <form data-aos="fade-right" className="form container text-center d-flex justify-content-center align-items-center">
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