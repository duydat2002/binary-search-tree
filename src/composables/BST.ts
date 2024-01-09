import BSTNode from "./Node";

export default class BST {
  root: Nullable<BSTNode>;

  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root == null;
  }

  getRoot() {
    return this.root;
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

    if (this.isEmpty()) {
      this.root = node;
    } else {
      this.insertNode(this.root!, node);
    }
  }

  insertNode(root: BSTNode, node: BSTNode) {
    if (node.value < root.value) {
      if (root.left) this.insertNode(root.left, node);
      else {
        root.left = node;
        node.parent = root;
      }
    } else if (node.value > root.value) {
      if (root.right) this.insertNode(root.right, node);
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

  getHeight(root: Nullable<BSTNode>): number {
    if (!root) return -1;
    else return Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
  }

  getNodeLevel(root: Nullable<BSTNode>, value: number, level: number = 0): number {
    if (!root) return 0;
    else if (root.value == value) return level;
    else
      return (
        this.getNodeLevel(root.left, value, level + 1) +
        this.getNodeLevel(root.right, value, level + 1)
      );
  }
}
