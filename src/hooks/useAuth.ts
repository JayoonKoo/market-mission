import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth as authSagaStart } from "../redux/modules/auth";

const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authSagaStart());
  }, [dispatch]);
};

export default useAuth;
