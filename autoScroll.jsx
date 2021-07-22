class App extends React.Component {
  state = {
    list: []
  };

  render() {
    return (
      <div id="list" style={{height: 100, overflow: "scroll"}}>
        {this.state.list.map(i => {
          return <div>{i}</div>;
        })}
      </div>
    );
  }

  componentDidMount() {
    setInterval(() => {
      this.setState((state) => ({
        list: [...state.list, i++]
      }))
    }, 1000);
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.list.length === this.state.list.length) return null;
    const list = document.querySelector('#list');
    return list.scrollHeight - list.scrollTop;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot);
    if( snapshot === null) return;
    const list = document.querySelector("#list");
    list.scrollTop = list.scrollHeight - snapshot;
  }
}

ReactDOM.render(<App name="Mark" />, document.querySelector('#root'));