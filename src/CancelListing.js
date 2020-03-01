import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import fetchWithAuth from "./Utils";

function CancelListing(props) {
  let {listingId} = useParams();
  let history = useHistory();

  let yes = async () => {
    let resp = await fetchWithAuth(`/api/v1/listing/${listingId}/cancel`, {
      method: 'POST'
    });
    if (resp.ok) {
      history.push('/');
    } else {
    }
  };

  let no = () => {
    history.push('/');
  };

  return <>
    <p>Are you sure you want to cancel?</p>
    <button className="btn btn-primary" onClick={yes}>Yes</button>
    <span> </span>
    <button className="btn btn-secondary" onClick={no}>No</button>
    </>
}

export default CancelListing;
