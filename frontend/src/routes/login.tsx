import {
  createFileRoute,
  linkOptions,
  useNavigate,
} from "@tanstack/react-router";
import Overlay from "../components/Overlay";
import { useContext, useState } from "react";
import { GameContext, GameContextType } from "../game/GameContext";

export const Route = createFileRoute("/login")({
  component: Login,
});

const gameLinkOption = linkOptions({
  to: "/game",
});

function Login() {
  const { setUser } = useContext(GameContext) as GameContextType;
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = (username: string) => {
    console.log("Submitted username:", username);
    setUser(username);
    navigate(gameLinkOption);
  };

  return (
    <Overlay>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1>Welcome</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(username);
          }}
        >
          <input
            className="border p-2"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="mt-2 p-2 bg-blue-500 text-white cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </Overlay>
  );
}
