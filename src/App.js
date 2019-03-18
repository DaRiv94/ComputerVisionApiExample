import React, { Component } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import VisionApi from "./ComputerVisionApi/visionApi";
import JSONPretty from "react-json-pretty";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: "",
      selectedFile: "",
      visionApiData: ""
    };

    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  fileSelectedHandler(event) {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  async fileUploadHandler() {
    try {
      const fd = new FormData();
      console.log("Name: ", this.state.selectedFile.name);
      fd.append("title", this.state.selectedFile.name);
      fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
      const res = await axios.post(
        "https://picuploadtest-0020-backendapi.herokuapp.com/upload",
        fd
      );
      console.log(res.data);
      this.setState({ imageUrl: res.data });

      const data = await VisionApi.getPictureData(res.data);
      this.setState({ visionApiData: data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="App">
        {/* <input type="file" onChange={this.fileSelectedHandler} />
        <button onClick={this.fileUploadHandler}>Upload</button> */}

        <div className="row">
          <div className="infoDiv col-12 col-md-6">
            <h3>Welcome!</h3>
            <p>
              Upload a picture and see Microsofts Computer Vision Api analyze
              the image. The json response of the analysis will be at the bottom
              of the screen.
            </p>

            <h4>Upload Image</h4>
            <div className="input-group uploadGroup">
              <div className="input-group-prepend">
                <span
                  onClick={this.fileUploadHandler}
                  className="input-group-text uploadBtn"
                  id="inputGroupFileAddon01"
                >
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  onChange={this.fileSelectedHandler}
                  type="file"
                  className="custom-file-input uploadInput"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  {this.state.selectedFile ? this.state.selectedFile.name : ""}
                </label>
              </div>
            </div>

            <h4>What does the Api look for?</h4>
            <ul>
              <li>
                <strong>Categories</strong>- categorizes image content according
                to a taxonomy defined in documentation.
              </li>
              <li>
                <strong>Tags</strong>- tags the image with a detailed list of
                words related to the image content.
              </li>
              <li>
                <strong>Description</strong>- describes the image content with a
                complete English sentence.
              </li>
              <li>
                <strong>Faces</strong>- detects if faces are present. If
                present, generate coordinates, gender and age.
              </li>
              <li>
                <strong>ImageType</strong>- detects if image is clipart or a
                line drawing.
              </li>
              <li>
                <strong>Color</strong>- determines the accent color, dominant
                color, and whether an image is black&white.
              </li>
              <li>
                <strong>Adult</strong>- detects if the image is pornographic in
                nature (depicts nudity or a sex act). Sexually suggestive
                content is also detected.
              </li>
            </ul>
          </div>
          <div className="pictureDiv col-12 col-md-6">
            <h4>Image</h4>
            <div className="imageBox">
              {" "}
              <img
                src={this.state.imageUrl}
                alt={this.state.imageUrl === "" ? "" : "Couldnt find image"}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="jsonDiv">
          <JSONPretty id="json-pretty" data={this.state.visionApiData} />
        </div>
      </div>
    );
  }
}

export default App;
