import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginForm.css";

const LoginForm = () => {
  const [user, setUser] = useState({ name: "", phone: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  return (
    <section className="login_form_wrapper align_center">
      <form
        className="login_form"
        onSubmit={handleSubmit((formData) => console.log(formData))}
      >
        <h1 className="login_heading">Login Form</h1>
        <div className="input_wrapper">
          <label className="form_label" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            name="user"
            {...register("name", { required: true, minLength: 3 })}
            id="name"
            placeholder="Enter your name"
            className="form_input"
          ></input>
          {errors?.name?.type === "minLength" && (
            <em className="form_error_name">
              Name should be 3 or more characters long
            </em>
          )}
          {errors?.name?.type === "required" && (
            <em className="form_error_name">Please enter your name</em>
          )}
        </div>
        <div className="input_wrapper">
          <label className="form_label" htmlFor="phone">
            Phone Number:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            className="form_input"
            {...register("phone", { valueAsNumber: true })}
          ></input>
        </div>
        <button className="form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
