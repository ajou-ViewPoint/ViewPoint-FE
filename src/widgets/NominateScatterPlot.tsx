/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import type {
    ScatterPlotDatum,
    ScatterPlotNodeData,
    ScatterPlotRawSerie,
} from '../types/nivo-scatterplot';
import MOCKDATA from '../assets/MockNOMINATE.json';

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

const typedData = MOCKDATA as ScatterPlotRawSerie<ScatterPlotDatum>[];

const CustomNode = ({ node }: { node: ScatterPlotNodeData<ScatterPlotDatum> }) => (
    <circle
        cx={node.x}
        cy={node.y}
        r={node.size / 2}
        fill={partyColorMap[node.data.party as keyof typeof partyColorMap] || '#888'}
    />
);

function NominateScatterPlot() {
    return (
        <ResponsiveScatterPlot<ScatterPlotDatum>
            data={typedData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            xScale={{ type: 'linear', min: -1, max: 1 }}
            yScale={{ type: 'linear', min: -1, max: 1 }}
            nodeComponent={CustomNode}
            tooltip={({ node }) => (
                <div>
                    <strong>{node.id}</strong>
                    <br />
                    {node.serieIndex}
                </div>
            )}
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
