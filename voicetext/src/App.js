import React,{useState,useEffect} from 'react'
import './App.css';


const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
const mic= new SpeechRecognition();
mic.continuous=true;
mic.interimResults=true;
mic.lang ='tr'

function App() {

const [islistening,setIslistening] =useState(false);
const [note,setNote] =useState(null)
const [savedNotes,setSavedNotes] =useState([]);

useEffect(() =>{
  handleListen()
},[islistening])

const handleListen= () =>{
  if(islistening)
  {
    mic.start()
    mic.onend = () =>{
      console.log("continue");
      mic.start()
    }
  }else{
    mic.stop()
    mic.onend=() =>{
      console.log("Stop Mic")
    }
  }

  mic.onstart=() =>{
    console.log('Mics On')
  }

  mic.onresult= event =>{
    const transcript= Array.from(event.results)
    .map(result => result[0])
    .map(result =>result.transcript).join('')

    console.log(transcript)
    setNote(transcript)

    mic.onerror =event =>{
      console.log(event.error)
    }
  }
}

const handleSaveNote= () =>{
  setSavedNotes([...savedNotes, note]);
  setNote('')
}

  return (
    <>
    <div className="container">
     <div className="box">
       <h2>Current Note</h2>

      {islistening? <span><i class="fas fa-microphone onRecording"></i></span> :<span><i class="fas fa-stop"></i> <i class="fas fa-microphone"></i></span>}
       <button onClick={handleSaveNote} disabled={!note}>Save Note</button>

       <button onClick={()=> setIslistening(prevState => !prevState)}>Start/Stop</button>

       <p className="note">{note}</p>
     </div>

     <div className="box">
       <h2>Notes</h2>
        {savedNotes.map(n=>(
          <p key={n}>{n}</p>
        ))}
     </div>
    </div>

    </>
  );
}

export default App;
