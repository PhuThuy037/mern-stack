import React from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
const JobContainer = () => {
  const { job } = useAllJobsContext();

  if (job.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {job.map((item) => {
          return <Job key={item._id} {...item} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobContainer;
