import React from 'react'
import { useState, useEffect } from 'react'
import './CambioPesos.css'

const CambioPesos = () => {
    const [usd, SetUsd] = useState([])
    const [pesificar, setPesificar] = useState("0")
    const [pesificarPais, setPesificarPais] = useState("0")
    const [pesificarGanancia, setPesificarGanancia] = useState("0")
    const [pesificarOficial, setPesificarOficial] = useState("0")
    const [pesificarBienes, setPesificarBienes] = useState("0")
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

    const usdOficial = parseFloat(usd.oficial)

    const handleInputChange = (e) => {
        const pesosCliente = Number(e.target.value);

        if (pesosCliente === 0) {
            setPesificar("0");
            setPesificarPais("0");
            setPesificarGanancia("0");
            setPesificarOficial("0");
            setPesificarBienes("0");
        } else {
            const sumaHecha = pesosCliente * usdOficial.toFixed(0);
            const impuestoBienes = sumaHecha * 0.25;
            const agregoBienes = sumaHecha * 2;
            const impuestoGanancias = sumaHecha * 0.30;
            const impuestoPais = sumaHecha * 0.45;
            setPesificarGanancia(impuestoGanancias.toFixed(0));
            setPesificarOficial(sumaHecha.toFixed(0));
            setPesificarPais(impuestoPais.toFixed(0));
            setPesificarBienes(impuestoBienes.toFixed(0));

            if (pesosCliente >= 300) {
                const agregoImpuestos = sumaHecha * 2;
                setPesificar(agregoImpuestos.toFixed(0));
            } else {
                const agregoImpuestos = sumaHecha + 0.75 * sumaHecha;
                setPesificar(agregoImpuestos.toFixed(0));
            }
        }

        setPesosCliente(pesosCliente);
    };

  return (
      <div className='contenedorPesos'>
          <div className='inputPeso'>
              <input type="number"
                  className='inputcambio'
                  value={pesosCliente}
                  onChange={handleInputChange}
              />
          </div>
          <div className='contenedorTxts'>
              <div className='txts'>
                  <h3>Sin Impuestos</h3>
                  <h3>${pesificarOficial}</h3>
              </div>
              <div className='txts'>
                  <h3>+ Impuesto PAÍS (30%)</h3>
                  <h3>${pesificarPais}</h3>
              </div>
              <div className='txts'>
                  <h3>+ Impuesto ganancias (%45)</h3>
                  <h3>${pesificarGanancia}</h3>
              </div>
              {pesosCliente >= 300 && (
                  <div className='txts'>
                      <h3>+ Bienes Personales (%25)</h3>
                      <h3>${pesificarBienes}</h3>
                  </div>
              )}
              <div className='txts totalCambio'>
                  <h3 className='ladito'> Total:</h3>
                  <h3 className='laditopresio'>${pesificar}</h3>
              </div>
          </div>
          <div className='parrafo'>
              <p>A partir de octubre del 2022, si el monto supera los
                  300 dólares aplica un 25% de Bienes Personales
                  (más el 30% y 45% de Impuesto PAIS e Impuesto
                  a las Ganancias, respectivamente). La calculadora se
                  encuentra actualizada.</p>
          </div>
      </div>
  )
}

export default CambioPesos