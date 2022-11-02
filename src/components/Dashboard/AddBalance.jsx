import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { addBalanceSchema } from "../../schemas/addBalanceSchema";
import { setAccountInfo } from "../../redux/features/accountSlice";
import { successToast } from "../../utils/toastEmitter";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import errorHandler from "../../utils/errorHandler";

const AddBalance = ({ showAddBalance, setShowAddBalance }) => {
  //private axios instance with interceptors
  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

  //handle submit add balance
  const addBalanceSubmit = async (values) => {
    try {
      const response = await axiosPrivate.post(
        process.env.REACT_APP_TRANSACTION_API + "/balance/add",
        values
      );

      //set updated data
      dispatch(setAccountInfo({ ...response.data }));
      setShowAddBalance(false);
      successToast(`${values.addBalance} added to balance`);
    } catch (error) {
      toast.dismiss();
      errorHandler(error);
    }
  };

  return (
    <Modal
      show={showAddBalance}
      onHide={() => setShowAddBalance(false)}
      backdrop="static"
    >
      <Modal.Body>
        <Formik
          initialValues={{ addBalance: "" }}
          validationSchema={addBalanceSchema}
          validateOnBlur={false}
          onSubmit={addBalanceSubmit}
        >
          {(props) => (
            <Form>
              <fieldset disabled={props.isSubmitting}>
                <label htmlFor="add-balance" className="fw-bold">
                  Amount
                </label>
                <Field
                  className={`form-control ${
                    props.touched.addBalance &&
                    props.errors.addBalance &&
                    "is-invalid"
                  }`}
                  type="number"
                  name="addBalance"
                  id="add-balance"
                  pattern="[0-9]*"
                />
                <div className="invalid-feedback">
                  {props.touched.addBalance && props.errors.addBalance}
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => setShowAddBalance(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button className="btn btn-success btn-sm mx-1" type="submit">
                    Add{" "}
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

AddBalance.propTypes = {
  showAddBalance: PropTypes.bool.isRequired,
  setShowAddBalance: PropTypes.func.isRequired
};

export default AddBalance;
