export const calculateMonthInName = (number) => {
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i <= monthArr.length; i++) {
    if (number === monthArr[i]) {
      return monthArr[i];
    }
  }
};

export const calculateTime = (time) => {
  const splitTheTime = time.split(" ")[0].split(":");

  const hr = parseInt(splitTheTime[0]) % 12;
  const min = parseInt(splitTheTime[1]);
  const sec = parseInt(splitTheTime[2]);

  const hour = hr ? hr : 12;

  return `${hour}:${min}:${sec}`;
};

export const calculateDate = (dateAt) => {
  const dateArray = new Date(dateAt).toDateString().split(" ");

  let date = `${dateArray[2]}-${dateArray[1]}-${dateArray[3]}`;

  const number = new Date().getMonth();

  const monthInName = calculateMonthInName(number);

  if (new Date().toDateString() === new Date(dateAt).toDateString()) {
    date = "Today";
  } else if (
    new Date().getDate() - 1 === dateArray[2] &&
    monthInName === dateArray[1] &&
    new Date().getFullYear() === dateArray[3]
  ) {
    date = "Yesterday";
  }

  return date;
};

export const calculateJobsData = (data) => {
  const updatedData = data.map((job) => {
    return {
      id: job._id,
      title: job.title,
      rating: job.rating,
      companyLogoUrl: job.company_logo_url,
      location: job.location,
      jobDescription: job.job_description,
      employmentType: job.employment_type,
      packagePerAnnum: job.package_per_annum,
    };
  });

  return updatedData;
};

export const calculateJobData = (data) => {
  const jobsDetails = data[0].job_details;
  const similarJobsDetails = data[0].similar_jobs;
  const updatedObj = {
    id: jobsDetails.id,
    title: jobsDetails.title,
    rating: jobsDetails.rating,
    companyLogoUrl: jobsDetails.company_logo_url,
    companyWebsiteUlr: jobsDetails.company_website_url,
    location: jobsDetails.location,
    jobDescription: jobsDetails.job_description,
    lifeAtCompany: {
      description: jobsDetails.life_at_company.description,
      imageUrl: jobsDetails.life_at_company.image_url,
    },
    employmentType: jobsDetails.employment_type,
    packagePerAnnum: jobsDetails.package_per_annum,
    skills: jobsDetails.skills.map((item) => {
      return {
        name: item.name,
        imageUrl: item.image_url,
      };
    }),
    company: jobsDetails.company,
    similarJobs: similarJobsDetails.map((item) => {
      return {
        id: item.id,
        title: item.title,
        rating: item.rating,
        companyLogoUrl: item.company_logo_url,
        location: item.location,
        jobDescription: item.job_description,
        employmentType: item.employment_type,
      };
    }),
  };

  return updatedObj;
};

export const calculateActivityData = (data) => {
  const updatedData = data.map((item) => {
    const date = calculateDate(item.createdAt);

    return {
      createdAt: date,
      activity: item.activity.map((item) => {
        const time = calculateTime(item.time);
        return {
          id: item.id,
          jobId: item.job_id,
          role: item.role,
          company: item.company,
          companyLogoUrl: item.company_logo_url,
          time: time,
        };
      }),
    };
  });

  return updatedData;
};

export const getTheName = (name) => {
  return name.split(".").join(" ");
};

export const employmentTypeUpdatedList = (employmentList, id, active) => {
  const updatedList = employmentList.map((each) => {
    if (each.id === id) {
      return { ...each, isActive: !active };
    }
    return each;
  });

  return updatedList;
};

export const selectedEmploymentTypeList = (employmentList) => {
  const employmentTypeString = employmentList.reduce((arr, item) => {
    if (!item) arr = [];
    if (item.isActive === true) arr.push(item.id);
    return arr;
  }, []);

  return employmentTypeString;
};

export const compareJobWithActivityList = (activtyArray, jobObject) => {
  const activityList = activtyArray.reduce((arr, item) => {
    const jobId = item.activity.map((item) => {
      return item.jobId;
    });

    return [...arr, ...jobId];
  }, []);

  const isApplied = activityList.includes(jobObject.id);

  return isApplied;
};
