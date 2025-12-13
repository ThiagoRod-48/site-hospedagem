import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const Accprofile = () => {
  const { user, setUser } = useUserContext();
  const [redirect, setRedirect] = useState(false);

  const logolt = async () => {
    try {
      const { data } = await axios.post("/users/logout");
      console.log(data);

      setUser(null);
      setRedirect(true);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  if (redirect) return <Navigate to="/" />;

  if (!user) return <></>;

  return (
    <div className="flex flex-col items-center gap-4">
      <p>
        Logado como {user.name}({user.email})
      </p>

      <button
        onClick={logolt}
        className="bg-primary-400 min-w-40 cursor-pointer rounded-full px-4 py-2 text-white"
      >
        Logolt
      </button>
    </div>
  );
};

export default Accprofile;
