import {
  createFileRoute,
  linkOptions,
  useNavigate,
} from "@tanstack/react-router";
import Overlay from "../components/Overlay";
import { useContext, useState } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import logo from "../assets/bottle.png";
import "../index.css"

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

const gameLinkOption = linkOptions({
  to: "/game",
});

function SignUp() {
  const { setUser } = useContext(GameContext) as GameContextType;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = (username: string) => {
    console.log("Submitted username:", username);
    console.log("Submitted password:", password)
    setUser(username);
    navigate(gameLinkOption);
  };

  return (
    <Overlay>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src={logo} alt="Logo" className="small-logo"/>
        <h3 className="mt-4 text-xl text-center leading-tight" style={{ fontFamily: 'Tiny5' }}>
          MESSAGE IN A <br />BOTTLE...
        </h3>
        <p className="text-sm text-center mt-2" style={{ fontFamily: 'Jura' }}>Create an account</p>

        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(username);
          }} className="flex flex-col w-64">
          <label htmlFor="username" className="text-sm text-left mt-4" style={{ fontFamily: 'Jura' }}>Username:</label>
          <input
            id="username"
            className="mt-1 p-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            style={{ color: 'black', fontFamily: 'Jura' }}
            required
          />

          <label htmlFor="password" className="text-sm text-left mt-4" style={{ fontFamily: 'Jura' }}>Password:</label>
          <input
            id="password"
            className="mt-1 p-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ color: 'black', fontFamily: 'Jura' }}
            required
          />

          <label htmlFor="password" className="text-sm text-left mt-4" style={{ fontFamily: 'Jura' }}>Confirm password:</label>
          <input
            id="password"
            className="mt-1 p-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            type="password"
            value={password}
            placeholder="password again"
            onChange={(e) => setPassword(e.target.value)}
            style={{ color: 'black', fontFamily: 'Jura' }}
            required
          />

          <button
            type="submit"
            className="mt-4 p-2 rounded bg-black text-white hover:bg-gray-800"
            style={{ fontFamily: 'Jura' }}
          >
            Create account
          </button>
        </form>

        <p className="text-sm text-center mt-4" style={{ fontFamily: 'Jura' }}>
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in here</a>
        </p>
      </div>
    </Overlay>
  );
}
