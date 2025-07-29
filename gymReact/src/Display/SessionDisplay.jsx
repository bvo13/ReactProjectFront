import { useAuthentication } from "../Hooks/useAuthentication";
import Session from "./Session";
function SessionDisplay() {
  useAuthentication();
  return <Session />;
}
export default SessionDisplay