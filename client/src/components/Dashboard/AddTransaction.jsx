import PropTypes from "prop-types";
import React from "react";

import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

import { expense, income } from "../../config/transactionTypes";
import { addTransactionSchema } from "../../schemas/addTransactionSchema";

const AddTransaction = ({ showAddTransaction, setShowAddTransaction }) => {
  const addTransactionSubmit = (values, action) => {
    console.log(values);
  };

  return (
    <Modal
      show={showAddTransaction}
      onHide={() => setShowAddTransaction(false)}
    >
      <Modal.Body>
        <Formik
          initialValues={{
            type: "",
            category: "",
            amount: ""
          }}
          validationSchema={addTransactionSchema}
          onSubmit={addTransactionSubmit}
        >
          {(props) => (
            <Form>
              {/* Transaction type */}
              <p className="mb-1 fw-bold ms-1">Select transaction type:</p>
              <Field
                type="radio"
                className="btn-check"
                name="type"
                id="income-radio"
                value="income"
              />
              <label
                className="btn btn-outline-success m-1 btn-sm"
                htmlFor="income-radio"
                onClick={() =>
                  props.values.type !== "income" &&
                  props.setFieldValue("category", "")
                }
              >
                Income
              </label>

              <Field
                type="radio"
                className="btn-check"
                name="type"
                id="expense-radio"
                value="expense"
              />
              <label
                className="btn btn-outline-danger m-1 btn-sm"
                htmlFor="expense-radio"
                onClick={() =>
                  props.values.type !== "expense" &&
                  props.setFieldValue("category", "")
                }
              >
                Expense
              </label>
              <small className="text-danger d-block ms-1">
                {props.touched.type && props.errors.type}
              </small>

              {/* Category type */}
              {props.values.type && (
                <>
                  <p className="mb-1 fw-bold ms-1 mt-3">
                    Select {props.values.type} category:
                  </p>

                  {props.values.type === "income" &&
                    income.map((type, idx) => (
                      <React.Fragment key={idx}>
                        <Field
                          type="radio"
                          className="btn-check"
                          name="category"
                          id={`income-category${idx}`}
                          value={type}
                        />
                        <label
                          className="btn btn-outline-success m-1 btn-sm text-capitalize"
                          htmlFor={`income-category${idx}`}
                        >
                          {type}
                        </label>
                      </React.Fragment>
                    ))}

                  {props.values.type === "expense" &&
                    expense.map((type, idx) => (
                      <React.Fragment key={idx}>
                        <Field
                          type="radio"
                          className="btn-check"
                          name="category"
                          id={`expense-category${idx}`}
                          value={type}
                        />
                        <label
                          className="btn btn-outline-danger m-1 btn-sm text-capitalize"
                          htmlFor={`expense-category${idx}`}
                        >
                          {type}
                        </label>
                      </React.Fragment>
                    ))}

                  <small className="text-danger d-block ms-1">
                    {props.touched.category && props.errors.category}
                  </small>
                </>
              )}

              {/* Amount */}
              {props.values.category && (
                <>
                  <p className="mb-1 fw-bold ms-1 mt-3 text-capitalize">
                    {props.values.type} Amount:
                  </p>
                  <Field
                    type="number"
                    className={`form-control ${
                      props.touched.amount &&
                      props.errors.amount &&
                      "is-invalid"
                    }`}
                    name="amount"
                    id="amount"
                  />
                  <small className="text-danger d-block ms-1">
                    {props.touched.amount && props.errors.amount}
                  </small>
                </>
              )}

              <div className="d-flex justify-content-end mt-4">
                <button
                  type="button"
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => setShowAddTransaction(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success btn-sm mx-1">
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

AddTransaction.propTypes = {
  showAddTransaction: PropTypes.bool.isRequired,
  setShowAddTransaction: PropTypes.func.isRequired
};

export default AddTransaction;
