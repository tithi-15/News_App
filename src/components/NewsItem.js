import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem;" }}>
          <img src={!imgUrl ? "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_960_720.jpg" : imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
