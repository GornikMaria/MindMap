import React from "react";
import Tree from "react-d3-tree";
import dataTree from "./data/data-tree.json";
import { useCenteredTree } from "./helpers";
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

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps
}) => {
  const caseID = nodeDatum.caseid !== undefined ? nodeDatum.caseid : 0;
  const noHasCaseID = caseID === 0;

  return (
    <g>
      <rect width={100} height={50} fill="#e0e0e0" />
      <foreignObject {...foreignObjectProps} onClick={toggleNode}>
        <div className="node-container">
          {noHasCaseID ? (
            <>
              <h3
                className="node-title"
                title={nodeDatum.name}
              >
                {nodeDatum.name}
              </h3>
              {nodeDatum.icon && (
                <img
                  src={nodeDatum.icon}
                  alt={`${nodeDatum.name} icon`}
                  className="node-icon"
                />
              )}
              <div className="test-info">
                <p>
                  Автотесты: {nodeDatum.autoTests || 0}
                  <img
                    src={nodeDatum.autoTestIcon}
                    alt="Auto Test Icon"
                    className="test-icon"
                  />
                </p>
                <p>
                  Ручные тесты: {nodeDatum.manualTests || 0}
                  <img
                    src={nodeDatum.manualTestIcon}
                    alt="Manual Test Icon"
                    className="test-icon"
                  />
                </p>
              </div>
            </>
          ) : (
            <h3 className="node-title" title={nodeDatum.name}>
              {nodeDatum.name}
              {nodeDatum.autoTests > 0 && (
                <img
                  src={nodeDatum.autoTestIcon}
                  alt="Auto Test Icon"
                  className="test-icon"
                />
              )}
              {nodeDatum.manualTests > 0 && (
                <img
                  src={nodeDatum.manualTestIcon}
                  alt="Manual Test Icon"
                  className="test-icon"
                />
              )}
            </h3>
          )}
        </div>
      </foreignObject>
    </g>
  );
};



export default function App() {
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 230, y: 200 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -100,
    y: -20
  };

  const rootNode = dataTree;

  updateIcons(rootNode);

  return (
    <div className="container" ref={containerRef}>
      <Tree
        data={rootNode}
        translate={translate}
        nodeSize={nodeSize}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        pathClassFunc={() => "node__link"}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        orientation="horizontal"
      />
    </div>
  );
}
