import React, { FC, useState, useEffect } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

import { addLike, deleteLike, getAllLikeByCommentId, getAllLikes, ILike } from "../../services/CommentLikeService";

import { openNotification } from "../comman/ErrorHandle/ErrorHandle";

const CommentLike: FC<ILike> = ({ commentId, currentUserId }) => {
  const [allLikes, setAllLikes] = useState<getAllLikes[]>([]);
  const [isLike, setLike] = useState<boolean>(false);
  const [likeId, setLikeId] = useState<any>(null);

  const AddedLike = () => {
    addLike({ currentUserId, commentId }, (r) => {
      openNotification("success", r.msg);
      setLike(true);
    });
  };

  const RemoveLike = () => {
    deleteLike(likeId, currentUserId, (r) => {
      openNotification("success", r.msg);
      setLike(false);
    });
  };

  const SubmitVotes = () => {
    if (!isLike) {
      return AddedLike();
    }
    return RemoveLike();
  };

  useEffect(() => {
    getAllLikeByCommentId(commentId, (r) => {
      if (r.length !== 0) {
        setAllLikes(r);
        const isVoted = r.filter((v) => v.author_id === currentUserId);
        if (isVoted.length !== 0) {
          setLikeId(isVoted[0].comment_like_id);
          setLike(true);
        }
      } else {
        setAllLikes([]);
      }
    });
  }, [isLike, commentId]);

  return (
    <>
      <div className='comment-like' style={{ color: isLike ? "red" : "" }} onClick={SubmitVotes}>
        {isLike ? <HeartFilled /> : <HeartOutlined />}
      </div>
      <span className='likes'>{allLikes.length}</span>
    </>
  );
};

export default CommentLike;
