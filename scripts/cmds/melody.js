module.exports = {
  config: {
    name: "melody",
    version: "1.0",
    author: "Ecko",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Generate a melody based on a scale",
    },
    longDescription: {
      en: "Generate a random melody based on the provided scale. The generated melody is designed to sound pleasant to the ears.",
    },
    category: "music",
    guide: {
      en: "   {pn} melody <scale>: Generate a random melody based on the provided scale."
    },
  },

  onStart: function ({ message, event }) {
    const args = event.body.split(" ");
    if (args.length !== 2) {
      return message.reply("🎵 **Melody Generator**\n\nInvalid format. Please provide a single scale (e.g., Gmajor).");
    }

    const scale = args[1].toLowerCase();
    const melody = generateMelody(scale);

    if (melody) {
      return message.reply(`🎵 **Melody Generator**\n\nGenerated melody: ${melody.join(", ")}`);
    } else {
      return message.reply("🎵 **Melody Generator**\n\nFailed to generate a melody. Please check your input scale.");
    }
  },
};

// Function to generate a random melody based on a scale
function generateMelody(scale) {
  // Define the 12-tone system starting from C
  const twelveToneSystem = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  // Define intervals for Major and Natural Minor scales
  const majorIntervals = [0, 2, 4, 5, 7, 9, 11];
  const minorIntervals = [0, 2, 3, 5, 7, 8, 10];

  // Map scale names to their respective intervals
  const scales = {
    major: majorIntervals,
    minor: minorIntervals,
    // Add more scales and intervals here
  };

  // Check if the provided scale is supported
  if (scale in scales) {
    const scaleIntervals = scales[scale];
    const melody = [];

    // Find the root note index based on the provided scale
    const rootIndex = twelveToneSystem.indexOf(scale.charAt(0).toUpperCase());

    // Generate a random melody based on the scale
    for (let i = 0; i < 8; i++) { // You can adjust the number of melody notes
      const randomInterval = Math.floor(Math.random() * scaleIntervals.length);
      const randomNoteIndex = (rootIndex + scaleIntervals[randomInterval]) % 12;
      melody.push(twelveToneSystem[randomNoteIndex]);
    }

    return melody;
  }

  return null;
}
