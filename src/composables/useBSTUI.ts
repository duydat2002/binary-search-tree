import { ref } from "vue";
import { ICodeTrace, INodes, ITrace, UILine, UINode } from "@/types";
import { INSERT_TRACE, NODE_PADDING, SVG_PADDING } from "@/constants";

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

  const getBSTRoot = () => {
    const root = BST.value["root"]?.value;
    return root ? BST.value[root] : null;
  };

  const getMaxRank = () => {
    return Object.keys(BST.value).length - 1;
  };

  const resetCodeTrace = () => {
    codeTrace = {
      codes: [],
      traces: [],
    };
  };

  const insert = (value: number) => {
    resetCodeTrace();
    const tempBST = { ...BST.value };
    let nodeTraversed: { [key: string]: boolean } = {};
    let lineTraversed: { [key: string]: boolean } = {};

    console.log("===============================");

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
            trace.status = `${value} is langer than ${parentValue}, so go right.`;
            trace.codeIndex = 5;
            codeTrace.traces.push(trace);

            parentValue = tempBST[parentValue]!.right!;
          } else break;
        } else {
          tempBST[value]!.quantity += 1;

          trace = createTrace(tempBST, nodeTraversed, lineTraversed);
          trace.status = `${value} is equal to ${value}, so just increment its frequency.`;
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

    console.log(codeTrace);
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
    };

    for (let key in BSTObj) {
      if (key == "root") continue;
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
      if (root != null) {
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

  const findNodeLevel = (
    BST: INodes,
    root: Nullable<number> = null,
    value: number,
    level: number = 0
  ): number => {
    if (root == null) return 0;
    else if (root == value) return level;
    else {
      return (
        findNodeLevel(BST, BST[root]?.left, value, level + 1) +
        findNodeLevel(BST, BST[root]?.right, value, level + 1)
      );
    }
  };

  const findNodeRank = (BST: INodes, root: Nullable<number> = null, value: number): number => {
    if (root == null) return 0;
    if (value < root) return findNodeRank(BST, BST[root]?.left, value);
    else if (value > root)
      return BST[root]!.leftSize + 1 + findNodeRank(BST, BST[root]?.right, value);
    else return BST[root]!.leftSize + 1;
  };

  return {
    BST,
    setBST,
    resetBST,
    getMaxRank,
    getBST,
    getBSTRoot,
    insert,
    findNodeLevel,
    findNodeRank,
  };
};
