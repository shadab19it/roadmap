import { Request, Response } from "express";
import { mysqlDB } from "../dbConfig";

interface IFeatureInfo {
  request_id?: string | number;
  title: string;
  description: string;
  author_id?: number;
  feature_status: string;
  createdAt: string;
}

export interface IResponse {
  fiedldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol141: boolean;
  changedRows: number;
}

export interface defaultErr {
  code?: string;
  errno?: number;
  sqlMessage?: string;
  sqlState?: string;
  index?: number;
  sql?: string;
}

export const addFeature = (_req: Request, _res: Response) => {
  const { title, description } = _req.body as IFeatureInfo;
  const featureInfo = { title, description, author_id: _req.params.authId, feature_status: "idia" };

  let query = "INSERT INTO feature_requests SET ?";

  mysqlDB.query(query, featureInfo, (err: defaultErr, result: IResponse) => {
    if (err) {
      return _res.status(400).json({ error: "Feature Info not save in db", default: err });
    }
    return _res.status(201).json({ msg: "Feature Info save in db", request_id: result.insertId });
  });
};
export const updateFeature = (_req: Request, _res: Response) => {
  const { title, description } = _req.body as IFeatureInfo;
  const featureUpdateInfo = { title, description };

  let query = `UPDATE feature_requests SET ? WHERE author_id = ${_req.params.authId} AND request_id = ${_req.params.requestId}`;

  mysqlDB.query(query, featureUpdateInfo, (err: defaultErr, result:IResponse) => {    
    if (err) {
      return _res.status(400).json({ error: "feature not update in db", default: err });
    }
    if(result.affectedRows === 0 ){
      return _res.status(400).json({ error: "Something wents wrong , data not matched" });
    }
    return _res.status(201).json({ msg: "Update feature successfull" });
  });
};

export const getAllFeatureRequest = (_req: Request, _res: Response) => {
  let query = "SELECT * FROM feature_requests";
  mysqlDB.query(query, (err: defaultErr, results: IFeatureInfo[]) => {
    if (err) {
      return _res.status(400).json({ error: "feature Info not found in db" });
    }
    return _res.status(201).json(results);
  });
};

export const getFeatureById = (_req: Request, _res: Response) => {
  let query = `SELECT * FROM feature_requests WHERE request_id = ${_req.params.requestId}`;

  mysqlDB.query(query, (err: defaultErr, result: IFeatureInfo) => {
    if (err) {
      return _res.status(400).json({ error: "Feature not found in db" });
    }
    return _res.status(201).json(result);
  });
};


export const deleteFeature = (_req: Request, _res: Response) => {
  let query = `DELETE FROM feature_requests WHERE request_id = ${_req.params.requestId}`;
  mysqlDB.query(query, (err: defaultErr, result: IResponse) => {
    if (err) {
      return _res.status(400).json({ error: "Feature not deleted" });
    }
    return _res.status(201).json({ msg: "Feature deleted successful" });
  });
};
