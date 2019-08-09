// import { withAuth } from "./Authentication";
import "./styles.css";

import React, { PureComponent } from "react";

import ApiService from "../../utils/ApiService";
import { Link } from "react-router-dom";
import { UserConsumer } from "../../contexts/UserContext";

class Users extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    ApiService.getRequest("users").then(response =>
      this.setState({ users: response.data, loading: false })
    );
  }

  render() {
    const { users, loading } = this.state;

    return (
      <UserConsumer>
        {({ updateUser }) => (
          <>
            <h2 className="header">Authors</h2>
            {loading ? (
              "Loading..."
            ) : (
              <div className="grid-container">
                {users.map(user => (
                  <div className="user-list-item" key={user.id}>
                    <div>{user.name}</div>
                    <Link
                      to={`/users/${user.id}`}
                      onClick={() => updateUser(user)}
                    >
                      Blog posts
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

export default Users;
