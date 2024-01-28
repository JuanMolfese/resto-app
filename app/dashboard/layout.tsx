import Sidebar from "../../components/Dashboard/Sidebar/sidebar";
import Navbar from "../../components/Dashboard/Navbar/navbar";

export default function Layout({children,}: 
  Readonly<{children: React.ReactNode;}>){
  return (
    <div>
      <div>
        <Sidebar/>
      </div>
      <div>
        <Navbar/>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
