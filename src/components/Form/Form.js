import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { sendDataToServer } from "../../services/service";

import "./Form.css";

const Form = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await sendDataToServer(data);
      console.log("Form data submitted successfully");
      reset();
    } catch (error) {
      console.error("Failed to submit form data:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Form</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-3">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                {...register("username", { required: true })}
              />
              {errors.username && (
                <div className="invalid-feedback">This field is required</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="telephone">Telephone:</label>
              <Controller
                name="telephone"
                control={control}
                rules={{
                  required: true,
                  validate: (value) =>
                    (value && value.replace(/\D/g, "").length === 12) ||
                    "Telephone number must be exactly 12 digits long",
                }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    defaultCountry="UA"
                    international
                    countryCallingCodeEditable={false}
                    className={`form-control ${
                      errors.telephone ? "is-invalid" : ""
                    }`}
                    onChange={(value) => setValue("telephone", value)}
                  />
                )}
              />
              {errors.telephone && (
                <div className="invalid-feedback">
                  {errors.telephone.message}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                className={`form-control ${errors.comment ? "is-invalid" : ""}`}
                {...register("comment", { required: true })}
              />
              {errors.comment && (
                <div className="invalid-feedback">This field is required</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
