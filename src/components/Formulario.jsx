import {useState,useEffect} from 'react'
import useSelectMonedas from '../hooks/useSelectMonedas'
import styled from '@emotion/styled'
import Error from './Error'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
    background-color: #9497ff;
    width: 100%;
    border: none;
    padding: 10px;
    color: #FFF;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 5px;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {
  const [cripto, setCripto] = useState([])
  const [moneda,SelectMonedas] = useSelectMonedas("Elige tu moneda",monedas)
  const [criptoMoneda,SelectCriptoMoneda] = useSelectMonedas("Elige tu Criptomoneda",cripto)
  const [error, setError] = useState(false)

  //Inicio función
  useEffect(()=>{
    const consultaAPI = async ()=>{
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      const arrayCriptos = resultado.Data.map(cripto =>{
        const objeto = {
          id:cripto.CoinInfo.Name, nombre: cripto.CoinInfo.FullName
        }
        return objeto
      })
      setCripto(arrayCriptos)
    }
    consultaAPI()
  },[])
  //Fin función
  const handleSubmit = (e)=>{
    e.preventDefault()
    
    if([moneda,cripto].includes('')){
        setError(true)
        return
    }
    setError(false)
    setMonedas({
      moneda,
      criptoMoneda
    })
  }

  return (
    <>
    {error && <Error>Todos los campos son requeridos</Error>}
    <form
      onSubmit={handleSubmit}
    >
        <SelectMonedas />
        <SelectCriptoMoneda />
        <InputSubmit  type='submit' value='Cotizar'/>
    </form>
    </>
  )
}

export default Formulario