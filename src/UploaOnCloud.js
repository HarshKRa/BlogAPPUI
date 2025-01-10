export const uploadToCloudnary = async (pics) => {
  const cloud_name = process.env.REACT_APP_CLOUNARY_NAME;
  const upload_preset = process.env.REACT_APP_CLOUNARY_UPLOAD_PRESET;

  if (pics) {
    alert(cloud_name);
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/harshrajkumar/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const fileData = await res.json();

      console.log("fileData : ", fileData);

      return fileData.url;
    } catch (error) {
      alert(error.data);
    }
  } else {
    console.log("error : pics not found");
  }
};
