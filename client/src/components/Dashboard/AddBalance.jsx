import { useState } from "react";
import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";
import { Form, Formik, Field } from "formik";

import { addBalanceSchema } from "../../schemas/addBalanceSchema";

const AddBalance = ({ showAddBalance, setShowAddBalance }) => {
  const [addBalanceAmount, setAddBalanceAmount] = useState(0);

  //handle submit
  const addBalanceSubmit = (values, action) => {
    console.log(values);
  };

  return (
    <Modal show={showAddBalance} onHide={() => setShowAddBalance(false)}>
      <Modal.Body>
        <Formik
          initialValues={{ addBalance: 0 }}
          validationSchema={addBalanceSchema}
          onSubmit={addBalanceSubmit}
        >
          {(props) => (
            <Form>
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
                <button
                  className="btn btn-success btn-sm mx-1"
                  onClick={addBalanceSubmit}
                  type="submit"
                >
                  Add
                </button>
              </div>
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
