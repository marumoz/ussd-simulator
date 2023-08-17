import React from 'react'
import 'twin.macro'

import MainLayout from '@components/layout/main'
// import Sidebar from '@components/layout/elements/sidenav'

const Body = ({ children, sidenav }) => {
  return (
    <MainLayout sidenav = {sidenav}>
        <div className = 'flex w-full h-full overflow-hidden'>
            {/* <Sidebar/> */}

            <div className='w-full h-full overflow-y-scroll'>
              { children }
            </div>
        </div>
    </MainLayout>
  )
}

export default Body