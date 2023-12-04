import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { useRef, useState } from "react";

export default function PasswordInput({
  label,
  type,
  value,
  onChange,
  placeholder,
  style,
  show,
  toggleShow,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className="password-field">
      <h4>{label}</h4>
      <div
        className={`pass-input-container ${isFocused ? "focused" : ""}`}
        style={style}
        ref={containerRef}
      >
        <input
          //   className="padding-input"
          type={showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="show-password-btn"
          onClick={toggleShowPassword}
        >
          {showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
        </button>
      </div>
    </div>
  );
}
