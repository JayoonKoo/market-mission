import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Header from '../components/Header'
import useCurrentUser from '../hooks/useCurrentUser'
import {logout as logoutSagaStart} from '../redux/modules/auth'

export const HeaderContainer = () => {
	const user = useCurrentUser()
	const dispatch = useDispatch()

	const logout = useCallback(() => {
		dispatch(logoutSagaStart())
	}, [dispatch])

	return ( <Header user={user} logout={logout}/>)
}
