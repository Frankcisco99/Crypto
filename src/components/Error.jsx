import styled from '@emotion/styled'
import React from 'react'

const Mensaje = styled.div`
    background-color: #B7322C;
    color: #FFF;
    text-align: center;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 22px;
    padding: 15px;
    text-transform: uppercase;
`

const Error = ({children}) => {
  return (
    <Mensaje>{children}</Mensaje>
  )
}

export default Error