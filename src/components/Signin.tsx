import React, { FormEvent, useRef } from "react";
import { LoginReqType } from "../types";
import syltes from "../styles/Sigin.module.scss"

interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ login }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <form onSubmit={submitLogin}>
      <input type="text" required placeholder="Email" ref={emailRef} />
      <input type="password" required placeholder="Email" ref={passwordRef} />
      <button>로그인</button>
    </form>
  );

  function submitLogin(event: FormEvent) {
    event.preventDefault();
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
		
    login({ email, password });
  }
};

export default Signin;
