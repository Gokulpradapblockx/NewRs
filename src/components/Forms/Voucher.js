
import { React, useState } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

import "./Form.css";
const Voucher = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    trigger,
  } = useForm();
  const [formFields, setFormFields] = useState([
    { firstname: "", lastname: "" },
  ]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields);
  };


  // eslint-disable-next-line
  return (
    <div className="container-fluid ">
      <div className="container form-section">
        <form onSubmit={handleSubmit(submit)}>
          <h3 className="text-center">VOUCHER HOLDER</h3>
          {formFields.map((form, index) => {
            return (
              <div key={index}>
                <div className="forminput">
                  <label>First Name</label>
                  <input
                    type="text"
                    
                    placeholder="First Name"
                    {...register("name", {
                      required: "First Name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("name");
                    }}
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </div>

                <div className="forminput">
                  <label> Last Name </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastname", {
                      required: "Last Name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("lastname");
                    }}
                  />
                  {errors.lastname && (
                    <small className="text-danger">
                      {errors.lastname.message}
                    </small>
                  )}
                </div>

                <div className="forminput">
                  <label>Property Address (Seeking) </label>
                  <input
                    type="text"
                    placeholder="Property Address"
                    {...register("Property", {
                      required: "Property Address is Required",
                    })}
                    onKeyUp={() => {
                      trigger("Property");
                    }}
                  />
                  {errors.Property && (
                    <small className="text-danger">
                      {errors.Property.message}
                    </small>
                  )}
                </div>

                <div className="forminput">
                  <label>Target Move-In Date </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("date", { required: "Date is Required" })}
                    onKeyUp={() => {
                      trigger("date");
                    }}
                  />
                  {errors.date && (
                    <small className="text-danger">{errors.date.message}</small>
                  )}
                </div>

                <div className="forminput">
                  <label>Voucher Type</label>
                  <select>
                    <option disabled selected>
                      Select Voucher Type{" "}
                    </option>
                    <option value="HRA">HRA</option>
                    <option value=" CityPHEPS"> CityPHEPS</option>
                    <option value="Section 8">Section 8</option>
                  </select>
                </div>

                <div className="forminput">
                  <label>Unit Type/s</label>
                  <select>
                    <option disabled selected>
                      Select Unit Type/s
                    </option>
                    <option value="Unit Type/s">Unit Type/s</option>
                    <option value="1BR">1BR</option>
                    <option value="2BR">2BR</option>
                    <option value="etc..">etc..</option>
                  </select>
                </div>

                <div className="forminput">
                  <label>Voucher Amount</label>
                  <input
                    type="number"
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-", "."].includes(e.key) &&
                      e.preventDefault()
                    }
                    placeholder="Voucher Amount"
                    {...register("Voucher", {
                      required: "Voucher Amount is Required",
                    })}
                    onKeyUp={() => {
                      trigger("Voucher");
                    }}
                  />
                  {errors.Voucher && (
                    <small className="text-danger">
                      {errors.Voucher.message}
                    </small>
                  )}
                </div>

                <div className="forminput">
                  <label>Unit Inspection Walkthrough Request </label>
                  <input
                    type="text"
                    placeholder="Unit Inspection"
                    {...register("Unit", {
                      required:
                        "Unit Inspection Walkthrough Request is Required",
                    })}
                    onKeyUp={() => {
                      trigger("Unit");
                    }}
                  />
                  {errors.Unit && (
                    <small className="text-danger">{errors.Unit.message}</small>
                  )}
                </div>
              </div>
            );
          })}
          <div
            className="forminput"
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Voucher;
