import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addExperience } from "../../actions/profileAction";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddExperience extends Component {
  state = {
    title: "",
    company: "",
    location: "",
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
    const expData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(expData, this.props.history);
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard">Go back</Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Any freelance work, company experience or personal projects
              </p>
              <small className="d-block pb-3">* - required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="title"
                  error={errors.title}
                  onChange={this.onChange}
                  value={this.state.title}
                  placeholder="* Work Title"
                />
                <TextFieldGroup
                  name="company"
                  error={errors.company}
                  onChange={this.onChange}
                  value={this.state.company}
                  placeholder="* Name of Company"
                  info="Can be Self Employed, Freelance Client, Company name etc"
                />
                <TextFieldGroup
                  name="location"
                  error={errors.location}
                  onChange={this.onChange}
                  value={this.state.location}
                  placeholder=" City you worked"
                  info="Can be an actual location or remote"
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
                    Still working here
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Work Description"
                  name="description"
                  error={errors.description}
                  onChange={this.onChange}
                  value={this.state.description}
                  info="Tell us about your work experience"
                />
                <input
                  type="submit"
                  value="Add Experience"
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

AddExperience.propTypes = {
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
