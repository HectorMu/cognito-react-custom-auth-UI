import { createContext, useEffect, useState } from "react";
import { Hub, Auth } from "aws-amplify";

export const Session = createContext();
const LAST_USER_LS =
  "CognitoIdentityServiceProvider.69dc0b1cnsrhfaaocs36sb533p.LastAuthUser";
export default function SessionProvider({ children }) {
  const lastUser = window.localStorage.getItem(LAST_USER_LS);
  const [user, setUser] = useState(lastUser ? true : null);

  const AuthEventListener = async () => {
    Hub.listen("auth", async (data) => {
      const { payload } = data;
      if (payload.event === "signIn") {
        console.log(data);
        return setUser(payload.data);
      }
    });
  };

  const getCurrentUser = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    setUser(currentUser);
  };

  AuthEventListener();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Session.Provider value={{ user, setUser }}>{children}</Session.Provider>
  );
}
