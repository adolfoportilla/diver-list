import dynamic from "next/dynamic";

const App = dynamic(() => import("../components/admin_demo/App"), {
  ssr: false,
});

const Admin = () => {
  return <App />;
};

export default Admin;
