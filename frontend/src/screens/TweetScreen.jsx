import React, { useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Tweet from "../components/Tweet";
import { useDispatch, useSelector } from "react-redux";
import { listTweetDetails } from "../actions/tweetActions";
import TweetComposer from "../components/TweetComposer";
import { TWEET_DETAILS_RESET } from "../constants/tweetConstants";
import Comment from "../components/Comment";
import Layout from "../components/Layout";
import TopBar from "../components/TopBar";
import Head from "../components/Head";

const TweetScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetDetails = useSelector((state) => state.tweetDetails);
  let { loading, error, tweet } = tweetDetails;

  const commentCreate = useSelector((state) => state.commentCreate);
  const { error: errorComment, success: successComment } = commentCreate;

  const commentDelete = useSelector((state) => state.commentDelete);
  const { error: errorDelete, success: successDelete } = commentDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listTweetDetails(match.params.id));
      if (successComment || successDelete) {
        dispatch(listTweetDetails(match.params.id));
      }
      // const socket = openSocket("/");
      // socket.on("tweets", (data) => {
      //   if (data.action === "comment") {
      //     dispatch(listTweetDetails(match.params.id));
      //   }
      // });
    }
    return () => {
      dispatch({ type: TWEET_DETAILS_RESET });
    };
  }, [dispatch, match, history, userInfo, successComment, successDelete]);

  return (
    <div className="tweetScreen">
      <Head title={`Post by ${tweet.user.name ? tweet.user.name : "user"}`} />
      <Layout>
        <section className="mainTweet middle-section">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <TopBar title="Post" />
              <div className="mt-2">
                <Tweet
                  userInfo={userInfo}
                  tweet={tweet}
                  rounded={true}
                  major={true}
                />
              </div>
              <div className="mt-2 mb-2">
                <TweetComposer tweet={tweet} buttonText="Comment" />
              </div>

              <div className="commentSection shadow">
                <div className="commentSection__header">
                  <div className="commentSection__icon">
                    <i className="far fa-comment-alt"></i>
                  </div>
                  <h3 className="heading-sm">
                    {tweet.comments.length === 0 ? "No Comments" : "Comments"}
                  </h3>
                </div>
                <div className="commentSection__comments">
                  {tweet.comments.map((comment) => (
                    <Comment
                      mainTweetId={tweet._id}
                      tweet={comment}
                      userInfo={userInfo}
                      key={comment._id}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </Layout>
    </div>
    // <>
    //   <Row>
    //     <Col>
    //       <SideNav />
    //     </Col>
    //     <Col className="newsFeed" md={6}>
    //       {loading ? (
    //         <Loader />
    //       ) : error ? (
    //         <Message variant="danger">{error}</Message>
    //       ) : (
    //         <>
    //           <Row className="p-3 u-line">
    //             <BackButton />
    //             <span className="ml-3 go-back-heading">Tweet</span>
    //           </Row>
    //           {errorComment && (
    //             <Message variant="danger">{errorComment}</Message>
    //           )}
    //           {errorDelete && <Message variant="danger">{errorDelete}</Message>}
    //           <Tweet userInfo={userInfo} tweet={tweet} />
    //           <TweetComposer tweet={tweet} buttonText="Comment" />
    //           <Row className="p-3 u-line">
    //             <i className="far fa-comment-alt"></i>
    //             <span className="ml-3 go-back-heading">Comments</span>
    //           </Row>
    //           {tweet.comments.map((comment) => (
    //             <Comment
    //               mainTweetId={tweet._id}
    //               tweet={comment}
    //               userInfo={userInfo}
    //               key={comment._id}
    //             />
    //           ))}
    //         </>
    //       )}
    //     </Col>
    //     <Col>
    //       <FollowRecommendation />
    //     </Col>
    //   </Row>
    // </>
  );
};

export default TweetScreen;
