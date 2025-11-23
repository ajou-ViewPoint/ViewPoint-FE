/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import MOCKDATA from '../assets/MockNOMINATE.json';

function NominateScatterPlot() {
    return (
        <ResponsiveScatterPlot
            data={MOCKDATA}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            xScale={{ type: 'linear', min: -1, max: 1 }}
            yScale={{ type: 'linear', min: -1, max: 1 }}
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
