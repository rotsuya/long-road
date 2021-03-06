import React from 'react';
import ReactDOM from 'react-dom';
import lifeExpectancyTable from './lifeExpectancyTable.es6';
import lifeExpectancy from './lifeExpectancy.es6';
import util from './util.es6';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.state.birthdayDate = new Date(1975, 12 - 1, 7);
        var queryDate = new Date();
        queryDate.setHours(0);
        queryDate.setMinutes(0);
        queryDate.setSeconds(0);
        queryDate.setMilliseconds(0);
        this.state.queryDate = queryDate;
        this.state.resultTerm = lifeExpectancy(queryDate - this.state.birthdayDate, lifeExpectancyTable);
    }
    update (newState) {
        const birthdayDate = newState.hasOwnProperty('birthdayDate') ? newState.birthdayDate : this.state.birthdayDate;
        const queryDate = newState.hasOwnProperty('queryDate') ? newState.queryDate : this.state.queryDate;
        const resultTerm = lifeExpectancy(queryDate - birthdayDate, lifeExpectancyTable);
        this.setState({birthdayDate, queryDate, resultTerm});
    }
    render () {
        return (
            <div>
                <Configuration birthdayDate={this.state.birthdayDate} update={this.update} />
                <Query queryDate={this.state.queryDate} birthdayDate={this.state.birthdayDate} update={this.update} />
                <Result queryDate={this.state.queryDate} birthdayDate={this.state.birthdayDate} resultTerm={this.state.resultTerm} />
            </div>
        );
    }
}

class Configuration extends React.Component {
    render () {
        return (
            <div>
                <h1>初期設定</h1>
                <Birthday birthdayDate={this.props.birthdayDate} update={this.props.update}/>
                <Sex />
            </div>
        );
    }
}
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
                <h2>生年月日</h2>
                <input type="number" step="1" value={birthdayDate.getFullYear()} onChange={this._onChange} ref="year" />
                <label>年</label>
                <input type="number" step="1" value={birthdayDate.getMonth() + 1} onChange={this._onChange} ref="month" />
                <label>月</label>
                <input type="number" step="1" value={birthdayDate.getDate()} onChange={this._onChange} ref="date" />
                <label>日</label>
            </div>
        );
    }
});
var Sex = React.createClass({
    render: function () {
        return (
            <div>
                <h2>性別</h2>
                <input type="radio" name="sex" checked="checked" readonly="readonly" />
                <label>男性</label><br />
                <input type="radio" name="sex" readonly="readonly" />
                <label>女性</label>
            </div>
        );
    }
});
var Query = React.createClass({
    render: function () {
        return (
            <div>
                <h1>入力</h1>
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
                <h2>この日まで生きていた場合</h2>
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
                <h2>この年齢まで生きていた場合</h2>
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
                <h1>平均余命</h1>
                <ResultDate queryDate={this.props.queryDate} resultTerm={this.props.resultTerm} />
                <ResultPeriod resultTerm={this.props.resultTerm} />
                <ResultLifetimePeriod birthdayDate={this.props.birthdayDate} queryDate={this.props.queryDate} resultTerm={this.props.resultTerm} />
                <ResultPercentage birthdayDate={this.props.birthdayDate} queryDate={this.props.queryDate} resultTerm={this.props.resultTerm} />
            </div>
        );
    }
});
var ResultDate = React.createClass({
    render: function () {
        const queryDate = this.props.queryDate;
        const resultTerm = this.props.resultTerm;
        const deathDate = new Date(queryDate.getTime() + resultTerm);
        return (
            <div>
                <h2>亡くなる日</h2>
                <input type="text" value={deathDate.getFullYear()} readonly />
                <label>年</label>
                <input type="text" value={deathDate.getMonth() + 1} readonly />
                <label>月</label>
                <input type="text" value={deathDate.getDate()} readonly />
                <label>日</label>
            </div>
        );
    }
});
var ResultPeriod = React.createClass({
    render: function () {
        const resultTerm = this.props.resultTerm;
        const year = Math.floor(resultTerm / util.YEAR);
        const date = Math.floor((resultTerm % util.YEAR) / util.DAY);
        return (
            <div>
                <h2>残りの人生の期間</h2>
                <input type="number" value={year} readonly />
                <label>年</label>
                <input type="number" value={date} readonly />
                <label>日</label>
            </div>
        );
    }
});
var ResultLifetimePeriod = React.createClass({
    render: function () {
        const birthdayDate = this.props.birthdayDate;
        const queryDate = this.props.queryDate;
        const lifetime = queryDate - birthdayDate + this.props.resultTerm;
        const year = Math.floor(lifetime / util.YEAR);
        const date = Math.floor((lifetime % util.YEAR) / util.DAY);
        return (
            <div>
                <h2>寿命</h2>
                <input type="number" value={year} readonly />
                <label>年</label>
                <input type="number" value={date} readonly />
                <label>日</label>
            </div>
        );
    }
});
var ResultPercentage = React.createClass({
    render: function () {
        const birthdayDate = this.props.birthdayDate;
        const queryDate = this.props.queryDate;
        const resultTerm = this.props.resultTerm;
        const ageTerm = queryDate - birthdayDate;
        const restPercent = Math.round(resultTerm / (ageTerm + resultTerm) * 100000) / 1000;
        return (
            <div>
                <h2>生きた割合</h2>
                <input type="text" value={100 - restPercent} readonly />
                <label>%</label><br />
                <h2>残りの割合</h2>
                <input type="text" value={restPercent} readonly />
                <label>%</label>
            </div>
        );
    }
});
ReactDOM.render(
    <App />,
    document.getElementById('content')
);
