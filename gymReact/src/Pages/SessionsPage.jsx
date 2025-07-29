import AuthenticatedPageLayout from "../ReusableComponents/AuthenticatedPageLayout";
import SessionList from "../Display/SessionList";
import { useAuthentication } from "../Hooks/useAuthentication";

function SessionsPage() {
  useAuthentication();
  return (
    <AuthenticatedPageLayout title="Sessions">
      <div>
        <SessionList />
      </div>
    </AuthenticatedPageLayout>
  );
}

export default SessionsPage;