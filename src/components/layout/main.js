import React, { Component, Fragment } from 'react'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify';
import 'twin.macro'

import Navbar from '@components/layout/elements/navbar'
import Footer from '@components/layout/elements/footer'

export default class Main extends Component {
  render() {
      let { children } = this.props
    return (
        <Fragment>
            <Head>				
                <title>USSD Developer Portal</title>
                <meta name = "lang"  content = "en-US"/>
                <meta charSet="utf-8"/>
                <meta name = "keywords" content = "HTML, CSS, JavaScript" />
                <meta name = "viewport" content = "width=device-width, initial-scale=1.0"/>
                <meta name = "author" content = "Moses Maru"/>
                <meta name = "description" content = "USSD Developer Portal"/>
            </Head>


            <div className='w-full h-screen overflow-hidden'>
                <Navbar/>
                <div className = 'w-full h-full pb-10 overflow-y-scroll'>
                    {children}
                </div>
                {/* <Footer/> */}
            </div>

            
			<ToastContainer />

        </Fragment>
    )
  }
}
