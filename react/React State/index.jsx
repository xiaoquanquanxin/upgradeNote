(() => {
    class Clock extends React.Component {
        constructor(props) {
            super(props);
            this.state = {date: new Date()};
        }

        componentDidMount() {
            console.log('挂载')
            this.timerID = setInterval(
                () => {
                    this.tick();
                    console.log(this.state.date.getSeconds());
                    if (this.state.date.getSeconds() > 25) {
                        this.setState({
                            date: null,
                        })
                    }
                },
                1000
            );
        }

        componentWillUnmount() {
            console.log('卸载');
            clearInterval(this.timerID);
        }

        tick() {
            console.log('timeout')
            this.setState({
                date: new Date()
            });
        }

        render() {
            return (
                <div id='maidi'>
                    <h2>现在是 {this.state.date.toLocaleTimeString()}</h2>
                </div>
            );
        }
    }

    ReactDOM.render(
        <Clock/>,
        document.getElementById('example')
    );
})();
(() => {

    function FormattedDate(props) {
        return <h2>现在是 {props.time.toLocaleTimeString()}.</h2>;
    }

    class Clock extends React.Component {
        constructor(props) {
            super(props);
            this.state = {date: new Date()};
        }

        componentDidMount() {
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
        }

        componentWillUnmount() {
            clearInterval(this.timerID);
        }

        tick() {
            this.setState({
                date: new Date()
            });
        }

        render() {
            return (
                <div>
                    <FormattedDate time={this.state.date}/>
                </div>
            );
        }
    }

    ReactDOM.render(
        <Clock/>,
        document.getElementById('example')
    );
});

(() => {

    function FormattedDate(props) {
        return <h2>现在是 {props.date.toLocaleTimeString()}. {Math.random()}</h2>;
    }

    class Clock extends React.Component {
        constructor(props) {
            super(props);
            this.state = {date: new Date()};
        }

        componentDidMount() {
            this.timerID = setInterval(() => {
                console.log(this);
                this.tick();
            }, 1000);
        }

        componentWillUnmount() {
            clearInterval(this.timerID);
        }

        tick() {
            this.setState({
                date: new Date()
            });
        }

        render() {
            return (
                <div>
                    <FormattedDate date={this.state.date}/>
                </div>
            );
        }
    }

    function App() {
        return (
            <div>
                <Clock/>
                {/*<Clock/>*/}
                {/*<Clock/>*/}
            </div>
        );
    }

    ReactDOM.render(<App/>, document.getElementById('example'));

});