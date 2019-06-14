const style = {fontSize: 10, color: '#FF0000', overflow: 'hidden'};
const i = 1;
const arr = [<div key={1}>121233</div>, <div key={2}>121</div>];
ReactDOM.render(
    <div>
        <h2>欢迎学习 React</h2>
        <div style={style}><h1>{1 + 1}</h1></div>
        <h1>{i == 1 ? 'true' : false.toString()}</h1>
        <h1>{(i == 1).toString()}</h1>
        <div style={{color: 'red'}}>aaa</div>
        {/*这注释有点六*/}
        {/*数组会自动展开所有成员：*/}
        <div key={1}>{arr}</div>
    </div>,
    document.getElementById('example'),
)

