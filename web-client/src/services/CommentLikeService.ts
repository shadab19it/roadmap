import { API } from "../backendApi";
import { openNotification } from "../components/comman/ErrorHandle/ErrorHandle";
import { IResMsg } from "./CommentService";

export interface ILike {
  currentUserId: number;
  commentId: number;
}

export interface getAllLikes {
  comment_like_id: number;
  likes: number;
  parent_comment_id: number;
  author_id: number;
}

export interface IAddResLike {
  msg: string;
  likeId: number;
}
export interface IResError {
  error: string;
}

export interface IVoteId {
  comment_like_id?: number | undefined;
}

export const addLike = async (like: ILike, onSuccess: (r: IAddResLike) => void) => {
  try {
    const res = await fetch(`${API}/comment/like/add/${like.currentUserId}/${like.commentId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: 1 }),
    });

    if (res.status === 201 && res.body) {
      const r = (await res.json()) as IAddResLike;
      onSuccess(r);
    } else {
      const r = (await res.json()) as IResError;
      openNotification("error", r.error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllLikeByCommentId = async (commentId: number, onSuccess: (r: getAllLikes[]) => void) => {
  try {
    const res = await fetch(`${API}/comment/like/getall/${commentId}`, {
      method: "GET",
    });
    if (res.status === 201 && res.body) {
      const r = (await res.json()) as getAllLikes[];
      onSuccess(r);
    } else {
      const r = (await res.json()) as IResError;
      openNotification("error", r.error);
      console.log(r);
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteLike = async (likeId: number, userId: number, onSuccess: (r: IResMsg) => void) => {
  try {
    const res = await fetch(`${API}/comment/like/delete/${likeId}/${userId}`, { method: "DELETE" });
    if (res.status === 201) {
      const r = (await res.json()) as IResMsg;
      onSuccess(r);
    } else if (res.status === 400) {
      const r = (await res.json()) as IResError;
      openNotification("error", r.error);
      console.log(r);
    }
  } catch (err) {
    console.log(err);
  }
};
