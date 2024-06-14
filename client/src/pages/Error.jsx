import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";
const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! page not found</h3>
          <p>We cant seem to find the page you are looking for</p>
          <Link to="/dashboard">Back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h1>Some thing went wrong</h1>
    </Wrapper>
  );
};

export default Error;
