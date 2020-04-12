import React, {Component} from 'react';
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
//multiple
    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files,
        })
    }

    onClickHandler = () => {
        const data = new FormData()
        for (let x = 0; x < this.state.selectedFile.length; x++) {
            data.append('files', this.state.selectedFile[x])
        }

        axios.post("http://localhost:8080/uploadMultipleData", data).then(res => { // then print response status
            console.log(res)
        })
    }

    render() {
        return (
            <div className="App">
                <h1>Singal upload</h1>
                <input style={{display: 'none'}} type="file" onChange={this.fileSelectHandler}
                       ref={fileInput => this.fileInput = fileInput}/>
                <button style={{background: 'green',marginRight: 10}} onClick={() => this.fileInput.click()}>Pick File</button>
                <button onClick={this.fileUploadHandler}>Upload</button>

                <h1>Multiple upload</h1>
                <input style={{display: 'none'}} type="file" className="form-control" multiple onChange={this.onChangeHandler}
                       ref={multipleFileInput => this.multipleFileInput = multipleFileInput} />
                <button style={{background: 'gray', marginRight: 10}} onClick={() => this.multipleFileInput.click()}>Pick Files</button>
                <button onClick={this.onClickHandler}>Upload Multiple</button>


            </div>
        );
    }
}

export default App;
