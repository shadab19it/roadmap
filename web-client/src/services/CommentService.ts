import { API } from "../backendApi";

export interface IResComment {
  comment_id: number;
  content: string;
  parent_comment_id: number;
  parent_request_id: number | null;
  author_id: number;
  createdAt: string;
}
export interface IAddComment {
  comment: string;
  userId: number | string;
  requestId: number | string;
}
export interface IAddResCommnet {
  msg: string;
  commentId: number | string;
}
export interface IResMsg {
  msg: string;
}

export const getFeatureComment = async (requestId: string, onSuccess: (r: IResComment[]) => void) => {
  try {
    const res = await fetch(`${API}/feature/comment/${requestId}`, {
      method: "GET",
    });
    if (res.status === 200 && res.body) {
      const r = (await res.json()) as IResComment[];
      onSuccess(r);
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

export const addFeatureComment = async ({ comment, userId, requestId }: IAddComment, onSuccess: (r: IAddResCommnet) => void) => {
  try {
    const res = await fetch(`${API}/feature/comment/add/${userId}/${requestId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });

    if (res.status === 201 && res.body) {
      const r = (await res.json()) as IAddResCommnet;
      onSuccess(r);
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (commentId: number, onSuccess: (r: IResMsg) => void) => {
  try {
    const res = await fetch(`${API}/feature/comment/delete/${commentId}`, { method: "DELETE" });
    if (res.status === 201) {
      const r = (await res.json()) as IResMsg;
      onSuccess(r);
    } else if (res.status === 400) {
      console.log("someting wents wrong comment not delete");
    }
  } catch (err) {
    console.log(err);
  }
};

interface IEditCommentRes {
  comment: string;
  commentId: number;
}

export const updateComment = async ({ comment, commentId }: IEditCommentRes, onSuccess: (r: IResMsg) => void) => {
  try {
    const res = await fetch(`${API}/feature/comment/update/${commentId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });

    if (res.status === 201 && res.body) {
      const r = (await res.json()) as IResMsg;
      onSuccess(r);
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};
