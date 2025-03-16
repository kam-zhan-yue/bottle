import { createFileRoute } from "@tanstack/react-router";
import TutorialComponent from "../components/TutorialComponent";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return <div className="p-2">
    <TutorialComponent />
  </div>;
}
