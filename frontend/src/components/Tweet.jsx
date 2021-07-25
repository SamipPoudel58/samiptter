import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTweet, likeTweet } from "../actions/tweetActions";
import { getUsername } from "../utils/getUsername";
import { getTimeFromNow } from "../utils/getTimeFromNow";

const Tweet = ({ tweet, userInfo, major, rounded = true, shadow = true }) => {
  const [like, setLike] = useState(tweet.isLiked);
  const [popup, setPopup] = useState(false);
  const [numLikes, setNumLikes] = useState(tweet.numLikes);

  const dispatch = useDispatch();
  const location = useLocation();
  let history = useHistory();

  const tweetDelete = useSelector((state) => state.tweetDelete);
  let { loading, success, error } = tweetDelete;

  useEffect(() => {
    setLike(tweet.isLiked);
    setNumLikes(tweet.numLikes);
  }, [tweet.isLiked, tweet.numLikes]);

  const likeHandler = () => {
    dispatch(likeTweet(tweet._id));
    setLike((prev) => !prev);
    like
      ? setNumLikes((prevNum) => prevNum - 1)
      : setNumLikes((prevNum) => prevNum + 1);
  };

  const tweetDeleteHandler = () => {
    console.log("delete button clicked");
    setPopup(false);
    dispatch(deleteTweet(tweet._id));
    if (location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <article
      className={`tweet ${shadow && "shadow"} ${rounded && "rounded-2"} ${
        major && "tweet-major"
      }`}
    >
      {popup && (
        <>
          <div
            onClick={() => setPopup(false)}
            className="tweet__backDrop"
          ></div>

          <div className="tweet__popup">
            <p onClick={tweetDeleteHandler} className="tweet__popOption">
              <i className="fas fa-trash-alt mr-1"></i>Delete
            </p>
          </div>
        </>
      )}

      <div className="tweet__profilePic">
        <img
          className="profile-image"
          src={tweet.user.image}
          alt={"profile picture of" + tweet.user.name}
        />
      </div>
      <div className="tweet__details">
        <section className="tweet__info">
          <Link
            to={
              userInfo._id === tweet.user._id
                ? "/profile"
                : `/profile/${tweet.user._id}`
            }
            className="tweet__username username-text"
          >
            {tweet.user.name}
          </Link>
          <p className="subtitle-text">
            {tweet.user.name && getUsername(tweet.user.name)}
          </p>
          <span className="subtitle-text">.</span>
          <span className="subtitle-text">
            {getTimeFromNow(tweet.createdAt)}
          </span>
          {(tweet.user._id === userInfo._id || userInfo.isAdmin) && (
            <i
              onClick={() => setPopup(true)}
              className="fas fa-ellipsis-h tweet__optionIcon"
            ></i>
          )}
        </section>
        <Link to={`/tweets/${tweet._id}`}>
          <section className="tweet__content">{tweet.tweetContent}</section>
        </Link>
        <section className="tweet__actions">
          <div className="tweet__like" onClick={likeHandler}>
            <i
              className={`tweet__actionIcon fs-18 ${
                like ? "fas fa-heart tweet__actionIcon-liked" : "far fa-heart"
              }`}
            ></i>
            <span>{numLikes}</span>
          </div>

          <Link to={`/tweets/${tweet._id}`} className="tweet__comment">
            <i className="tweet__actionIcon tweet__actionIcon-comment far fa-comment-alt"></i>
            <span>{tweet.numComments}</span>
          </Link>
        </section>
      </div>
    </article>
    // <Row className="py-2 tweet">
    //   {popup && (
    //     <div className="optionsPopup">
    //       <p
    //         onClick={tweetDeleteHandler}
    //         className="p-3 m-0 optionsPopup__delete"
    //       >
    //         <i className="fas fa-trash-alt"></i> Delete
    //       </p>
    //     </div>
    //   )}
    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     <>
    //       <Col className="pr-0 picture-col">
    //         <Image
    //           className="pr-0 profilePic"
    //           src={tweet.user.image}
    //           alt={tweet.user.name}
    //           fluid
    //         />
    //       </Col>
    //       <Col className="pl-0 pt-1" md={10}>
    //         <Row className="mb-1">
    //           <Link
    //             to={
    //               userInfo._id === tweet.user._id
    //                 ? "/profile"
    //                 : `/profile/${tweet.user._id}`
    //             }
    //             className="pl-0 font-weight-bold text-primary font-f-os"
    //           >
    //             {tweet.user.name}
    //           </Link>

    //           <span className="text-muted font-weight-bold mx-1 font-f-os">
    //             .
    //           </span>
    //           <span className="text-muted ml-1">
    //             {dayjs(tweet.createdAt).fromNow(true)}
    //           </span>
    //           {tweet.user._id === userInfo._id && popup ? (
    //             <svg
    //               onClick={() => setPopup((prevValue) => !prevValue)}
    //               viewBox="0 0 24 24"
    //               className="options-icon ml-auto r-13gxpu9 r-4qtqp9 r-yyyyoo r-1q142lx r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"
    //             >
    //               <g>
    //                 <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
    //               </g>
    //             </svg>
    //           ) : tweet.user._id === userInfo._id && !popup ? (
    //             <svg
    //               onClick={() => setPopup((prevValue) => !prevValue)}
    //               viewBox="0 0 24 24"
    //               className="options-icon ml-auto r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
    //             >
    //               <g>
    //                 <circle cx="5" cy="12" r="2"></circle>
    //                 <circle cx="12" cy="12" r="2"></circle>
    //                 <circle cx="19" cy="12" r="2"></circle>
    //               </g>
    //             </svg>
    //           ) : null}
    //         </Row>
    //         <Link className="tweetContent" to={`/tweets/${tweet._id}`}>
    //           <Row className="pr-3">{tweet.tweetContent}</Row>
    //         </Link>
    //         <Row className="mt-3">
    //           <Col
    //             onClick={likeHandler}
    //             className="pl-0 d-flex align-items-center likeButton"
    //           >
    //             <i
    //               className={`fs-18 ${like ? "fas fa-heart" : "far fa-heart"}`}
    //             ></i>

    //             <span className="fs-12 ml-2">{numLikes}</span>
    //           </Col>
    //           <Col className="pl-0 d-flex align-items-center commentButton">
    //             <Link className="tweetContent" to={`/tweets/${tweet._id}`}>
    //               <svg
    //                 viewBox="0 0 24 24"
    //                 className="comment-icon r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
    //               >
    //                 <g>
    //                   <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
    //                 </g>
    //               </svg>
    //               <span className="fs-12 ml-2">{tweet.numComments}</span>
    //             </Link>
    //           </Col>
    //         </Row>
    //       </Col>
    //     </>
    //   )}
    // </Row>
  );
};

export default Tweet;
