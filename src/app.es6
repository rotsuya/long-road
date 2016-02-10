var React = require("react");
var ReactDOM = require("react-dom");
var Slider = React.createClass({
    render: () => {
        return (
            <input type="range" min="0" max="105" />
        );
    }
});
ReactDOM.render(
    <Slider />,
    document.getElementById('content')
)
