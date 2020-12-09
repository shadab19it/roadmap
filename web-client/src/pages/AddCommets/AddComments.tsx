import React, { FC, useState, useEffect, useContext } from "react";
import { Avatar, Dropdown, Menu, Tooltip } from "antd";
import "./Comments.scss";
import { useParams, useHistory } from "react-router-dom";
import { getFeatureById, IResFeature } from "../../services/FeatureService";
import { getFeatureComment, IResComment, addFeatureComment, deleteComment, updateComment } from "../../services/CommentService";
import { getUserById, isAuthenticated, User } from "../../services/AuthService";
import CommentView from "./CommentView";
import { openNotification } from "../../components/comman/ErrorHandle/ErrorHandle";
import CommentForm from "./CommentForm";
import { UserContext } from "../../context/userContext";
import FeatureVote from "../../components/FeatureVote/FeatureVote";
import moment from "moment";
import { DownOutlined } from "@ant-design/icons/lib/icons";

interface IState {
  feature: IResFeature;
}
interface IParams {
  requestId: string;
  authId: string;
}

const AddComments: FC = () => {
  const defaultUserPic = "https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1";
  const history = useHistory();
  const { requestId, authId } = useParams() as IParams;
  const [comment, setComment] = useState<string>("");
  const [reloadState, setReloadState] = useState<boolean>(false);
  const [allcomments, setAllComment] = useState<IResComment[]>([]);

  const currentUser: User = isAuthenticated() ? isAuthenticated() : "";

  // Featurea details info
  const [state, setState] = useState<IState>({
    feature: {
      author_id: -1,
      request_id: -1,
      title: "",
      description: "",
      createdAt: "",
    },
  });
  const { feature } = state;

  // feature aurhor Info
  const [author, setAuthor] = useState<User>({
    id: -1,
    name: "",
    email: "",
    profile_image_path: "",
    membertype: "",
  });

  const fetchAllComment = () => {
    getFeatureComment(requestId, (r) => {
      const sortDesc = r.sort((a, b) => b.comment_id - a.comment_id);
      setAllComment(sortDesc);
    });
  };

  const fetchFeatureInfo = () => {
    getFeatureById(requestId, (r) => setState({ ...state, feature: r }));
  };
  const fetchFeatureAuthor = () => {
    getUserById(Number(authId), (r) => {
      setAuthor(r);
    });
  };

  useEffect(() => {
    fetchFeatureInfo();
    fetchFeatureAuthor();
  }, [requestId]);

  useEffect(() => {
    fetchAllComment();
  }, [comment, reloadState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!comment) {
      return openNotification("warning", "Please Enter any Comment");
    }
    addFeatureComment({ comment, userId: currentUser.id, requestId }, (r) => {
      setComment("");
      setReloadState(!reloadState);
    });
  };

  const ConfirmDelete = (commentId: number) => {
    deleteComment(commentId, (r) => {
      openNotification("success", r.msg);
      setReloadState(!reloadState);
    });
  };

  const onUpdateComment = (comment: string, commentId: number) => {
    updateComment({ comment, commentId }, (r) => {
      openNotification("success", r.msg);
      setReloadState(!reloadState);
    });
  };

  let featureDate;
  if (feature.createdAt) {
    featureDate = moment(feature.createdAt).format("LL");
  }
  const menu = (
    <Menu>
      <Menu.Item onClick={() => history.push(`/addfeature/edit/${feature.request_id}`)}>Edit</Menu.Item>
    </Menu>
  );

  return (
    <div className='comment-wrapper'>
      {/* Fearure details Info */}
      <div className='featrues-details-info'>
        <div className='header-info'>
          <FeatureVote currentUserId={currentUser.id} requestId={feature.request_id} />
          <div>
            <h3 className='feature-title'>{feature.title}</h3>
            <p className='feature-status'>In Progress</p>
          </div>
          {/* Edit Option */}
          {currentUser.id === feature.author_id && (
            <div className='feature-update-btn'>
              <Tooltip title='Action'>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <div className='dots'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                  </div>
                </Dropdown>
              </Tooltip>
            </div>
          )}
        </div>
        <div className='feature-info'>
          <div className='user-avatar'>
            <Avatar src={author?.profile_image_path || defaultUserPic} />
          </div>
          <div className='auther-info'>
            <h3 className='auther-name'>{author?.name}</h3>
            <p className='feature-desc'>{feature.description}</p>
            <div className='date'>{featureDate}</div>
            {/* CommentForm */}
            <CommentForm comment={comment} handleChange={handleChange} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
      {/* Divider with Text */}
      {allcomments.length > 0 ? (
        <div className='divider-text'>Total Comments {allcomments.length}</div>
      ) : (
        <div className='divider-text'>No Comments</div>
      )}

      {/* View All Commnets */}
      {allcomments.length > 0 && (
        <div className='view-all-comments'>
          {allcomments.map((c: IResComment, i) => (
            <CommentView comment={c} key={c.comment_id} ConfirmDelete={ConfirmDelete} onUpdateComment={onUpdateComment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddComments;
