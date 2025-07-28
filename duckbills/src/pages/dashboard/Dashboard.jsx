import { useAuth } from "../../security/authContext";
import TopBar from '../../components/topbar/topbar';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <TopBar />
      <div className="p-8 bg-base-100 min-h-screen">
        <h1 className="text-3xl font-bold text-primary mb-4">Dashboard</h1>
        {user ? (
          <div>
            <p className="text-lg">
              Welcome, <span className="font-semibold">{user.username}</span>!
            </p>
          </div>
        ) : (
          <p className="text-base-content">Loading user...</p>
        )}
      </div>
    </>
  );
}
