import SessionTitle from "./SessionTitle.jsx";
import Timer from "./Timer.jsx";
import usePomodoroStore from "../store/usePomdoroStore.js";
import {useEffect} from "react";
import Labels from "./Labels.jsx";

const Pomodoro = () => {
  const {preferences, seconds,session,sessionType, switchSession, nextSession, getPreferences} = usePomodoroStore();

  useEffect( () => {
    getPreferences();
  }, []);

  console.log(preferences)

  return (
    <>
      <SessionTitle sessionType={session}/>
      <div className="flex bg-transparent backdrop-blur-md border shadow-md border-gray-700 rounded-full p-1">
        {sessionType.map((type) => (
          <button key={type}
                  className={`btn w-50 rounded-full font-semibold ${session === type ? 'bg-[#01f501] font-bold text-gray-950' : 'btn-ghost hover:bg-gray-800/20'}`}
                  onClick={() => switchSession(type)}
          >{type}</button>
        ))}
      </div>
      <Timer sessionType={session} initialTime={seconds} onTimerEnd={nextSession}/>
      <div className="flex bg-transparent backdrop-blur-md border shadow-md border-gray-700 rounded-md p-2">
        <Labels/>
      </div>
    </>
  );
}

export default Pomodoro;