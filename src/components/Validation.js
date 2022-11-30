import React, { useState } from 'react';



function Validation() {
    const [formFields, setFormFields] = useState([
        { name: '', age: '' },
      ])
    
      const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
      }
    
      const submit = (e) => {
        e.preventDefault();
        console.log(formFields)
      }
    
     
    
   

    return (
        <div className="App">
        <form onSubmit={submit}>
          {formFields.map((form, index) => {
            return (
              <div key={index}>
                <input
                  name='name'
                  placeholder='Name'
                  onChange={event => handleFormChange(event, index)}
                  value={form.name}
                />
                <input
                  name='age'
                  placeholder='Age'
                  onChange={event => handleFormChange(event, index)}
                  value={form.age}
                />
                {/* <button onClick={() => removeFields(index)}>Remove</button> */}
              </div>
            )
          })}
        </form>
        {/* <button onClick={addFields}>Add More..</button> */}
        <br />
        <button onClick={submit}>Submit</button>
      </div>
    );
}

export default Validation;