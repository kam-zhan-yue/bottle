import { createFileRoute, linkOptions, useNavigate } from "@tanstack/react-router";
import TutorialComponent from "../components/TutorialComponent";
import Overlay from "../components/Overlay";

export const Route = createFileRoute("/about")({
  component: About,
});

const gameLinkOption = linkOptions({
  to: "/game",
});
function About() {
  const navigate = useNavigate();

  const tutorialCompleted = () => {
    navigate(gameLinkOption);
  };

  return (
    <div className="p-2">
      <Overlay>
        <TutorialComponent onTutorialCompleted={tutorialCompleted}/>
      </Overlay>
    </div>
  );
}
