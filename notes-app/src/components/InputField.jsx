export default function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  style,
}) {
  return (
    <div className="input-field">
      <h4>{label}</h4>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
      />
    </div>
  );
}
