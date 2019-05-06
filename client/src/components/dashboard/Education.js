import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileAction";
import { connect } from "react-redux";
import isEmpty from '../../validations/is-empty'
class Education extends React.Component {
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.current || isEmpty(edu.to) ? (
            "till date"
          ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={e => this.props.deleteEducation(edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr className="font-weight-bold">
              <td>School</td>
              <td>Degree</td>
              <td>Years</td>
              <td />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
