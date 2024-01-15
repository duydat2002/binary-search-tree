import BSTNode from "./Node";

export default class BST {
  root: Nullable<BSTNode>;
  values: number[];

  constructor() {
    this.root = null;
    this.values = [];
  }

  isEmpty() {
    return this.root == null;
  }

  emptyTree() {
    this.root = null;
    this.values = [];
  }

  getRoot() {
    return this.root;
  }

  getNodes(root: Nullable<BSTNode>) {
    const nodes: BSTNode[] = [];
    this.inorder(root, (node) => {
      nodes.push(node);
    });
    return nodes;
  }

  // Tiền tố
  preorder(root: Nullable<BSTNode>, cb: Fn<BSTNode, void>) {
    if (root) {
      cb(root);
      this.preorder(root.left, cb);
      this.preorder(root.right, cb);
    }
  }

  // Trung tố
  inorder(root: Nullable<BSTNode>, cb: Fn<BSTNode, void>) {
    if (root) {
      this.inorder(root.left, cb);
      cb(root);
      this.inorder(root.right, cb);
    }
  }

  // Hậu tố
  postorder(root: Nullable<BSTNode>, cb: Fn<BSTNode, void>) {
    if (root) {
      this.postorder(root.left, cb);
      this.postorder(root.right, cb);
      cb(root);
    }
  }

  insert(value: number) {
    const node = new BSTNode(value);

    let isExist = true;
    if (!this.values.includes(value)) {
      this.values.push(value);
      isExist = false;
    }

    if (this.isEmpty()) {
      this.root = node;
    } else {
      this.insertNode(this.root!, node, isExist);
    }
  }

  insertNode(root: BSTNode, node: BSTNode, isExist: boolean = false) {
    if (node.value < root.value) {
      if (!isExist) root.leftSize = root.leftSize + 1;

      if (root.left) this.insertNode(root.left, node, isExist);
      else {
        root.left = node;
        node.parent = root;
      }
    } else if (node.value > root.value) {
      if (root.right) this.insertNode(root.right, node, isExist);
      else {
        root.right = node;
        node.parent = root;
      }
    } else {
      root.quantity = root.quantity + 1;
    }
  }

  remove(value: number) {
    this.root = this.removeNode(this.root, value);
  }

  removeNode(root: Nullable<BSTNode>, value: number): Nullable<BSTNode> {
    if (!root) return null;

    if (value < root.value) {
      root.left = this.removeNode(root.left, value);
      return root;
    } else if (value > root.value) {
      root.right = this.removeNode(root.right, value);
      return root;
    } else {
      // Tìm thấy giá trị cần xóa
      if (root.quantity > 1 && root.value == value) {
        root.quantity = root.quantity - 1;
        return root;
      } else if (!root.left) {
        root = root.right;
        return root;
      } else if (!root.right) {
        root = root.left;
        return root;
      } else {
        let successorNode = root.right;
        while (successorNode.left) {
          successorNode = successorNode.left;
        }

        root.value = successorNode.value;

        root.right = this.removeNode(root.right, successorNode.value);
        return root;
      }
    }
  }

  search(root: Nullable<BSTNode>, value: number): Nullable<BSTNode> {
    if (!root) return null;
    else if (value < root.value) return this.search(root.left, value);
    else if (value > root.value) return this.search(root.right, value);
    else return root;
  }

  findMin(root: Nullable<BSTNode>): Nullable<BSTNode> {
    if (!root) return null;
    else if (!root.left) return root;
    else return this.findMin(root.left);
  }

  findMax(root: Nullable<BSTNode>): Nullable<BSTNode> {
    if (!root) return null;
    else if (!root.right) return root;
    else return this.findMax(root.right);
  }

  // Giá trị nhỏ hơn gần nhất
  predecessor(root: Nullable<BSTNode>) {
    if (root?.left) return this.findMax(root.left);
    else if (root?.parent) return root.parent;
    else return null;
  }

  // Giá trị lớn hơn gần nhất
  successor(root: Nullable<BSTNode>) {
    if (root?.right) return this.findMin(root.right);
    else if (root?.parent) return root.parent;
    else return null;
  }

  findHeight(root: Nullable<BSTNode>): number {
    if (!root) return -1;
    else return Math.max(this.findHeight(root.left), this.findHeight(root.right)) + 1;
  }

  findNodeLevel(root: Nullable<BSTNode>, value: number, level: number = 0): number {
    if (!root) return 0;
    else if (root.value == value) return level;
    else
      return (
        this.findNodeLevel(root.left, value, level + 1) +
        this.findNodeLevel(root.right, value, level + 1)
      );
  }

  findNodeByRank(root: Nullable<BSTNode>, rank: number): Nullable<BSTNode> {
    if (rank == 0) return null;

    if (!root) return null;

    if (rank == root.leftSize + 1) return root;
    else if (rank <= root.leftSize) return this.findNodeByRank(root.left, rank);
    else return this.findNodeByRank(root.right, rank - root.leftSize - 1);
  }

  findNodeRank(root: Nullable<BSTNode>, value: number): number {
    if (!root) return 0;

    if (value < root.value) return this.findNodeRank(root.left, value);
    else if (value > root.value) return root.leftSize + 1 + this.findNodeRank(root.right, value);
    else return root.leftSize + 1;
  }
}
