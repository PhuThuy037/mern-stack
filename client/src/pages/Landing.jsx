import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";

import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error
            minus molestiae ullam veritatis quibusdam, minima vitae, architecto
            amet voluptates alias distinctio reprehenderit cupiditate
            necessitatibus! Quam, nihil quod? Repellat, mollitia iusto.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/register" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
