import { Request, Response } from "express";
import { mysqlDB } from "../dbConfig";
import { IResponse, defaultErr } from "./featureReques";

interface Vote {
  vote: number;
}

interface getAllFeatureVotes {
  vote_id: number;
  vote: number;
  parent_request_id: number;
  author_id: number;
}

export const addVotes = (_req: Request, _res: Response) => {
  const { authId, requestId } = _req.params;
  const { vote } = _req.body as Vote;
  const voteInfo = { vote, author_id: authId, parent_request_id: requestId };
  let query = `INSERT INTO feature_votes SET ?`;
  mysqlDB.query(query, voteInfo, (err: defaultErr, result: IResponse) => {
    if (err) {
      return _res.status(400).json({ error: "Vote not save in db" });
    }
    return _res.status(201).json({ msg: "Vote save successfull in db", voteId: result.insertId });
  });
};

export const getAllVoteByFeatureId = (_req: Request, _res: Response) => {
  let query = `SELECT * FROM feature_votes WHERE parent_request_id = ${_req.params.requestId}`;
  mysqlDB.query(query, (err: defaultErr, results: getAllFeatureVotes[]) => {
    if (err) {
      return _res.status(500).json({ error: "Votes not found in db" });
    }
    return _res.status(201).json(results);
  });
};

export const deleteVoteById = (_req: Request, _res: Response) => {
  let query = `DELETE FROM feature_votes WHERE vote_id = ${_req.params.voteId}`;
  mysqlDB.query(query, (err: defaultErr, result: IResponse) => {
    if (err) {
      return _res.status(400).json({ error: "vote not deleted" });
    }
    return _res.status(201).json({ msg: "vote Remove successful" });
  });
};
