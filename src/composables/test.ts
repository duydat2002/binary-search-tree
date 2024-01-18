// import { ICodeTrace, UILine, UINode } from "@/types";
// import BinarySearchTree from "./BST";
// import BSTNode from "./Node";
// import { INSERT_TRACE } from "@/constants";

// interface ITrace {
//   status: string;
//   codeIndex: Nullable<number>;
//   nodes: UINode[];
//   lines: UILine[];
// }

// export const useBSTUI = () => {
//   let BST: Nullable<BSTNode> = null;
//   let codeTrace: ICodeTrace = {
//     codes: [],
//     traces: [],
//   };

//   const insert = (value: number) => {
//     codeTrace = {
//       codes: INSERT_TRACE,
//       traces: [],
//     };
//     const tempBST = BST;
//     let nodeTraversed: number[] = [];
//     let lineTraversed: number[] = [];
//   };

//   const createTrace = (
//     root: Nullable<BSTNode>,
//     nodeTraversed: number[],
//     lineTraversed: number[]
//   ) => {
//     const trace: ITrace = {
//       status: "",
//       codeIndex: null,
//       nodes: [],
//       lines: [],
//     };

//     const nodes = bstToArr(root);
//   };

//   const bstToArr = (root: Nullable<BSTNode>) => {
//     const nodes: UINode[] = [];
//     const lines: UILine[] = [];
//     inorder(root, (node) => {
//       nodes.push({
//         value: node.value,
//         left: node.left?.value || null,
//         right: node.right?.value || null,
//         parent: node.parent?.value || null,
//         quantity: node.quantity,
//       } as UINode);

//       const parent = node.parent;
//       if (parent) {
//       }
//     });
//     return nodes;
//   };

//   const inorder = (root: Nullable<BSTNode>, cb: Fn<BSTNode, void>) => {
//     if (root) {
//       inorder(root.left, cb);
//       cb(root);
//       inorder(root.right, cb);
//     }
//   };

//   return { insert };
// };
