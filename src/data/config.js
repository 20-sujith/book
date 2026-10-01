import bgMusic from '../assets/music/Gang Leader BGMs - Hoyna Hoyna BGM.mp3';

// Configuration for the application
export const config = {
  // Set password to null to disable password protection
  password: "Mittai", 
  passwordHint: "Hint: chocalte",
  
  // Date for countdown timer
  nextMeetingDate: "2024-12-31T00:00:00", 
  
  // Title of the book
  bookTitle: "My Love for Her 💌",
  
  // Her name
  herName: "Mittai",

  // To change the music, place your mp3 file in src/assets/music/ and update the import above
  backgroundMusic: bgMusic,
  
  // Theme settings
  theme: {
    primary: "pink-400",
    secondary: "rose-300",
    dark: "stone-900"
  }
};
