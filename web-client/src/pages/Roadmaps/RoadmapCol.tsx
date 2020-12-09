import React, { FC, useEffect, useState, useContext } from "react";
import "./Roadmaps.scss";
import { Row, Col, Tag, Card, Affix, Skeleton, Popconfirm, Tooltip, Dropdown, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { IResFeature } from "../../services/FeatureService";
import { UserContext } from "../../context/userContext";
import FeatureVote from "../../components/FeatureVote/FeatureVote";
import { DeleteOutlined } from "@ant-design/icons/lib/icons";
import { openNotification } from "../../components/comman/ErrorHandle/ErrorHandle";
import { isAuthenticated, User } from "../../services/AuthService";

export type FeatureStatus = "ideas" | "progress" | "done";
const StatusTag: React.FC<{ status: FeatureStatus }> = (props) => {
  switch (props.status) {
    case "ideas":
      return (
        <Tag color='#b9b9b9' className='statusBar'>
          Ideas
        </Tag>
      );
    case "progress":
      return (
        <Tag color='geekblue' className='statusBar'>
          In Progress
        </Tag>
      );
    case "done":
      return (
        <Tag color='magenta' className='statusBar'>
          Done
        </Tag>
      );
  }
};
interface IRoadmapCol {
  status: FeatureStatus;
  loading: boolean;
  features: IResFeature[];
  deleteFeature: (requestId: number) => void;
}

const DeleteFeature: FC<{ requestId: number; deleteFeature: (requestId: number) => void }> = ({ requestId, deleteFeature }) => {
  return (
    <div className='delete-feature-btn'>
      <Popconfirm
        title='Are you sure to delete this Feature'
        onConfirm={() => deleteFeature(requestId)}
        onCancel={() => {}}
        okText='Yes'
        cancelText='No'>
        <div className='delete-comment'>
          <DeleteOutlined />
        </div>
      </Popconfirm>
    </div>
  );
};

const RoadmapCol: FC<IRoadmapCol> = ({ loading, status, features, deleteFeature }) => {
  let history = useHistory();
  const currentUser: User = isAuthenticated() ? isAuthenticated() : "";

  return (
    <Col span={7} xl={7} md={7} sm={24} xs={24} className='roadmap-col'>
      <div className='col-header-status'>
        <StatusTag status={status} />
      </div>
      <div className='allfeature-view'>
        <Skeleton loading={loading} title={false} paragraph={{ rows: 10 }} active avatar={false}>
          {features.map((f: IResFeature, i: number) => (
            <Card key={f.request_id} className='rm-feature-card' bordered={false}>
              <FeatureVote currentUserId={currentUser.id} requestId={f.request_id} />
              <div>
                <div className='f-name' onClick={() => history.push(`/addcomment/${f.request_id}/${f.author_id}`)}>
                  {f.title.trim()}
                </div>
                <div className='tags'>
                  <Tag color='geekblue'>tags</Tag>
                  <Tag color='geekblue'>tags</Tag>
                </div>
              </div>
              {currentUser.membertype === "admin" && <DeleteFeature requestId={f.request_id} deleteFeature={deleteFeature} />}
            </Card>
          ))}
        </Skeleton>
      </div>
    </Col>
  );
};

export default RoadmapCol;
