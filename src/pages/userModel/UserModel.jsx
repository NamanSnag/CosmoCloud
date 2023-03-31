import React from "react";
import { Field } from "../../components";
import { BsPlus } from "react-icons/bs";

import "./style.scss";

const UserModel = () => {
  return (
    <div className="user__container">
      <div className="user__fields">
        <div className="user__head">
          <p>Field name and type</p>
          <BsPlus className="user__plus" />
        </div>

        <div className="user__field">
          <Field />
          <Field />
          <Field />
          <Field />
        </div>
      </div>
    </div>
  );
};

export default UserModel;
