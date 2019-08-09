import "./styles.css";

import { FaEye, FaEyeSlash, FaTrashAlt } from "react-icons/fa";
import React, { PureComponent } from "react";
import UserContext, { UserConsumer } from "../../contexts/UserContext";

import ApiService from "../../utils/ApiService";
import { withRouter } from "react-router-dom";

@withRouter
class Post extends PureComponent {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      post: {},
      loading: true,
      showComments: false,
      comments: [],
      commentsLoading: true
    };
  }

  componentDidMount() {
    const {
      history,
      match: {
        params: { postId }
      }
    } = this.props;
    const { name } = this.context;

    name
      ? ApiService.getRequest("posts", {}, postId).then(response =>
          this.setState({ post: response.data, loading: false })
        )
      : history.push("/");
  }

  changeCommentsVisibility = () => {
    const {
      match: {
        params: { postId }
      }
    } = this.props;

    this.setState(
      { showComments: !this.state.showComments, commentsLoading: true },
      () => {
        if (this.state.showComments) {
          ApiService.getRequest("comments", { postId }).then(response =>
            this.setState({ comments: response.data, commentsLoading: false })
          );
        }
      }
    );
  };

  deletePost = () => {
    const {
      history,
      match: {
        params: { postId }
      }
    } = this.props;
    const { id } = this.context;
    const path = id !== null ? `/users/${id}` : "/";

    // eslint-disable-next-line no-restricted-globals
    confirm("Are you sure you want to delete this post?") &&
      ApiService.deleteRequest("posts", postId).then(() => history.push(path));
  };

  render() {
    const {
      comments,
      loading,
      post,
      showComments,
      commentsLoading
    } = this.state;
    return !loading ? (
      <UserConsumer>
        {({ name }) => (
          <>
            <h2 className="header inline-header">{post.title}</h2>
            <button className="delete-button" onClick={this.deletePost}>
              <FaTrashAlt /> Delete{" "}
            </button>
            <h6 className="header"> by {name}</h6>
            <p className="post-body">{post.body}</p>
            <br />

            <h4 className="header comments-header inline-header">Comments:</h4>
            <button
              className="comments-button"
              onClick={this.changeCommentsVisibility}
            >
              {showComments ? (
                <>
                  <FaEyeSlash /> Hide Comments{" "}
                </>
              ) : (
                <>
                  <FaEye /> Show Comments{" "}
                </>
              )}
            </button>
            {showComments &&
              (commentsLoading ? (
                "Loading..."
              ) : (
                <>
                  {comments.map(comment => (
                    <div className="comment-list-item" key={comment.id}>
                      <div className="comment-username">
                        <b>{comment.name}</b> ({comment.email})
                      </div>
                      <div className="comment-body">{comment.body}</div>
                    </div>
                  ))}
                </>
              ))}
          </>
        )}
      </UserConsumer>
    ) : (
      <>Loading...</>
    );
  }
}

export default Post;
