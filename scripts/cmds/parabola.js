module.exports = {
  config: {
    name: "parabola",
    aliases: ["solveparabola"],
    version: "2.0", // Increase the version number
    author: "jay",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Giải phương trình parabol",
      en: "Solve parabolic equations",
    },
    longDescription: {
      vi: "Giải phương trình parabol với đỉnh tại (h, k)",
      en: "Solve parabolic equations with vertex at (h, k)",
    },
    category: "math",
    guide: {
      vi: "   {pn} <phương trình parabol>",
      en: "   {pn} <parabolic equation>",
    },
  },

  onStart: async function ({ message, event }) {
    const equation = event.body.replace(/^.*?\s/, ""); // Extract the equation from the message

    // Function to find the properties of the parabola
    function solveParabola(equation) {
      // Extract 'a', 'h', and 'k' from the equation
      const match = equation.match(/\(([^)]+)\)/g); // Match text within parentheses
      if (!match || match.length < 4) {
        return { error: "Invalid equation format" };
      }
      const a = parseFloat(match[1]); // Extract 'a'
      const h = parseFloat(match[0].split(' - ')[1]); // Extract 'h' from 'x - h'
      const k = parseFloat(match[3].split(' - ')[1]); // Extract 'k' from 'y - k'

      // Calculate other properties based on 'a', 'h', and 'k'
      const vertex = { h, k };
      const directrix = k - (1 / (4 * a));
      const focus = { x: h, y: k + (1 / (4 * a)) };
      const axisOfSymmetry = `x = ${h}`;
      const latusRectum1 = { x1: h + (1 / (4 * a)), y1: k - (1 / (2 * a)), x2: h - (1 / (4 * a)), y2: k - (1 / (2 * a)) };
      const latusRectum2 = { x1: h + (1 / (4 * a)), y1: k + (1 / (2 * a)), x2: h - (1 / (4 * a)), y2: k + (1 / (2 * a)) };
      const lengthOfLatusRectum = 1 / (a * 4);

      return {
        a,
        "2a": 2 * a,
        Vertex: `(${vertex.h}, ${vertex.k})`,
        Directrix: directrix,
        Focus: `(${focus.x}, ${focus.y})`,
        "Axis of symmetry": axisOfSymmetry,
        "Latus Rectum 1": `(${latusRectum1.x1}, ${latusRectum1.y1}), (${latusRectum1.x2}, ${latusRectum1.y2})`,
        "Latus Rectum 2": `(${latusRectum2.x1}, ${latusRectum2.y1}), (${latusRectum2.x2}, ${latusRectum2.y2})`,
        "Length of Latus Rectum": lengthOfLatusRectum,
      };
    }

    // Declare formatGuide as a let variable
    let formatGuide = "🤖 bills:     \n\nFormat Guide for Parabolic Equations:\n";
    formatGuide += "   (x - h)² = 4a(y - k)\n";
    formatGuide += "   Example: (x - 2)² = 16a(y - 9)\n";
    formatGuide += "   Make sure to provide values for 'a', 'h', and 'k'.\n";

    // Call the solveParabola function to find the properties
    const properties = solveParabola(equation);

    // Create the response message
    let responseMessage;
    if (properties.error) {
      responseMessage = `Error: ${properties.error}\n\n${formatGuide}`;
    } else {
      responseMessage = "Parabola Properties:\n";
      for (const prop in properties) {
        responseMessage += `${prop} = ${properties[prop]}\n`;
      }
    }

    // Send the response message
    message.reply(responseMessage);
  },
};
