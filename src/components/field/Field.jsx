import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

import "./style.scss";

const Field = () => {
  return (
    <div className="field__container">
      <p>1.</p>

      <div className="field__type">
        person
        <select className="field__dropdown">
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
          <option value="object">Object</option>
        </select>
      </div>

      <div className="field__hover">
        <label className="field__switch">
          Required
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
        <RiDeleteBin5Line className="delete" />
      </div>
    </div>
  );
};

export default Field;
