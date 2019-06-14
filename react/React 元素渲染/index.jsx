const myStyle = {color: 'red', textAlign: 'center'}

class Name extends React.Component {
    render() {
        return <h1 style={myStyle}>网站名称：{this.props.name}</h1>;
    }
}

class Url extends React.Component {
    render() {
        return <h1>网站地址：{this.props.url}</h1>;
    }
}

class Nickname extends React.Component {
    render() {
        return <h1>网站地址：{this.props.nickname}</h1>;
    }
}

class TimeEl extends React.Component {
    render() {
        console.log(this);
        return <h1>
            <time>{this.props.timeVal.toLocaleTimeString()}</time>
        </h1>
    }
}

function App(props) {
    return (
        <div>
            <div id={'james'}></div>
            <Name name={props.name}/>
            <Url url={props.url}/>
            <Nickname nickname={props.nickname}/>
        </div>
    );
}
ReactDOM.render(
    <App name={"xxxx"} url={"http://www.baidu.com"} nickname={"baidu"} timeVal={new Date()}/>,
    document.getElementById('example')
);

function jubu(){
    ReactDOM.render(
        <TimeEl timeVal={new Date()}>123</TimeEl>,
        document.getElementById('james')
    )
}
jubu();
setInterval(jubu, 1000);