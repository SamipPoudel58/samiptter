import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../actions/dashboardActions";
import Card from "../components/Card";
import Head from "../components/Head";
import Layout from "../components/Layout";
import ProfileInfo from "../components/ProfileInfo";

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getDashboardData = useSelector((state) => state.getDashboard);
  let { userCount, tweetCount, latestUsers } = getDashboardData;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(getDashboard());
    }
  }, [dispatch, history, userInfo]);
  return (
    <div className="dashboardScreen">
      <Head title="Dashboard" />
      <Layout>
        <section className="newsFeed">
          <h1 className="heading-lg">Hello {userInfo.name.split(" ")[0]}!</h1>

          <div className="dashboard__summaries mt-2">
            <Card icon="fas fa-users" detail="Total Users" number={userCount} />
            <Card
              icon="fas fa-quote-left"
              detail="Total Posts"
              number={tweetCount}
            />
          </div>

          <div className="dashboard__recentUsers mt-3 shadow">
            <h3 className="heading-sm">Recently Joined</h3>
            <div className="dashboard__recentUsersList mt-2">
              {latestUsers?.map((user) => (
                <div className="mb-1" key={user._id}>
                  <ProfileInfo
                    image={user.image}
                    id={user._id}
                    name={user.name}
                    username={user.name}
                    email={user.email}
                    isVerified={user.isVerified}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default DashboardScreen;
