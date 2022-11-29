// import { useState } from "react";
import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(function () {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
      // fetch("https://api.imgflip.com/get_memes")
      //   .then((res) => res.json())
      //   .then((data) => setAllMemes(data.data.memes));
    }
    getMemes();
  }, []);

  function getImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevState) => ({ ...prevState, randomImage: url }));
  }

  function handleClick(event) {
    setMeme((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="mainbody">
      <div className="form">
        <input
          className="toppy"
          type="text"
          name="topText"
          value={meme.topText}
          onChange={handleClick}
          placeholder="Top Text"
        />
        <input
          className="boppy"
          type="text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleClick}
          placeholder="Bottom Text"
        />
        <button className="btn" name="randomImage" onClick={getImage}>
          Get New Image
        </button>
      </div>
      <div className="imgContainer">
        <img src={meme.randomImage} alt="" />
        <h2 className="meme-text topText">{meme.topText}</h2>
        <h2 className="meme-text bottomText">{meme.bottomText}</h2>
      </div>
    </div>
  );
}
