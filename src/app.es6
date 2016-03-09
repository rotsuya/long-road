var React = require("react");
var ReactDOM = require("react-dom");
var Birthday = React.createClass({
    render: function () {
        console.log(this.state);
        return (
            <div>
                <h1>誕生日</h1>
                <BirthdayForm birthdayDate={this.props.birthdayDate} />
            </div>
        );
    }
});
var BirthdayForm = React.createClass({
    render: function () {
        const birthdayDate = this.props.birthdayDate;
        return (
            <div>
                <input type="number" step="1" value={birthdayDate.getFullYear()} />
                <label>年</label>
                <input type="number" step="1" value={birthdayDate.getMonth() + 1} />
                <label>月</label>
                <input type="number" step="1" value={birthdayDate.getDate()} />
                <label>日</label>
            </div>
        );
    }
});
var Query = React.createClass({
    render: function () {
        return (
            <div>
                <h1>調べる日</h1>
                <QueryDate queryDate={this.props.queryDate} />
                <QueryAge queryDate={this.props.queryDate} birthdayDate={this.props.birthdayDate} />
            </div>
        );
    }
});
var QueryDate = React.createClass({
    render: function () {
        const queryDate = this.props.queryDate;
        return (
            <div>
                <input type="number" step="1" value={queryDate.getFullYear()} />
                <label>年</label>
                <input type="number" step="1" value={queryDate.getMonth() + 1} />
                <label>月</label>
                <input type="number" step="1" value={queryDate.getDate()} />
                <label>日</label>
            </div>
        );
    }
});
var QueryAge = React.createClass({
    render: function () {
        const queryDate = this.props.queryDate;
        const birthdayDate = this.props.birthdayDate;
        const [queryY, queryM, queryD] = [queryDate.getFullYear(), queryDate.getMonth() + 1, queryDate.getDate()];
        const [birthdayY, birthdayM, birthdayD] = [birthdayDate.getFullYear(), birthdayDate.getMonth() + 1, birthdayDate.getDate()];
        const queryYearBirthdayDate = new Date(queryY, birthdayM - 1, birthdayD);
        const lastYearBirthdayDate = new Date(queryY - 1, birthdayM - 1, birthdayD);
        const isAfterBirthday = queryDate > queryYearBirthdayDate;
        const ageY = queryY - birthdayY - (isAfterBirthday ? 0 : 1);
        const ageD = (isAfterBirthday ? (queryDate - queryYearBirthdayDate) : (queryDate - lastYearBirthdayDate)) / (24 * 60 * 60 * 1000);
        return (
            <div>
                <input type="number" step="1" value={ageY} />
                <label>歳</label>
                <input type="number" step="1" value={ageD} />
                <label>日</label>
            </div>
        );
    }
});
var Result = React.createClass({
    render: function () {
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
    render: function () {
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
    render: function () {
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
    render: function () {
        return (
            <div>
                <input type="text" readonly />
                <label>%</label>
            </div>
        );
    }
});
var LifeExpectancyBox = React.createClass({
    getInitialState: function() {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return {
            birthdayDate: new Date(1970, 2, 8),
            queryDate: today,
            resultDate: new Date(1970, 0, 1)
        };
    },
    render: function () {
        return (
            <div>
                <Birthday birthdayDate={this.state.birthdayDate} />
                <Query queryDate={this.state.queryDate}  birthdayDate={this.state.birthdayDate} />
                <Result resultDate={this.state.resultDate} />
            </div>
        );
    }
});
ReactDOM.render(
    <LifeExpectancyBox />,
    document.getElementById('content')
);
