import React, { Component } from 'react'
import Recommend from './Recommend';
import Recipe from './Recipe';

export default class recipeResult extends Component {
    state = {
        isRecommended: true
    }
    getDirections = () => {
        this.setState((prevState) => ({ isRecommended: !prevState }))
    }
    render() {
        const { recipes,data } = this.props;
        return (this.state.isRecommended)
            ?
            <Recommend handleClick={this.getDirections} data={data} recipes={recipes} />
            :
            <Recipe handleClick={this.getDirections} data={data} recipes={recipes} />

    }
}
