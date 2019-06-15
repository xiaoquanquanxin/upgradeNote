function HelloMessage(props) {
    console.log(props)
    return <h1 rel='el'>hello message component {props.abc + 1000}</h1>;
}

const element = <HelloMessage abc={10} bcd='123'/>;
console.log(element)

class Welcome extends React.Component {
    render(props) {
        console.log(this.props);
        console.log(props);
        return <h1>welcome component</h1>;
    }
}

//  这里的属性值会被渲染
function ClassName(props) {
    console.log(props);
    return <div className={'abcd'} xxxxxxxxxxx={props.xxxxxxxxxxx} rel="nofollow">
        <div htmlFor="xx" style={{'backgroundColor': 'yellow'}}>
            擦擦擦
        </div>
    </div>
}

const cn = <ClassName/>;
console.log(cn)
//  这里的属性不是真正的渲染,只是一个props
ReactDOM.render(
    <div>
        <ClassName xxxxxxxxxxx={1234}></ClassName>
        {element}
        <Welcome bcd={1}></Welcome>
    </div>,
    document.getElementById('example')
);