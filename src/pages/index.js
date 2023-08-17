import Router from 'next/router'
import React from 'react'
import { useEffect } from 'react'

const MainPage = () => {

	useEffect(() => {
	  	Router.push('/simulator')
	
	  	return () => {}
	}, [])
	
	return (
		<div>
			
		</div>
	)
}

export default MainPage