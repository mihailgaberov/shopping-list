import "./App.css";
import { useOthers } from "./liveblocks.config";

function WhoIsHere() {
  const others = useOthers();

  return (
    <div className="who_is_here">
      There are {others.count} other users online
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <WhoIsHere />
    </div>
  );
}
