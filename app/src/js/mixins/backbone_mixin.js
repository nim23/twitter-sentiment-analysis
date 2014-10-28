'use strict';
/*
Backbone mixin which listens to all the events
on the passed in collection or model and re-renders
the react component using this.forceUpdate.
*/
module.exports = {
	componentDidMount: function(){
			this._boundForceUpdate = this.forceUpdate.bind(this, null);
			this.getBackboneObject().on('all', this._boundForceUpdate, this);
		},
	componentWillUnmount: function(){
			this.getBackboneObject().off('all', this._boundForceUpdate);
		},
	getBackboneObject: function(){
			return this.props.collection || this.props.model;
		}
};
