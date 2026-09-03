import { createContext, useContext, useState } from "react";
import { redirect } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("adminUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const admindata = {
    email: "adminshop@gmail.com",
    password: "admin@1122",
  };

  const Login = (useremail, userpassword) => {
    if (
      admindata.email === useremail &&
      admindata.password === userpassword
    ) {
      setUser(admindata);

      localStorage.setItem("adminUser", JSON.stringify(admindata));

      return null;
    }

    return "Login failed";
  };

  const Logout = () => {
    setUser(null);
    localStorage.removeItem("adminUser");
  };

  const requireAuth = ({ request }) => {
    const savedUser = localStorage.getItem("adminUser");

    if (!savedUser) {
      const url = new URL(request.url);

      throw redirect(
        `/login?redirectTo=${url.pathname}`
      );
    }

    return JSON.parse(savedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        Login,
        Logout,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);