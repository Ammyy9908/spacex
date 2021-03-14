import React, { useEffect, useState } from "react";
import "../index.css";
import Card from "./Card";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

function HomeFilter({ query }) {
  const {
    limit,
    launchquery,
    lyear,
    // eslint-disable-next-line
    landquery,
  } = query;
  console.log(launchquery);

  const [data, setData] = useState(null);
  console.log(data && data);
  useEffect(
    () => {
      async function getData() {
        try {
          const r = await axios.get(
            `https://api.spacexdata.com/v3/launches?${`limit=${limit}`}`
          );
          if (r.status === 200) {
            return r.data;
          }
        } catch (e) {
          if (e.response && e.response.data) {
            console.log(e.response.data);
          }
        }
      }
      getData().then((data) => {
        if (data) {
          let newData = data.filter((item) =>
            lyear === "2020"
              ? item.launch_year === "2020"
              : item.launch_year === lyear
          );
          newData = newData.filter((item) => {
            return launchquery === false
              ? item.launch_success !== false
              : item.launch_success === true;
          });
          setData(newData);
        }
      });
    },
    // eslint-disable-next-line
    [query]
  );
  const items = [
    2006,
    2007,
    2008,
    2010,
    2011,
    2012,
    2014,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
  ];
  return (
    <div className="container">
      <>
        {data ? (
          <>
            <h1>SpaceX Launch Programs</h1>
            <div className="content">
              <div className="sidenav__filters">
                <h1> Filters</h1>
                <div className="filter__card">
                  <p>Launch Year</p>
                  <div className="years__buttons">
                    {items.map((item, index) => {
                      return (
                        <Link
                          to={`/launches/limit=100/launch_success=true/land_success=false/launch_year=${item}`}
                          className="button__filter"
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                  <hr />
                  <p>Successfull Launch</p>
                  <div className="launch__buttons">
                    <Link
                      to="/launches/limit=100/launch_success=true/land_success=false/launch_year=2020"
                      className="button__filter"
                    >
                      True
                    </Link>
                    <Link
                      to="/launches/limit=100/launch_success=false/land_success=false/launch_year=2020"
                      className="button__filter"
                    >
                      False
                    </Link>
                  </div>
                  <hr />
                  <p>Successfull Landing</p>
                  <div className="land__buttons">
                    <Link
                      to="/launches/limit=100/launch_success=true/land_success=true/launch_year=2020"
                      className="button__filter"
                    >
                      True
                    </Link>
                    <Link
                      to="/launches/limit=100/launch_success=false/land_success=false/launch_year=2020"
                      className="button__filter"
                    >
                      False
                    </Link>
                  </div>
                </div>
              </div>
              <div className="programs__cards">
                {data.map((item, index) => {
                  return (
                    <Card
                      filght_name={item.mission_name}
                      flight_number={item.flight_number}
                      img={item.links.mission_patch}
                      year={item.launch_year}
                      mission_ids={item.mission_id}
                      launch={item.launch_success}
                    />
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <LinearProgress color="primary" />
        )}
      </>
    </div>
  );
}

export default HomeFilter;
