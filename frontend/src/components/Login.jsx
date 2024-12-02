import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// import noteContext from "../context/notes/noteContext";

const Login = () => {
  // const context = useContext(noteContext);
  // const { getNote } = context;

  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const token = await response.json();
    console.log(token.token);
    if (token.success) {
      Cookies.set("token", token.token, { expires: 7 });
      navigate("/");
      // useEffect(() => {
      //   getNote();
      // }, []);
    } else {
      alert("wrong credentials ");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center  ">
          <div className="col-md-6">
            <div className="card shadow p-4 bg-black text-white">
              <h3 className="card-header text-center">Login</h3>
              <div className="card-body bg-black text-white">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={credentials.email}
                      placeholder="Enter email"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={credentials.password}
                      placeholder="Enter password"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
