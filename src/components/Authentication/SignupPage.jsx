import "./SignupPage.css";
import { useState } from "react";
import user from "../../assets/user.webp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getUser, signUp } from "../../services/userServices";
import { Navigate, useNavigate } from "react-router-dom";

const schema = z
  .object({
    name: z.string().min(3),
    password: z.string().min(8),
    email: z.string().email(),
    cpassword: z.string().min(8),
    address: z
      .string()
      .min(15, { message: "Address should be atleast 15 characters long" }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Confirm Password does not match Password",
    path: ["cpassword"],
  });
const SignupPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  // console.log(errors);
  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const { data } = await signUp(formData, profilePic);
      localStorage.setItem("token", data.token);
      // navigate("/");
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err.response);
        setFormError(err.response.data.message);
      }
    }
  };
  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>

        <div className="image_input_section ">
          <div className="image_preview align">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            id="file-ip-1"
            className="image_input"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>

        {/* Form Inputs */}
        <div className="form_inputs signup_form_input ">
          <div className="align">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <em className="form_error_name">{errors.name.message}</em>
            )}
          </div>

          <div className="align">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error_name">{errors.email.message}</em>
            )}
          </div>

          <div className="align">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error_name">{errors.password.message}</em>
            )}
          </div>

          <div className="align">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
              {...register("cpassword")}
            />
            {errors.cpassword && (
              <em className="form_error_name">{errors.cpassword.message}</em>
            )}
          </div>

          <div className="signup_textares_section align">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              type="text"
              className="input_textarea"
              placeholder="Enter delivery address"
              {...register("address")}
            />
            {errors.address && (
              <em className="form_error_name">{errors.address.message}</em>
            )}
          </div>
        </div>
        {formError && <em className="form_error">{formError}</em>}
        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
