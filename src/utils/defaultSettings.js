// duretion, frequency in milliseconds 1 sec = 1000 ms
module.exports = {
  posture: {
    duration: 5000,
    frequency: 30 * 60000
    // for testing 15000
  },
  movement: {
    duration: 5 * 60000,
    frequency: 60 * 60000
  },
  vision: {

    duration: 5000,//20000,
    frequency: 20 * 60000
    //for testing 5000
  },
  hydration: {
    duration: 5000,
    frequency: 60 * 60000
  },
  mindfulness: {
    duration: 15000, //10 * 60000,
    frequency: 240 * 60000
  },
  user: {
    id: null,
    email: "",
    firstName: "",
    lastName: ""
  },
  log: [
    {
      userPreferenceId: null,
      month: null,
      date: "",
      completed_sessions: null
    }
  ]
};
