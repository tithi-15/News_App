import React, { Component } from 'react';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  handleSearchInput = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">NewsApp</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/category/sports">Sports</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/category/technology">Technology</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/category/health">Health</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/category/science">Science</a>
                </li>
              </ul>
              <form className="d-flex" role="search" onSubmit={this.handleSearchSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={this.state.searchTerm}
                  onChange={this.handleSearchInput}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <button onClick={this.props.toggleMode} className="btn btn-dark ms-3">
                Toggle Dark Mode
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
