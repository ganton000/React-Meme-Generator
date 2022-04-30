import React, { useState, useEffect } from "react";

export default function Meme(){

    const [memeData, setMemeData] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([]);

    useEffect( () => {
        //Using Async
        //async function getMemes() {
        //    const res = await fetch("https://api.imgflip.com/get_memes")
        //    const data = await res.json()
        //    setAllMemes(data.data.memes)
        //}
        //getMemes()
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function handleChange(event){
        const {name, value} = event.target
        setMemeData( prevMemeData => ({
            ...prevMemeData,
            [name]: value
        }))
    }

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        //const url = memesArray[randomNumber].url
        const { url } = allMemes[randomNumber]
        setMemeData( prevState => ({
            ...prevState,
            randomImage: url
        }))
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleChange}
                    name="topText"
                    value={memeData.topText}
                    />
                <input
                type="text"
                placeholder="Bottom text"
                className="form--input"
                onChange={handleChange}
                name="bottomText"
                value={memeData.bottomText}
                />
                <button onClick={getMemeImage}
                className="form--button">
                    Get a new meme image 🖼️
                </button>
            </div>
            <div className="meme">

                <img src={memeData.randomImage} alt="meme"  className="meme--image" />
                <h2 className="meme--text top">{memeData.topText}</h2>
                <h2 className="meme--text bottom"> {memeData.bottomText}</h2>
            </div>
        </main>
    )
}