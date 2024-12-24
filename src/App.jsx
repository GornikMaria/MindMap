import React from "react";
import Tree from "react-d3-tree";
import dataTree from "./data/data-tree.json";
import { useCenteredTree } from "./helpers";
import { RenderForeignObjectNode } from "./RenderForeignObjectNode";

import './index.css';

const autoTestIcon = "rocket.svg";
const manualTestIcon = "hand.svg";

const updateIcons = (node) => {
  node.autoTestIcon = autoTestIcon;
  node.manualTestIcon = manualTestIcon;

  if (node.children) {
    node.children.forEach(child => updateIcons(child));
  }
};

export const App = () => {
  const [translate, containerRef] = useCenteredTree();
  const rootNode = dataTree;
  updateIcons(rootNode);

  return (
    <div className="container" ref={containerRef}>
      <Tree
        data={rootNode}
        translate={translate}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        pathClassFunc={() => "node__link"}
        renderCustomNodeElement={(rd3tProps) =>
          <RenderForeignObjectNode { ...rd3tProps} />
        }
        orientation="horizontal"
        nodeSize={{ x:280, y: 200 }}
      />
    </div>
  );
}
