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
import { useCreateAccount } from "../api/hooks/use-register";
import { Account } from "../api/types/account";
import { Background } from "../components/Background";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

const aboutLinkOption = linkOptions({
  to: "/about",
});

function SignUp() {
  const { setUser } = useContext(GameContext) as GameContextType;
  const [formData, setFormData] = useState<Account>({
    username: "",
    password: "",
  });
  const { mutate } = useCreateAccount();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (data) => {
        console.log("Signup Success, data is ", data.data.user_id);
        setUser(data.data.user_id);
        navigate(aboutLinkOption);
      },
    });
  };

  return (
    <>
      <Background />
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
            Create an account
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
              Create account
            </button>
          </form>

          <p
            className="text-sm text-center mt-4"
            style={{ fontFamily: "PixelifySans" }}
          >
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in here
            </a>
          </p>
        </div>
      </Overlay>
    </>
  );
}
