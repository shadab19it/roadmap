import React, { FC, useState, useContext, useEffect } from "react";
import { Button } from "antd";
import "./AddFeatures.scss";
import { useHistory, useParams } from "react-router-dom";
import { addNewFeature, getFeatureById, updateFeatureInfo } from "../../services/FeatureService";
import { openNotification } from "../../components/comman/ErrorHandle/ErrorHandle";
import { UserContext } from "../../context/userContext";
import { isAuthenticated, User } from "../../services/AuthService";

interface IState {
  title: string;
  description: string;
  isSucess: boolean;
  didRedirect: boolean;
}
interface IParams {
  requestId: string;
}

const AddFeatures: FC = () => {
  let history = useHistory();
  const { requestId } = useParams() as IParams;
  const [state, setState] = useState<IState>({
    title: "",
    description: "",
    isSucess: false,
    didRedirect: false,
  });
  const currentUser: User = isAuthenticated() ? isAuthenticated() : "";
  const { title, description } = state;

  const handleChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, [fieldName]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!title && !description) {
      return openNotification("warning", "Please Enter any detail");
    }
    addNewFeature({ title, description, currentUserId: currentUser.id }, (r) => {
      if (r.request_id) {
        setState({ ...state, title: "", description: "", isSucess: true, didRedirect: true });
        return openNotification("success", "Your Request Accepted , Thank you");
      }
    });
  };

  const onEditSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!title || !description) {
      return openNotification("warning", "Please Enter any detail");
    }
    updateFeatureInfo({ title, description, currentUserId: currentUser.id, requestId }, (r) => {
      setState({ ...state, title: "", description: "", isSucess: true, didRedirect: true });
      history.push(`/addcomment/${requestId}/${currentUser.id}`);
      return openNotification("success", r.msg);
    });
  };

  const fetchFeatureInfo = () => {
    if (requestId) {
      getFeatureById(requestId, (r) => {
        setState({ ...state, title: r.title, description: r.description });
      });
    }
  };

  useEffect(() => {
    fetchFeatureInfo();
  }, [requestId]);

  return (
    <div className='addfeature-wrapper'>
      <div className='addfeature-box'>
        {requestId ? <div className='title'>Update a feature</div> : <div className='title'>Suggest a feature</div>}

        <p className='desc'>What should we build to make Gigahex more useful for you?</p>
        <form className='form'>
          <div className='form-group'>
            <div className='label'>TITLE</div>
            <input
              type='text'
              placeholder='A feature you really need'
              value={state.title}
              onChange={(e) => handleChange("title", e)}
              style={{ height: 40, marginBottom: "3px" }}
              className='input-field'
              required
            />
          </div>
          <div className='form-group'>
            <div className='label'>DETAILS</div>
            <textarea
              value={description}
              placeholder='What would you use it for?'
              onChange={(e) => handleChange("description", e)}
              className='input-field'
              required
              rows={5}></textarea>
          </div>
          <div className='action-btn'>
            <div className='go-back' onClick={() => history.push(requestId ? `/addcomment/${requestId}/${currentUser.id}` : "/")}>
              go back
            </div>
            {requestId ? (
              <Button type='primary' size='large' className='btn' onClick={onEditSubmit}>
                Edit
              </Button>
            ) : (
              <Button type='primary' size='large' className='btn' onClick={handleSubmit}>
                Save
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFeatures;
