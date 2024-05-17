import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchIcon from "@mui/icons-material/Search";
import "./Jobs.css";
import JobsItem from "./JobsItem/JobsItem";
import Checkbox from "./Checkbox/Checkbox";
import Radio from "./Radio/Radio";
import { ThreeDots } from "react-loader-spinner";
import {
  dispatchClearFilters,
  dispatchClearSearch,
  dispatchEmployment,
  dispatchJobs,
  dispatchNextPageJobs,
  dispatchSalary,
  dispatchSearch,
} from "../Store/Action/JobsAction";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { dispatchLogout } from "../Store/Action/AuthAction";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import BioCard from "./BioCard/BioCard";
import SomethingWentWrong from "./SomethingWentWrong/SomethingWentWrong";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  employmentTypeUpdatedList,
  selectedEmploymentTypeList,
} from "../Utils/Utils";

function Jobs() {
  const [employmentList, setEmploymentList] = useState([
    { id: "FULLTIME", title: "Full Time", isActive: false },
    { id: "PARTTIME", title: "Part Time", isActive: false },
    { id: "INTERNSHIP", title: "Internship", isActive: false },
    { id: "FREELANCE", title: "Freelance", isActive: false },
  ]);

  const [salaryList, setSalaryList] = useState([
    { id: "1000000", title: "10 LPA and above" },
    { id: "2000000", title: "20 LPA and above" },
    { id: "3000000", title: "30 LPA and above" },
    { id: "4000000", title: "40 LPA and above" },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    jobsList,
    isSuccess,
    totalPages,
    searchValue,
    salaryType,
    employmentType,
  } = useSelector((state) => state.jobs);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const [isClear, setIsClear] = useState(false);
  const [page, setPage] = useState(1);
  const [jobsArray, setJobsArray] = useState([]);
  const [noOfPages, setNofPages] = useState(0);

  const currentToken = Date.now() / 1000;

  const decodeToken = jwtDecode(token);

  useEffect(() => {
    setJobsArray(jobsList);
    setNofPages(totalPages);
  }, [jobsList]);

  useEffect(() => {
    getjobsList();
  }, [salaryType, employmentType, isClear]);

  useEffect(() => {
    document.title =
      window.location.pathname === "/Jobs" ? "Jobspot | Jobs" : "Jobspot";

    dispatch(dispatchClearFilters());
    getjobsList();
  }, []);

  const getjobsList = () => {
    dispatch(
      dispatchJobs(page, employmentType, salaryType, searchValue, token)
    );
    setPage(2);
  };

  const nextPageJobsList = () => {
    dispatch(
      dispatchNextPageJobs(page, employmentType, salaryType, searchValue, token)
    );
    setPage((page) => page + 1);
  };

  const handleEmploymentType = (id, active) => {
    const updatedList = employmentTypeUpdatedList(employmentList, id, active);
    setEmploymentList(updatedList);

    const employmentTypeString = selectedEmploymentTypeList(updatedList);

    dispatch(dispatchEmployment(employmentTypeString.join(",")));
    setPage(1);
  };

  const handleSearchValue = () => {
    if (searchValue !== "") {
      getjobsList();
    }
  };

  const handleOnChangeSearch = (e) => {
    dispatch(dispatchSearch(e.target.value));
    setPage(1);
  };

  const handleOnKeySearch = (e) => {
    if (e.key === "Enter" && searchValue !== "") {
      getjobsList();
    }
  };

  const handleSalaryType = (value) => {
    setPage(1);
    dispatch(dispatchSalary(value));
  };

  const handleClear = () => {
    setIsClear(!isClear);
    setPage(1);
    dispatch(dispatchClearSearch());
  };

  const onClickHandle = () => {
    getjobsList();
  };

  useEffect(() => {
    const expireToken = decodeToken.exp;

    if (currentToken > expireToken) {
      navigate("/sign-in");
      dispatch(dispatchLogout());
    }
  }, [decodeToken.exp, navigate]);

  return (
    <>
      <Header />
      <div className="jobs-containers">
        <div className="jobs-card">
          <div className="input-icon-cards">
            <input
              placeholder="Search"
              value={searchValue}
              onKeyUp={handleOnKeySearch}
              onChange={handleOnChangeSearch}
              type="text"
              className="input"
            />
            <div className="clear-card" onClick={handleClear}>
              {searchValue !== "" && <ClearIcon style={{ color: "#343434" }} />}
            </div>
            <div className="icon-cards">
              <SearchIcon
                onClick={handleSearchValue}
                style={{ color: "#ffffff" }}
              />
            </div>
          </div>
          <div className="jobs-filter-cards">
            <BioCard />
            <hr className="line" />
            <div className="filter-container">
              <h1 className="employment-title">Type of Employment</h1>
              <ul className="employment-list-cards">
                {employmentList.map((each) => (
                  <Checkbox
                    key={each.id}
                    employmentDetails={each}
                    handleEmploymentType={handleEmploymentType}
                  />
                ))}
              </ul>
            </div>
            <hr className="line" />
            <div className="filter-container">
              <h1 className="employment-title">Salary Range</h1>
              <ul className="employment-list-cards">
                {salaryList.map((each) => (
                  <Radio
                    key={each.id}
                    salaryDetails={each}
                    handleSalaryType={handleSalaryType}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-list-cards">
            <div className="input-icon-cards-medium">
              <input
                placeholder="Search"
                value={searchValue}
                onChange={handleOnChangeSearch}
                onKeyUp={handleOnKeySearch}
                type="text"
                className="input"
              />
              <div className="clear-card" onClick={handleClear}>
                {searchValue !== "" && (
                  <ClearIcon style={{ color: "#343434" }} />
                )}
              </div>
              <div className="icon-cards">
                <SearchIcon
                  onClick={handleSearchValue}
                  style={{ color: "#ffffff" }}
                />
              </div>
            </div>
            {isLoading && (
              <div className="loader-cards">
                <ThreeDots
                  visible={true}
                  height="40"
                  width="40"
                  color="#343434"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
            {!isLoading && isSuccess && (
              <>
                {jobsArray.length !== 0 ? (
                  <InfiniteScroll
                    dataLength={jobsArray.length || []}
                    next={nextPageJobsList}
                    hasMore={page <= noOfPages}
                    loader={
                      <div className="scroll-loader">
                        <ThreeDots
                          visible={true}
                          height="40"
                          width="40"
                          color="#343434"
                          radius="9"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                    }
                    endMessage={
                      <p className="scroll-end-msg">No more items to load</p>
                    }
                  >
                    <ul className="job-list-item-cards">
                      {jobsArray.map((eachJob) => (
                        <JobsItem key={eachJob.id} jobsItem={eachJob} />
                      ))}
                    </ul>
                  </InfiniteScroll>
                ) : (
                  <div className="no-search-container">
                    <img
                      className="no-search-image"
                      src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1710573529/File_searching-amico_vkckjg.png"
                      alt="not found"
                    />
                    <h1 className="no-search-title">No Jobs Found</h1>
                    <p className="no-search-para">
                      we could not find the jobs. Try other filters.
                    </p>
                  </div>
                )}
              </>
            )}
            {!isLoading && !isSuccess && (
              <SomethingWentWrong onClickHandle={onClickHandle} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobs;
