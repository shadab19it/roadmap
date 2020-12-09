import { API } from "../backendApi";
import { OpenModelMsg, openNotification } from "../components/comman/ErrorHandle/ErrorHandle";
import { IResError } from "./CommentLikeService";
import { IResMsg } from "./CommentService";

export interface IResFeature {
  request_id: number;
  title: string;
  description: string;
  author_id: number;
  createdAt: string;
}
export interface IAddFeature {
  title: string;
  description: string;
  currentUserId: number;
  requestId?: string;
}

export interface IAddFeatureRes {
  msg: string;
  request_id: number | string;
}

export const getAllFeatures = async (onSuccess: (r: IResFeature[]) => void) => {
  try {
    const res = await fetch(`${API}/feature/getall`, {
      method: "GET",
    });
    if (res.status === 201 && res.body) {
      const r = (await res.json()) as IResFeature[];
      onSuccess(r);
    } else {
      const r = await res.json();
      OpenModelMsg(r);
    }
  } catch (err) {
    OpenModelMsg(err);
  }
};

export const addNewFeature = async (feature: IAddFeature, onSuccess: (r: IAddFeatureRes) => void) => {
  try {
    const res = await fetch(`${API}/feature/add/${feature.currentUserId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feature),
    });
    if (res.status === 201 && res.body) {
      const r = (await res.json()) as IAddFeatureRes;
      onSuccess(r);
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getFeatureById = async (featureId: string, onSuccess: (r: IResFeature) => void) => {
  try {
    const res = await fetch(`${API}/feature/get/${featureId}`, {
      method: "GET",
    });
    if (res.status === 201 && res.body) {
      const r = (await res.json()) as IResFeature[];
      onSuccess(r[0]);
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateFeatureInfo = async (feature: IAddFeature, onSuccess: (r: IAddFeatureRes) => void) => {
  console.log(feature.currentUserId, feature.requestId);

  try {
    const res = await fetch(`${API}/feature/update/${feature.currentUserId}/${feature.requestId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feature),
    });
    if (res.status === 201 && res.body) {
      const r = (await res.json()) as IAddFeatureRes;
      onSuccess(r);
    } else {
      const r = (await res.json()) as IResError;
      console.log(r);
      openNotification("error", r.error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchDeleteFeature = async (requestId: number, onSuccess: (r: IResMsg) => void) => {
  try {
    const res = await fetch(`${API}/feature/delete/${requestId}`, { method: "DELETE" });
    if (res.status === 201) {
      const r = (await res.json()) as IResMsg;
      onSuccess(r);
    } else if (res.status === 400) {
      openNotification("error", "someting wents wrong comment not delete");
    }
  } catch (err) {
    console.log(err);
  }
};
