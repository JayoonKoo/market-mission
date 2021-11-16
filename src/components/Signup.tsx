import React, { FormEvent, useRef, useState } from 'react'
import { SignUpReqType } from '../types'

interface SignupProps {
	signup: (reqData: SignUpReqType) => void;
}

const BASIC_PROFILE_SRC ="/basic-profile.png" 

const Signup:React.FC<SignupProps> = ({signup}) => {
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const conformRef = useRef<HTMLInputElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const [profile, setProfile] = useState<string | null>(null)

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="email">이메일</label>
			<input ref={emailRef} id="email" type="text" placeholder="email"/>

			<label htmlFor="password">비밀번호</label>
			<input ref={passwordRef} id="password" type="password" placeholder="password" />

			<label htmlFor="conform-password">비밀번호 확인</label>
			<input ref={conformRef} id="conform-password" type="password" placeholder="conform password" />

			<label htmlFor="name">이름</label>
			<input ref={nameRef} id="name" type="text" placeholder="name"/>

			<label htmlFor="profile-img">
				<img src={profile || BASIC_PROFILE_SRC} alt="프로필 이미지" />
			</label>
			<input onChange={handleFileChange} id="profile-img" type="file" />
			<button type="button" onClick={handleProflieDel}>X</button>
			<button type="submit">회원가입</button>
		</form>
	)


	function handleSubmit(e:FormEvent) {
		e.preventDefault()
		const reqData: SignUpReqType = {
			email : emailRef.current!.value,
			password : passwordRef.current!.value,
			displayName : nameRef.current!.value,
			profileImgBase64 : profile
		}
		signup(reqData)
	}

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const {files} = e.target
		if (files === null) {
			return
		} else {
			Array.from(files).forEach(file => {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.addEventListener('load', () => {
					setProfile(reader.result as string)
				})
			})
		}
		
	}

	function handleProflieDel() {
		setProfile(null)
	}


}

export default Signup
