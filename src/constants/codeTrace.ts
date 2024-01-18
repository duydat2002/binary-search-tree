export const INSERT_TRACE = [
  "if insertion point is found",
  "   insert to this node",
  "else if value < this node value",
  "   go left",
  "else if value > this node value",
  "   go right",
  "else increment quantity",
];

export const SEARCH_TRACE = [
  "if this node child == null",
  "   return null",
  "else if value < this node value",
  "   search left",
  "else if value > this node value",
  "   search right",
  "else return this node",
];

export const SEARCH_MIN_TRACE = [
  "if tree is null return empty",
  "if left != null",
  "   go left",
  "else return this node value",
];

export const SEARCH_MAX_TRACE = [
  "if tree is null return empty",
  "if right != null",
  "   go right",
  "else return this node value",
];

export const SUCCESSOR_TRACE = [
  "if this.right != null return findMin(this.right)",
  "else",
  "   p = this.parent, T = this",
  "   while (p != null && T == p.right)",
  "      T = p, p = T.parent",
  "   if p is null return -1",
  "   else return p",
];

export const PREDECESSOR_TRACE = [
  "if this.left != null return findMax(this.left)",
  "else",
  "   p = this.parent, T = this",
  "   while (p != null && T == p.left)",
  "      T = p, p = T.parent",
  "   if p is null return -1",
  "   else return p",
];

export const REMOVE_TRACE = [
  "search node to be deleted (n)",
  "if n's quantity > 1, decrement by 1",
  "else if n is a leaf",
  "   remove leaf n",
  "else if n has 1 child",
  "   bypass n",
  "else replace n with successor",
];
