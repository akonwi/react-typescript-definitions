/// <reference path="react.d.ts" />
var data = [
	"Write definitions",
	"Build app",
	"Profit"
];

var _ = React.DOM;

var App: React.Component = React.createClass({
	render: function() {
		return _.div({ className: 'container' },
			_.h1(null, "Todo App"),
			TodoList({ data: data })
		);
	}
});

var TodoList: React.Component = React.createClass({
	render: function () { 
		var todos: React.Component[];
		todos = this.props.data.map((todo: string) => {
			return Todo({ title: todo });
		});
		return _.ul(null, todos);
	}
}); 

var Todo: React.Component = React.createClass({
	getInitialState: () => {
		return { done: false };
	},
	toggleDone: function (event: React.SyntheticEvent) {
		this.setState({ done: !this.state.done });
	},
	render: function () {
		return _.li({ className: this.state.done ? 'done' : '', onClick: this.toggleDone }, this.props.title)
	}
});

window.onload = () => {
	React.renderComponent(App(), document.getElementById('content'));
};
