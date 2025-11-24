import data from '../../assets/MockWordFish.json';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

function WordFishChart() {
    return (
        <ResponsiveScatterPlot
            data={data}
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
