import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { listTweetDetails } from '../actions/tweetActions';
import CommentSection from '../components/CommentSection';
import GuestNotice from '../components/GuestNotice';
import Head from '../components/Head';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Message from '../components/Message';
import TopBar from '../components/TopBar';
import Tweet from '../components/Tweet';
import TweetComposer from '../components/TweetComposer';
import {
  EDIT_TWEET_RESET,
  TWEET_DETAILS_RESET,
} from '../constants/tweetConstants';

const TweetScreen = ({ match }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetDetails = useSelector((state) => state.tweetDetails);
  let { loading, error, tweet } = tweetDetails;

  const commentCreate = useSelector((state) => state.commentCreate);
  const { success: successComment, error: errorComment } = commentCreate;

  const commentDelete = useSelector((state) => state.commentDelete);
  const { success: successDelete } = commentDelete;

  const tweetEdit = useSelector((state) => state.tweetEdit);
  const { success: successTweetEdit } = tweetEdit;

  useEffect(() => {
    dispatch(listTweetDetails(match.params.id));

    if (successComment || successDelete) {
      dispatch(listTweetDetails(match.params.id));
    }

    if (errorComment) {
      toast.error('Failed to comment on the post. ' + errorComment);
    }

    if (successTweetEdit) {
      toast.success('Tweet edited successfully');
      dispatch({ type: EDIT_TWEET_RESET });
    }

    return () => {
      dispatch({ type: TWEET_DETAILS_RESET });
    };
  }, [
    dispatch,
    match.params.id,
    successTweetEdit,
    successComment,
    successDelete,
    errorComment,
  ]);

  return (
    <div className="tweetScreen">
      <Head
        title={`Post by ${
          tweet && tweet.user && tweet.user.name ? tweet.user.name : 'user'
        }`}
      />
      <Layout>
        <section className="mainTweet newsFeed">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">Post not found :(</Message>
          ) : (
            <>
              <TopBar title="Post" />
              <div className="tweetsMargin">
                <Tweet
                  userInfo={userInfo}
                  tweet={tweet}
                  rounded={true}
                  major={true}
                />
              </div>
              {userInfo.isGuest ? (
                <GuestNotice />
              ) : (
                <div className="tweetsMargin">
                  <TweetComposer tweet={tweet} buttonText="Comment" />
                </div>
              )}

              <CommentSection
                comments={tweet.comments}
                mainTweetId={tweet._id}
                userInfo={userInfo}
              />
            </>
          )}
        </section>
      </Layout>
    </div>
  );
};

export default TweetScreen;
