import React, { useState, useRef } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

import "./style.scss";

const Field = ({ field, index, schema, setSchema }) => {
  const [input, setInput] = useState(false);

  let fieldName = useRef();

  // Delete field
  const handleDeleteField = () => {
    const newSchema = [...schema];
    newSchema.splice(index, 1);
    setSchema(newSchema);
  };

  // handle field change
  const handleFieldChange = (e, field) => {
    let newField = schema[index];

    switch (field) {
      case "name":
        let name = fieldName.current.value;
        newField = {
          ...newField,
          name: name,
        }; 
        schema[index] = newField;
        setSchema([...schema])
        setInput(false);
        break;

      case "type":
        let type = e.target.value;

        newField = {
          ...newField,
          type: type,
        }; 
        schema[index] = newField;
        setSchema([...schema])
        break;

      case "value":
        let value = e.target.checked;
        newField = {
          ...newField,
          value: value,
        }; 
        schema[index] = newField;
        setSchema([...schema])
        break;

      default:
        break;
    }
  }

  return (
    <div className="field__container">
      <p>{index + 1}.</p>
      <div className="field__detail">
        <div className="field__type">
          {input ? (
            <input
              type="text"
              className="field__name"
              ref={fieldName}
              onDoubleClick={(e) => handleFieldChange(e, 'name')}
            />
          ) : (
            <p onDoubleClick={() => setInput(true)}>{field.name}</p>
          )}

          <select className="field__dropdown" onChange={(e) => handleFieldChange(e, 'type')}>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="object">Object</option>
          </select>
        </div>

        <div className="field__hover">
          <label className="field__switch" >
            Required
            <input type="checkbox" onChange={(e) => handleFieldChange(e, 'value')}/>
            <span className="slider"></span>
          </label>
          <RiDeleteBin5Line className="delete" onClick={handleDeleteField} />
        </div>
      </div>
    </div>
  );
};

export default Field;
