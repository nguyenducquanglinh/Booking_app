import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
  });


  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const endpoint = loginView === 'login' ? '/auth/login' : '/auth/register';
      const res = await axios.post(endpoint, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const { loginView } = useContext(AuthContext);

  return (
    <div className="login">
      <div className="lContainer">
        {loginView === 'register' && (
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
            required
          />
        )}
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
          required
        />
        {loginView === 'register' && (
          <>
            <input
              type="text"
              placeholder="country"
              id="country"
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type="text"
              placeholder="city"
              id="city"
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type="tel"
              placeholder="phone"
              id="phone"
              onChange={handleChange}
              className="lInput"
              required
            />
          </>
        )}
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
          required
        />

        <button disabled={loading} onClick={handleSubmit} className="lButton">
          {loginView === 'login' ? 'Login' : 'Register'}
        </button>
        {error && <span className="error">{error.message}</span>}
        <div className="switchView">
          {loginView === 'login' ? (
            <p>
              Don't have an account?{' '}
              <span onClick={() => dispatch({ type: "SWITCH_LOGIN_VIEW", payload: "register" })}>
                Register
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => dispatch({ type: "SWITCH_LOGIN_VIEW", payload: "login" })}>
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
