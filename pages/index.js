import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {

  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const onUserTextChange = (event) => {
    setUserInput(event.target.value);
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log(output.answer)
    setApiOutput(`${output.answer}`);
    setIsGenerating(false);
  };

  return (
    <div className="root">
      <Head>
        <title>Legal Tech Chat Bot</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Legal Tech Chat Bot</h1>
          </div>
          <div className="header-subtitle">
            <h2>Ask any question about legal tech</h2>
          </div>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        <div className="prompt-container">
          <textarea
            placeholder="What is the ABA tech show?"
            className="prompt-box"
            value={userInput}
            onChange={onUserTextChange}
          />
        </div>
        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Ask</p>}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
