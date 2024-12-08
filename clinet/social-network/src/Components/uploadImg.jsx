import React, { useState, useRef } from "react";
import axios from "axios";

const ImageUpload = ({ setFormData, img }) => {
  //states for image creation
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(""); // state for preview URL
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  
  // Reference to the file input
  const fileInputRef = useRef(null);

  //manage the img state
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // set preview URL to display immediately
    }
  };

  //manage upload status
  const handleUpload = async () => {
    if (!image) {
      setUploadStatus("Please select an image to upload.");
      // Trigger file input click to let user select a file
      fileInputRef.current.click();
      return;
    }
    // formData holds all the config details as the body of the request
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "posts-social");
    formData.append("cloud_name", "dpjsj3rpk");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpjsj3rpk/image/upload",
        formData
      );
      setFormData({
        ...formData,
        [img]: response.data.secure_url,
      });
      setUploadedImageUrl(response.data.secure_url); // send this to backend
      setUploadStatus("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      setUploadStatus("Error uploading image.");
    }
  };

  // Handle clicking the upload icon or button
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mt-10 mb-10 gap-5 flex flex-col items-center ">
      <h1 className="mb-5">Upload an Image -</h1>
      {!previewUrl && (
        <p className="mb-5 text-slate-300 text-sm">
          Please select a file and press upload image.
        </p>
      )}
      <input
        type="file"
        ref={fileInputRef} // Connect the reference to the input
        onChange={handleImageChange}
        className="hidden"
        id="fileUpload"
      />
      {img.value}
      {previewUrl && (
        <>
          <div className="bg-primary w-full p-2 ">
            <img
              src={previewUrl}
              alt="Selected"
              className="max-w-[300px] m-auto"
            />
          </div>
        </>
      )}
      <div className="flex flex-row bg-primary w-full rounded">
        {/* Label that triggers file selection */}
        <label
          htmlFor="fileUpload"
          className="self-start cursor-pointer"
          onClick={handleFileInputClick} // Handle label click
        >
          <img
            src="/uploadImgIcon.svg"
            alt="upload icon"
            className="max-w-10 animate-bounce"
          />
        </label>
        {/* Button that uploads the image and also opens file input if no image is selected */}
        <button
          onClick={() => {
            if (!image) {
              handleFileInputClick(); // Trigger file selection if no image is selected
            } else {
              handleUpload(); // Upload image if one is selected
            }
          }}
          className="bg-primary w-full rounded"
        >
          Upload image
        </button>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
      {uploadedImageUrl && (
        <div>
          {/* Add any additional UI here if needed */}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
