import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

class App extends Component {
  constructor() {
    super();
    this.state = {
      darkMode: false
    };
  }

  toggleMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
    document.body.classList.toggle('dark-mode');
  }

  render() {
    return (
      <div className={this.state.darkMode ? 'dark-mode' : ''}>
        <Navbar onSearch={this.handleSearch} toggleMode={this.toggleMode} />
        <News pageSize={5} country="us" category="general" />
      </div>
    );
  }
}

export default App;
