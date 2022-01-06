import React from "react";
// import { useHistory } from "react-router-dom";
import SideNav from "./SideNav";
import MobileNav from "./MobileNav";
import { useSelector, useDispatch } from "react-redux";
import FollowRecommendation from "../components/FollowRecommendation";

import PreviewImage from "./PreviewImage";
import useEventListener from "../hooks/useEventListener";
import { changeTheme } from "../actions/uiActions";

const Layout = ({ children }) => {
  const preview = useSelector((state) => state.preview);
  const { previewSrc, previewType } = preview;

  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const dispatch = useDispatch();

  // let history = useHistory();

  useEventListener(
    "keydown",
    (e) => {
      const key = e.key;

      if (["textarea", "input"].includes(e.target.tagName.toLowerCase()))
        return;

      switch (key) {
        // case "h":
        //   history.push("/");
        //   break;
        // case "s":
        //   history.push("/search");
        //   break;
        // case "n":
        //   history.push("/notifications");
        //   break;
        // case "p":
        //   history.push("/profile/" + userInfo.username);
        //   break;
        case "d":
          dispatch(changeTheme(!darkMode));
          break;
        default:
          break;
      }
    },
    window
  );

  return (
    <>
      {previewSrc && <PreviewImage src={previewSrc} type={previewType} />}
      <SideNav />
      <MobileNav />
      {children}
      <section className="rightNav__wrapper">
        <div className="rightNav">
          <FollowRecommendation />

          <a
            href="https://github.com/SamipPoudel58/samiptter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <article className="rightNav__showcase">
              <p className="rightNav__showcaseIntro">
                This project is open-sourced on github.
              </p>
              <p className="rightNav__showcaseLink">Check it out &rarr;</p>
              <img
                className="rightNav__showcaseImage"
                src="/images/github.png"
                alt="github logo"
              />
            </article>
          </a>

          <a
            href="https://samippoudel.com.np"
            target="_blank"
            rel="noopener noreferrer"
          >
            <article className="rightNav__showcase rightNav__showcase-creator">
              <p className="rightNav__showcaseIntro rightNav__showcaseIntro-creator">
                Hi! I am Samip. Check out my other projects.
              </p>
              <p className="rightNav__showcaseLink rightNav__showcaseLink-creator">
                See More &rarr;
              </p>
              <img
                className="rightNav__showcaseImage rightNav__showcaseImage-creator"
                src="/images/profile.jpg"
                alt="profile logo"
              />
            </article>
          </a>
        </div>
      </section>
    </>
  );
};

export default Layout;
