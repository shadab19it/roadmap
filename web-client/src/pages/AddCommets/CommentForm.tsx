import { Button, Input } from "antd";
import React, { FC } from "react";
import { CloseOutlined, HeartOutlined } from "@ant-design/icons";

export interface IAddComment {
  comment: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  update?: boolean;
  setUpdate?: any;
}

const AddCommentField: FC<IAddComment> = ({ comment, handleChange, onSubmit, update, setUpdate }) => {
  return (
    <div className='comment-field'>
      <Input.Group compact>
        <Input
         style={{width:'80%',height:"40px"}}
          className='comment-input'
          placeholder={update ? "Edit a Comment" : "Write a Comment"}
          value={comment}
          onChange={handleChange}
        />
        <Button type='primary' style={{width:'20%' , height:"40px"}} onClick={onSubmit}>
          {update ? "Edit" : "Add"}
        </Button>
      </Input.Group>
      {update && (
        <div className='edit-cancel-btn' onClick={() => setUpdate(false)}>
          <CloseOutlined />
        </div>
      )}
    </div>
  );
};

export default AddCommentField;
