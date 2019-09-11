import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import RecipeContent from './RecipeContent';

export default class Recipe extends Component {
    render() {
        const recipe = this.props.recipes[0]
        const { title, recipebtns, subTitle } = this.props.data;
        // const { recipeName } = this.props.match.params;
        return (
            <div id="recommend" style={{ width: "100%", marginTop: '1rem' }}>
                <div className="col d-flex justify-content-center m-auto">
                    <div className="card" style={{ color: "black" }}>
                        <div className="card-body">
                           <RecipeContent {...recipe}/>
                            <div className="recommend-buttons row">
                                {recipebtns.map((btn, i) => (
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
