import React, { FC, useState, useEffect } from "react";

import { addVotes, deleteVote, getAllVoteByFeatureId, getAllVotes, IVote } from "../../services/VoteService";
import "./FeatureVote.scss";
import { openNotification } from "../comman/ErrorHandle/ErrorHandle";
import { Tooltip } from "antd";

const FeatureVote: FC<IVote> = ({ requestId, currentUserId }) => {
  const [allVotes, setAllVotes] = useState<getAllVotes[]>([]);
  const [isVote, setVote] = useState<boolean>(false);
  const [voteId, setVoteId] = useState<any>(null);

  const Addedvotes = () => {
    addVotes({ currentUserId, requestId }, (r) => {
      openNotification("success", r.msg);
      setVote(true);
    });
  };

  const RemoveVotes = () => {
    deleteVote(voteId, currentUserId, (r) => {
      openNotification("success", r.msg);
      setVote(false);
    });
  };

  const SubmitVotes = () => {
    if (!isVote) {
      return Addedvotes();
    }
    return RemoveVotes();
  };

  useEffect(() => {
    getAllVoteByFeatureId(requestId, (r) => {
      if (r.length !== 0) {
        setAllVotes(r);
        const isVoted = r.filter((v) => v.author_id === currentUserId);
        if (isVoted.length !== 0) {
          setVoteId(isVoted[0].vote_id);
          setVote(true);
        }
      } else {
        setAllVotes([]);
      }
    });
  }, [isVote, requestId, currentUserId]);

  return (
    <Tooltip title='Vote'>
      <div className='feature-vote' style={{ color: isVote ? "#5f72f2" : "" }} onClick={SubmitVotes}>
        <div className='arrow-up' style={{ borderBottomColor: isVote ? "#5f72f2" : "" }}></div>
        <span>{allVotes.length}</span>
      </div>
    </Tooltip>
  );
};

export default FeatureVote;
