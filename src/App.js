import React, { Component } from "react";
import {List,Avatar} from "antd";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }
  componentWillMount() {
    axios
      .get("/api/toutiao/index?type=top&key=786045028d7947db48cc4b0c12599889")
      .then(res => {
        console.log(res.data.result);
        this.setState({
          news: res.data.result.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const news = this.state.news;
    const newsItems = news.map(item => (
      <li key={item.uniquekey}>
        <a href={item.url}> {item.title} </a> <span> {item.date} </span>{" "}
        <span> {item.author_name} </span>{" "}
      </li>
    ));
    return (
      <div className="App">
        <List
    itemLayout="horizontal"
    dataSource={news}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar size="large" shape="square" src={item.thumbnail_pic_s}/>}
          title={item.author_name}
          description={<a href={item.url}>{item.title}</a>}
        />
      </List.Item>
    )}
  />
      </div>
    );
  }
}

export default App;
