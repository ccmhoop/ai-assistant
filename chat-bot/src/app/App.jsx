import '../css/App.css'
import { useState } from 'react';
import FormSubmit from '../components/FormSubmit';


// import FileLoader from '../components/FileLoader'

export default function App() {
 

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [model, setModel] = useState('chadz');
  const [loading, setLoading] = useState(false);
  const [stopwatch, setStopwatch] = useState("0:00");

  return (
    <div className='chat-bot-wrapper'>
      <h1 className='title'>Chadz Bot</h1>
      <textarea
        className='ai-textarea'
        value={response}
        readOnly={true}
        placeholder=""
      />
      <FormSubmit
        prompt={prompt}
        model={model}
        loading={loading}
        stopwatch={stopwatch}
        setPrompt={setPrompt}
        setModel={setModel}
        setResponse={setResponse}
        setLoading={setLoading}
        setStopwatch={setStopwatch}
      />
    </div>
  );
}


