import {
  createFileRoute,
  linkOptions,
  useNavigate,
} from "@tanstack/react-router";
import TutorialComponent from "../components/TutorialComponent";

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

  return <TutorialComponent onTutorialCompleted={tutorialCompleted} />;
}
