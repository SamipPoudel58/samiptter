import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTweets } from '../actions/tweetActions';
import { listUsers } from '../actions/userActions';
import Head from '../components/Head';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProfileInfo from '../components/ProfileInfo';
import SearchBar from '../components/SearchBar';
import Tweet from '../components/Tweet';
import { TWEET_LIST_RESET } from '../constants/tweetConstants';
import { LIST_USERS_RESET } from '../constants/userConstants';

const SearchScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [finalKeyword, setFinalKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('Posts');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetList = useSelector((state) => state.tweetList);
  let { loading, error, tweets } = tweetList;

  const userList = useSelector((state) => state.userList);
  let { users } = userList;

  useEffect(() => {
    return () => {
      dispatch({ type: LIST_USERS_RESET });
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword !== '') {
      dispatch({ type: TWEET_LIST_RESET });
      dispatch(listTweets(keyword));
      dispatch(listUsers(keyword));
      setFinalKeyword(keyword);
      setSubmitted(true);
    }
  };
  return (
    <div className="searchScreen">
      <Head title="Search" />
      <Layout>
        <section className="newsFeed">
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            submitHandler={submitHandler}
          />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <div className="searchScreen__type border-b">
                <div
                  onClick={() => setActiveTab('Posts')}
                  className={`searchScreen__option ${
                    activeTab === 'Posts' && 'searchScreen__option-active'
                  }`}
                >
                  Posts
                </div>
                <div
                  onClick={() => setActiveTab('Users')}
                  className={`searchScreen__option ${
                    activeTab === 'Users' && 'searchScreen__option-active'
                  }`}
                >
                  Users
                </div>
              </div>

              {((tweets.length > 0 && activeTab === 'Posts') ||
                (users.length > 0 && activeTab === 'Users')) &&
                keyword &&
                submitted && (
                  <p className="searchScreen__info">
                    Search Results for <span>{`" ${finalKeyword} "`}</span>
                  </p>
                )}

              {((tweets.length === 0 && activeTab === 'Posts') ||
                (users.length === 0 && activeTab === 'Users')) &&
                submitted &&
                keyword && (
                  <p className="searchScreen__info">
                    No Results for <span>{`" ${finalKeyword} "`}</span>
                  </p>
                )}

              {activeTab === 'Users' &&
                keyword &&
                submitted &&
                users &&
                users.length > 0 && (
                  <div className="searchScreen__userList shadow">
                    {users.map((user) => (
                      <div key={user._id}>
                        <ProfileInfo
                          image={user.image}
                          id={user._id}
                          name={user.name}
                          username={user.username}
                          isVerified={user.isVerified}
                          bio={user.bio}
                        />
                      </div>
                    ))}
                  </div>
                )}

              {activeTab === 'Posts' &&
                keyword &&
                submitted &&
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
