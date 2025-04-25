import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import Rocket from "../../assets/rocket.png";
import GlowingStar from "../../assets/glowing-star.png";
import Package from "../../assets/package.png";
import Locked from "../../assets/locked.png";
import IdButton from "../../assets/id-button.png";
import Memo from "../../assets/memo.png";
import LinkWithIcon from "./LinkWithIcon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { autoSuggestion } from "../../services/searchServices";

const Navbar = ({ cartLength }) => {
  const user = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [autoSuggestions, setAutoSuggestions] = useState([]);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setAutoSuggestions([]);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim() !== "") {
        autoSuggestion(search)
          .then((res) => setAutoSuggestions(res?.data))
          .catch((err) => setAutoSuggestions([]));
      } else {
        setAutoSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <nav className="navbar align_center">
      <div className="navbar_left_wrapper align_center">
        <h1 className="navbar_heading">Cartwish</h1>
        <form className="navbar_form align_center" onSubmit={onSubmit}>
          <input
            className="navbar_input"
            type="search"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button className="navbar_search" type="submit">
            Search
          </button>
          <ul className="auto_suggestion_wrapper">
            {autoSuggestions.length > 0 &&
              autoSuggestions.map((element, index) => (
                <li className="auto_suggestion_result" key={index}>
                  <Link
                    to={`/products?search=${element.title}`}
                    onClick={() => {
                      setAutoSuggestions([]);
                      setSearch("");
                    }}
                  >
                    {element.title}
                  </Link>
                </li>
              ))}
          </ul>
        </form>
      </div>
      <div className="align_center navbar_links_wrapper">
        <LinkWithIcon link="/" title="Home" icon={Rocket}></LinkWithIcon>
        <LinkWithIcon
          link="/products"
          title="Products"
          icon={GlowingStar}
        ></LinkWithIcon>
        {!user && (
          <>
            <LinkWithIcon
              link="/login"
              title="Log In"
              icon={IdButton}
            ></LinkWithIcon>
            <LinkWithIcon
              link="/signup"
              title="Sign Up"
              icon={Memo}
            ></LinkWithIcon>
          </>
        )}
        {user && (
          <>
            <LinkWithIcon
              link="myorders"
              title="My Orders"
              icon={Package}
            ></LinkWithIcon>
            <LinkWithIcon
              link="/logout"
              title="Logout"
              icon={Locked}
            ></LinkWithIcon>
            <NavLink to="/cart" className="align_center cart_link">
              Cart<span className="align_center cart_count">{cartLength}</span>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
