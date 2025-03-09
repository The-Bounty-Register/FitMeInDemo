
export const gymMachines = [
  { 
    id: 1, 
    name: "Leg Press", 
    muscleGroup: "legs", 
    startTime: "13:00", 
    endTime: "13:15",
    description: "The leg press is a compound weight training exercise in which the individual pushes a weight or resistance away from them using their legs.",
    location: "Strength Zone - Section A",
    count: 3
  },
  { 
    id: 2, 
    name: "Leg Press", 
    muscleGroup: "legs", 
    startTime: "14:30", 
    endTime: "14:45",
    description: "The leg press is a compound weight training exercise in which the individual pushes a weight or resistance away from them using their legs.",
    location: "Strength Zone - Section A",
    count: 3
  },
  { 
    id: 3, 
    name: "Chest Press", 
    muscleGroup: "chest", 
    startTime: "13:00", 
    endTime: "13:15",
    description: "The chest press machine targets the pectoral muscles, anterior deltoids, and triceps. It's a safer alternative to the bench press for beginners.",
    location: "Upper Body Area - Section B",
    count: 2
  },
  { 
    id: 4, 
    name: "Lat Pulldown", 
    muscleGroup: "back", 
    startTime: "15:00", 
    endTime: "15:15",
    description: "The lat pulldown works the latissimus dorsi muscle of the back and the biceps. It simulates the pull-up motion with adjustable resistance.",
    location: "Upper Body Area - Section C",
    count: 4
  },
  { 
    id: 5, 
    name: "Lat Pulldown", 
    muscleGroup: "back", 
    startTime: "16:30", 
    endTime: "16:45",
    description: "The lat pulldown works the latissimus dorsi muscle of the back and the biceps. It simulates the pull-up motion with adjustable resistance.",
    location: "Upper Body Area - Section C",
    count: 4
  },
  { 
    id: 6, 
    name: "Lat Pulldown", 
    muscleGroup: "back", 
    startTime: "17:45", 
    endTime: "18:00",
    description: "The lat pulldown works the latissimus dorsi muscle of the back and the biceps. It simulates the pull-up motion with adjustable resistance.",
    location: "Upper Body Area - Section C",
    count: 4
  },
  { 
    id: 7, 
    name: "Shoulder Press", 
    muscleGroup: "shoulders", 
    startTime: "12:15", 
    endTime: "12:30",
    description: "The shoulder press machine strengthens the deltoid muscles and triceps. It provides support and stability for safe overhead pressing motions.",
    location: "Upper Body Area - Section B",
    count: 2
  },
  { 
    id: 8, 
    name: "Bicep Curl Machine", 
    muscleGroup: "arms", 
    startTime: "13:30", 
    endTime: "13:45",
    description: "The bicep curl machine isolates the biceps brachii for targeted strengthening. It provides consistent resistance throughout the curl motion.",
    location: "Arms Area - Section D",
    count: 3
  },
  { 
    id: 9, 
    name: "Bicep Curl Machine", 
    muscleGroup: "arms", 
    startTime: "14:45", 
    endTime: "15:00",
    description: "The bicep curl machine isolates the biceps brachii for targeted strengthening. It provides consistent resistance throughout the curl motion.",
    location: "Arms Area - Section D",
    count: 3
  },
  { 
    id: 10, 
    name: "Pec Deck", 
    muscleGroup: "chest", 
    startTime: "16:00", 
    endTime: "16:15",
    description: "The pec deck or butterfly machine isolates the chest muscles through a controlled squeezing motion. It's excellent for chest definition.",
    location: "Upper Body Area - Section B",
    count: 2
  },
  { 
    id: 11, 
    name: "Seated Row", 
    muscleGroup: "back", 
    startTime: "13:45", 
    endTime: "14:00",
    description: "The seated row strengthens the middle back muscles and improves posture. It involves pulling a weighted handle toward your torso.",
    location: "Upper Body Area - Section C",
    count: 3
  },
  { 
    id: 12, 
    name: "Leg Extension", 
    muscleGroup: "legs", 
    startTime: "15:30", 
    endTime: "15:45",
    description: "The leg extension machine targets the quadriceps at the front of the thigh. It involves straightening the knee against resistance.",
    location: "Strength Zone - Section A",
    count: 2
  },
  { 
    id: 13, 
    name: "Leg Curl", 
    muscleGroup: "legs", 
    startTime: "17:00", 
    endTime: "17:15",
    description: "The leg curl machine targets the hamstrings at the back of the thigh. It involves bending the knee against resistance.",
    location: "Strength Zone - Section A",
    count: 2
  },
  { 
    id: 14, 
    name: "Cable Crossover", 
    muscleGroup: "chest", 
    startTime: "18:30", 
    endTime: "18:45",
    description: "The cable crossover machine allows for a variety of chest exercises using adjustable pulleys. It's great for targeting different angles of the chest.",
    location: "Cable Station - Section E",
    count: 1
  },
  { 
    id: 15, 
    name: "Tricep Pushdown", 
    muscleGroup: "arms", 
    startTime: "14:00", 
    endTime: "14:15",
    description: "The tricep pushdown uses a cable machine to isolate and strengthen the triceps muscles at the back of the arm.",
    location: "Arms Area - Section D",
    count: 2
  },
  { 
    id: 16, 
    name: "Ab Crunch Machine", 
    muscleGroup: "abs", 
    startTime: "15:15", 
    endTime: "15:30",
    description: "The ab crunch machine provides resistance for strengthening the abdominal muscles. It guides your movement for proper form.",
    location: "Core Zone - Section F",
    count: 2
  },
];

export const muscleGroups = [
  { id: "all", label: "All" },
  { id: "chest", label: "Chest" },
  { id: "back", label: "Back" },
  { id: "legs", label: "Legs" },
  { id: "shoulders", label: "Shoulders" },
  { id: "arms", label: "Arms" },
  { id: "abs", label: "Abs" },
];

export const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
];
