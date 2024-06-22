import React from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";
const JobContainer = () => {
  const { data } = useAllJobsContext();

  const { job, totalsJob, numberOfPage } = data;

  if (job.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalsJob} job{job.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {job.map((item) => {
          return <Job key={item._id} {...item} />;
        })}
      </div>
      {numberOfPage > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobContainer;
