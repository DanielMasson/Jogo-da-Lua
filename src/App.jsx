import JogoDaLua from "./JogoDaLua";
import { AudioProvider } from "./context/AudioProvider";

export default function App() {
  return (
    <AudioProvider>
      <JogoDaLua />
    </AudioProvider>
  );
}
