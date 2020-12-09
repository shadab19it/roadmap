import { Request, Response } from "express";
import { mysqlDB } from "../dbConfig";
import { IResponse, defaultErr } from "./featureReques";

interface IFeatureComment {
  comment_id?: number;
  request_id: number;
  author_id: number;
  parent_request_id: number;
  parent_comment_id: number;
  createdAt: string;
}

export const addFeatureComment = (_req: Request, _res: Response) => {
  const { comment } = _req.body as { comment: string };
  const { requestId, authId } = _req.params;

  const commentInfo = { content: comment, parent_request_id: requestId, author_id: authId };
  let query = "INSERT INTO feature_comments SET ?";

  mysqlDB.query(query, commentInfo, (err: defaultErr, result: IResponse) => {
    if (err) {
      return _res.status(400).json({ error: "Commnet  not save in db", default: err });
    }
    return _res.status(201).json({ msg: "Comment save in db", commentId: result.insertId });
  });
};

export const getCommentById = (_req: Request, _res: Response) => {
  let query = `SELECT * FROM feature_comments WHERE comment_id = ${_req.params.commentId}`;

  mysqlDB.query(query, (err: defaultErr, result: IFeatureComment) => {
    if (err) {
      return _res.status(400).json({ error: "Comment not found in db" });
    }
    return _res.status(200).json(result);
  });
};

export const getCommentByReqId = (_req: Request, _res: Response) => {
  let query = `SELECT * FROM feature_comments WHERE parent_request_id = ${_req.params.requestId}`;

  mysqlDB.query(query, (err: defaultErr, result: IFeatureComment) => {
    if (err) {
      return _res.status(400).json({ error: "Comment not found in db" });
    }
    return _res.status(200).json(result);
  });
};

export const getAllFeatureComment = (_req: Request, _res: Response) => {
  let query = "SELECT * FROM feature_comments";
  mysqlDB.query(query, (err: defaultErr, results: IFeatureComment[]) => {
    if (err) {
      return _res.status(400).json({ error: "feature Info not found in db" });
    }
    return _res.status(201).json(results);
  });
};

export const updataComment = (_req: Request, _res: Response) => {
  const { comment } = _req.body as { comment: string };
  let query = `UPDATE feature_comments SET ? WHERE comment_id = ${_req.params.commentId}`;
  mysqlDB.query(query, { content: comment }, (err: defaultErr, result: IResponse) => {
    if (err) {
      return _res.status(400).json({ error: "Comment not update in db" });
    }
    return _res.status(201).json({ msg: "Update Comment successfull" });
  });
};

export const deleteComment = (_req: Request, _res: Response) => {
  let query = `DELETE FROM feature_comments WHERE comment_id = ${_req.params.commentId}`;
  mysqlDB.query(query, (err: defaultErr, result: IResponse) => {
    if (err) {
      return _res.status(400).json({ error: "comment not deleted", default: err });
    }
    return _res.status(201).json({ msg: "Comment deleted successful" });
  });
};
