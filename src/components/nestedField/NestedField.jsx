import React, { useRef, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";

import "./style.scss";

const NestedField = ({
  subField,
  index,
  i,
  schema,
  setSchema,
  indent,
  level,
  parentIndex,
}) => {
  const [input, setInput] = useState(false);

  const fieldName = useRef();

  let width = 90;
  if (indent > 0) width = 80;

  // Delete field
  const handleDeleteField = () => {
    const newSchema = [...schema];
    if (level == 2) {
      newSchema[parentIndex].subDescription[index].subDescription.splice(i, 1);
    } else {
      newSchema[parentIndex].subDescription.splice(i, 1);
    }
    setSchema(newSchema);
  };

  // handle field change
  const handleFieldChange = (e, field) => {
    let newSchema = [...schema];
    let newField = newSchema[index].subDescription[i];
    if (level == 2) (newField = newSchema[parentIndex].subDescription[index].subDescription[i])

    switch (field) {
      case "name":
        let name = fieldName.current.value;
        if (level == 2) {
          newField = newSchema[parentIndex].subDescription[
            index
          ].subDescription[i] = {
            ...newField,
            name: name,
          };
        } else {
          newSchema[index].subDescription[i] = {
            ...newField,
            name: name,
          };
        }
        setSchema(newSchema);
        setInput(false);
        break;

      case "type":
        let type = e.target.value;

        if (level == 2) {
          newField = newSchema[parentIndex].subDescription[
            index
          ].subDescription[i] = {
            ...newField,
            type: type,
          };
        } else {
          newSchema[index].subDescription[i] = {
            ...newField,
            type: type,
          };
        }
        setSchema(newSchema);
        break;

      case "value":
        let value = e.target.checked;
        if (level == 2) {
          newField = newSchema[parentIndex].subDescription[
            index
          ].subDescription[i] = {
            ...newField,
            value: value,
          };
        } else {
          newSchema[index].subDescription[i] = {
            ...newField,
            value: value,
          };
        }
        setSchema(newSchema);
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
    if (level == 1) {
      newSchema[parentIndex].subDescription[i].subDescription.push(
        newSUbField
      );
    } else {
      newSchema[parentIndex].subDescription.push(newSUbField);
    }
    setSchema(newSchema);
  };

  return (
    <>
      <div className="Nested__field__container">
        <div className="field__container" style={{ width: `${width}%` }}>
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
                <p onDoubleClick={() => setInput(true)}>{subField.name}</p>
              )}

              <select
                className="field__dropdown"
                onChange={(e) => handleFieldChange(e, "type")}
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                {level == 1 && <option value="object">Object</option>}
              </select>
            </div>

            {subField.type === "object" ? (
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
      </div>

      {subField.type === "object" &&
        (subField.subDescription.length
          ? subField.subDescription.map((subField, index) => {
              return (
                <NestedField
                  key={index + i}
                  subField={subField}
                  schema={schema}
                  setSchema={setSchema}
                  i={index}
                  index={i}
                  indent={1}
                  level={level + 1}
                  parentIndex={parentIndex}
                />
              );
            })
          : null)}
    </>
  );
};

export default NestedField;
