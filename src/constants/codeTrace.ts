export const INSERT_TRACE = [
  "if insertion point is found",
  "  insert to this node",
  "else if value < this node value",
  "  go left",
  "else if value > this node value",
  "  go right",
  "else increment quantity",
];

export const SEARCH_TRACE = [
  "if this node == null",
  "  return null",
  "else if value < this node value",
  "  search left",
  "else if value > this node value",
  "  search right",
  "else return this node",
];

export const REMOVE_TRACE = [
  "search node to be deleted (n)",
  "if n's quantity > 1, decrement by 1",
  "else if n is a leaf",
  "  remove leaf n",
  "else if n has 1 child",
  "  bypass n",
  "else replace n with successor",
];
