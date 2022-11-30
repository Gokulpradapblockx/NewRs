import React from 'react';
import { useForm } from "react-hook-form";
 

const Users = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = () => {
    // console.log(data);
    // reset();
    window.location.href="https://ipfs.filebase.io/ipfs/QmeWUjG6KHvMXCxzwZqd56k4QuaUDEJCVZbJJ9gUK8aRyS";
  };
  return (
    <div className="container-fluid ">
    <div className="container form-section">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center">USERS</h3>
        <div className="forminput">
          <label>First Name</label>
          <input id="firstName"
         name="firstName"
         type="text"         
          placeholder="First Name" 
          {...register("name", { required: "First Name is Required" })}
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
          <input  id="lastName"
         name="lastName"
         type="text"         
          placeholder="Last Name" 
             {...register("lastname", { required: "Last Name is Required" })}
           onKeyUp={() => {
             trigger("lastname");
           }}
          /> 
            {errors.lastname && (
                <small className="text-danger">{errors.lastname.message}</small>
              )}

        </div>

        <div className="forminput">
          <label>Property Address (Seeking) </label>
          <input type="text" placeholder="Property Address" 
            {...register("Property", { required: "Property Address is Required" })}
          onKeyUp={() => {
            trigger("Property");
          }}
          />
 {errors.Property && (
                <small className="text-danger">{errors.Property.message}</small>
              )}

        </div>

        <div className="forminput">
          <label>Target Move-In Date </label>
          <input type="date" min={new Date().toISOString().split('T')[0]}
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
          <label>Unit Type/s</label>
          <select>
          <option disabled selected>Select Unit Type/s</option>
          <option value="(Shared / Studio)">(Shared / Studio)</option>
          <option value="1BR">1BR</option>
          <option value="2BR">2BR</option>
          <option value="etc..">etc..</option>
          </select>        
        </div>

        <div className="forminput">
          <label>Rent Budget </label>
          <input type="number" onKeyDown={(e) =>["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} placeholder="Rent Budget " 
           {...register("Voucher", { required: "Rent Budget is Required" })}
           onKeyUp={() => {
             trigger("Voucher");
           }}
          />
{errors.Voucher && (
                <small className="text-danger">{errors.Voucher.message}</small>
              )}

        </div>

        <div className="forminput">
          <label>Video Walkthrough Request</label>
          <input type="text" placeholder="Unit Inspection"
            {...register("Video", { required: "Video Walkthrough is Required" })}
           onKeyUp={() => {
             trigger("Video");
           }}
          />
{errors.Video && (
                <small className="text-danger">{errors.Video.message}</small>
              )}

        </div>
        <div className="forminput" style={{display : "flex", alignItems: "flex-end"}}>
            <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Users;