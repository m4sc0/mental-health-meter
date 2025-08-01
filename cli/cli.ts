require("dotenv").config();
const inquirer = require("inquirer");
const { execSync } = require("child_process");
const fs = require("fs");

const FILE = process.env.LOCAL_FILE || "./data.json";
const DEST = process.env.RSYNC_DEST;

const LEVELS = ["Mood", "Energy", "Anxiety", "Depression"];

async function main() {
  const levels: { name: string; value: number }[] = [];
  for (const name of LEVELS) {
    const { value } = await inquirer.prompt({
      type: "number",
      name: "value",
      message: `Level for ${name} (0-10)`,
      validate: (v: number) =>
        v >= 0 && v <= 10 ? true : "Please enter a number from 0 to 10",
    });
    levels.push({ name, value });
  }

  const { status } = await inquirer.prompt({
    type: "input",
    name: "status",
    message: "How are you doing?",
  });

  const { tagsRaw } = await inquirer.prompt({
    type: "input",
    name: "tagsRaw",
    message: "Enter 1-5 tags (comma separated)",
    validate: (input: string) => {
      if (typeof input !== "string") return "Invalid input";
      const count = input.split(",").filter(Boolean).length;
      return count >= 1 && count <= 5 ? true : "Enter between 1 and 5 tags";
    },
  });

  const tags = tagsRaw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const newData = {
    levels,
    status,
    tags,
    lastUpdated: Math.floor(Date.now()),
  };

  fs.writeFileSync(FILE, JSON.stringify(newData, null, 2));
  console.log(`Data saved to ${FILE}`);

  if (DEST) {
    try {
      execSync(`rsync -avz ${FILE} ${DEST}`, { stdio: "inherit" });
      console.log("Synced to remote destination");
    } catch (err) {
      console.error(`Failed to sync: ${err}`);
    }
  } else {
    console.warn("No RSYNC_DEST defined. Skipping sync.");
  }
}

main();
