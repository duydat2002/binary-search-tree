export default class BSTNode {
  value: number;
  quantity: number;
  left: BSTNode | null;
  right: BSTNode | null;
  parent: BSTNode | null;

  constructor(value: number) {
    this.value = value;
    this.quantity = 1;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}
