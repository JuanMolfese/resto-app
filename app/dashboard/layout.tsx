import Sidebar from "../../components/Dashboard/Sidebar/sidebar";
import Navbar from "../../components/Dashboard/Navbar/navbar";

export default function Layout({children,}: 
  Readonly<{children: React.ReactNode;}>){
  return (
    <div className="flex">
      <div>
        <Sidebar/>
      </div>
      <div className="flex flex-col w-full">
        <div>
          <Navbar/>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
