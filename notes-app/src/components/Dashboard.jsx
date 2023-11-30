import { useNavigate } from "react-router-dom";
export default function Dashboard({ setAuth }) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.setItem("auth", JSON.stringify(false));
    navigate("/signin");
  }
  return (
    <div>
      <button
        style={{ height: "100px", width: "100px" }}
        onClick={handleLogout}
      />
    </div>
  );
}
