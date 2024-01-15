import { ref } from "vue";
import BinarySearchTree from "./BST";
import BSTNode from "./Node";
import { ICodeTrace, UILine, UINode } from "@/types";
import { INSERT_TRACE, NODE_PADDING, SVG_PADDING } from "@/constants";

export const useBST = () => {
  const BST = new BinarySearchTree();
  const root = ref<Nullable<BSTNode>>(null);
  const values = ref<number[]>([]);
  const nodes = ref<UINode[]>([]);
  const lines = ref<UILine[]>([]);
  const codeTrace = ref<ICodeTrace>({
    codes: [],
    traces: [{ status: "", codeIndex: null, nodes: [], lines: [] }],
  });

  const deleteTree = () => {
    root.value = null;
    values.value = [];
    nodes.value = [];
    lines.value = [];
  };

  const createUI = () => {
    const nodes: UINode[] = [];
    const lines: UILine[] = [];

    BST.getNodes(root.value).forEach((node, rank) => {
      const level = BST.findNodeLevel(root.value, node.value);
      const nodeRank = rank + 1;
      const nodeUI: UINode = {
        ...node,
        rank: nodeRank,
        level,
        position: {
          x: NODE_PADDING * nodeRank + SVG_PADDING,
          y: NODE_PADDING * level + SVG_PADDING,
        },
        isShow: true,
      };

      if (node.parent) {
        const parentRank = BST.findNodeRank(root.value, node.parent.value);
        const parentLevel = BST.findNodeLevel(root.value, node.parent.value);
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

  const setTrace = (status: string, codeIndex: Nullable<number>) => {
    if (codeTrace.value) {
      const { nodes, lines } = createUI();

      codeTrace.value.traces.push({
        status,
        codeIndex,
        nodes,
        lines,
      });
    }
  };

  const insert = (value: number) => {
    const node = new BSTNode(value);

    codeTrace.value = {
      codes: INSERT_TRACE,
      traces: [
        {
          status: `The current BST rooted at ${root.value?.value || "null"}.`,
          codeIndex: null,
          nodes: [],
          lines: [],
        },
      ],
    };

    let isExist = true;
    if (!values.value.includes(value)) {
      values.value.push(value);
      isExist = false;
    }

    if (!root.value) {
      root.value = node;
    } else {
      insertNode(root.value, node, isExist);
    }
    setTrace(`${node.value} has been inserted!`, 1);
    createUI();
  };

  const insertNode = (root: BSTNode, node: BSTNode, isExist: boolean = false) => {
    insertTrace(root, node);
    if (node.value < root.value) {
      if (!isExist) root.leftSize = root.leftSize + 1;

      if (root.left) {
        insertNode(root.left, node, isExist);
      } else {
        root.left = node;
        node.parent = root;
      }
    } else if (node.value > root.value) {
      if (root.right) {
        insertNode(root.right, node, isExist);
      } else {
        root.right = node;
        node.parent = root;
      }
    } else {
      root.quantity = root.quantity + 1;
    }
  };

  const insertTrace = (root: BSTNode, node: BSTNode) => {
    if (node.value < root.value) {
      setTrace(`Comparing ${node.value} with ${root.value}.`, 2);
      if (root.left) {
        setTrace(`${node.value} is smaller than ${root.value}, so go left.`, 3);
      } else {
        setTrace("Location found!", 0);
      }
    } else if (node.value > root.value) {
      setTrace(`Comparing ${node.value} with ${root.value}.`, 4);
      if (root.right) {
        setTrace(`${node.value} is larger than ${root.value}, so go right.`, 5);
      } else {
        setTrace("Location found!", 0);
      }
    } else {
      setTrace(`${node.value} is equal to ${root.value}, so just increment its quantity.`, 6);
    }
  };

  return {
    root,
    values,
    nodes,
    lines,
    codeTrace,
    deleteTree,
    insert,
    createUI,
  };
};
