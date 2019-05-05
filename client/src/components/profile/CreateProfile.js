import React, { Component } from "react";
import PropTypes from 'prop-types'
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profileAction";
import InputGroup from "../common/InputGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubusername: "",
    youtube: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: "",
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      githubusername: this.state.githubusername,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors } = this.props;
    const { displaySocialInputs } = this.state;

    var socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            error={errors.twitter}
            icon="fab fa-twitter"
            name="twitter"
            value={this.state.twitter}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            error={errors.facebook}
            icon="fab fa-facebook"
            name="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            error={errors.linkedin}
            icon="fab fa-linkedin"
            name="linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            error={errors.youtube}
            icon="fab fa-youtube"
            name="youtube"
            value={this.state.youtube}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            error={errors.instagram}
            icon="fab fa-instagram"
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChange}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Input Information here to build your profile
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  onChange={this.onChange}
                  value={this.state.handle}
                  error={errors.handle}
                  info="A unique handle for your profile URL"
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  info="An idea of where you are in your career"
                  error={errors.status}
                  options={[
                    { label: "* Select Professional Status", value: 0 },
                    { label: "Developer", value: "Developer" },
                    { label: "Junior Developer", value: "Junior Developer" },
                    { label: "Senior Developer", value: "Senior Developer" },
                    { label: "Manager", value: "Manager" },
                    {
                      label: "Student or Learning",
                      value: "Student or Learning"
                    },
                    {
                      label: "Instructor or Teacher",
                      value: "Instructor or Teacher"
                    },
                    { label: "Intern", value: "Intern" },
                    { label: "Other", value: "Other" }
                  ]}
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  onChange={this.onChange}
                  value={this.state.company}
                  error={errors.company}
                  info="Company you work for or your own company"
                />
                <TextFieldGroup
                  placeholder="Website URL"
                  name="website"
                  onChange={this.onChange}
                  value={this.state.website}
                  error={errors.website}
                  info="Company website or your own website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  onChange={this.onChange}
                  value={this.state.location}
                  error={errors.location}
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  onChange={this.onChange}
                  value={this.state.skills}
                  error={errors.skills}
                  info='Please use comme separated value (e.g HTML,CSS,React) '
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  onChange={this.onChange}
                  value={this.state.githubusername}
                  error={errors.githubusername}
                />
                <TextAreaFieldGroup
                error={errors.bio}
                name='bio'
                info='Tell us something unique about you'
                onChange={this.onChange}
                placeholder='Short Bio'
                value={this.state.bio}
                />

                <div className="mb-3">
                  <button
                    className="btn btn-light mr-1"
                    onClick={() =>
                      this.setState({
                        displaySocialInputs: !displaySocialInputs
                      })
                    }
                    type="button"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Create Profile"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
