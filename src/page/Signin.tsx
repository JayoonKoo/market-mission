import React from 'react'
import { Redirect } from 'react-router'
import SigninContainer from '../containers/SigninContainer'
import useCurrentUser from '../hooks/useCurrentUser'

const Signin: React.FC = () => {
	const user = useCurrentUser()
	if (!!user) {
		return <Redirect to="/" />
	}
	
	return ( <SigninContainer />)
}

export default Signin
