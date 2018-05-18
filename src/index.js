import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list'
import VideoPlayer from './components/video_player';

const API_KEY = 'AIzaSyACoHcJOr1LxO6WO7_XosEwtTxiNT99Moc';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this._search('UFC');
  }

  _search(term) {
    YTSearch({key:API_KEY, term:term}, (videos) =>this.setState(
      {
        videos: videos,
        selectedVideo: videos[0]
      }
    ));
  }


  render() {
    const timedSearch = _.debounce(term => this._search(term), 1000);
    return (
      <div>
        <SearchBar onSearchTermChange={timedSearch} />
        <VideoPlayer video={this.state.selectedVideo} />
        <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos} />
      </div>
    );
  }
}


ReactDOM.render(<App/>, document.querySelector('.container'));
