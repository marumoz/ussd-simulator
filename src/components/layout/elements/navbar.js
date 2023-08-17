import React from 'react'
import styled from 'styled-components'
import { BsFillSunFill } from 'react-icons/bs'
import { MdDarkMode } from 'react-icons/md'
import Router from 'next/router';
import 'twin.macro'

const Navbar = () => {

  return (
    <Div className = 'sticky top-0 flex items-center justify-between w-full h-12 px-3 text-sm font-bold leading-normal tracking-wider uppercase border-b-2 border-gray-200 shadow-sm'>
        <div className = 'h-full flex items-center'>
            <span className = 'font-bold tracking-wider text-xl uppercase text-primary-100'>
              {/* USSD Developer Portal - {activeProjectName.replace(/-/g, ' ')} */}
              USSD SIMULATOR
            </span>
            {/* <img src = '/images/logo.png' className = 'w-auto h-8' /> */}
        </div>
        <div className = 'flex cursor-pointer'>
            {/* <button className = 'hover:opacity-50' onClick={()=> Router.push('/docs')}>Docs</button> */}
            
        </div>
    </Div>
  )
}

const Div = styled.div`
    background-color: ${p => p.theme.themeColor};
`;

export default Navbar;