import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import MyJumbotron from "./components/MyJumbotron";
// import AllTheBooks from './components/AllTheBooks'
import { Container, Row, Col } from "react-bootstrap";
import BookList from "./components/BookList";

import fantasy from "./data/fantasy.json";
import CommentArea from "./components/CommentArea";
import { Component } from "react";

class App extends Component {
  state = {
    actualAsin: "",
    isBookSelected: false,
  };

  getAsin = (asin) => {
    if (this.state.isBookSelected) {
      this.setState({ isBookSelected: false });
      console.log("state: ", this.state);
      console.log("asin: ", asin);
      return;
    }

    /*   if (this.state.actualAsin !== "") {
      this.setState({ actualAsin: "", isBookSelected: false });
      return;
    } */
    this.setState({ actualAsin: asin, isBookSelected: true });
    console.log("state: ", this.state);
    console.log("asin: ", asin);
  };

  render() {
    return (
      <>
        <MyNav />
        <MyJumbotron />
        <Container>
          <Row>
            <Col>
              <BookList
                books={fantasy}
                asin={this.state.actualAsin}
                getAsin={this.getAsin}
              />
            </Col>

            <Col>
              <CommentArea asin={this.state.actualAsin} />
            </Col>
          </Row>
        </Container>
        <MyFooter />
      </>
    );
  }
}

export default App;
