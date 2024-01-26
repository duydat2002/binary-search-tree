export const PREORDER_TRACE = [
  "if this node is null, return",
  "visit this",
  "Preorder(left)",
  "Preorder(right)",
];

export const INORDER_TRACE = [
  "if this node is null, return",
  "Inorder(left)",
  "visit this",
  "Inorder(right)",
];

export const POSTORDER_TRACE = [
  "if this node is null, return",
  "Postorder(left)",
  "Postorder(right)",
  "visit this",
];

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

export const FIND_NODE_AT_RANK_TRACE = [
  "if this node is null or rank <= 0, return null",
  "r = rank of this node, ls = size of this left subtree",
  "if r == ls + 1, return this node",
  "else if r <= ls find node whose rank is r on left",
  "else find node whose rank is (r-ls-1) on right",
];

export const FIND_NODE_RANK_TRACE = [
  "if this node is null, return 0",
  "ls = size of this left subtree",
  `if value < this node value,<br>
     return node rank at left child`,
  `else if r > this node value,<br>
     return ls + 1 + node rank at right child`,
  "else return ls + 1",
];

export const FIND_NODE_LEVEL_TRACE = [
  "if this node child == null",
  "   return null",
  "else if value < this node value",
  "   increment level, search node in left",
  "else if value > this node value",
  "   increment level, search node in right",
  "else return this node level",
];
