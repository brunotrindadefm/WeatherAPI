import './FetchData.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { RiWaterPercentFill } from "react-icons/ri";

import AOS from 'aos';
import 'aos/dist/aos.css';

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
        if(data) {
            clima();
        }
    }, [local])

    function clima() {
        const condition = data.current.condition.text.toLowerCase();
        if (condition.includes("rain") || condition.includes("drizzle")) {
            setImg(chuva)
        } else if (condition.includes("clear")) {
            if (parseInt(data.location.localtime.substring(11, 13)) < 18 && parseInt(data.location.localtime.substring(11, 13)) > 5) {
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
            {erro && <p className='my-3 text-white'>Cidade não encontrada</p>}
            {data && (
                <div data-aos="fade-right" className='tempo text-start my-3'>
                    <div className='titulo'>
                        <div>
                            <h4>{data.location.name}, {data.location.region}</h4>
                            <h4>{data.location.country}</h4>
                            <p className='data'>{data.location.localtime.substring(11)}</p>
                        </div>
                        <div>
                            <p className='umidade '><RiWaterPercentFill /> {data.current.humidity}%</p>
                            <p className='temp'>{data.current.temp_c}°</p>
                        </div>
                    </div>
                    <div className='img'>
                        <div>
                            <p><img src={img} alt="imgClima" /></p>
                        </div>
                        <div className='celcius'>
                            <p>CELCIUS</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FetchData
