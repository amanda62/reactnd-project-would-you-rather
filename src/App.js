import React from "react";
import { connect } from "react-redux";

function App({ label }) {
  return <>{label}</>;
}

export default connect(state => ({ label: state }))(App);
