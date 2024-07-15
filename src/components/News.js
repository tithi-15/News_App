import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
    static defaultProps = {
        pageSize: 20
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
    }

    async componentDidMount() {
        this.fetchArticles();
    }

    fetchArticles = async () => {
        const { page } = this.state;
        const { pageSize } = this.props;
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=52e225d068fa42d69fc9ae7e156c4338&page=${page}&pageSize=${pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ 
            articles: parsedData.articles, 
            loading: false,
            totalResults: parsedData.totalResults
        });
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 }, () => {
            this.fetchArticles();
        });
    }

    handleNextClick = async () => {
        const { page, totalResults } = this.state;
        const { pageSize } = this.props;
        if (page + 1 > Math.ceil(totalResults / pageSize)) {
            // Do nothing, we're on the last page
        } else {
            this.setState({ page: page + 1 }, () => {
                this.fetchArticles();
            });
        }
    }

    render() {
        const { articles, loading, page, totalResults } = this.state;
        const { pageSize } = this.props;
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsMonkey - Top Headlines</h1>
                {loading && <Spinner />}
                <div className="row">
                    {!loading && articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem 
                                    title={element.title ? element.title.slice(0, 45) : ""} 
                                    description={element.description ? element.description.slice(0, 88) : ""} 
                                    imgUrl={element.urlToImage} 
                                    newsUrl={element.url}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button 
                        type="button" 
                        disabled={page <= 1} 
                        className="btn btn-dark" 
                        onClick={this.handlePrevClick}
                    >
                        &larr; Previous
                    </button>
                    <button 
                        disabled={page + 1 > Math.ceil(totalResults / pageSize)}
                        type="button" 
                        className="btn btn-dark" 
                        onClick={this.handleNextClick}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
