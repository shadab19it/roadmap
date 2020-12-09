import React, { FC, useEffect, useState } from "react";
import "./Roadmaps.scss";
import { Row, Tag, Affix, Skeleton } from "antd";
import { useHistory } from "react-router-dom";
import { fetchDeleteFeature, getAllFeatures, IResFeature } from "../../services/FeatureService";
import RoadmapCol from "./RoadmapCol";
import { openNotification } from "../../components/comman/ErrorHandle/ErrorHandle";

interface IState {
  features: IResFeature[];
  refres: boolean;
  loading: boolean;
}

const Roadmaps: FC = () => {
  let history = useHistory();
  const [state, setState] = useState<IState>({
    features: [],
    refres: true,
    loading: true,
  });
  const fetchAllFeatures = () => {
    getAllFeatures((r) => setState({ ...state, features: r, loading: false }));
  };

  useEffect(() => {
    fetchAllFeatures();
  }, [state.refres]);

  const deleteFeature = (requestId: number) => {
    fetchDeleteFeature(requestId, (r) => {
      openNotification("success", r.msg);
      setState({ ...state, refres: !state.refres });
    });
  };
  return (
    <div className='roadmap-wrapper'>
      <div className='rd-header-container'>
        <div className='feature-request' onClick={() => history.push("/addfeature")}>
          Propose New feature
        </div>
        <div className='job-header-text'>Roadmap 2020</div>
      </div>
      <Row className='roadmap-row'>
        <RoadmapCol status='ideas' loading={state.loading} features={state.features} deleteFeature={deleteFeature} />
        {/* <RoadmapCol status='ideas' loading={state.loading} features={state.features} deleteFeature={deleteFeature} /> */}
        {/* <RoadmapCol status='ideas' loading={state.loading} features={state.features} deleteFeature={deleteFeature} /> */}
      </Row>
    </div>
  );
};

export default Roadmaps;
