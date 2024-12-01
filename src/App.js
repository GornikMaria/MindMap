import React from "react";
import Tree from "react-d3-tree";
import orgChartJson from "./data/org-chart.json";
import { useCenteredTree } from "./helpers";

const containerStyles = {
  width: "100vw",
  height: "100vh"
};

// Укажите пути к иконкам
const autoTestIcon = "rocket.svg"; // Путь к иконке автотестов
const manualTestIcon = "hand.svg";  // Путь к иконке ручных тестов

// Функция для рекурсивного обновления узлов
const updateIcons = (node) => {
  // Установите иконки для текущего узла
  node.autoTestIcon = autoTestIcon;
  node.manualTestIcon = manualTestIcon;

  // Если у узла есть дочерние элементы, рекурсивно обновите их
  if (node.children) {
    node.children.forEach(child => updateIcons(child));
  }
};

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps
}) => (
  <g>
    <circle r={15}></circle>
    <foreignObject {...foreignObjectProps}>
      <div
        style={{
          border: "1px solid transparent",
          borderRadius: "5px",
          backgroundColor: "#dedede",
          padding: "10px"
        }}
      >
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
        {nodeDatum.icon && (
          <img
            src={nodeDatum.icon}
            alt={`${nodeDatum.name} icon`}
            style={{ width: "30px", height: "30px", display: "block", margin: "0 auto" }}
          />
        )}
        <div style={{ textAlign: "center" }}>
          <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            Автотесты: {nodeDatum.autoTests || 0}
            <img
              src={nodeDatum.autoTestIcon}
              alt="Auto Test Icon"
              style={{ width: "20px", height: "20px", marginLeft: "5px" }}
            />
          </p>
          <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            Ручные тесты: {nodeDatum.manualTests || 0}
            <img
              src={nodeDatum.manualTestIcon}
              alt="Manual Test Icon"
              style={{ width: "20px", height: "20px", marginLeft: "5px" }}
            />
          </p>
        </div>
        {nodeDatum.children && (
          <button
            style={{
              width: "75%",
              margin: "0 auto 1rem auto",
              display: "block"
            }}
            onClick={toggleNode}
          >
            {nodeDatum.__rd3t.collapsed ? "Раскрыть" : "Закрыть"}
          </button>
        )}
      </div>
    </foreignObject>
  </g>
);

export default function App() {
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 210, y: 200 };
  const foreignObjectProps = {
    width: nodeSize.x - 20,
    height: nodeSize.y,
    x: -100,
    y: -20
  };

  // Получаем корневой узел
  const rootNode = orgChartJson;

  // Обновляем иконки для всех узлов
  updateIcons(rootNode);

  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={rootNode} // Используем обновлённый JSON с иконками
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
