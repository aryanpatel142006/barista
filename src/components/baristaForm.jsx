import { useState } from "react";
import React from "react";
import RecipeChoices from "./RecipeChoices";
import drinksData from "../drinks.json"

const BaristaForm = () => {
    const drinks = drinksData.drinks;
    const [currentDrink, setCurrentDrink] = useState(drinks[0].name);
    const [trueRecipe, setTrueRecipe] = useState(drinks[0].ingredients);

    const [inputs, setInputs] = useState({
        temperature: '',
        milk: '',
        syrup: '',
        blended: ''
    });

    const [feedback, setFeedback] = useState(""); // "correct" or "wrong"
    const [feedbackMsg, setFeedbackMsg] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);

    const ingredients = {
        temperature: ['hot', 'lukewarm', 'cold'],
        syrup: ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        milk: ['cow', 'oat', 'goat', 'almond', 'none'],
        blended: ['yes', 'turbo', 'no']
    };

    const getNextDrink = () => {
        if (!drinks || drinks.length === 0) {
            setCurrentDrink("No drinks available");
            setTrueRecipe({});
            return;
        }
        let randomDrinkIndex = Math.floor(Math.random() * drinks.length);
        setCurrentDrink(drinks[randomDrinkIndex].name);
        setTrueRecipe(drinks[randomDrinkIndex].ingredients);
        setShowAnswer(false); // Hide answer on new drink
    };

    const onNewDrink = () => {
        setInputs({
            temperature: '',
            milk: '',
            syrup: '',
            blended: ''
        });
        setFeedback("");
        setFeedbackMsg("");
        setShowAnswer(false);
        getNextDrink();
    };

    const onCheckAnswer = (e) => {
        e.preventDefault();
        const keys = Object.keys(inputs);
        for (let key of keys) {
            if (inputs[key] !== trueRecipe[key]) {
                setFeedback("wrong");
                setFeedbackMsg("Sorry, that's not quite right. Try again!");
                setTimeout(() => {
                    setFeedback("");
                    setFeedbackMsg("");
                }, 2000);
                return;
            }
        }
        setFeedback("correct");
        setFeedbackMsg("Great job! You got it right!");
        setTimeout(() => {
            setFeedback("");
            setFeedbackMsg("");
        }, 2000);
    };

    return (
        <div>
            <h2>Hi, I'd like to order a:</h2>
            <div className="drink-container">
                <h2 className="mini-header">{currentDrink}</h2>
            </div>
            <form onSubmit={onCheckAnswer}>
                <div className="button-group">
                    <button type="submit" className="button submit">Check Answer</button>
                    <button
                        type="button"
                        className="button newdrink"
                        onClick={onNewDrink}
                    >
                        New Drink →
                    </button>
                    <button
                        type="button"
                        className="button"
                        style={{ backgroundColor: "#dbdbdb", color: "#3d2c0f" }}
                        onClick={() => setShowAnswer(!showAnswer)}
                    >
                        {showAnswer ? "Hide Answer" : "Show Answer"}
                    </button>
                </div>
                {feedback && (
                    <div id={feedback} style={{margin: "1em auto", width: "80%"}}>
                        {feedbackMsg}
                    </div>
                )}
                {showAnswer && (
                    <div className="answer-reveal" style={{
                        background: "#fffbe6",
                        borderRadius: "10px",
                        margin: "1em auto",
                        padding: "1em",
                        width: "80%",
                        boxShadow: "0 2px 8px rgba(138, 98, 12, 0.10)",
                        color: "#3d2c0f",
                        fontWeight: "500"
                    }}>
                        <strong>Answer:</strong>
                        <ul style={{margin: "0.5em 0 0 0.5em", padding: 0}}>
                            <li>Temperature: {trueRecipe.temperature}</li>
                            <li>Milk: {trueRecipe.milk}</li>
                            <li>Syrup: {trueRecipe.syrup}</li>
                            <li>Blended: {trueRecipe.blended}</li>
                        </ul>
                    </div>
                )}
                <div className="main">
                    <div className="ingredient-section">
                        <h3>Temperature</h3>
                        <div className="answer-space">{inputs["temperature"]}</div>
                        <RecipeChoices
                            handleChange={(e) => setInputs((prevState) => ({
                                ...prevState,
                                [e.target.name]: e.target.value,
                            }))}
                            label="temperature"
                            choices={ingredients["temperature"]}
                            checked={inputs["temperature"]}
                        />
                    </div>
                    <div className="ingredient-section">
                        <h3>Milk</h3>
                        <div className="answer-space">{inputs["milk"]}</div>
                        <RecipeChoices
                            handleChange={(e) => setInputs((prevState) => ({
                                ...prevState,
                                [e.target.name]: e.target.value,
                            }))}
                            label="milk"
                            choices={ingredients["milk"]}
                            checked={inputs["milk"]}
                        />
                    </div>
                    <div className="ingredient-section">
                        <h3>Syrup</h3>
                        <div className="answer-space">{inputs["syrup"]}</div>
                        <RecipeChoices
                            handleChange={(e) => setInputs((prevState) => ({
                                ...prevState,
                                [e.target.name]: e.target.value,
                            }))}
                            label="syrup"
                            choices={ingredients["syrup"]}
                            checked={inputs["syrup"]}
                        />
                    </div>
                    <div className="ingredient-section">
                        <h3>Blended</h3>
                        <div className="answer-space">{inputs["blended"]}</div>
                        <RecipeChoices
                            handleChange={(e) => setInputs((prevState) => ({
                                ...prevState,
                                [e.target.name]: e.target.value,
                            }))}
                            label="blended"
                            choices={ingredients["blended"]}
                            checked={inputs["blended"]}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BaristaForm;