import Routers from "./components/Routers";
import { HideAuthProvider } from "./contexts/HideAuthContext";

function App() {
  return (
    <>
      <HideAuthProvider>
          <Routers />
      </HideAuthProvider>
    </>
  );
}

export default App;
