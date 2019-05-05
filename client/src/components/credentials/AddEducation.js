import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addEducation } from "../../actions/profileAction";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(eduData, this.props.history);
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard">Go back</Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Any School, Boot-camp or Training
              </p>
              <small className="d-block pb-3">* - required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="school"
                  error={errors.school}
                  onChange={this.onChange}
                  value={this.state.school}
                  placeholder="* School Name"
                />
                <TextFieldGroup
                  name="degree"
                  error={errors.degree}
                  onChange={this.onChange}
                  value={this.state.degree}
                  placeholder="* Degree or Certification"
                />
                <TextFieldGroup
                  name="fieldofstudy"
                  error={errors.fieldofstudy}
                  onChange={this.onChange}
                  value={this.state.fieldofstudy}
                  placeholder="* Field of Study"
                />
                <h6>* From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  error={errors.from}
                  onChange={this.onChange}
                  value={this.state.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  error={errors.to}
                  onChange={this.onChange}
                  value={this.state.to}
                  disabled={this.state.current ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    id="current"
                    type="checkbox"
                    value={this.state.current}
                    name="current"
                    onChange={() =>
                      this.setState({ current: !this.state.current, to: "" })
                    }
                  />
                  <label htmlFor="current" className="form-check-label">
                    Still in school
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  error={errors.description}
                  onChange={this.onChange}
                  value={this.state.description}
                  info="Tell us about your program"
                />
                <input
                  type="submit"
                  value="Add Education"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
