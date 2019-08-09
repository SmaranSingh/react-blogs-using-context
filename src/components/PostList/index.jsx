import "./styles.css";

import { Link, withRouter } from "react-router-dom";
import React, { PureComponent } from "react";
import UserContext, { UserConsumer } from "../../contexts/UserContext";

import ApiService from "../../utils/ApiService";

@withRouter
class PostList extends PureComponent {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = { posts: [], loading: true };
  }

  componentDidMount() {
    const {
      history,
      match: {
        params: { userId }
      }
    } = this.props;
    const { name } = this.context;

    name
      ? ApiService.getRequest("posts", { userId }).then(response =>
          this.setState({ posts: response.data, loading: false })
        )
      : history.push("/");
  }

  render() {
    const { posts, loading } = this.state;
    return (
      <UserConsumer>
        {({ name }) => (
          <>
            <h2 className="header">{name}</h2>
            {loading ? (
              "Loading..."
            ) : (
              <div>
                {posts.map(post => (
                  <div className="post-list-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                      <div>{post.title}</div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </UserConsumer>
    );
  }
}

export default PostList;
