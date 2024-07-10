import './FetchData.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { MdOutlineLocationOn } from "react-icons/md";

import nublado from '../img/nublado.png'
import ensolarado from '../img/sol.png'
import chuva from '../img/chuva.png'
import limpoDeDia from '../img/limpodedia.png'
import limpoDeNoite from '../img/limpodenoite.png'
import nevoa from '../img/nevoa.png'

function FetchData({ local }) {


    const [img, setImg] = useState("")

    const apiKey = '3c92226cf2b04f5682e211951240907';
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState(null)

    const fetchData = async () => {

        setErro(null)
        setLoading(true);
        setData(null)

        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${local}&aqi=no&lang=pt-br`)

            setData(response.data)
            console.log(response.data)
        } catch (erro) {
            setErro(erro.message)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (local) {
            fetchData();
        }
    }, [local])

    useEffect(() => {
        if (data) {
            clima();
        }
    }, [data])

    function clima() {
        const condition = data.current.condition.text.toLowerCase();
        if (condition.includes("rain") || condition.includes("drizzle")) {
            setImg(chuva)
        } else if (condition.includes("clear")) {
            if (parseInt(data.location.localtime.substring(11,13)) < 18 && parseInt(data.location.localtime.substring(11,13)) > 5) {
                setImg(limpoDeDia)
            } else {
                setImg(limpoDeNoite)
            }
        } else if (condition.includes("cloudy") || condition.includes("overcast")) {
            setImg(nublado)
        } else if (condition.includes("mist") || condition.includes("fog")) {
            setImg(nevoa)
        }
        else {
            setImg(ensolarado)
        }
    }


    return (
        <>
            <div className='barra'></div>
            {loading && <div className='container d-flex align-items-center justify-content-center ' ><Loading /></div>}
            {erro && <p className='my-3 text-white'>{erro}</p>}
            {data && (
                <div className='tempo text-center my-3'>
                    <div className='titulo'>
                        <h3 className='tit'><span><MdOutlineLocationOn /></span>{data.location.name}</h3>
                        <p><img src={img} alt="imgClima" /></p>
                    </div>
                    <div className='descricao'>
                        <h3>Descrição</h3>
                        <p><b>País</b>: {data.location.country}</p>
                        <p><b>Região</b>: {data.location.region}</p>
                        <p><b>Temperatura</b>: {data.current.temp_c}°C</p>
                        <p><b>Umidade</b>: {data.current.humidity}%</p>
                        <p><b>Horário</b>: {data.location.localtime.substring(11)}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default FetchData
