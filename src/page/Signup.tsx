import { Redirect } from "react-router";
import SignupContainer from "../containers/SignupContainer";
import useCurrentUser from "../hooks/useCurrentUser";

export default function Signup() {
	const user = useCurrentUser()
	if (!!user) {
		return <Redirect to="/" />
	}

	return (
		<div className="signup-container container">
			<SignupContainer />
		</div>
	)
}
