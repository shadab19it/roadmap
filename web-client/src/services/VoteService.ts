import { API } from "../backendApi";
import { IResMsg } from "./CommentService";

export interface IVote {
  currentUserId: number;
  requestId: number;
}

export interface getAllVotes {
  vote_id: number;
  vote: number;
  parent_request_id: number;
  author_id: number;
}

export interface IAddResVote {
  msg: string;
  voteId: number;
}

export interface IVoteId {
  vote_id?: number | undefined;
}

export const addVotes = async (vote: IVote, onSuccess: (r: IAddResVote) => void) => {
  try {
    const res = await fetch(`${API}/feature/vote/add/${vote.currentUserId}/${vote.requestId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote: 1 }),
    });

    if (res.status === 201 && res.body) {
      const r = (await res.json()) as IAddResVote;
      onSuccess(r);
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllVoteByFeatureId = async (requestId: number, onSuccess: (r: getAllVotes[]) => void) => {
  try {
    const res = await fetch(`${API}/feature/vote/getall/${requestId}`, {
      method: "GET",
    });
    if (res.status === 201 && res.body) {
      const r = (await res.json()) as getAllVotes[];
      onSuccess(r);
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteVote = async (voteId: number, userId: number, onSuccess: (r: IResMsg) => void) => {
  try {
    const res = await fetch(`${API}/feature/vote/delete/${voteId}/${userId}`, { method: "DELETE" });
    if (res.status === 201) {
      const r = (await res.json()) as IResMsg;
      onSuccess(r);
    } else if (res.status === 400) {
      console.log("someting wents wrong votes not delete");
    }
  } catch (err) {
    console.log(err);
  }
};
