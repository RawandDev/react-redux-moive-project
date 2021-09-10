import { Spin } from "antd";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Loader = ({ children, loading }) => (
  <div>
    <Spin size="large" spinning={loading}>
      {children}
    </Spin>
  </div>
);

Loader.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Loader.defaultProps = {
  loading: false,
};
const mapStateToProps = ({ tmdb: { loading } }) => ({ loading });
export default connect(mapStateToProps)(Loader);
