import React from "react";
const TextBox = ({ labelName, regName, typeName, formReg, errObj }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{labelName}</label>
      <input
        type={typeName}
        className="form-control"
        // onChange={(e) => setName(e.target.value)}
        {...formReg}
      />
    </div>
  );
};

export default TextBox;
