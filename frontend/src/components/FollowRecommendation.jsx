import React, { useEffect } from "react";
import { recommendUsers } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";

const FollowRecommendation = () => {
  const dispatch = useDispatch();

  const getRecommendedUsers = useSelector((state) => state.getRecommendedUsers);
  let {
    loading: loadingRecommended,
    error: errorRecommended,
    users: usersRecommended,
  } = getRecommendedUsers;

  console.log(usersRecommended);

  useEffect(() => {
    dispatch(recommendUsers());
  }, [dispatch]);
  return (
    <section className="followRecommendation">
      <div className="followRecommendation__topRow mb-2">
        <h3 className="heading-sm">Suggestions</h3>
        <a href="/" className="minor-link">
          Show More
        </a>
      </div>
      <div className="followRecommendation__userList">
        {loadingRecommended ? (
          <Loader />
        ) : errorRecommended ? (
          <Message variant="danger">{errorRecommended}</Message>
        ) : (
          usersRecommended.map((user) => (
            <article className="followRecommendation__user mb-1" key={user._id}>
              <ProfileInfo
                name={user.name}
                username={user.name}
                image={user.image}
                id={user._id}
                isAdmin={user.isAdmin}
              />
              <Link to={`/profile/${user._id}`} className="primary-btn">
                Follow
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
    // <>
    //   <Row className="py-3 u-line">
    //     <p className="m-0 font-weight-bold my-font text-center w-100">
    //       Who To Follow
    //     </p>
    //   </Row>
    //   {loadingRecommended ? (
    //     <Loader />
    //   ) : errorRecommended ? (
    //     <Message variant="danger">{errorRecommended}</Message>
    //   ) : (
    //     usersRecommended.map((user) => (
    //       <Row className="py-2" key={user._id}>
    //         <Col className="pr-0 picture-col-recommended">
    //           <Image
    //             className="pr-0 profilePic"
    //             src={user.image}
    //             alt={user.name}
    //             fluid
    //           />
    //         </Col>
    //         <Col className="pl-0 pt-1">
    //           <Link
    //             to={`/profile/${user._id}`}
    //             className="pl-0 font-weight-bold text-primary font-f-os"
    //           >
    //             {user.name}
    //           </Link>
    //         </Col>
    //         <Col>
    //           <Row className="pr-2">
    //             <Link
    //               to={`/profile/${user._id}`}
    //               className="recommendedFollowButton ml-auto"
    //             >
    //               Follow
    //             </Link>
    //           </Row>
    //         </Col>
    //       </Row>
    //     ))
    //   )}
    // </>
  );
};

export default FollowRecommendation;
