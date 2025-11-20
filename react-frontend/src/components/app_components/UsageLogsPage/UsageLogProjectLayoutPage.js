import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import UsageLogsPage from "./UsageLogsPage";

const UsageLogProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <UsageLogsPage />
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(UsageLogProjectLayoutPage);