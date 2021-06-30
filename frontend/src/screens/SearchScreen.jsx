import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTweets } from "../actions/tweetActions";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Tweet from "../components/Tweet";
import Layout from "../components/Layout";
import { TWEET_LIST_RESET } from "../constants/tweetConstants";

const SearchScreen = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [finalKeyword, setFinalKeyword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetList = useSelector((state) => state.tweetList);
  let { loading, error, tweets } = tweetList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    return () => {
      dispatch({ type: TWEET_LIST_RESET });
      setKeyword("");
      setSubmitted(false);
      setFinalKeyword("");
    };
    // else {
    //   if (keyword !== "") {
    //     dispatch(listTweets(keyword));
    //   }
    // }
  }, [history, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword !== "") {
      setFinalKeyword(keyword);
      setSubmitted(true);
      dispatch(listTweets(keyword));
    }
  };
  return (
    <div className="searchScreen">
      <Layout>
        <section className="middle-section">
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
              {tweets.length > 0 && (
                <p className="searchScreen__info">
                  Search Results for <span>{`" ${finalKeyword} "`}</span>
                </p>
              )}

              {tweets.length === 0 && submitted && (
                <p className="searchScreen__info">
                  No Results for <span>{`" ${finalKeyword} "`}</span>
                </p>
              )}

              {tweets.map((tweet) => (
                <div key={tweet._id} className="mb-2">
                  <Tweet userInfo={userInfo} tweet={tweet} />
                </div>
              ))}
            </>
          )}
        </section>
      </Layout>
    </div>
    // <Row>
    //   <Col>
    //     <SideNav />
    //   </Col>
    //   <Col className="newsFeed" md={6}>
    //     <Row className="p-3 u-line d-flex align-items-center">
    //       <BackButton />
    //       <form
    //         onSubmit={submitHandler}
    //         className="searchScreen__searchbar ml-3"
    //       >
    //         <i className="fas fa-search"></i>
    //         <input
    //           value={keyword}
    //           onChange={(e) => setKeyword(e.target.value)}
    //           className="searchScreen__searchbar-input"
    //           type="text"
    //         />
    //       </form>
    //     </Row>
    //     {loading ? (
    //       <Loader />
    //     ) : error ? (
    //       <Message variant="danger">{error}</Message>
    //     ) : (
    //       <>
    // {tweets.length > 0 && (
    //   <Row className="p-3 u-line">
    //     Search Result for
    //     <strong className="ml-2 font-weight-bold my-font">{`"${finalKeyword}"`}</strong>
    //   </Row>
    // )}
    //         {tweets.length === 0 && submitted && (
    //           <Row className="p-3 u-line">
    //             No results for
    //             <strong className="ml-2 font-weight-bold my-font">{`"${keyword}"`}</strong>
    //           </Row>
    //         )}
    //         {tweets.map((tweet) => (
    //           <Tweet userInfo={userInfo} tweet={tweet} key={tweet._id} />
    //         ))}
    //       </>
    //     )}
    //   </Col>
    //   <Col>
    //     <FollowRecommendation />
    //   </Col>
    // </Row>
  );
};

export default SearchScreen;
