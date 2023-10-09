import React, { useState } from "react";
import axios from "axios";
import "./Content.css";

const Content = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "https://localhost:3001/ip/generate";

    axios
      .post(url, { originalUrl })
      .then((response) => {
        setGeneratedUrl(response.data.generatedUrl);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="Content">
      <div className="collection"></div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the link"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button type="submit">Generate</button>
      </form>
    </div>
  );
};

export default Content;
