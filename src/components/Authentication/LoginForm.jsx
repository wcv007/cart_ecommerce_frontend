import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginForm.css";
import { getUser, logIn } from "../../services/userServices";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Please enter valid email" }).min(3),
  password: z
    .string()
    .min(8, { message: "Pls enter atleast 8 character password" }),
});

const LoginForm = () => {
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  console.log(errors);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (formData) => {
    console.log(formData);
    setFormError("");
    try {
      const { data } = await logIn(formData);
      localStorage.setItem("token", data?.token);
      //  navigate("/");
      const { state } = location;
      window.location = state ? state.redirect : "/";
    } catch (err) {
      if (err.response && err.response.status) {
        console.log(err.response);
        setFormError(err.response.data.message);
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="login_form_wrapper align_center">
      <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login_heading">Login Form</h1>
        <div className="input_wrapper">
          <label className="form_label" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            name="email"
            {...register("email")}
            id="email"
            placeholder="Enter your email"
            className="form_input"
          ></input>
          {errors.email && (
            <em className="form_error_name">{errors.email.message}</em>
          )}
        </div>
        <div className="input_wrapper">
          <label className="form_label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="form_input"
            {...register("password")}
          ></input>
          {errors.password && (
            <em className="form_error_name">{errors.password.message}</em>
          )}
        </div>
        {formError && <em className="form_error">{formError}</em>}
        <button className="form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
