const { createItem } = require("./item");
const { solveKnapsack } = require("./knapsackSolver");

let passCount = 0;
let failCount = 0;

function assertEqual(actual, expected, label) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? "PASS" : "FAIL"} - ${label}`);
  if (!pass) {
    console.log(`  expected: ${JSON.stringify(expected)}`);
    console.log(`  actual:   ${JSON.stringify(actual)}`);
  }
  pass ? passCount++ : failCount++;
}

console.log("=== TC1: Weight vs. Priority trade-off (W=50) ===");
{
  const items = [
    createItem(1, "Medical Kit", 5, 10),
    createItem(2, "5L Bottled Water", 10, 8),
    createItem(3, "Rice Pack (10kg)", 20, 7),
    createItem(4, "Family Tent", 30, 6),
    createItem(5, "Hygiene Pack", 3, 5),
  ];
  const result = solveKnapsack(items, 50);
  const selectedNames = result.itemsSelectedForLoading.map((i) => i.name);
  assertEqual(selectedNames.includes("Family Tent"), false, "Heavy low-priority Family Tent is excluded");
  assertEqual(result.maximumAchievedPriority, 30, "Maximum priority score is 30");
}

console.log("\n=== TC2: Over-capacity items (W=15) ===");
{
  const items = [
    createItem(1, "Item A", 30, 10),
    createItem(2, "Item B", 45, 10),
  ];
  const result = solveKnapsack(items, 15);
  assertEqual(result.itemsSelectedForLoading.length, 0, "No item fits; nothing selected");
  assertEqual(result.maximumAchievedPriority, 0, "Score is 0 when nothing fits");
}

console.log("\n=== TC3: Zero capacity — base case (W=0) ===");
{
  const items = [
    createItem(1, "Medical Kit", 5, 10),
    createItem(2, "5L Bottled Water", 10, 8),
    createItem(3, "Rice Pack (10kg)", 20, 7),
    createItem(4, "Family Tent", 30, 6),
    createItem(5, "Hygiene Pack", 3, 5),
  ];
  const result = solveKnapsack(items, 0);
  assertEqual(result.maximumAchievedPriority, 0, "Program terminates safely with score 0");
  assertEqual(result.itemsSelectedForLoading.length, 0, "No items selected at zero capacity");
}

console.log("\n=== TC4: Tie-breaking during backtracking (W=10) ===");
{
  const items = [
    createItem(1, "Item A", 10, 8),
    createItem(2, "Item B", 10, 8),
  ];
  const result = solveKnapsack(items, 10);
  assertEqual(result.itemsSelectedForLoading.length, 1, "Exactly one item is chosen");
  assertEqual(result.totalPayloadWeightKg, 10, "Total weight is exactly 10 kg");
}

console.log(`\n${passCount} passed, ${failCount} failed.`);
process.exit(failCount > 0 ? 1 : 0);