/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import type {
    ScatterPlotDatum,
    ScatterPlotNodeData,
    ScatterPlotRawSerie,
} from '../../types/nivo-scatterplot';
import { useEffect, useState } from 'react';
import { useNominateStore } from '../../store/nominateStore';
import style from './NominateScatterPlot.module.scss';

const partyColorMap = {
    더불어민주당: '#002BFF',
    국민의힘: '#E61E2B',
    조국혁신당: '#06275E',
    개혁신당: '#FF4D00',
    사회민주당: '#43A213',
    기본소득당: '#00D2C3',
    진보당: '#207379',
    무소속: '#AAAAAA',

    정의당: '#FFCB00',
    국민의당: '#F5821F',
    열린민주당: '#0054A6',
    시대전환: '#6E4AFF',
    더불어시민당: '#133E7E',

    자유한국당: '#C9142A',
    바른정당: '#30A9DE',
    바른미래당: '#00A9A3',
    민주평화당: '#46A747',
    새누리당: '#E61E2B',

    미래통합당: '#D61F70',
    미래한국당: '#E84C8B',
    새로운미래: '#6B4CD6',
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
    <div className={style.tooltip}>
        <strong className={style.tooltipTitle}>{node.id.split('.')[0]}</strong>
        <br />
        <strong className={style.tooltipParty}>{node.data.party}</strong>
    </div>
);

function NominateScatterPlot() {
    const { getNominateDataByAge, setNominateAge } = useNominateStore();
    const age = useNominateStore((state) => state.nominateAge);
    const nominateData = useNominateStore((state) => state.nominateData);
    const typedData = nominateData as ScatterPlotRawSerie<ScatterPlotDatum>[];

    // 렌더 지연 플래그
    const [isReady, setIsReady] = useState(true);

    useEffect(() => {
        setNominateAge(22);
    }, []);

    useEffect(() => {
        setIsReady(false);
        getNominateDataByAge();

        const timer = setTimeout(() => setIsReady(true), 800); // 임시
        return () => clearTimeout(timer);
    }, [age, getNominateDataByAge]);

    return (
        <div className={style.container}>
            {!isReady && (
                <div aria-live="polite" role="status" className={style.loaderOverlay}>
                    <div className={style.loaderContent}>
                        <span className={style.spinner} />
                        <span className={style.loaderText}>차트 데이터를 불러오는 중...</span>
                    </div>
                </div>
            )}
            <ResponsiveScatterPlot<ScatterPlotDatum>
                data={isReady ? typedData : ([] as ScatterPlotRawSerie<ScatterPlotDatum>[])}
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
        </div>
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
