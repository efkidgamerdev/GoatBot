const generateMaze = (rows, columns) => {
  const maze = [];

  // Create an empty maze grid
  for (let i = 0; i < rows; i++) {
    maze[i] = [];
    for (let j = 0; j < columns; j++) {
      maze[i][j] = "#"; // Initialize all cells as walls
    }
  }

  const directions = [
    { row: -1, col: 0 }, // Up
    { row: 1, col: 0 },  // Down
    { row: 0, col: -1 }, // Left
    { row: 0, col: 1 }   // Right
  ];

  const stack = [];

  // Choose a random starting point
  const startRow = Math.floor(Math.random() * rows);
  const startCol = Math.floor(Math.random() * columns);

  maze[startRow][startCol] = "S"; // Set the starting point

  stack.push({ row: startRow, col: startCol });

  while (stack.length > 0) {
    const current = stack.pop();
    const { row, col } = current;

    // Check if all neighbors have been visited
    let neighbors = [];

    for (let i = 0; i < directions.length; i++) {
      const { row: deltaRow, col: deltaCol } = directions[i];
      const newRow = row + deltaRow;
      const newCol = col + deltaCol;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < columns &&
        maze[newRow][newCol] === "#"
      ) {
        neighbors.push({ row: newRow, col: newCol });
      }
    }

    if (neighbors.length === 0) {
      continue;
    }

    stack.push(current);

    const { row: nextRow, col: nextCol } = neighbors[Math.floor(Math.random() * neighbors.length)];

    // Remove the wall between the current cell and the chosen neighbor
    maze[row][col] = " ";

    // Set the chosen neighbor as the new current cell
    maze[nextRow][nextCol] = " ";
    stack.push({ row: nextRow, col: nextCol });
  }

  // Choose a random exit point
  const exitRow = Math.floor(Math.random() * rows);
  const exitCol = Math.floor(Math.random() * columns);

  maze[exitRow][exitCol] = "E"; // Set the exit point

  return maze;
};

module.exports = {
  config: {
    name: "maze",
    aliases: [],
    version: "1.0",
    author: "GoatAI by LiANE",
    cooldown: 0,
    role: 0,
    shortDescription: {
      en: "Navigate through a randomly generated maze",
      tl: "Mag-navigate sa isang randomly generated maze"
    },
    longDescription: {
      en: "Navigate through a randomly generated maze using GoatBot AI",
      tl: "Mag-navigate sa isang randomly generated maze gamit ang GoatBot AI"
    },
    category: "goatBot",
    guide: {
      en: "{p}maze",
      tl: "{p}maze"
    }
  },

  onStart: async function ({ event, message, args }) {
    const maze = generateMaze(10, 10); // Change the dimensions as needed

    // Print the maze
    for (let i = 0; i < maze.length; i++) {
      const row = maze[i].join("");
      message.reply(row);
    }
  }
};