import Header from "../Header";
import { Outlet } from "react-router-dom";
import { useState, useNavigator } from "react";

export default function Layout() {
  const [searchTerm, setSearchTerm] = useState("");
 
  const onSearch = (term) => {
    setSearchTerm(term);
  };

  


  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearch={onSearch}
       
      />
      <Outlet context={searchTerm} />
    </>
  );
}
