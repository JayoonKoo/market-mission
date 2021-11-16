import { useSelector } from "react-redux";
import { RootState, User } from "../types";
import useAuth from "./useAuth";

const useCurrentUser = () => {
  useAuth();
  const user = useSelector<RootState, User | undefined>(
    (state) => state.auth.user
  );

  return user;
};

export default useCurrentUser;
