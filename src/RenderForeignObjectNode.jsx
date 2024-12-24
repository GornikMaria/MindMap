import React, { useRef, useEffect, useState } from 'react';

export const RenderForeignObjectNode = ({
    nodeDatum,
    toggleNode
}) => {
    const containerRef = useRef();
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(250);

    useEffect(() => {
        const updateDimensions = () => {
            const { offsetHeight, offsetWidth } = containerRef.current;
            setWidth(offsetWidth);
            setHeight(offsetHeight);
        };

        // Устанавливаем таймаут для обновления размеров
        const timer = setTimeout(updateDimensions, 0);

        return () => clearTimeout(timer); // Чистим таймер при размонтировании
    }, [nodeDatum]); // Зависимость от nodeDatum, чтобы обновлять размеры при изменении данных

    const caseID = nodeDatum.caseid !== undefined ? nodeDatum.caseid : 0;
    const noHasCaseID = caseID === 0;
    const backgroundColor = nodeDatum.tags === "auto" ? "#A9A9A9" : "#e0e0e0";

    return (
        <g>
            <rect width={width} height={height} fill={backgroundColor} />
            <foreignObject width={width} height={height} onClick={toggleNode}>
                <div className="node-container" style={{ backgroundColor }} ref={containerRef}>
                    {noHasCaseID ? (
                        <>
                            <h3 className="node-title" title={nodeDatum.name}>
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