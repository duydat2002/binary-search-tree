import { ref } from "vue";
import { ICodeTrace, INodes, ITrace, UILine, UINode } from "@/types";
import {
  INSERT_TRACE,
  SEARCH_TRACE,
  NODE_PADDING,
  SVG_PADDING,
  SEARCH_MIN_TRACE,
  SEARCH_MAX_TRACE,
  PREDECESSOR_TRACE,
  SUCCESSOR_TRACE,
  REMOVE_TRACE,
  PREORDER_TRACE,
  INORDER_TRACE,
  POSTORDER_TRACE,
  FIND_NODE_AT_RANK_TRACE,
  FIND_NODE_RANK_TRACE,
  FIND_NODE_LEVEL_TRACE,
} from "@/constants";

export const useBSTUI = () => {
  let BST = ref<INodes>({});
  BST.value["root"] = null;
  let codeTrace: ICodeTrace = {
    codes: [],
    traces: [],
  };

  const resetBST = () => {
    BST.value = {};
  };

  const setBST = (newBST: INodes) => {
    BST.value = newBST;
  };

  const getBST = () => {
    return BST.value;
  };

  const getBSTValues = () => {
    return Object.keys(BST.value)
      .map((v) => Number(v))
      .filter((v) => !isNaN(v));
  };

  const getBSTRoot = () => {
    const root = BST.value["root"]?.value;
    return root ? BST.value[root] : null;
  };

  const getMaxRank = () => {
    return Object.keys(BST.value).length - 1;
  };

  const getRootHeight = (BSTObj: INodes, root?: Nullable<number>) => {
    if (root == null) return -1;
    else
      return (
        Math.max(
          getRootHeight(BSTObj, BSTObj[root]?.left),
          getRootHeight(BSTObj, BSTObj[root]?.right)
        ) + 1
      );
  };

  const resetCodeTrace = () => {
    codeTrace = {
      codes: [],
      traces: [],
    };
  };

  const search = (value: number) => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};

    let trace = createTrace(tempBST);
    trace.status = `The current BST rooted at ${tempBST["root"]?.value || "null"}.`;
    codeTrace.codes = SEARCH_TRACE;
    codeTrace.traces.push(trace);

    let isFound = true;
    let cur = tempBST["root"]?.value || null;
    while (cur != null && cur != value) {
      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Comparing ${value} with ${cur}.`;
      trace.nodes[cur] = {
        ...trace.nodes[cur],
        isTraver: true,
        extraText: "^",
      } as UINode;
      nodeTraversed[cur] = true;
      codeTrace.traces.push(trace);

      if (value < cur) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `${value} is smaller than ${cur}.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          extraText: "^",
        } as UINode;
        trace.codeIndex = tempBST[cur]!.left != null ? 2 : 0;
        codeTrace.traces.push(trace);

        if (tempBST[cur]!.left != null) {
          cur = tempBST[cur]!.left!;

          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.lines[cur] = {
            ...trace.lines[cur],
            isTraver: true,
          } as UILine;
          lineTraversed[cur] = true;
          trace.status = `So search on left.`;
          trace.codeIndex = 3;
          codeTrace.traces.push(trace);
        } else {
          isFound = false;
          break;
        }
      } else if (value > cur) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `${value} is greater than ${cur}.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          extraText: "^",
        } as UINode;
        trace.codeIndex = tempBST[cur]!.right != null ? 4 : 0;
        codeTrace.traces.push(trace);

        if (tempBST[cur]!.right != null) {
          cur = tempBST[cur]!.right!;

          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.lines[cur] = {
            ...trace.lines[cur],
            isTraver: true,
          } as UILine;
          lineTraversed[cur] = true;
          trace.status = `So search on right.`;
          trace.codeIndex = 5;
          codeTrace.traces.push(trace);
        } else {
          isFound = false;
          break;
        }
      }
    }

    if (cur != null && isFound) {
      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Node ${value} is found.`;
      trace.nodes[cur] = {
        ...trace.nodes[cur],
        isTraver: true,
        extraText: "found",
      } as UINode;
      trace.codeIndex = 6;
      codeTrace.traces.push(trace);
    } else {
      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Node ${value} is not found.`;
      trace.codeIndex = 1;
      codeTrace.traces.push(trace);
    }

    return codeTrace;
  };

  const searchMin = () => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};

    codeTrace.codes = SEARCH_MIN_TRACE;
    let trace = createTrace(tempBST);
    if (!tempBST["root"]?.value) {
      trace.status = `Tree is empty, there is no minimum value.`;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);
    } else {
      trace.status = `The current BST rooted at ${tempBST["root"].value}.`;
      codeTrace.traces.push(trace);

      let cur = tempBST["root"]?.value;
      while (tempBST[cur]?.left != null) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `${cur} is not the minimum value as it has a left child.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "^",
        } as UINode;
        trace.codeIndex = 1;
        nodeTraversed[cur] = true;
        codeTrace.traces.push(trace);

        cur = tempBST[cur]!.left!;
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Go left to check for smaller value...`;
        trace.lines[cur] = {
          ...trace.lines[cur],
          isTraver: true,
        } as UILine;
        lineTraversed[cur] = true;
        trace.codeIndex = 2;
        codeTrace.traces.push(trace);
      }

      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Minimum value ${cur} found!`;
      trace.nodes[cur] = {
        ...trace.nodes[cur],
        isTraver: true,
        extraText: "min",
      } as UINode;
      trace.codeIndex = 3;
      codeTrace.traces.push(trace);
    }

    return codeTrace;
  };

  const searchMax = () => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};

    codeTrace.codes = SEARCH_MAX_TRACE;
    let trace = createTrace(tempBST);
    if (!tempBST["root"]?.value) {
      trace.status = `Tree is empty, there is no maximum value.`;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);
    } else {
      trace.status = `The current BST rooted at ${tempBST["root"].value}.`;
      codeTrace.traces.push(trace);

      let cur = tempBST["root"]?.value;
      while (tempBST[cur]?.right != null) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `${cur} is not the maximum value as it has a right child.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "^",
        } as UINode;
        trace.codeIndex = 1;
        nodeTraversed[cur] = true;
        codeTrace.traces.push(trace);

        cur = tempBST[cur]!.right!;
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Go right to check for larger value...`;
        trace.lines[cur] = {
          ...trace.lines[cur],
          isTraver: true,
        } as UILine;
        lineTraversed[cur] = true;
        trace.codeIndex = 2;
        codeTrace.traces.push(trace);
      }

      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Maximum value ${cur} found!`;
      trace.nodes[cur] = {
        ...trace.nodes[cur],
        isTraver: true,
        extraText: "max",
      } as UINode;
      trace.codeIndex = 3;
      codeTrace.traces.push(trace);
    }

    return codeTrace;
  };

  const insert = (value: number) => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};

    let trace = createTrace(tempBST);
    trace.status = `The current BST rooted at ${tempBST["root"]?.value || "null"}.`;
    codeTrace.codes = INSERT_TRACE;
    codeTrace.traces.push(trace);

    let isNeedNewNode = true;
    // Insert
    if (tempBST["root"] == null) {
      tempBST["root"] = { value } as UINode;
      tempBST[value] = {
        value: value,
        left: null,
        right: null,
        parent: null,
        quantity: 1,
        leftSize: 0,
      } as UINode;

      calcPosition(tempBST);
    } else {
      let parentValue = tempBST["root"].value;

      while (true) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Comparing ${value} with ${parentValue}.`;
        trace.codeIndex = value < parentValue ? 2 : value > parentValue ? 4 : 6;
        trace.nodes[parentValue] = {
          ...trace.nodes[parentValue],
          isTraver: true,
          extraText: "^",
        } as UINode;
        nodeTraversed[parentValue] = true;
        codeTrace.traces.push(trace);

        if (value < parentValue) {
          if (!tempBST[value]) tempBST[parentValue]!.leftSize += 1;

          if (tempBST[parentValue]!.left != null) {
            const left = tempBST[parentValue]!.left!;
            trace = createTrace(tempBST, nodeTraversed, lineTraversed);
            trace.lines[left] = {
              ...trace.lines[left],
              isTraver: true,
            } as UILine;
            lineTraversed[left] = true;
            trace.status = `${value} is smaller than ${parentValue}, so go left.`;
            trace.codeIndex = 3;
            codeTrace.traces.push(trace);

            parentValue = tempBST[parentValue]!.left!;
          } else break;
        } else if (value > parentValue) {
          if (tempBST[parentValue]!.right != null) {
            const right = tempBST[parentValue]!.right!;
            trace = createTrace(tempBST, nodeTraversed, lineTraversed);
            trace.lines[right] = {
              ...trace.lines[right],
              isTraver: true,
            } as UILine;
            lineTraversed[right] = true;
            trace.status = `${value} is greater than ${parentValue}, so go right.`;
            trace.codeIndex = 5;
            codeTrace.traces.push(trace);

            parentValue = tempBST[parentValue]!.right!;
          } else break;
        } else {
          tempBST[value]!.quantity += 1;

          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `${value} is equal to ${value}, so just increment its quantity.`;
          trace.codeIndex = 6;
          trace.nodes[value] = {
            ...trace.nodes[value],
            isTraver: true,
            extraText: "inc",
          } as UINode;
          codeTrace.traces.push(trace);

          isNeedNewNode = false;
          break;
        }
      }

      if (value < parentValue) tempBST[parentValue]!.left = value;
      else if (value > parentValue) tempBST[parentValue]!.right = value;

      if (isNeedNewNode) {
        tempBST[value] = {
          value,
          left: null,
          right: null,
          parent: parentValue,
          quantity: 1,
          leftSize: 0,
        } as UINode;

        calcPosition(tempBST);

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Location found! Inserting ${value}.`;
        trace.codeIndex = 0;
        trace.nodes[value] = {
          ...trace.nodes[value],
          isShow: false,
        } as UINode;
        trace.lines[value] = {
          ...trace.lines[value],
          isShow: false,
          isTraver: true,
        } as UILine;
        lineTraversed[value] = true;
        codeTrace.traces.push(trace);
      }
    }

    if (isNeedNewNode) {
      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `${value} has been inserted!`;
      trace.codeIndex = 1;
      trace.nodes[value] = {
        ...trace.nodes[value],
        isTraver: true,
        extraText: "new",
      } as UINode;
      codeTrace.traces.push(trace);
    }

    BST.value = tempBST;

    return codeTrace;
  };

  const remove = (value: number) => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};

    let trace: ITrace = createTrace(tempBST);
    codeTrace.codes = REMOVE_TRACE;

    let isFound = true;
    if (tempBST["root"] == null) {
      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `The current BST rooted at null.`;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);
      return codeTrace;
    }

    let cur = tempBST["root"]!.value;
    while (cur != null && cur != value) {
      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Searching for node ${value} to remove.`;
      trace.nodes[cur] = {
        ...trace.nodes[cur],
        isTraver: true,
        extraText: "^",
      } as UINode;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);

      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Searching for node ${value} to remove.`;
      trace.codeIndex = 0;
      if (value < cur) {
        if (tempBST[cur]!.left != null) {
          cur = tempBST[cur]!.left!;

          trace.lines[cur] = {
            ...trace.lines[cur],
            isTraver: true,
          } as UILine;
          lineTraversed[cur] = true;
        } else {
          isFound = false;
          break;
        }
      } else {
        if (tempBST[cur]!.right != null) {
          cur = tempBST[cur]!.right!;

          trace.lines[cur] = {
            ...trace.lines[cur],
            isTraver: true,
          } as UILine;
          lineTraversed[cur] = true;
        } else {
          isFound = false;
          break;
        }
      }
      codeTrace.traces.push(trace);
    }

    if (cur != null && isFound) {
      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Node ${value} is found.`;
      trace.nodes[cur] = {
        ...trace.nodes[cur],
        isTraver: true,
        extraText: "found",
      } as UINode;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);

      let left = tempBST[cur]?.left;
      let right = tempBST[cur]?.right;
      if (tempBST[cur]!.quantity > 1) {
        tempBST[cur]!.quantity -= 1;

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `${value} is equal to ${value}, so just decrement its quantity.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "dec",
        } as UINode;
        trace.codeIndex = 1;
        codeTrace.traces.push(trace);
      } else if (left == null && right == null) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Node ${value} has no children (a leaf).`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "remove",
        } as UINode;
        trace.codeIndex = 2;
        codeTrace.traces.push(trace);

        const parent = tempBST[cur]?.parent;
        if (parent != null) {
          if (cur < parent) tempBST[parent]!.left = null;
          else tempBST[parent]!.right = null;
        } else {
          tempBST["root"] = null;
        }
        delete tempBST[cur];
        delete nodeTraversed[cur];
        delete lineTraversed[cur];
        calcPosition(tempBST);

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Remove leaf ${value}.`;
        trace.codeIndex = 3;
        codeTrace.traces.push(trace);
      } else if (left != null && right != null) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Node ${value} only has two child.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "remove",
        } as UINode;
        trace.codeIndex = 6;
        codeTrace.traces.push(trace);

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Finding successor of ${value}.`;
        trace.nodes[value] = {
          ...trace.nodes[value],
          extraText: "remove",
        } as UINode;
        trace.nodes[right] = {
          ...trace.nodes[right],
          isTraver: true,
        } as UINode;
        trace.lines[right] = {
          ...trace.lines[right],
          isTraver: true,
        } as UILine;
        nodeTraversed[right] = true;
        lineTraversed[right] = true;
        trace.codeIndex = 6;
        codeTrace.traces.push(trace);

        cur = right;

        while (tempBST[cur]?.left != null) {
          left = tempBST[cur]!.left!;

          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `Finding successor of ${value}.`;
          trace.nodes[value] = {
            ...trace.nodes[value],
            extraText: "remove",
          } as UINode;
          trace.nodes[left] = {
            ...trace.nodes[left],
            isTraver: true,
          } as UINode;
          trace.lines[left] = {
            ...trace.lines[left],
            isTraver: true,
          } as UILine;
          nodeTraversed[left] = true;
          lineTraversed[left] = true;
          trace.codeIndex = 6;
          codeTrace.traces.push(trace);

          cur = left;
        }

        if (tempBST["root"]!.value == value) {
          delete lineTraversed[cur];
          tempBST["root"]!.value = cur;
        }

        let valueParent = tempBST[value]?.parent;
        let sucParent = tempBST[cur]?.parent!;
        let sucRight = tempBST[cur]?.right || null;
        left = tempBST[value]?.left!;
        right = tempBST[value]?.right!;

        if (valueParent)
          if (value < valueParent) tempBST[valueParent]!.left = cur;
          else tempBST[valueParent]!.right = cur;
        tempBST[left]!.parent = cur;
        tempBST[right]!.parent = cur;

        tempBST[cur]!.parent = valueParent || null;
        tempBST[cur]!.left = left;

        if (tempBST[sucParent]!.left == cur) {
          tempBST[cur]!.right = right;
          tempBST[sucParent]!.left = sucRight;
          if (sucRight) tempBST[sucRight]!.parent = sucParent;
        }

        delete tempBST[value];
        delete nodeTraversed[value];
        delete lineTraversed[value];

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Replace node ${value} with its successor.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          extraText: "successor",
        } as UINode;
        trace.lines[left]!.isTraver = true;
        trace.codeIndex = 6;
        codeTrace.traces.push(trace);

        calcPosition(tempBST);
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Replace node ${value} with its successor.`;
        trace.lines[left]!.isTraver = true;
        trace.codeIndex = 6;
        codeTrace.traces.push(trace);
      } else {
        const childName = left != null ? "left" : "right";
        const child = (left || right)!;
        const parent = tempBST[cur]!.parent;

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Node ${value} only has a ${childName} child.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "remove",
        } as UINode;
        trace.codeIndex = 4;
        codeTrace.traces.push(trace);

        tempBST[child]!.parent = parent;
        if (parent != null) {
          tempBST[parent]![value < parent ? "left" : "right"] = child;
        } else {
          tempBST["root"]!.value = child;
        }
        delete tempBST[value];
        delete nodeTraversed[value];
        delete lineTraversed[value];
        calcPosition(tempBST);

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Remove node ${value} and connect its parent to its ${childName} child.`;
        trace.nodes[child]!.isTraver = true;
        if (trace.lines[child] != null) {
          trace.lines[child]!.isTraver = true;
        }
        trace.codeIndex = 5;
        codeTrace.traces.push(trace);
      }
    } else {
      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Node ${value} is not in BST.`;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);
    }

    resetLeftSize(tempBST);
    BST.value = tempBST;

    return codeTrace;
  };

  const findPredecessor = (value: number) => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};

    codeTrace.codes = PREDECESSOR_TRACE;
    let trace = createTrace(tempBST);
    if (Object.keys(tempBST).length <= 2) {
      trace.status = `The tree must have 2 or more nodes to find predecessor!`;
      codeTrace.traces.push(trace);

      return codeTrace;
    }

    if (tempBST[value]?.left != null) {
      const left = tempBST[value]!.left!;

      trace.status = `This node has a left child, so go left.`;
      trace.nodes[value] = {
        ...trace.nodes[value],
        isTraver: true,
        extraText: "^",
      } as UINode;
      trace.lines[left] = {
        ...trace.lines[left],
        isTraver: true,
      } as UILine;
      nodeTraversed[value] = true;
      lineTraversed[left] = true;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);

      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Check whether the left child has a right child.`;
      trace.nodes[left] = {
        ...trace.nodes[left],
        isTraver: true,
        extraText: "^",
      } as UINode;
      nodeTraversed[left] = true;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);

      let cur = left;
      while (tempBST[cur]?.right != null) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `${value} is not the predecessor node as it has a right child.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "^",
        } as UINode;
        nodeTraversed[cur] = true;
        trace.codeIndex = 0;
        codeTrace.traces.push(trace);

        cur = tempBST[cur]!.right!;
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Go right to check for larger value.`;
        trace.lines[cur] = {
          ...trace.lines[cur],
          isTraver: true,
        } as UILine;
        lineTraversed[cur] = true;
        trace.codeIndex = 0;
        codeTrace.traces.push(trace);
      }

      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Predecessor found!<br>The predecessor of ${value} is ${cur}.`;
      trace.nodes[value] = {
        ...trace.nodes[value],
        isTraver: true,
        extraText: "n",
      } as UINode;
      trace.nodes[cur] = {
        ...trace.nodes[cur],
        isTraver: true,
        extraText: "predecessor of n",
      } as UINode;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);
    } else {
      let t = value;
      let p = tempBST[t]?.parent;

      trace.status = `No left child found, so check the parent.`;
      trace.nodes[t] = {
        ...trace.nodes[t],
        isTraver: true,
        extraText: "T",
      } as UINode;
      if (p) {
        trace.nodes[p] = {
          ...trace.nodes[p],
          extraText: "p",
        } as UINode;
      }
      trace.lines[t] = {
        ...trace.lines[t],
        isTraver: true,
      } as UILine;
      nodeTraversed[t] = true;
      lineTraversed[t] = true;
      trace.codeIndex = 2;
      codeTrace.traces.push(trace);

      while (p != null && t == tempBST[p]?.left) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `${p} is not the predecessor node as ${value} is part of the left sub-tree.`;
        trace.nodes[p] = {
          ...trace.nodes[p],
          isTraver: true,
        } as UINode;
        nodeTraversed[p] = true;
        trace.codeIndex = 3;
        codeTrace.traces.push(trace);

        t = p;
        p = tempBST[t]?.parent;
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Go up to check for smaller value.`;
        trace.nodes[t] = {
          ...trace.nodes[t],
          isTraver: true,
          extraText: "t",
        } as UINode;
        if (p != null) {
          trace.nodes[p] = {
            ...trace.nodes[p],
            isTraver: true,
            extraText: "p",
          } as UINode;
          nodeTraversed[p] = true;
          trace.lines[t] = {
            ...trace.lines[t],
            isTraver: true,
          } as UILine;
          lineTraversed[t] = true;
        }
        trace.codeIndex = 4;
        codeTrace.traces.push(trace);
      }

      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      if (p != null) {
        trace.status = `Predecessor found!<br>   The predecessor of ${value} is ${p}.`;
        trace.nodes[value] = {
          ...trace.nodes[value],
          isTraver: true,
          extraText: "n",
        } as UINode;
        trace.nodes[p] = {
          ...trace.nodes[p],
          isTraver: true,
          extraText: "predecessor of n",
        } as UINode;
        trace.codeIndex = 6;
        codeTrace.traces.push(trace);
      } else {
        trace.status = `Parent is null, so ${value} has no predecessor.`;
        trace.nodes[value] = {
          ...trace.nodes[value],
          isTraver: true,
          extraText: "n",
        } as UINode;
        trace.codeIndex = 5;
        codeTrace.traces.push(trace);
      }
    }

    return codeTrace;
  };

  const findSuccessor = (value: number) => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};

    codeTrace.codes = SUCCESSOR_TRACE;
    let trace = createTrace(tempBST);
    if (Object.keys(tempBST).length <= 2) {
      trace.status = `The tree must have 2 or more nodes to find successor!`;
      codeTrace.traces.push(trace);

      return codeTrace;
    }

    if (tempBST[value]?.right != null) {
      trace.status = `This node has a right child, so go right.`;
      trace.nodes[value] = {
        ...trace.nodes[value],
        isTraver: true,
        extraText: "^",
      } as UINode;
      const right = tempBST[value]?.right!;
      trace.lines[right] = {
        ...trace.lines[right],
        isTraver: true,
      } as UILine;
      nodeTraversed[value] = true;
      lineTraversed[right] = true;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);

      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Check whether the right child has a left child.`;
      trace.nodes[right] = {
        ...trace.nodes[right],
        isTraver: true,
        extraText: "^",
      } as UINode;
      nodeTraversed[right] = true;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);

      let cur = right;
      while (tempBST[cur]?.left != null) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `${value} is not the successor node as it has a left child.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "^",
        } as UINode;
        nodeTraversed[cur] = true;
        trace.codeIndex = 0;
        codeTrace.traces.push(trace);

        cur = tempBST[cur]!.left!;
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Go left to check for larger value.`;
        trace.lines[cur] = {
          ...trace.lines[cur],
          isTraver: true,
        } as UILine;
        lineTraversed[cur] = true;
        trace.codeIndex = 0;
        codeTrace.traces.push(trace);
      }

      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `Successor found!<br>The successor of ${value} is ${cur}.`;
      trace.nodes[value] = {
        ...trace.nodes[value],
        isTraver: true,
        extraText: "n",
      } as UINode;
      trace.nodes[cur] = {
        ...trace.nodes[cur],
        isTraver: true,
        extraText: "successor of n",
      } as UINode;
      trace.codeIndex = 0;
      codeTrace.traces.push(trace);
    } else {
      let t = value;
      let p = tempBST[t]?.parent;

      trace.status = `No right child found, so check the parent.`;
      trace.nodes[t] = {
        ...trace.nodes[t],
        isTraver: true,
        extraText: "T",
      } as UINode;
      if (p) {
        trace.nodes[p] = {
          ...trace.nodes[p],
          extraText: "p",
        } as UINode;
      }
      trace.lines[t] = {
        ...trace.lines[t],
        isTraver: true,
      } as UILine;
      nodeTraversed[t] = true;
      lineTraversed[t] = true;
      trace.codeIndex = 2;
      codeTrace.traces.push(trace);

      while (p != null && t == tempBST[p]?.right) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `${p} is not the successor node as ${value} is part of the right sub-tree.`;
        trace.nodes[p] = {
          ...trace.nodes[p],
          isTraver: true,
        } as UINode;
        nodeTraversed[p] = true;
        trace.codeIndex = 3;
        codeTrace.traces.push(trace);

        t = p;
        p = tempBST[t]?.parent;
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Go up to check for smaller value.`;
        trace.nodes[t] = {
          ...trace.nodes[t],
          isTraver: true,
          extraText: "t",
        } as UINode;
        if (p != null) {
          trace.nodes[p] = {
            ...trace.nodes[p],
            isTraver: true,
            extraText: "p",
          } as UINode;
          nodeTraversed[p] = true;
          trace.lines[t] = {
            ...trace.lines[t],
            isTraver: true,
          } as UILine;
          lineTraversed[t] = true;
        }
        trace.codeIndex = 4;
        codeTrace.traces.push(trace);
      }

      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      if (p != null) {
        trace.status = `Successor found!<br>   The successor of ${value} is ${p}.`;
        trace.nodes[value] = {
          ...trace.nodes[value],
          isTraver: true,
          extraText: "n",
        } as UINode;
        trace.nodes[p] = {
          ...trace.nodes[p],
          isTraver: true,
          extraText: "successor of n",
        } as UINode;
        trace.codeIndex = 6;
        codeTrace.traces.push(trace);
      } else {
        trace.status = `Parent is null, so ${value} has no successor.`;
        trace.nodes[value] = {
          ...trace.nodes[value],
          isTraver: true,
          extraText: "n",
        } as UINode;
        trace.codeIndex = 5;
        codeTrace.traces.push(trace);
      }
    }

    return codeTrace;
  };

  const traversal = (mode: "Preorder" | "Inorder" | "Postorder") => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};
    const values: number[] = [];

    let codeIndexVisit = 1;
    let codeIndexLeft = 2;
    let codeIndexRight = 3;
    codeTrace.codes = PREORDER_TRACE;

    if (mode == "Inorder") {
      codeIndexVisit = 2;
      codeIndexLeft = 1;
      codeIndexRight = 3;
      codeTrace.codes = INORDER_TRACE;
    } else if (mode == "Postorder") {
      codeIndexVisit = 3;
      codeIndexLeft = 1;
      codeIndexRight = 2;
      codeTrace.codes = POSTORDER_TRACE;
    }

    let cur = tempBST["root"]?.value || null;

    let trace = createTrace(tempBST);
    if (cur == null) {
      trace.status = `The Binary Search Tree is empty.<br>Return empty result.`;
      codeTrace.traces.push(trace);
    } else {
      const root = cur;

      trace.status = `The root ${root} is not null.`;
      trace.nodes[root] = {
        ...trace.nodes[root],
        isTraver: true,
        extraText: "root",
      } as UINode;
      codeTrace.traces.push(trace);

      traversalRecursion(cur, mode);

      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `${mode} traversal of the BST is complete.<br>Visitation sequence: ${values.join(
        ", "
      )}.`;
      trace.nodes[root] = {
        ...trace.nodes[root],
        isTraver: true,
        extraText: "root",
      } as UINode;
      codeTrace.traces.push(trace);
    }

    return codeTrace;

    function traversalRecursion(cur: number, mode: "Preorder" | "Inorder" | "Postorder") {
      const left = tempBST[cur]?.left;
      const right = tempBST[cur]?.right;

      nodeTraversed[cur] = true;

      if (mode == "Preorder") {
        values.push(cur);

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Visit node ${cur}.<br>Visitation sequence: ${values.join(", ")}.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "^",
        } as UINode;
        trace.codeIndex = codeIndexVisit;
        codeTrace.traces.push(trace);
      }

      if (left == null) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `The left child of node ${cur} is empty.<br>Return empty.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "^",
        } as UINode;
        trace.codeIndex = 0;
        codeTrace.traces.push(trace);
      } else {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `The left child of node ${cur} is ${left} (not null).<br>So recurse to the left child.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "^",
        } as UINode;
        trace.lines[left] = {
          ...trace.lines[left],
          isTraver: true,
        } as UILine;
        lineTraversed[left] = true;
        trace.codeIndex = codeIndexLeft;
        codeTrace.traces.push(trace);

        traversalRecursion(left, mode);
      }

      if (mode == "Inorder") {
        values.push(cur);

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Visit node ${cur}.<br>Visitation sequence: ${values.join(", ")}.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "^",
        } as UINode;
        trace.codeIndex = codeIndexVisit;
        codeTrace.traces.push(trace);
      }

      if (right == null) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `The right child of node ${cur} is empty.<br>Return empty.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "^",
        } as UINode;
        trace.codeIndex = 0;
        codeTrace.traces.push(trace);
      } else {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `The right child of node ${cur} is ${right} (not null).<br>So recurse to the right child.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "^",
        } as UINode;
        trace.lines[right] = {
          ...trace.lines[right],
          isTraver: true,
        } as UILine;
        lineTraversed[right] = true;
        trace.codeIndex = codeIndexRight;
        codeTrace.traces.push(trace);

        traversalRecursion(right, mode);
      }

      if (mode == "Postorder") {
        values.push(cur);

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Visit node ${cur}.<br>Visitation sequence: ${values.join(", ")}.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: "^",
        } as UINode;
        trace.codeIndex = codeIndexVisit;
        codeTrace.traces.push(trace);
      }

      trace = createTrace(tempBST, nodeTraversed, lineTraversed);
      trace.status = `${mode} traversal of ${cur} is complete.`;
      trace.nodes[cur] = {
        ...trace.nodes[cur],
        isTraver: true,
        extraText: "^",
      } as UINode;
      codeTrace.traces.push(trace);
    }
  };

  const findNodeAtRank = (nodeRank: number) => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};
    const maxRank = getMaxRank();

    let cur = tempBST["root"]?.value || null;

    let trace = createTrace(tempBST);
    codeTrace.codes = FIND_NODE_AT_RANK_TRACE;
    if (cur == null) {
      trace.status = `The Binary Search Tree is empty.`;
      codeTrace.traces.push(trace);
    } else if (nodeRank <= 0 || nodeRank > maxRank) {
      trace.status = `Can only find nodes at rank from 1 to ${maxRank}.`;
      codeTrace.traces.push(trace);
    } else {
      findNodeRecursion(cur, nodeRank);
    }

    return codeTrace;

    function findNodeRecursion(cur: Nullable<number>, rank: number) {
      if (cur == null || rank <= 0) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Node at rank ${nodeRank} is not found.`;
        trace.codeIndex = 0;
        codeTrace.traces.push(trace);
      } else {
        const leftSize = tempBST[cur]!.leftSize;

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Comparing r with ls (${rank} with ${leftSize}).`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: `ls = ${leftSize}`,
        } as UINode;
        trace.codeIndex = 1;
        codeTrace.traces.push(trace);

        if (rank == leftSize + 1) {
          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `Node at rank ${nodeRank} is found.<br>Node is ${cur}`;
          trace.nodes[cur] = {
            ...trace.nodes[cur],
            isTraver: true,
            extraText: "found",
          } as UINode;
          trace.codeIndex = 2;
          codeTrace.traces.push(trace);
        } else if (rank <= leftSize) {
          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `Node ${cur} has rank ${
            leftSize + 1
          } in this subtree (root = ${cur}), it > ${rank}.<br>Find node whose rank is ${rank} on left.`;
          trace.nodes[cur] = {
            ...trace.nodes[cur],
            isTraver: true,
            extraText: `ls = ${leftSize}`,
          } as UINode;
          trace.codeIndex = 3;
          codeTrace.traces.push(trace);

          const left = tempBST[cur]?.left!;

          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `At subtree rooted at node ${left},<br>Find node whose rank is ${rank} on this subtree`;
          trace.nodes[left] = {
            ...trace.nodes[left],
            isTraver: true,
            extraText: `^`,
          } as UINode;
          trace.codeIndex = 3;
          codeTrace.traces.push(trace);

          findNodeRecursion(left, rank);
        } else {
          const rankFind = rank - leftSize - 1;

          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `Node ${cur} has rank ${
            leftSize + 1
          } in this subtree (root = ${cur}), it < ${rank}.<br>Find node whose rank is ${rank}-${leftSize}-1 = ${rankFind} on right.`;
          trace.nodes[cur] = {
            ...trace.nodes[cur],
            isTraver: true,
            extraText: `ls = ${leftSize}`,
          } as UINode;
          trace.codeIndex = 4;
          codeTrace.traces.push(trace);

          rank = rankFind;

          const right = tempBST[cur]?.right!;

          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `At subtree rooted at node ${right},<br>Find node whose rank is ${rank} on this subtree`;
          trace.nodes[right] = {
            ...trace.nodes[right],
            isTraver: true,
            extraText: `^`,
          } as UINode;
          trace.codeIndex = 4;
          codeTrace.traces.push(trace);

          findNodeRecursion(right, rank);
        }
      }
    }
  };

  const findNodeRank = (value: number) => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};

    let cur = tempBST["root"]?.value || null;

    let trace = createTrace(tempBST);
    codeTrace.codes = FIND_NODE_RANK_TRACE;

    if (cur == null) {
      trace.status = `The Binary Search Tree is empty.`;
      codeTrace.traces.push(trace);
    } else {
      const rank = findNodeRankRecursion(cur, value);
      if (!isNaN(rank)) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Node ${value} has rank ${rank}.`;
        trace.nodes[value] = {
          ...trace.nodes[value],
          isTraver: true,
          extraText: `r = ${rank}`,
        } as UINode;
        codeTrace.traces.push(trace);
      } else {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Node ${value} is not found.`;
        codeTrace.traces.push(trace);
      }
    }

    return codeTrace;

    function findNodeRankRecursion(cur: Nullable<number>, value: number) {
      if (cur == null) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Node is null. Return 0`;
        trace.codeIndex = 0;
        codeTrace.traces.push(trace);

        return undefined;
      } else {
        const leftSize = tempBST[cur]!.leftSize;
        nodeTraversed[cur] = true;

        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Comparing ${cur} with ${value}.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: `ls = ${leftSize}`,
        } as UINode;
        trace.codeIndex = 1;
        codeTrace.traces.push(trace);

        if (value < cur) {
          const left = tempBST[cur]!.left;

          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `${value} is smaller than ${cur}. Return node rank at left child.`;
          trace.nodes[cur] = {
            ...trace.nodes[cur],
            extraText: "^",
          } as UINode;
          if (left != null) {
            trace.lines[left] = {
              ...trace.lines[left],
              isTraver: true,
            } as UILine;
            lineTraversed[left] = true;
          }
          trace.codeIndex = 2;
          codeTrace.traces.push(trace);

          return findNodeRankRecursion(left, value);
        } else if (value > cur) {
          const right = tempBST[cur]!.right;

          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `${value} is greater than ${cur}. Return ls + 1 + node rank at right child.`;
          trace.nodes[cur] = {
            ...trace.nodes[cur],
            extraText: "^",
          } as UINode;
          if (right != null) {
            trace.lines[right] = {
              ...trace.lines[right],
              isTraver: true,
            } as UILine;
            lineTraversed[right] = true;
          }
          trace.codeIndex = 3;
          codeTrace.traces.push(trace);

          return leftSize + 1 + findNodeRankRecursion(right, value);
        } else {
          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `${value} is equal ${cur}. Return ls + 1.`;
          trace.nodes[cur] = {
            ...trace.nodes[cur],
            extraText: "^",
          } as UINode;
          trace.codeIndex = 4;
          codeTrace.traces.push(trace);

          return leftSize + 1;
        }
      }
    }
  };

  const findNodeLevel = (value: number) => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};

    let cur = tempBST["root"]?.value || null;

    let trace = createTrace(tempBST);
    codeTrace.codes = FIND_NODE_LEVEL_TRACE;

    let level = 0;
    let isFound = true;
    if (cur == null) {
      trace.status = `The Binary Search Tree is empty.`;
      codeTrace.traces.push(trace);
    } else {
      while (cur != null && cur != value) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Comparing ${value} with ${cur}.`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: `level = ${level}`,
        } as UINode;
        nodeTraversed[cur] = true;
        codeTrace.traces.push(trace);

        if (value < cur) {
          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `${value} is smaller than ${cur}.`;
          trace.nodes[cur] = {
            ...trace.nodes[cur],
            extraText: "^",
          } as UINode;
          trace.codeIndex = tempBST[cur]!.left != null ? 2 : 0;
          codeTrace.traces.push(trace);

          if (tempBST[cur]!.left != null) {
            cur = tempBST[cur]!.left!;

            trace = createTrace(tempBST, nodeTraversed, lineTraversed);
            trace.lines[cur] = {
              ...trace.lines[cur],
              isTraver: true,
            } as UILine;
            lineTraversed[cur] = true;
            trace.status = `So search on left.`;
            trace.codeIndex = 3;
            codeTrace.traces.push(trace);

            level++;
          } else {
            isFound = false;
            break;
          }
        } else if (value > cur) {
          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `${value} is greater than ${cur}.`;
          trace.nodes[cur] = {
            ...trace.nodes[cur],
            extraText: "^",
          } as UINode;
          trace.codeIndex = tempBST[cur]!.right != null ? 4 : 0;
          codeTrace.traces.push(trace);

          if (tempBST[cur]!.right != null) {
            cur = tempBST[cur]!.right!;

            trace = createTrace(tempBST, nodeTraversed, lineTraversed);
            trace.lines[cur] = {
              ...trace.lines[cur],
              isTraver: true,
            } as UILine;
            lineTraversed[cur] = true;
            trace.status = `So search on right.`;
            trace.codeIndex = 5;
            codeTrace.traces.push(trace);

            level++;
          } else {
            isFound = false;
            break;
          }
        }
      }

      if (cur != null && isFound) {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Node ${value} is found. Node ${value} has level ${level}`;
        trace.nodes[cur] = {
          ...trace.nodes[cur],
          isTraver: true,
          extraText: `level = ${level}`,
        } as UINode;
        trace.codeIndex = 6;
        codeTrace.traces.push(trace);
      } else {
        trace = createTrace(tempBST, nodeTraversed, lineTraversed);
        trace.status = `Node ${value} is not found.`;
        trace.codeIndex = 1;
        codeTrace.traces.push(trace);
      }
    }

    return codeTrace;
  };

  const createTrace = (
    BSTObj: INodes,
    nodeTraversed?: { [key: string]: boolean },
    lineTraversed?: { [key: string]: boolean }
  ) => {
    const trace: ITrace = {
      status: "",
      codeIndex: null,
      nodes: {},
      lines: {},
      nodeCount: 0,
      height: 0,
    };

    let nodeCount = 0;
    for (let key in BSTObj) {
      if (key == "root") continue;

      nodeCount++;
      trace.nodes[key] = {
        ...BSTObj[key],
        isShow: true,
        isTraver: false,
        extraText: undefined,
      } as UINode;

      const parentKey = BSTObj[key]?.parent;

      if (parentKey != null) {
        trace.lines[key] = {
          key,
          start: BSTObj[parentKey]!,
          end: BSTObj[key]!,
          isShow: true,
          isTraver: false,
        };
      }
    }

    for (let key in nodeTraversed) {
      trace.nodes[key] = {
        ...trace.nodes[key],
        isTraver: true,
      } as UINode;
    }

    for (let key in lineTraversed) {
      trace.lines[key] = {
        ...trace.lines[key],
        isTraver: true,
      } as UILine;
    }

    trace.nodeCount = nodeCount;
    trace.height = getRootHeight(BSTObj, BSTObj["root"]?.value);

    return trace;
  };

  const calcPosition = (BST: INodes) => {
    calcRank();
    calcLevel(BST["root"]?.value);

    for (let key in BST) {
      if (key == "root") continue;
      BST[key]!.position = {
        x: NODE_PADDING * BST[key]!.rank + SVG_PADDING,
        y: NODE_PADDING * BST[key]!.level + SVG_PADDING,
      };
    }

    function calcLevel(root?: Nullable<number>, level: number = 0) {
      if (root != null && BST[root] != null) {
        BST[root] = {
          ...BST[root],
          level,
        } as UINode;
        calcLevel(BST[root]?.left, level + 1);
        calcLevel(BST[root]?.right, level + 1);
      }
    }

    function calcRank() {
      let rank = 0;
      for (let key in BST) {
        if (key == "root") continue;

        rank++;
        BST[key] = {
          ...BST[key],
          rank,
        } as UINode;
      }
    }
  };

  const bstToUI = () => {
    resetCodeTrace();

    calcPosition(BST.value);
    const trace = createTrace(BST.value);

    return {
      codes: [],
      traces: [trace],
    } as ICodeTrace;
  };

  const resetLeftSize = (BST: INodes) => {
    for (let key in BST) {
      if (key == "root") continue;
      const left = BST[key]!.left;
      BST[key] = {
        ...BST[key],
        leftSize: calcSize(left),
      } as UINode;
    }

    function calcSize(cur: Nullable<number>): number {
      if (cur == null) return 0;
      else {
        const left = BST[cur]!.left;
        const right = BST[cur]!.right;

        return 1 + (left ? calcSize(left) : 0) + (right ? calcSize(right) : 0);
      }
    }
  };

  // const findNodeLevel = (
  //   BST: INodes,
  //   root: Nullable<number> = null,
  //   value: number,
  //   level: number = 0
  // ): number => {
  //   if (root == null) return 0;
  //   else if (root == value) return level;
  //   else {
  //     return (
  //       findNodeLevel(BST, BST[root]?.left, value, level + 1) +
  //       findNodeLevel(BST, BST[root]?.right, value, level + 1)
  //     );
  //   }
  // };

  // const findNodeRank = (BST: INodes, root: Nullable<number> = null, value: number): number => {
  //   if (root == null) return 0;
  //   if (value < root) return findNodeRank(BST, BST[root]?.left, value);
  //   else if (value > root)
  //     return BST[root]!.leftSize + 1 + findNodeRank(BST, BST[root]?.right, value);
  //   else return BST[root]!.leftSize + 1;
  // };

  return {
    BST,
    bstToUI,
    setBST,
    resetBST,
    getBSTValues,
    getRootHeight,
    getMaxRank,
    getBST,
    getBSTRoot,
    insert,
    remove,
    search,
    searchMin,
    searchMax,
    traversal,
    findPredecessor,
    findSuccessor,
    findNodeAtRank,
    findNodeLevel,
    findNodeRank,
  };
};
