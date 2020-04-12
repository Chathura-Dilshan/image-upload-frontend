import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null
  }


  fileSelectHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
    console.log(event.target.files[0]);
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('file', this.state.selectedFile);
    axios.post('http://localhost:8080/upload', fd).then(res => {
      console.log(res);
    })
  }

  render() {
    return (
      <div className="App">
        <input style={{ display: 'none' }} type="file" onChange={this.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
        <button style={{ background: 'green' }} onClick={() => this.fileInput.click()}>Pick File</button>
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default App;
