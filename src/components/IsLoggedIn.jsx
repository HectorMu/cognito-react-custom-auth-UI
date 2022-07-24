import { Navigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useSession } from "../hooks/useSession";
import { useEffect } from "react";

const IsLoggedIn = ({ view: View }) => {
  const { user, setUser } = useSession();

  if (!user) return <Navigate to={"/login"} />;

  return <View />;
};

export default IsLoggedIn;
