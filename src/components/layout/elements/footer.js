import React from 'react'
import styled from 'styled-components'
import 'twin.macro'

const Footer = () => {
  return (
    <Div className = 'sticky bottom-0 flex items-center justify-between w-full px-4 text-xs font-semibold leading-normal tracking-wider uppercase h-9 bg-primary-100'>
        <span>Copyright&copy;{ new Date().getFullYear() } | USSD Config Portal</span>
        {/* <span tw = "cursor-default">Talk to us direct line 0202843000 | 0725843000 | 0789843000</span> */}
        <span tw = "block">
            <a href='#'>Terms & conditions</a> 
        </span>
        {/* <span tw = "block">
            <a target = '_blank' href='#' rel = "noopener">Privacy policy</a>
        </span> */}
    </Div>
  )
}

const Div = styled.div`
    color: ${p => p.theme.themeColor};
`;

export default Footer