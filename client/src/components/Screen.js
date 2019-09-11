import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recipe from './Recommend';


const Checkbox = ({ check }) => {
    return (
        <div className="form-group form-check col-xs-12 col-sm-6 col-md-4 d-flex flex-row m-auto">
            <label className="form-check-label">
                <input className="form-check-input mr-auto" type="checkbox" name={check} /> {check}
            </label>
        </div>
    )
}
export default class Screen extends Component {
    render() {
        const { path, btns, checkboxes, title, subTitle, badge } = this.props.data;
        const { amount } = this.props;

        return (
            <div className="col inner cover">
                {(typeof badge !== 'undefined') &&
                    <div className="badge badge-secondary">{`${badge}/${amount}`}</div>}
                <h1 className="cover-heading">{title}.</h1>
                {(subTitle) && <p className="lead">{subTitle}.</p>}
                <div className="row checbox-list justify-content-flex-end">
                    {checkboxes.map((check, i) => (<Checkbox key={i} check={check} />))}
                </div>
                <div className="row">
                    {btns.map((btn, i) => (
                        <div key={i} className="col-xs-12 col-sm-6 col-md-4 d-flex justify-content-center m-auto">
                            <Link to={btn.src} className="btn btn-lg btn-secondary">{btn.text}</Link>
                        </div>
                    ))}
                </div>

            </div>
        )
    }
}