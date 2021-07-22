class App extends React.Component {
  state = {
    hasError: false
  };
  render() {
    if(this.state.hasError) {
      return <div>예상치 못한 에러가 발생했다.</div>
    }
    return <WebService />;
  }

  
  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    })
  }
}

ReactDOM.render(<App name="Mark" />, document.querySelector('#root'));