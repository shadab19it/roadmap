import { Request, Response } from "express";
import { mysqlDB } from "../dbConfig";
import { IResponse, defaultErr } from "./featureReques";

interface like {
  likes: number;
}

interface getAllCommentLikes {
  comment_like_id: number;
  likes: number;
  parent_comment_id: number;
  author_id: number;
}

export const addLikes = (_req: Request, _res: Response) => {
  const { authId, commentId } = _req.params;
  const { likes } = _req.body as like;
  const likeInfo = { likes, author_id: authId, parent_comment_id: commentId };
  let query = `INSERT INTO comment_likes SET ?`;
  mysqlDB.query(query, likeInfo, (err: defaultErr, result: IResponse) => {
    if (err) {
      return _res.status(400).json({ error: err });
    }
    return _res.status(201).json({ msg: "You have Liked", likeId: result.insertId });
  });
};

export const getAllLikeByCommentId = (_req: Request, _res: Response) => {
  let query = `SELECT * FROM comment_likes WHERE parent_comment_id = ${_req.params.commentId}`;
  mysqlDB.query(query, (err: defaultErr, results: getAllCommentLikes[]) => {
    if (err) {
      return _res.status(500).json({ error: "Likes not found in db" });
    }
    return _res.status(201).json(results);
  });
};

export const deleteLikeById = (_req: Request, _res: Response) => {
  let query = `DELETE FROM comment_likes WHERE comment_like_id = ${_req.params.likeId} AND author_id = ${_req.params.authId}`;
  mysqlDB.query(query, (err: defaultErr, result: IResponse) => {
    if (err) {
      return _res.status(400).json({ error: "Like not Remove" });
    }
    return _res.status(201).json({ msg: "Unlike" });
  });
};
