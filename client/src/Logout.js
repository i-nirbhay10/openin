import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const exituser = async () => {
    try {
      if (window.confirm("Are you sure")) {
        const res = await fetch("/logout", {
          method: "GET",
          headers: {
            Accept: "appllication/json",
            "Content-type": "appllication/json",
          },
          credentials: "include",
        });

        if (res.status === 200) {
          navigate("/");
        } else {
          console.log("log out from else");
        }
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      console.log("log out error");
      navigate("/Signin");
    }
  };

  useEffect(() => {
    exituser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return;
};

export default Logout;
