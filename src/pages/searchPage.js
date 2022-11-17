import React, {useState, useEffect} from "react";
import SiteHeader from "../components/siteHeader";
import { useNavigate } from "react-router-dom";
import SearchForm from "../components/searchForm";



const SearchPage = (props) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    if (loggedIn) {
      const foundUser = JSON.parse(loggedIn);
      setUser(foundUser);
    }
    else navigate("/login");
  }, [navigate]);

  
  return (
    <>
    <SiteHeader/>
    <SearchForm/>
    </>
);
};
export default SearchPage;