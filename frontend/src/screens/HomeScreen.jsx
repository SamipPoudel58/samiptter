import React, { useCallback, useEffect, useRef, useState } from 'react';
import openSocket from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { listTweets } from '../actions/tweetActions';
import {
  CREATE_TWEET_RESET,
  DELETE_TWEET_RESET,
  TWEET_LIST_RESET,
} from '../constants/tweetConstants';
import Layout from '../components/Layout';
import Message from '../components/Message';
import TweetComposer from '../components/TweetComposer';
import Tweet from '../components/Tweet';
import Head from '../components/Head';
import toast from 'react-hot-toast';
import { ReactComponent as CircleTick } from '../assets/circle-tick.svg';
import TweetSkeleton from '../components/skeletons/TweetSkeleton';

const HomeScreen = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetList = useSelector((state) => state.tweetList);
  let { loading, error, success, tweets, pages } = tweetList;

  const tweetCreate = useSelector((state) => state.tweetCreate);
  let { success: successTweetCreate } = tweetCreate;

  const tweetDelete = useSelector((state) => state.tweetDelete);
  let { success: successDelete } = tweetDelete;

  useEffect(() => {
    if (tweets.length === 0) {
      dispatch(listTweets('', pageNumber));
    }

    if (successDelete) {
      dispatch({ type: TWEET_LIST_RESET });
      toast.success('Post Deleted Successfully.');
    }

    if (successTweetCreate) {
      toast.success('Post Created Successfully.');
    }

    // const socket = openSocket('/');
    // socket.on('tweets', (data) => {
    //   if (data.action === 'create') {
    //     dispatch(listTweets());
    //   }
    // });

    return () => {
      dispatch({ type: DELETE_TWEET_RESET });
      dispatch({ type: CREATE_TWEET_RESET });
    };
  }, [dispatch, successDelete, successTweetCreate]);

  const observer = useRef();
  const lastTweetRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageNumber < pages) {
          dispatch(listTweets('', pageNumber + 1));
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, pages]
  );

  return (
    <div className="homeScreen">
      <Head title="Home" />
      <Layout>
        <section className="newsFeed">
          <TweetComposer buttonText="Post" />
          {tweets?.length === 0 && success && (
            <p className="tweets-empty">No Tweets Found</p>
          )}
          {userInfo &&
            tweets.map((tweet, idx) =>
              idx === tweets.length - 1 ? (
                <div
                  ref={lastTweetRef}
                  className="tweetsMargin"
                  key={tweet._id}
                >
                  <Tweet userInfo={userInfo} tweet={tweet} key={tweet._id} />
                </div>
              ) : (
                <div className="tweetsMargin" key={tweet._id}>
                  <Tweet userInfo={userInfo} tweet={tweet} key={tweet._id} />
                </div>
              )
            )}
          {loading &&
            tweets.length === 0 &&
            [1, 2, 3, 4].map((num) => <TweetSkeleton key={num} />)}
          {loading && (
            <>
              <TweetSkeleton />
              {/* <Loader /> */}
            </>
          )}
          {error && <Message variant="danger">{error}</Message>}
          {!loading && pageNumber === pages && (
            <div className="homeScreen__tweetsEnd">
              <CircleTick className="circle-tick-icon" />
              <p>You are all caught up!</p>
            </div>
          )}
        </section>
      </Layout>
    </div>
  );
};

export default HomeScreen;
