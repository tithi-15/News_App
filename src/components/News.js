import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    pageSize: 20,
    country: 'us',
    category: 'general'
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      searchQuery: ''  // For search functionality
    };
  }

  async fetchArticles() {
    const { page, searchQuery } = this.state;
    const { pageSize, country, category } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&q=${searchQuery}&apiKey=52e225d068fa42d69fc9ae7e156c4338&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults
    });
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  handleSearch = (searchTerm) => {
    this.setState({ searchQuery: searchTerm, page: 1 }, () => {
      this.fetchArticles();
    });
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const { pageSize, country, category } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&q=${this.state.searchQuery}&apiKey=52e225d068fa42d69fc9ae7e156c4338&page=${this.state.page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  };

  render() {
    const { articles, loading } = this.state;
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
