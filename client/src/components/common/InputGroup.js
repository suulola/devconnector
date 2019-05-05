import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputGroup = ({
  icon,
  text,
  placeholder,
  value,
  name,
  error,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        name={name}
        className={classnames("form-control", { "is-invalid": error })}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
