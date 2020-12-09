import React, { FC, useState, useEffect, useContext } from "react";
import { Input, Avatar, Button, Skeleton, Popconfirm, Tooltip, Divider } from "antd";
import "./Comments.scss";
import { CloseOutlined, HeartOutlined } from "@ant-design/icons";
import { getFeatureComment, IResComment, updateComment } from "../../services/CommentService";
import { getUserById, isAuthenticated, User } from "../../services/AuthService";
import CommentForm from "./CommentForm";
import { openNotification } from "../../components/comman/ErrorHandle/ErrorHandle";
import CommentLike from "../../components/CommetLike/CommentLike";
import moment from "moment";

interface ICommentView {
  comment: IResComment;
  ConfirmDelete: (commentId: number) => void;
  onUpdateComment: (comment: string, commentId: number) => void;
}

const dot = <div className='dot'></div>;

const CommentView: FC<ICommentView> = ({ comment, ConfirmDelete, onUpdateComment }) => {
  const defaultUserPic = "https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1";
  const [isUpdate, setUpdate] = useState<boolean>(false);
  const [editComment, setEditCommnet] = useState<string>(comment.content);
  const [author, setAuthor] = useState<User>({
    id: -1,
    name: "",
    email: "",
    profile_image_path: "",
    membertype: "",
  });
  const currentUser: User = isAuthenticated() ? isAuthenticated() : "";

  const fetchMember = () => {
    getUserById(comment.author_id, (r) => {
      setAuthor(r);
    });
  };

  useEffect(() => {
    fetchMember();
    setEditCommnet(comment.content);
  }, [isUpdate]);

  const CancelDelete = () => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCommnet(e.target.value);
  };

  const onEditSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!editComment) {
      return openNotification("warning", "Please Enter any Comment");
    }
    onUpdateComment(editComment, comment.comment_id);
    setUpdate(false);
  };

  let deleteOpt;
  let editOpt;
  if (currentUser.id === comment.author_id) {
    deleteOpt = (
      <>
        {dot}
        <Popconfirm
          title='Are you sure delete this Comment'
          onConfirm={() => ConfirmDelete(comment.comment_id)}
          onCancel={CancelDelete}
          okText='Yes'
          cancelText='No'>
          <div className='delete-comment'>delete</div>
        </Popconfirm>
      </>
    );
    editOpt = (
      <>
        {dot}
        <div className='edit-comment' onClick={() => setUpdate(true)}>
          edit
        </div>
      </>
    );
  }
  let commentDate;
  if (comment.createdAt) {
    commentDate = moment(comment.createdAt).format("MMM Do , h:mm");
  }

  return (
    <>
      <div className='each-comment'>
        <div className='user-avatar'>
          <Avatar src={author.profile_image_path || defaultUserPic} />
        </div>
        <div className='comment-detail'>
          <div className='author-name'>{author.name}</div>
          {isUpdate ? (
            <div className='edit-comment-field'>
              <CommentForm
                comment={editComment}
                handleChange={handleChange}
                onSubmit={onEditSubmit}
                update={isUpdate}
                setUpdate={setUpdate}
              />
            </div>
          ) : (
            <>
              <div className='comment-msg'>{comment.content}</div>
              <div className='comment-footer'>
                <CommentLike commentId={comment.comment_id} currentUserId={currentUser.id} />
                {dot}
                {commentDate}
                {editOpt}
                {deleteOpt}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentView;
