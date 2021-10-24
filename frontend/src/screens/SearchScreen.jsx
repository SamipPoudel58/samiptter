import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTweets } from "../actions/tweetActions";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Tweet from "../components/Tweet";
import ProfileInfo from "../components/ProfileInfo";
import Head from "../components/Head";
import Layout from "../components/Layout";
import { TWEET_LIST_RESET } from "../constants/tweetConstants";
import { listUsers } from "../actions/userActions";
import { LIST_USERS_RESET } from "../constants/userConstants";

const SearchScreen = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [finalKeyword, setFinalKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("Posts");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetList = useSelector((state) => state.tweetList);
  let { loading, error, tweets } = tweetList;

  const userList = useSelector((state) => state.userList);
  let { users } = userList;

  useEffect(() => {
    return () => {
      dispatch({ type: TWEET_LIST_RESET });
      dispatch({ type: LIST_USERS_RESET });
      setKeyword("");
      setSubmitted(false);
      setFinalKeyword("");
    };
  }, [history, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword !== "") {
      setFinalKeyword(keyword);
      setSubmitted(true);

      dispatch(listTweets(keyword));

      dispatch(listUsers(keyword));
    }
  };
  return (
    <div className="searchScreen">
      <Head title="Search" />
      <Layout>
        <section className="newsFeed">
          <div className="searchScreen__searchbar">
            <form
              onSubmit={submitHandler}
              className="searchScreen__form shadow"
            >
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search here..."
                type="text"
                className="searchScreen__input"
              />
              <button className="searchScreen__button shadow" type="submit">
                <SearchIcon className="searchScreen__icon" />
              </button>
            </form>
          </div>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <div className="searchScreen__type border-b">
                <div
                  onClick={() => setActiveTab("Posts")}
                  className={`searchScreen__option ${
                    activeTab === "Posts" && "searchScreen__option-active"
                  }`}
                >
                  Posts
                </div>
                <div
                  onClick={() => setActiveTab("Users")}
                  className={`searchScreen__option ${
                    activeTab === "Users" && "searchScreen__option-active"
                  }`}
                >
                  Users
                </div>
              </div>

              {((tweets.length > 0 && activeTab === "Posts") ||
                (users.length > 0 && activeTab === "Users")) && (
                <p className="searchScreen__info">
                  Search Results for <span>{`" ${finalKeyword} "`}</span>
                </p>
              )}

              {((tweets.length === 0 && activeTab === "Posts") ||
                (users.length === 0 && activeTab === "Users")) &&
                submitted && (
                  <p className="searchScreen__info">
                    No Results for <span>{`" ${finalKeyword} "`}</span>
                  </p>
                )}

              {activeTab === "Users" && users && users.length > 0 && (
                <div className="searchScreen__userList shadow">
                  {users.map((user) => (
                    <div key={user._id}>
                      <ProfileInfo
                        image={user.image}
                        id={user._id}
                        name={user.name}
                        username={user.name}
                        isVerified={user.isVerified}
                        bio={user.bio}
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "Posts" &&
                tweets.map((tweet) => (
                  <div key={tweet._id} className="mb-2">
                    <Tweet userInfo={userInfo} tweet={tweet} />
                  </div>
                ))}
            </>
          )}
        </section>
      </Layout>
    </div>
  );
};

export default SearchScreen;
