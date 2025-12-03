/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import type {
    ScatterPlotDatum,
    ScatterPlotNodeData,
    ScatterPlotRawSerie,
} from '../types/nivo-scatterplot';
import { useEffect } from 'react';
import { useNominateStore } from '../store/nominateStore';

const partyColorMap = {
    더불어민주당: '#002bff',
    국민의힘: '#E61E2B',
    조국혁신당: '#06275E',
    개혁신당: '#ff4d00',
    사회민주당: '#43A213',
    기본소득당: '#00D2C3',
    진보당: '#207379',
    무소속: '#aaaaaa',
} as const;

const CustomNode = ({ node }: { node: ScatterPlotNodeData<ScatterPlotDatum> }) => (
    <circle
        cx={node.x}
        cy={node.y}
        r={node.size / 2}
        fill={partyColorMap[node.data.party as keyof typeof partyColorMap] || '#888'}
    />
);

const CustomToolTip = ({ node }: { node: ScatterPlotNodeData<ScatterPlotDatum> }) => (
    <div
        style={{
            color: partyColorMap[node.data.party as keyof typeof partyColorMap] || '#888',
            background: 'tranparent',
            width: '200px',
            padding: '1rem',
        }}>
        <strong style={{ color: 'black' }}>{node.id.split('.')[0]}</strong>
        <br />
        <strong>{node.data.party}</strong>
    </div>
);

function NominateScatterPlot() {
    const { getNominateDataByAge } = useNominateStore();
    const nominateData = useNominateStore((state) => state.nominateData);
    const typedData = nominateData as ScatterPlotRawSerie<ScatterPlotDatum>[];
    useEffect(() => {
        getNominateDataByAge(22); // 현재는 22대로 설정
    }, []);
    return (
        <ResponsiveScatterPlot<ScatterPlotDatum>
            data={typedData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            xScale={{ type: 'linear', min: -1, max: 1 }}
            yScale={{ type: 'linear', min: -1, max: 1 }}
            nodeComponent={CustomNode}
            tooltip={CustomToolTip}
            enableGridX={false}
            enableGridY={false}
            axisBottom={null}
            axisLeft={null}
            nodeSize={10}
            legends={[]}
        />
    );
}

export default NominateScatterPlot;

// TODO: OC 활용은 아마 이렇게
// const CuttingLineLayer = ({ xScale, yScale }) => {
//     const n1 = normVector2D[q][0];
//     const n2 = normVector2D[q][1];
//     const c = midpoints[q];

//     const x1 = xMin;
//     const x2 = xMax;

//     const y1 = (c - n1 * x1) / n2;
//     const y2 = (c - n1 * x2) / n2;

//     return (
//         <line
//             x1={xScale(x1)}
//             y1={yScale(y1)}
//             x2={xScale(x2)}
//             y2={yScale(y2)}
//             stroke="#FF0000"
//             strokeWidth={2}
//         />
//     );
// };

// <ScatterPlot
//     data={scatterData}
//     xScale={{ type: 'linear', min: xMin, max: xMax }}
//     yScale={{ type: 'linear', min: yMin, max: yMax }}
//     layers={[
//         'grid',
//         'axes',
//         'points',
//         CuttingLineLayer,
//         'mesh',
//         'legends',
//     ]}
// />
