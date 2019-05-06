import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function TextFieldGroup({
  type,
  onChange,
  name,
  error,
  placeholder,
  value,
  disabled,
  info
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        
        className={classnames("form-control ", { "is-invalid": error })}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  info: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
