export default class BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
  leftSize: number;
  parent: BSTNode | null;
  quantity: number;

  constructor(value: number) {
    this.value = value;
    this.quantity = 1;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.leftSize = 0;
  }
}
