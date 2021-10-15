// in src/MyLayout.js
import { Layout } from "react-admin";
// import MyAppBar from "./MyAppBar";
// import MySidebar from "./MySidebar";
// import MyMenu from "./MyMenu";
// import MyNotification from "./MyNotification";

const MyAppBar = (props) => <div></div>;

const AdminLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

export default AdminLayout;
