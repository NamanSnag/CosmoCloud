import React, { useState } from "react";
import { Field } from "../../components";
import { BsPlus } from "react-icons/bs";

import "./style.scss";

const UserModel = () => {
  const [schema, setSchema] = useState([]);

  // add new field 
  const handleAddField = () => {
    setSchema([
      ...schema,
      { name: "Enter_Name", type: "string", value: false, subDescription: [] }
    ])
  }

  // save data
  const handleSave = () => {
    console.log("User Model : ",schema)
  }

  return (
    <div className="user__container">
      <div className="user__fields">
        <div className="user__head">
          <p>Field name and type</p>
          <BsPlus 
          className="user__plus"
          onClick={handleAddField}
          />
        </div>

        <div className="user__field">
          {
            schema.length ? (
              schema.map((field, index) => (
              <Field 
                key={index} 
                field={field} 
                index={index} 
                setSchema={setSchema}
                schema={schema}
              />
            ))
            ) : (
              <h3 style={{textAlign:'center', marginTop: '40px'}}>
                Start creating User Schema By Clicking on add Button</h3>
            )
          }
        </div>
        <button className="save" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default UserModel;
