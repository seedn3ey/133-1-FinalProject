function createItem(id, name, weight, priority) {
  if (!Number.isInteger(weight) || weight < 0) {
    throw new Error(`Item "${name}": weight must be a non-negative integer.`);
  }
  if (!Number.isInteger(priority) || priority < 0) {
    throw new Error(`Item "${name}": priority must be a non-negative integer.`);
  }

  return { id, name, weight, priority };
}

module.exports = { createItem };