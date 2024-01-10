import { ILine, INode } from "@/types";
import BinarySearchTree from "./BST";
import BSTNode from "./Node";
import { NODE_PADDING, SVG_PADDING } from "@/constants";

export const useDrawBST = () => {
  const BST = new BinarySearchTree();

  const initNodes = (root: Nullable<BSTNode>) => {
    const nodes: INode[] = [];

    BST.getNodes(root).forEach((node, rank) => {
      const level = BST.findNodeLevel(root, node.value);

      nodes.push({
        ...node,
        rank,
        level,
        position: { x: NODE_PADDING * rank + SVG_PADDING, y: NODE_PADDING * level + SVG_PADDING },
      });
    });

    return nodes;
  };

  const initUI = (root: Nullable<BSTNode>) => {
    const nodes: INode[] = [];
    const lines: ILine[] = [];

    BST.getNodes(root).forEach((node, rank) => {
      const level = BST.findNodeLevel(root, node.value);
      const nodeRank = rank + 1;
      const nodeUI = {
        ...node,
        rank: nodeRank,
        level,
        position: {
          x: NODE_PADDING * nodeRank + SVG_PADDING,
          y: NODE_PADDING * level + SVG_PADDING,
        },
      };

      if (node.parent) {
        const parentRank = BST.findNodeRank(root, node.parent.value);
        const parentLevel = BST.findNodeLevel(root, node.parent.value);
        const parentPosition = {
          x: NODE_PADDING * parentRank + SVG_PADDING,
          y: NODE_PADDING * parentLevel + SVG_PADDING,
        };

        lines.push({
          start: {
            ...node.parent,
            rank: parentRank,
            level: parentLevel,
            position: parentPosition,
          },
          end: nodeUI,
        });
      }

      nodes.push(nodeUI);
    });

    return { nodes, lines };
  };

  return {
    initNodes,
    initUI,
  };
};
