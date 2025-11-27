import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import type {
    ScatterPlotDatum,
    ScatterPlotNodeData,
    ScatterPlotRawSerie,
} from '../../types/nivo-scatterplot';
import { useCommitteeStore } from '../../store/committeeStore';

const partyColorMap = {
    더불어민주당: '#1E90FF',
    국민의힘: '#FF4C4C',
    조국혁신당: '#3f4d99ff',
    기본소득당: '#00CED1',
    진보당: '#FF69B4',
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

function WordFishChart() {
    const data = useCommitteeStore(
        (state) => state.wordFishData
    ) as unknown as ScatterPlotRawSerie<ScatterPlotDatum>[];

    return (
        <ResponsiveScatterPlot
            data={data}
            nodeComponent={CustomNode}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            xScale={{ type: 'linear', min: -5, max: 5 }}
            yScale={{ type: 'linear', min: 0, max: 0 }}
            enableGridX={false}
            enableGridY={false}
            axisBottom={null}
            axisLeft={null}
            nodeSize={10}
            legends={[]}
        />
    );
}

export default WordFishChart;
