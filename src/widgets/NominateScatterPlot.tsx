/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import MOCKDATA from '../assets/MockNOMINATE.json';

function NominateScatterPlot() {
    return (
        <ResponsiveScatterPlot
            data={MOCKDATA}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            enableGridX={false}
            enableGridY={false}
            axisBottom={null}
            axisLeft={null}
            legends={[]}
        />
    );
}

export default NominateScatterPlot;
