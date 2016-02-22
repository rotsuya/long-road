var React = require("react");
var ReactDOM = require("react-dom");
var Birthday = React.createClass({
    render: () => {
        return (
            <div>
            <h1>誕生日</h1>
            <BirthdayForm />
            </div>
        );
    }
});
var BirthdayForm = React.createClass({
    render: () => {
        return (
            <div>
                <input type="number" min="1911" max="2016" step="1" />
                <label>年</label>
                <input type="number" min="1" max="12" step="1" />
                <label>月</label>
                <input type="number" min="1" max="31" step="1" />
                <label>日</label>
            </div>
        );
    }
});
var Query = React.createClass({
    render: () => {
        return (
            <div>
                <h1>調べる日</h1>
                <button>今日</button>
                <QueryDate />
                <QueryAge />
                <Slider />
            </div>
        );
    }
});
var QueryDate = React.createClass({
    render: () => {
        return (
            <div>
                <input type="number" step="1" />
                <label>年</label>
                <input type="number" step="1" />
                <label>月</label>
                <input type="number" step="1" />
                <label>日</label>
            </div>
        );
    }
});
var QueryAge = React.createClass({
    render: () => {
        return (
            <div>
                <input type="number" min="0" max="105" step="1" />
                <label>歳</label>
                <input type="number" min="0" step="1" />
                <label>日</label>
            </div>
        );
    }
});
var Slider = React.createClass({
    render: () => {
        return (
            <div>
                <input type="range" min="0" max="105" />
            </div>
        );
    }
});
var Result = React.createClass({
    render: () => {
        return (
            <div>
                <h1>結果</h1>
                <ResultDate />
                <ResultPeriod />
                <ResultPercentage />
            </div>
        );
    }
});
var ResultDate = React.createClass({
    render: () => {
        return (
            <div>
                <input type="text" readonly />
                <label>年</label>
                <input type="text" readonly />
                <label>月</label>
                <input type="text" readonly />
                <label>日</label>
            </div>
        );
    }
});
var ResultPeriod = React.createClass({
    render: () => {
        return (
            <div>
                残り
                <input type="text" readonly />
                <label>年</label>
                <input type="text" readonly />
                <label>日</label>
            </div>
        );
    }
});
var ResultPercentage = React.createClass({
    render: () => {
        return (
            <div>
                <input type="text" readonly />
                <label>%</label>
            </div>
        );
    }
});
var LifeExpectancyBox = React.createClass({
    render: () => {
        return (
            <div>
                <Birthday />
                <Query />
                <Result />
            </div>
        );
    }
});
ReactDOM.render(
<LifeExpectancyBox />,
    document.getElementById('content')
)
