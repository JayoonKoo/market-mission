import React, { useCallback  } from 'react'
import { useDispatch } from 'react-redux'
import Signup from '../components/Signup'
import {signup as signupSagaStart} from '../redux/modules/auth'
import { SignUpReqType } from '../types'

const SignupContainer:React.FC = () => {
	const dispatch = useDispatch()
	const signup = useCallback((reqData: SignUpReqType) => {
		dispatch(signupSagaStart(reqData))
	}, [dispatch])

	return	<Signup signup={signup} />
}

export default SignupContainer
