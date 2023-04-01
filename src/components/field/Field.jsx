import React, { useState, useRef } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import NestedField from "../nestedField/NestedField";

import "./style.scss";

const Field = ({ field, index, schema, setSchema }) => {
  const [input, setInput] = useState(false);

  let fieldName = useRef();

  let parentIndex = index;

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
        setSchema([...schema]);
        setInput(false);
        break;

      case "type":
        let type = e.target.value;
        newField = {
          ...newField,
          type: type,
        };
        schema[index] = newField;
        setSchema([...schema]);
        break;

      case "value":
        let value = e.target.checked;
        newField = {
          ...newField,
          value: value,
        };
        schema[index] = newField;
        setSchema([...schema]);
        break;

      default:
        break;
    }
  };

  // add new field
  const handleAddField = () => {
    const newSchema = [...schema];
    const newSUbField = {
      name: "Name",
      type: "string",
      value: false,
      subDescription: [],
    };
    newSchema[index].subDescription.push(newSUbField);
    setSchema(newSchema);
  };

  return (
    <>
      <div className="field__container">
        <p>{index + 1}.</p>
        <div className="field__detail">
          <div className="field__type">
            {input ? (
              <input
                type="text"
                className="field__name"
                ref={fieldName}
                onDoubleClick={(e) => handleFieldChange(e, "name")}
              />
            ) : (
              <p onDoubleClick={() => setInput(true)}>{field.name}</p>
            )}

            <select
              className="field__dropdown"
              onChange={(e) => handleFieldChange(e, "type")}
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="object">Object</option>
            </select>
          </div>

          {field.type === "object" ? (
            <div className="field__hover">
              <label className="field__switch">
                Required
                <input
                  type="checkbox"
                  onChange={(e) => handleFieldChange(e, "value")}
                />
                <span className="slider"></span>
              </label>
              <BsPlus className="nested__plus" onClick={handleAddField} />
              <RiDeleteBin5Line
                className="delete"
                onClick={handleDeleteField}
              />
            </div>
          ) : (
            <div className="field__hover">
              <label className="field__switch">
                Required
                <input
                  type="checkbox"
                  onChange={(e) => handleFieldChange(e, "value")}
                />
                <span className="slider"></span>
              </label>
              <RiDeleteBin5Line
                className="delete"
                onClick={handleDeleteField}
              />
            </div>
          )}
        </div>
      </div>
      {field.type === "object" &&
        (field.subDescription.length
          ? field.subDescription.map((subField, i) => {
              return (
                <NestedField
                  key={index + i}
                  subField={subField}
                  schema={schema}
                  setSchema={setSchema}
                  i={i}
                  index={index}
                  indent={0}
                  level={1}
                  parentIndex={parentIndex}
                />
              );
            })
          : null)}
    </>
  );
};

export default Field;
