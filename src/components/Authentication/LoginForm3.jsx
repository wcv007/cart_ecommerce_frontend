import React, { useRef, useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  //   const nameRef = useRef(null);
  //   const phoneRef = useRef(null);
  const [user, setUser] = useState({ name: "", phone: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    // const user = {
    //   name: nameRef.current.value || "",
    //   phone: parseInt(phoneRef.current.value) || "",
    // };
    console.log(user);
  };
  return (
    <section className="login_form_wrapper align_center">
      <form className="login_form" onSubmit={handleSubmit}>
        <h1 className="login_heading">Login Form</h1>
        <div className="input_wrapper">
          <label className="form_label" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            name="user"
            // ref={nameRef}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            id="name"
            placeholder="Enter your name"
            className="form_input"
            value={user.name}
          ></input>
        </div>
        <div className="input_wrapper">
          <label className="form_label" htmlFor="phone">
            Phone Number:
          </label>
          <input
            type="text"
            // ref={phoneRef}
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            className="form_input"
            onChange={(e) =>
              setUser({ ...user, phone: parseInt(e.target.value) })
            }
            value={user.phone}
          ></input>
          {/* <button
            type="button"
            onClick={() => {
              console.log(passwordRef);
              passwordRef.current.type = "password";
            }}
          >
            Hide Password
          </button>
          <button
            type="button"
            onClick={() => (passwordRef.current.type = "text")}
          >
            Show Password
          </button> */}
        </div>
        <button className="form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
