import axios from "axios";

class VisionApi {
  static getPictureData(uploadedImageUrl) {
    return new Promise(async (resolve, reject) => {

    //Seting up payload to send;
      const CVF_analyze = "v1.0/analyze";
      const params = {
        visualFeatures: "Categories,Tags,Faces,Description,ImageType,Color,Adult",
        details: "Landmarks,Celebrities"
      };
      const imageUrl = uploadedImageUrl;

      const payload = {
        computerVisionFunction: CVF_analyze,
        params,
        imageUrl
      };

      //for production
      const backendApiUrl ="https://picuploadtest-0020-backendapi.herokuapp.com/vision-api";

        
      //for development
      //const backendApiUrl ="http://localhost:4000/vision-api";

      //Setup and Call Computer Vision Api with Axios
      // Add axios.post Headers
      axios.defaults.headers.post["Content-Type"] = "application/json";
      try {
        const data = await axios({
          method: "post",
          url: backendApiUrl,
          data: payload
        }).catch(error => { //need to look into why I need promise catch and try catch?? shouldnt I only need one?
          console.log("Frontend first Catch: ", error);
          reject(error);
        });
        console.log(data);
        resolve(data.data);
      } catch (err) {
        console.log("Frontend second Catch: ", err);
        reject(err);
      }
    });
  }
}

export default VisionApi;
