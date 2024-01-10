export default class BSTNode {
  value: number;
  quantity: number;
  left: Nullable<BSTNode>;
  right: Nullable<BSTNode>;
  parent: Nullable<BSTNode>;
  leftSize: number;

  constructor(value: number) {
    this.value = value;
    this.quantity = 1;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.leftSize = 0;
  }
}
