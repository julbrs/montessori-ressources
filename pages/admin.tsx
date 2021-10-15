import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("../components/admin/dashboard"), {
  ssr: false,
});

const Admin = () => <Dashboard />;

export default Admin;
