import React, { useEffect } from 'react';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Tweet from '../components/Tweet';
import { useDispatch, useSelector } from 'react-redux';
import { listTweetDetails } from '../actions/tweetActions';
import TweetComposer from '../components/TweetComposer';
import {
  EDIT_TWEET_RESET,
  TWEET_DETAILS_RESET,
} from '../constants/tweetConstants';
import Comment from '../components/Comment';
import Layout from '../components/Layout';
import TopBar from '../components/TopBar';
import Head from '../components/Head';
import toast from 'react-hot-toast';

const TweetScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetDetails = useSelector((state) => state.tweetDetails);
  let { loading, error, tweet } = tweetDetails;

  const commentCreate = useSelector((state) => state.commentCreate);
  const { success: successComment } = commentCreate;

  const commentDelete = useSelector((state) => state.commentDelete);
  const { success: successDelete } = commentDelete;

  const tweetEdit = useSelector((state) => state.tweetEdit);
  const { success: successTweetEdit } = tweetEdit;

  useEffect(() => {
    dispatch(listTweetDetails(match.params.id));

    if (successComment || successDelete) {
      dispatch(listTweetDetails(match.params.id));
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
    userInfo,
    successTweetEdit,
    successComment,
    successDelete,
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
              <div className="tweetsMargin">
                <TweetComposer tweet={tweet} buttonText="Comment" />
              </div>

              <div className="commentSection shadow tweetsMargin">
                <div className="commentSection__header">
                  <div className="commentSection__icon">
                    <i className="far fa-comment-alt"></i>
                  </div>
                  <h3 className="heading-sm">
                    {tweet.comments.length === 0 ? 'No Comments' : 'Comments'}
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
  );
};

export default TweetScreen;