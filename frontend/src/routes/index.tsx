import { createFileRoute, Link } from "@tanstack/react-router";
import Overlay from "../components/Overlay";
import logo from "../assets/bottle.png";
import "../index.css";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Overlay>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img src={logo} alt="Logo" className="logo" />
          <h1
            className="mt-4 text-xl text-center leading-tight"
            style={{ fontFamily: "Tiny5" }}
          >
            MESSAGE IN A <br />
            BOTTLE...
          </h1>

          <Link to="/login">
            <button
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition"
              style={{ fontFamily: "PixelifySans" }}
            >
              Login
            </button>
          </Link>

          <Link
            to="/signup"
            className="mt-2 text-sm text-blue-600 underline hover:text-blue-700"
            style={{ fontFamily: "PixelifySans" }}
          >
            Create an account
          </Link>
        </div>
      </Overlay>
    </>
  );
}
