import React, { useEffect, useState } from 'react'
import './CambioDolares.css'

const CambioDolares = () => {

    const [usdOficial, setUsdOficial] = useState("0")
    const [usdBlue, setUsdBlue] = useState("0")
    const [usdSolidario, setUsdSolidario] = useState("0")
    const [usdMep, setUsdMep] = useState("0")
    const [usdCcl, setUsdCcl] = useState("0")
    const [usd, SetUsd] = useState([])
    const [pesosCliente, setPesosCliente] = useState("")
    const apiDolar = 'https://criptoya.com/api/dolar'

    useEffect(() => {
        fetch(apiDolar)
        .then( (res) => res.json())
        .then(
            (res) => {
                SetUsd(res)
            },
            (err) => {
                console.log('error en la call')
            }
        )
    }, [])

    const oficial = parseFloat(usd.oficial)
    const blue = parseFloat(usd.blue)
    const solidario = parseFloat(usd.solidario)
    const mep = parseFloat(usd.mep)
    const ccl = parseFloat(usd.ccl)

    const handleInputChange = (e) => {
        const pesosCliente = Number(e.target.value);

        if (pesosCliente === 0) {
            setUsdOficial("0");
            setUsdBlue("0");
            setUsdSolidario("0");
            setUsdMep("0");
            setUsdCcl("0");
        } else {
            const cambioOficial = pesosCliente * oficial.toFixed(0)
            setUsdOficial(cambioOficial.toFixed(0))
            const cambioBlue = pesosCliente * blue.toFixed(0)
            setUsdBlue(cambioBlue.toFixed(0))
            const cambioSolidario = pesosCliente * solidario.toFixed(0)
            setUsdSolidario(cambioSolidario.toFixed(0))
            const cambioMep = pesosCliente * mep.toFixed(0)
            setUsdMep(cambioMep.toFixed(0))
            const cambioCcl = pesosCliente * ccl.toFixed(0)
            setUsdCcl(cambioCcl.toFixed(0))
        }

        setPesosCliente(pesosCliente);
    };

  return (
    <div className='todoDolares'>
        <div className="inputDls">
            <input 
                className='inputlit'
                type="number" 
                value={pesosCliente}
                onChange={handleInputChange}
            />
        </div>
        <div className="container_dls">
            <div className="txtsDls">
                <h2>Dolar Oficial</h2>
                <h2>${usdOficial}</h2>
            </div>
            <div className="txtsDls">
                <h2>Dolar Blue</h2>
                <h2>${usdBlue}</h2>
            </div>
            <div className="txtsDls">
                <h2>Dolar Solidario</h2>
                <h2>${usdSolidario}</h2>
            </div>
            <div className="txtsDls">
                <h2>Dolar Mep</h2>
                <h2>${usdMep}</h2>
            </div>
            <div className="txtsDls">
                <h2>Dolar Ccl</h2>
                <h2>${usdCcl}</h2>
            </div>
        </div>
    </div>
  )
}

export default CambioDolares