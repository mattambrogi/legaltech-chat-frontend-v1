import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState, useEffect, useRef } from 'react';

const Home = () => {

  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatLog, setChatLog] = useState([]);

  const chatLogRef = useRef(null);

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

    // Add the current question and answer to the chat log
    setChatLog([
      ...chatLog,
      { question: userInput, answer: output.answer }
    ]);

    setIsGenerating(false);
  };

  const scrollToBottom = () => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

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
        <div className="chatlog" ref={chatLogRef}>
          {chatLog.map((chat, index) => (
            <div key={index}>
              <div className="chatlog-question">{chat.question}</div>
              <div className="chatlog-answer">{chat.answer}</div>
            </div>
          ))}
        </div>
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
