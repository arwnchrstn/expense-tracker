import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

import { deleteAccountSchema } from "../../schemas/deleteAcccountSchema";
import errorHandler from "../../utils/errorHandler";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useClearAllState from "../../hooks/useClearAllState";
import { successToast } from "../../utils/toastEmitter";

const DeleteAccount = ({ showDeleteAccount, setShowDeleteAccount }) => {
  const axiosPrivate = useAxiosPrivate();
  const clearAllState = useClearAllState();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //handle delete account
  const deleteAccount = async (values) => {
    try {
      await axiosPrivate.post(process.env.REACT_APP_DELETE_USER, values);

      clearAllState();
      localStorage.clear("currency");
      localStorage.clear("filter");
      queryClient.removeQueries("user");
      queryClient.removeQueries("account-overview");
      navigate("/");
      successToast("Account deleted successfully");
    } catch (error) {
      toast.dismiss();
      errorHandler(error);
    }
  };

  return (
    <Modal
      show={showDeleteAccount}
      onHide={() => setShowDeleteAccount(false)}
      backdrop="static"
    >
      <Modal.Body>
        <h6 className="mb-4">
          Please proceed with caution with the account deletion.{" "}
          <span className="text-danger fw-bold">
            This action is cannot be undone
          </span>
        </h6>

        <Formik
          initialValues={{ confirmation: "", confirmPassword: "" }}
          validationSchema={deleteAccountSchema}
          onSubmit={deleteAccount}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <fieldset disabled={props.isSubmitting}>
                <label htmlFor="confirm-delete-password">
                  Please type{" "}
                  <span className="text-danger fw-bold">
                    /delete my account
                  </span>{" "}
                  to confirm
                </label>
                <Field
                  className={`form-control ${
                    props.touched.confirmation &&
                    props.errors.confirmation &&
                    "is-invalid"
                  }`}
                  id="confirm-delete"
                  name="confirmation"
                />
                <div className="invalid-feedback">
                  {props.touched.confirmation && props.errors.confirmation}
                </div>

                <label htmlFor="confirm-delete-password" className="mt-3">
                  Enter your password
                </label>
                <Field
                  type="password"
                  className={`form-control ${
                    props.touched.confirmPassword &&
                    props.errors.confirmPassword &&
                    "is-invalid"
                  }`}
                  id="confirm-delete-password"
                  name="confirmPassword"
                />
                <div className="invalid-feedback">
                  {props.touched.confirmPassword &&
                    props.errors.confirmPassword}
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button
                    className="btn btn-outline-danger btn-sm mx-1"
                    onClick={() => setShowDeleteAccount(false)}
                    type="button"
                  >
                    Cancel
                  </button>

                  <button className="btn btn-danger btn-sm mx-1" type="submit">
                    Delete{" "}
                    {props.isSubmitting && (
                      <div
                        className="spinner-border text-light spinner-border-sm ms-1"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </button>
                </div>
              </fieldset>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

DeleteAccount.propTypes = {
  showDeleteAccount: PropTypes.bool.isRequired,
  setShowDeleteAccount: PropTypes.func.isRequired
};

export default DeleteAccount;
