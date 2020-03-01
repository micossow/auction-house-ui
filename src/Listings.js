import {NavLink} from "react-router-dom";
import React from "react";

export function Listings(props) {
    return <div className="col-3">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
            </div>
            <ul className="list-group list-group-flush">
                {props.listings.map((listing, idx) =>
                    <li className="list-group-item" key={idx}>{listing.description}
                        {props.readonly ? <span/> : <NavLink to={`/listing/${listing.id}/cancel`}
                                 className="btn btn-link btn-sm">Cancel</NavLink>}
                    </li>)}
            </ul>
        </div>
    </div>
}
