import "../../styles/global.css";
import UserDashboard from "@/components/UserDashboard/UserDashboard";

export default function Users({ params }: { params: { user: string } }) {
  return <UserDashboard params={params} />;
}
