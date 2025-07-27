import AuthenticatedPageLayout from "../ReusableComponents/AuthenticatedPageLayout";
import SessionList from "../Display/SessionList";

function SessionsPage() {
  return (
    <AuthenticatedPageLayout title="Sessions">
      <div>
        <SessionList />
      </div>
    </AuthenticatedPageLayout>
  );
}

export default SessionsPage;