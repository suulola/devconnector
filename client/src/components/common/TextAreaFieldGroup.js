import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function TextAreaFieldGroup({
  onChange,
  name,
  error,
  value,
  info,
  placeholder
}) {
  return (
    <div className="form-group">
      <textarea
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className={classnames("form-control", { "is-invalid": error })}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextAreaFieldGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string
};

export default TextAreaFieldGroup;
