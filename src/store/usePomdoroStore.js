import {create} from "zustand/react";
import {getAuthToken} from "../utils/auth.js";
import axios from "../api/axiosInstance.js";

let abortController = null;

const usePomodoroStore = create((set, get) => ({
  session: 'FOCUS',
  seconds: 0,
  sessionIndex: 0,
  sessionType: ['FOCUS', 'BREAK', 'LONG BREAK'],
  error: null,
  preferences: null,

  // Fetch Data
  getPreferences: async () => {
    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController();
    const signal = abortController.signal;
    console.log(signal);

    const {accessToken} = getAuthToken();

    if (!accessToken) {
      set({error: 'Unauthorized'});
      get().applyDefault();
      return;
    }

    try {
      const response = await axios.get('/users/preferences', {signal});

      console.log(response);

      const prefs = response.data.data;
      console.log(prefs);
      set({preferences: prefs});
      console.log('Data' + this.preferences);

      get().applyPreferences(prefs);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
        return;
      }
      set({error: err.response?.data?.message || err.message});

      get().applyDefault();
    } finally {
      abortController = null;
    }
  },

  applyPreferences: (prefs) => {
    const durations = {
      'FOCUS': prefs.focusDuration,
      'BREAK': prefs.shortBreakDuration,
      'LONG BREAK': prefs.longBreakDuration,
    }

    set({
      seconds: durations[get().session],
      preferences: prefs,
    })
  },

  applyDefault: () => {
    const defaults = {
      focusDuration: 6,
      shortBreakDuration: 4,
      longBreakDuration: 8,
    };

    get().applyPreferences(defaults);
  },

  switchSession: (type) => {
    const durations = {
      'FOCUS': get().preferences?.focusDuration,
      'BREAK': get().preferences?.shortBreakDuration,
      'LONG BREAK': get().preferences?.longBreakDuration,
    }

    if (type === 'FOCUS') {
      set({session: 'FOCUS', seconds: durations.FOCUS, sessionIndex: 0});
    } else if (type === 'BREAK') {
      set({session: 'BREAK', seconds: durations.BREAK, sessionIndex: 5});
    } else {
      set({session: 'LONG BREAK', seconds: durations["LONG BREAK"], sessionIndex: 7});
    }
  },

  nextSession: () => {
    const state = get();
    let newSessionIndex = state.sessionIndex + 1;

    // Determine session type based on count
    let newSessionType;
    if (newSessionIndex === 7) { // Every 4 focus sessions, long break
      newSessionIndex = 0;
      newSessionType = 'LONG BREAK';
    } else if (newSessionIndex % 2 === 0) { // Even sessions are focus
      newSessionType = 'FOCUS';
    } else { // Odd sessions are short breaks
      newSessionType = 'BREAK';
    }

    set({
      session: newSessionType,
      seconds: get().getDuration(newSessionType),
      sessionIndex: newSessionIndex
    });

  },

  getDuration: (type) => {
    const durations = {
      'FOCUS': get().preferences?.focusDuration,
      'BREAK': get().preferences?.shortBreakDuration,
      'LONG BREAK': get().preferences?.longBreakDuration,
    }

    return durations[type]
  }
}));

export default usePomodoroStore;