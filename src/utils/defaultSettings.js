// duretion, frequency in milliseconds 1 sec = 1000 ms
module.exports = {
  userPreferences: [
    {
      frequency: 15000, // for testing
      duration: 5000, // for testing
      userId: 1,
      activityId: 1,
      activity: {
        name: "posture",
        description:
          "Good posture is about more than standing up straight so you can look your best. It is an important part of your long-term health. Making sure that you hold your body the right way can prevent pain, injuries, and other health problems.",
        frequency: 1800000,
        duration: 5000
      }
    },
    {
      frequency: 60 * 60000,
      duration: 5 * 60000,
      userId: 1,
      activityId: 2,
      activity: {
        name: "movement",
        description:
          "Sitting too much can contribute to health problems. Being less sedentary can lead to lower blood pressure, increased energy, and reduced risk of cardiovascular disease.",
        frequency: 3600000,
        duration: 300000
      }
    },
    {
      frequency: 5000,
      duration: 5000,
      userId: 1,
      activityId: 3,
      activity: {
        name: "eye strain",
        description:
          "Every 20 minutes, look at something 20 feet away for 20 seconds. The 20/20/20 rule was popularized by Dr. Jeff Anshell, a specialist in “vision ergonomics.”",
        frequency: 1200000,
        duration: 20000
      }
    },
    {
      frequency: 60 * 60000,
      duration: 5000,
      userId: 1,
      activityId: 4,
      activity: {
        name: "hydration",
        description:
          "Good posture is about more than standing up straight so you can look your best. It is an important part of your long-term health. Making sure that you hold your body the right way can prevent pain, injuries, and other health problems.",
        frequency: 3600000,
        duration: 5000
      }
    },
    {
      frequency: 14400000,
      duration: 600000,
      userId: 1,
      activityId: 5,
      activity: {
        name: "mindfulness",
        description:
          "Mindfulness techniques allow us to calm down and to be more receptive than reactive. Whether learning to meditate or merely to tune in with ourselves at various times throughout our day, mindfulness enhances your ability to feel more integrated and to act with integrity. We improve our ability to focus our attention. We are better able to slow the racing thoughts that lead us to engage in limiting or self-sabotaging behaviors. We strengthen our resilience and enhance our capacity to experience the joys of everyday life.",
        frequency: 14400000,
        duration: 600000
      }
    }
  ],
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
