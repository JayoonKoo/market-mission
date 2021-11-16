import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import Signin from '../components/Signin';
import { LoginReqType } from '../types';
import {login as loginSagaStart} from '../redux/modules/auth'

const SigninContainer = () => {
	const dispatch = useDispatch()

	const login = useCallback((reqData: LoginReqType) => {
		dispatch(loginSagaStart(reqData))
	}, [dispatch])

	return (
		<Signin login={login}/>
	)
}

export default SigninContainer;
