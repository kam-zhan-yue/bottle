import {
  createFileRoute,
  linkOptions,
  useNavigate,
} from "@tanstack/react-router";
import Overlay from "../components/Overlay";
import { useContext, useState } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import logo from "../assets/bottle.png";
import "../index.css";
import { Account } from "../api/types/account";
import { useLogin } from "../api/hooks/use-login";

export const Route = createFileRoute("/login")({
  component: Login,
});

const gameLinkOption = linkOptions({
  to: "/game",
});

function Login() {
  const { setUser } = useContext(GameContext) as GameContextType;
  const [formData, setFormData] = useState<Account>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const { mutate } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (data) => {
        console.log("Login Success, data is ", data.data);
        const access = data.data.access;
        const refresh = data.data.refresh;
        const user = data.data.user.id;

        sessionStorage.setItem("access_token", access);

        // 2. Store the refresh token in an HttpOnly cookie (this would usually be done by the backend)
        document.cookie = `refresh_token=${refresh}; path=/; HttpOnly; Secure`;

        setUser(user);
        navigate(gameLinkOption);
      },
    });
  };

  return (
    <Overlay>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src={logo} alt="Logo" className="small-logo" />
        <h3
          className="mt-4 text-xl text-center leading-tight"
          style={{ fontFamily: "Tiny5" }}
        >
          MESSAGE IN A <br />
          BOTTLE...
        </h3>
        <p
          className="text-sm text-center mt-2"
          style={{ fontFamily: "PixelifySans" }}
        >
          Log In
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col w-64">
          <label
            htmlFor="username"
            className="text-sm text-left mt-4"
            style={{ fontFamily: "PixelifySans" }}
          >
            Username:
          </label>
          <input
            id="username"
            className="mt-1 p-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            type="text"
            value={formData.username}
            placeholder="username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            style={{ color: "black", fontFamily: "PixelifySans" }}
            required
          />

          <label
            htmlFor="password"
            className="text-sm text-left mt-4"
            style={{ fontFamily: "PixelifySans" }}
          >
            Password:
          </label>
          <input
            id="password"
            className="mt-1 p-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            type="password"
            value={formData.password}
            placeholder="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            style={{ color: "black", fontFamily: "PixelifySans" }}
            required
          />

          <button
            type="submit"
            className="mt-4 p-2 rounded bg-black text-white hover:bg-gray-800"
            style={{ fontFamily: "PixelifySans" }}
          >
            Log In
          </button>
        </form>

        <p
          className="text-sm text-center mt-4"
          style={{ fontFamily: "PixelifySans" }}
        >
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Create one here
          </a>
        </p>
      </div>
    </Overlay>
  );
}
