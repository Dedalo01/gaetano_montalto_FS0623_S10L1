import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { STRIVESCHOOL_APIKEY } from "../data/api_keys";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
    isBookSelected: false,
  };

  /*   componentDidMount = async () => {
    this.getBookComments();
  }; */

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.asin !== this.props.asin) {
      this.getBookComments();
    }
  };

  getBookComments = async () => {
    if (this.props.asin === "") {
      this.setState({
        isLoading: false,
        isBookSelected: false,
      });
      return;
    }

    this.setState({
      isBookSelected: true,
    });

    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          headers: {
            Authorization: "Bearer " + STRIVESCHOOL_APIKEY,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        this.setState({ comments: comments, isLoading: false, isError: false });
      } else {
        console.log("error");
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, isError: true });
    }
  };

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        {!this.state.isBookSelected && (
          <div>
            <h2>Select a book</h2>
            <p>Select a book to show all its comments</p>
          </div>
        )}
        {this.state.isBookSelected && (
          <>
            <AddComment asin={this.props.asin} />
            <CommentList commentsToShow={this.state.comments} />
          </>
        )}
      </div>
    );
  }
}

export default CommentArea;
