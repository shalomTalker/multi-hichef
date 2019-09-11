import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Properties from './Properties';


export default class Recommend extends Component {

    render() {
        const { name, ingredients, level, preparingTime, directions } = this.props.recipes[0];
        const { title, recommendbtns } = this.props.data;
        // const { recipeName } = this.props.match.params;
        return (
            <div id="recommend" style={{ width: "100%" }}>
                <h1 className="cover-heading">{title}.</h1>
                <div className="col d-flex justify-content-center m-auto">
                    <div className="card" style={{ color: "black" }}>
                        <div className="card-body">
                            <h2>{name}</h2>
                            <Properties {...{ ingredients, level, preparingTime }} />
                            <h4 className="mb-2 text-muted">Ingredients</h4>
                            <p style={{ textAlign: "center" }} id="ingredients_list">
                                {ingredients.toString()}
                            </p>
                            <div className="recommend-buttons row">
                                {recommendbtns.map((btn, i) => (
                                    <div key={i} className="col-xs-2  d-flex justify-content-center m-auto">
                                        {(btn.src)
                                            ?
                                            <Link to={btn.src} className="btn btn-lg btn-secondary">{btn.text}</Link>
                                            :
                                            <button onClick={this.props.handleClick} className="btn btn-lg btn-secondary">{btn.text}</button>

                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
