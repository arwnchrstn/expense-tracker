import { useState } from "react";

import { Form, Formik, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginSchema } from "../schemas/loginSchema";
import axiosDefault from "../utils/axios";
import useSetSession from "../hooks/useSetSession";
import errorHandler from "../utils/errorHandler";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const setSession = useSetSession();
  const navigate = useNavigate();

  //handle user login
  const login = async (values, action) => {
    try {
      const response = await axiosDefault.post(
        process.env.REACT_APP_LOGIN_API,
        values
      );

      //set user data
      setSession(
        response.data.username,
        response.data.accessToken,
        response.data.balance,
        response.data.transactions
      );
      navigate("/dashboard");
    } catch (error) {
      action.setFieldValue("password", "");
      action.setFieldTouched("password", false);
      toast.dismiss();
      errorHandler(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center my-5">
        <div className="col-11 col-md-6 col-lg-4 shadow p-4">
          <h4 className="text-center text-theme-green fw-bold">
            Expense Tracker
          </h4>
          <h5 className="text-center fw-bold">Login</h5>

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginSchema}
            validateOnBlur={false}
            onSubmit={login}
          >
            {(props) => (
              <>
                <Form>
                  <fieldset
                    className="text-theme-green"
                    disabled={props.isSubmitting}
                  >
                    <div className="form-floating my-3">
                      <Field
                        type="text"
                        className={`form-control ${
                          props.errors.username &&
                          props.touched.username &&
                          "is-invalid"
                        }`}
                        id="username"
                        name="username"
                        placeholder="Username"
                      />
                      <div className="invalid-feedback">
                        {props.touched.username && props.errors.username}
                      </div>
                      <label htmlFor="username">Username</label>
                    </div>

                    <div className="form-floating my-3">
                      <Field
                        type={`${showPassword ? "text" : "password"}`}
                        className={`form-control ${
                          props.touched.password &&
                          props.errors.password &&
                          "is-invalid"
                        }`}
                        id="password"
                        name="password"
                        placeholder="Password"
                      />
                      <div className="invalid-feedback">
                        {props.touched.password && props.errors.password}
                      </div>
                      <label htmlFor="password">Password</label>
                    </div>

                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        className="me-1"
                        id="toggle-show-pass"
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      <label htmlFor="toggle-show-pass" className="text-dark">
                        Show password
                      </label>
                    </div>

                    <button type="submit" className="btn btn-success px-4 mt-4">
                      Login{" "}
                      {props.isSubmitting && (
                        <div
                          className="spinner-border text-light spinner-border-sm ms-1"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    </button>
                  </fieldset>
                </Form>

                <Link
                  to={`${props.isSubmitting ? "#" : "/signup"}`}
                  className="text-theme-green mt-4 d-inline-block"
                >
                  Create account
                </Link>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
