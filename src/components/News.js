import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 6,
    country: "in",
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  //  async updateNews (){

  //    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a4d90696cda940e5a54feab92db141c4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //    this.setState({loading:true})
  //    let data = await fetch(url)
  //    let parseData = await data.json();
  //    this.setState({articles: parseData.articles ,
  //      totalResults:parseData.totalResults,
  //     loading:false})
  // }

  async componentDidMount() {
    //    this.updateNews()
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a4d90696cda940e5a54feab92db141c4&page=${this.state.page}&pageSize=${this.props.pageSize} `;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
      page:this.state.page+1
    });
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a4d90696cda940e5a54feab92db141c4&page=${this.state.page}&pageSize=${this.props.pageSize} `;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div>
        {/* <div className="container my-3"> */}
        <div className="container text-center">
         
          <h1>
            NewsMonkey- Top {this.capitalizeFirstLetter(this.props.category)}
            Headlines
          </h1>
        </div>

        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          
          loader={this.state.loading && <Spinner/>}
       
        >
          <div className="container">
            <div className="row my-3">
              {this.state.articles.map((element, index) => {
                const key = element.title + "-" + index;

                return (
                  <div
                    className="col-md-4 my-3 d-flex justify-content-center "
                    key={key}
                  >
                    <NewsItems
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : " "
                      }
                      imageUrl={element.urlToImage}
                      newUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* </div> */}
        {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &laquo; Previous</button>
            <button disabled={this.state.page +1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>&raquo; Next</button>
            </div> */}
      </div>
    );
  }
}

export default News;
