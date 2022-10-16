import PropTypes from "prop-types";
import React from "react";

import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

import { expense, income } from "../../config/transactionTypes";
import { addTransactionSchema } from "../../schemas/addTransactionSchema";
import { setAccountInfo } from "../../redux/features/accountSlice";
import { successToast } from "../../utils/toastEmitter";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import errorHandler from "../../utils/errorHandler";

const AddTransaction = ({ showAddTransaction, setShowAddTransaction }) => {
  //private axios instance with interceptors
  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  //handle submit new transaction
  const addTransactionSubmit = async (values) => {
    try {
      const response = await axiosPrivate.post(
        process.env.REACT_APP_TRANSACTION_API + "/add",
        values
      );

      dispatch(setAccountInfo({ ...response.data }));
      setShowAddTransaction(false);
      if (values.type === "income")
        successToast(`${values.amount} is added to your balance`);
      else if (values.type === "expense")
        successToast(`${values.amount} is deducted to your balance`);

      queryClient.invalidateQueries("account-overview");
    } catch (error) {
      toast.dismiss();
      errorHandler(error);
    }
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
          validateOnBlur={false}
          onSubmit={addTransactionSubmit}
        >
          {(props) => (
            <Form>
              <fieldset disabled={props.isSubmitting}>
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
                    (props.setFieldValue("category", ""),
                    props.setFieldValue("amount", ""),
                    props.setFieldTouched("category", false),
                    props.setFieldTouched("amount", false))
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
                    (props.setFieldValue("category", ""),
                    props.setFieldValue("amount", ""),
                    props.setFieldTouched("category", false),
                    props.setFieldTouched("amount", false))
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

AddTransaction.propTypes = {
  showAddTransaction: PropTypes.bool.isRequired,
  setShowAddTransaction: PropTypes.func.isRequired
};

export default AddTransaction;
