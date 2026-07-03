const { createItem } = require("./item");
const { solveKnapsack } = require("./knapsackSolver");

function displayResults(result, maxCapacity) {
  console.log("========================================");
  console.log(" DISASTER RELIEF LOADING PLAN");
  console.log("========================================");
  console.log(`Vehicle Capacity:        ${maxCapacity} kg`);
  console.log(`Maximum Priority Score:  ${result.maximumAchievedPriority}`);
  console.log(`Total Payload Weight:    ${result.totalPayloadWeightKg} kg`);
  console.log(`Remaining Capacity:      ${result.remainingVehicleCapacityKg} kg`);
  console.log("Items Selected for Loading:");

  if (result.itemsSelectedForLoading.length === 0) {
    console.log("  (none)");
  } else {
    result.itemsSelectedForLoading.forEach((item) => {
      console.log(`  - ${item.name}  (weight: ${item.weight} kg, priority: ${item.priority})`);
    });
  }
  console.log("========================================\n");
}

function main() {
  // ---- 1. Input: LGU warehouse inventory and vehicle capacity ----
  const vehicleCapacity = 60;
  
  const reliefInventory = [

    createItem(1, "Medical Kit", 5, 10),
    createItem(2, "5L Bottled Water", 10, 8),
    createItem(3, "Rice Pack (10kg)", 20, 7),
    createItem(4, "Family Tent", 30, 6),
    createItem(5, "Hygiene Pack", 3, 5),
    createItem(6, "Blanket Bundle", 8, 4),
    createItem(7, "Canned Goods (case)", 15, 6),
    createItem(8, "First Aid Supplies", 4, 9),
    createItem(9, "Flashlight & Batteries", 2, 3),
    createItem(10, "Water Purification Kit", 6, 7),


    ];

  // ---- 2. Call the solver ----
  const result = solveKnapsack(reliefInventory, vehicleCapacity);

  // ---- 3. Display the results ----
  displayResults(result, vehicleCapacity);
}

main();