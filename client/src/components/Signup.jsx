import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupSchema } from "../schemas/signupSchema";
import axios from "../utils/axios";
import useSetSession from "../hooks/useSetSession";
import errorHandler from "../utils/errorHandler";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const setSession = useSetSession();
  const navigate = useNavigate();

  //handle user login
  const signup = async (values, action) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SIGNUP_API,
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
      errorHandler(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center my-5">
        <div className="col-11 col-md-6 col-lg-4 shadow p-3">
          <h4 className="text-center text-theme-green fw-bold">
            Expense Tracker
          </h4>
          <h5 className="text-center fw-bold">Signup</h5>

          <Formik
            initialValues={{ username: "", password: "", confirmPassword: "" }}
            validationSchema={signupSchema}
            onSubmit={signup}
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
                        id="usernameSignup"
                        name="username"
                        placeholder="Username"
                        maxLength={30}
                      />
                      <div className="invalid-feedback">
                        {props.touched.username && props.errors.username}
                      </div>
                      <label htmlFor="usernameSignup">Username</label>
                    </div>

                    <div className="form-floating my-3">
                      <Field
                        type={`${showPassword ? "text" : "password"}`}
                        className={`form-control ${
                          props.errors.password &&
                          props.touched.password &&
                          "is-invalid"
                        }`}
                        id="passwordSignup"
                        name="password"
                        placeholder="Password"
                        maxLength={32}
                      />
                      <div className="invalid-feedback">
                        {props.touched.password && props.errors.password}
                      </div>
                      <label htmlFor="passwordSignup">Password</label>
                    </div>

                    <div className="form-floating my-3">
                      <Field
                        type={`${showPassword ? "text" : "password"}`}
                        className={`form-control ${
                          props.errors.confirmPassword &&
                          props.touched.confirmPassword &&
                          "is-invalid"
                        }`}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        maxLength={32}
                      />
                      <div className="invalid-feedback">
                        {props.touched.confirmPassword &&
                          props.errors.confirmPassword}
                      </div>
                      <label htmlFor="confirmPassword">Confirm Password</label>
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
                      Signup
                    </button>
                  </fieldset>
                </Form>

                <Link
                  to={`${props.isSubmitting ? "#" : "/"}`}
                  className="text-theme-green mt-4 d-inline-block"
                >
                  Login to your account
                </Link>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
