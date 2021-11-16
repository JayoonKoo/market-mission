import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../types'

interface HeaderProps {
	user: User | undefined;
	logout: () => void;
}

const Header: React.FC<HeaderProps> = ({user, logout}) => {

	const clickLogout = useCallback(() => {
		logout()
	}, [logout])

	return (
		<header>
			<div className="log">Market</div>
			<div>
				{user ? 
					<div>
						<span>{user.displayName}</span>
						<img src={user.profileImg || '/basic-profile.png'} alt="" />
						<button onClick={clickLogout}>로그아웃</button>
					</div>
				:	<div>
						<Link to="/signin">Signin</Link>
						<Link to="/signup">Signup</Link>
					</div>}
				<div>
				</div>
			</div>
		</header>
	)
}

export default Header
