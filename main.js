import { registerRootComponent } from 'expo';
import App from "./src/App"

function Application() {
  return <App />
}

registerRootComponent(Application);