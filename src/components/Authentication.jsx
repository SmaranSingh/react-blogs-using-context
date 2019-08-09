import React from "react";
import { withRouter } from "react-router-dom";

export const withAuth = Component =>
  @withRouter
  class AuthComponent extends React.Component {
    componentDidMount() {
      const { history } = this.props;

      const token = localStorage.getItem("BLOG_USER_ID");
      if (!token) {
        history.push("/login");
      }

      return {};
    }

    render() {
      return <Component {...this.props} />;
    }
  };
