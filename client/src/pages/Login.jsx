import React from "react";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { FormRow, Logo, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const Login = () => {
  const navigate = useNavigate();
  const loginDemo = async () => {
    const data = {
      email: "test@test.com",
      password: "123456",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("login demo successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="becta@gmail.com" />
        <FormRow type="password" name="password" defaultValue="123456" />
        <SubmitBtn formBtn />
        <button type="button" className="btn btn-block" onClick={loginDemo}>
          explore the app
        </button>
        <p>
          Not a member yet ?
          <Link to="/register" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
