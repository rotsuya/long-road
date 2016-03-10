const React = require('react');
const ReactDOM = require('react-dom');
const lifeExpectancyTable = require('./lifeExpectancyTable.es6');
const lifeExpectancy = require('./lifeExpectancy.es6');
var App = React.createClass({
    getInitialState: function() {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return {
            birthdayDate: new Date(1975, 12 - 1, 7),
            queryDate: today,
            resultDate: new Date(1970, 1 - 1, 1)
        };
    },
    update: function(newState) {
        this.setState({
            birthdayDate: newState.hasOwnProperty('birthdayDate') ? newState.birthdayDate : this.state.birthdayDate,
            queryDate: newState.hasOwnProperty('queryDate') ? newState.queryDate : this.state.queryDate,
            resultDate: this.state.resultDate
        });
    },
    render: function () {
        return (
            <div>
                <Birthday birthdayDate={this.state.birthdayDate} update={this.update} />
                <Query queryDate={this.state.queryDate}  birthdayDate={this.state.birthdayDate} update={this.update} />
                <Result resultDate={this.state.resultDate} />
            </div>
        );
    }
});
var Birthday = React.createClass({
    _onChange: function() {
        const year = ReactDOM.findDOMNode(this.refs.year).value.trim() - 0;
        const month = ReactDOM.findDOMNode(this.refs.month).value.trim() - 0;
        const date = ReactDOM.findDOMNode(this.refs.date).value.trim() - 0;
        this.props.update({
            birthdayDate: new Date(year, month - 1, date)
        });
    },
    render: function () {
        const birthdayDate = this.props.birthdayDate;
        const _onChange = this.props.onChange;
        return (
            <div>
                <h1>誕生日</h1>
                <div>
                    <input type="number" step="1" value={birthdayDate.getFullYear()} onChange={this._onChange} ref="year" />
                    <label>年</label>
                    <input type="number" step="1" value={birthdayDate.getMonth() + 1} onChange={this._onChange} ref="month" />
                    <label>月</label>
                    <input type="number" step="1" value={birthdayDate.getDate()} onChange={this._onChange} ref="date" />
                    <label>日</label>
                </div>
            </div>
        );
    }
});
var Query = React.createClass({
    render: function () {
        return (
            <div>
                <h1>調べる日</h1>
                <QueryDate queryDate={this.props.queryDate} update={this.props.update} />
                <QueryAge queryDate={this.props.queryDate} birthdayDate={this.props.birthdayDate} update={this.props.update} />
            </div>
        );
    }
});
var QueryDate = React.createClass({
    _onChange: function () {
        const year = ReactDOM.findDOMNode(this.refs.year).value.trim() - 0;
        const month = ReactDOM.findDOMNode(this.refs.month).value.trim() - 0;
        const date = ReactDOM.findDOMNode(this.refs.date).value.trim() - 0;
        this.props.update({
            queryDate: new Date(year, month - 1, date)
        });
    },
    render: function () {
        const queryDate = this.props.queryDate;
        return (
            <div>
                <input type="number" step="1" value={queryDate.getFullYear()} ref="year" onChange={this._onChange} />
                <label>年</label>
                <input type="number" step="1" value={queryDate.getMonth() + 1} ref="month" onChange={this._onChange} />
                <label>月</label>
                <input type="number" step="1" value={queryDate.getDate()} ref="date" onChange={this._onChange} />
                <label>日</label>
            </div>
        );
    }
});
var QueryAge = React.createClass({
    _onChange: function () {
        const ageY = ReactDOM.findDOMNode(this.refs.year).value.trim() - 0;
        const ageD = ReactDOM.findDOMNode(this.refs.date).value.trim() - 0;
        const birthdayDate = this.props.birthdayDate;
        const [birthdayY, birthdayM, birthdayD] = [birthdayDate.getFullYear(), birthdayDate.getMonth() + 1, birthdayDate.getDate()];
        const lastBirthday = new Date(birthdayY + ageY, birthdayM - 1, birthdayD);
        this.props.update({
            queryDate: new Date(lastBirthday.getTime() + ageD * 24 * 60 * 60 * 1000)
        });
    },
    render: function () {
        const queryDate = this.props.queryDate;
        const birthdayDate = this.props.birthdayDate;
        const [queryY, queryM, queryD] = [queryDate.getFullYear(), queryDate.getMonth() + 1, queryDate.getDate()];
        const [birthdayY, birthdayM, birthdayD] = [birthdayDate.getFullYear(), birthdayDate.getMonth() + 1, birthdayDate.getDate()];
        const queryYearBirthdayDate = new Date(queryY, birthdayM - 1, birthdayD);
        const lastYearBirthdayDate = new Date(queryY - 1, birthdayM - 1, birthdayD);
        const isAfterBirthday = queryDate >= queryYearBirthdayDate;
        const ageY = queryY - birthdayY - (isAfterBirthday ? 0 : 1);
        const ageD = (isAfterBirthday ? (queryDate - queryYearBirthdayDate) : (queryDate - lastYearBirthdayDate)) / (24 * 60 * 60 * 1000);
        return (
            <div>
                <input type="number" step="1" value={ageY} ref="year" onChange={this._onChange} />
                <label>歳</label>
                <input type="number" step="1" value={ageD} ref="date" onChange={this._onChange} />
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
ReactDOM.render(
    <App />,
    document.getElementById('content')
);
