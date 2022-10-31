import Comment from './Comment';

const CommentSection = ({ comments, mainTweetId, userInfo }) => (
  <div className="commentSection shadow tweetsMargin">
    <div className="commentSection__header">
      <div className="commentSection__icon">
        <i className="far fa-comment-alt"></i>
      </div>
      <h3 className="heading-sm">
        {comments.length === 0 ? 'No Comments' : 'Comments'}
      </h3>
    </div>
    <div className="commentSection__comments">
      {comments.map((comment) => (
        <Comment
          mainTweetId={mainTweetId}
          tweet={comment}
          userInfo={userInfo}
          key={comment._id}
        />
      ))}
    </div>
  </div>
);

export default CommentSection;
