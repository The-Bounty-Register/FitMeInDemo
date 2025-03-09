
// Mock data for the profile page - in a real app, this would come from an API
export const userData = {
  name: "John Doe",
  pastWorkouts: [
    { id: 1, date: "May 15, 2023", duration: "45 min", location: "Downtown Gym" },
    { id: 2, date: "May 12, 2023", duration: "60 min", location: "Fitness Plus" },
    { id: 3, date: "May 8, 2023", duration: "30 min", location: "Downtown Gym" },
  ],
  penalties: [
    { id: 1, date: "Apr 30, 2023", reason: "Missed booking", amount: "-10 pts" },
    { id: 2, date: "Apr 15, 2023", reason: "Late cancellation", amount: "-5 pts" },
  ],
  gyms: ["Downtown Gym", "Fitness Plus", "Elite Training Center"],
  workoutScore: 85,
  upcomingBookings: [
    { id: 1, date: "May 20, 2023", time: "10:00 AM", location: "Elite Training Center" },
    { id: 2, date: "May 23, 2023", time: "6:30 PM", location: "Downtown Gym" },
  ]
};
