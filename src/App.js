import "./App.css";

import React, { PureComponent } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Post from "./components/Post";
import PostList from "./components/PostList";
// import { PostProvider } from "./contexts/PostContext";
import { UserProvider } from "./contexts/UserContext";
import Users from "./components/Users";

@withRouter
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: null,
        name: "",
        updateUser: this.updateUser
      }
      // post: {
      //   id: null,
      //   name: "",
      //   updateUser: this.updateUser
      // }
    };
  }

  updateUser = user => {
    this.setState({
      user: { ...this.state.user, id: user.id, name: user.name }
    });
  };

  render() {
    return (
      <UserProvider value={this.state.user}>
        {/* <PostProvider value={this.state.post}> */}
        <Switch>
          <Route exact path="/login" component={Login} />} />
          <Route exact path="/logout" component={Logout} />} />
          <Route exact path="/" component={Users} />} />
          <Route exact path="/users/:userId" component={PostList} />} />
          <Route exact path="/posts/:postId" component={Post} />} />
          <Redirect to="/" />
        </Switch>
        {/* </PostProvider> */}
      </UserProvider>
    );
  }
}

export default App;
