import style from './StatsSection.module.scss';
import { partyColors } from '../../constants/partyColors';
import { ResponsivePie } from '@nivo/pie';

interface StatsSectionProps {
    statsData: Record<string, number>;
    committeeName: string;
}

function StatsSection(props: StatsSectionProps) {
    const seatData = Object.entries(props.statsData)
        .filter(([name]) => name !== '총 인원')
        .map(([name, value]) => ({
            id: name,
            label: name,
            value: value,
            color: partyColors[name] || '#cccccc',
        }));

    return (
        <div className={style.wrapper}>
            <ResponsivePie
                data={seatData}
                margin={{ top: 40, bottom: 80 }}
                sortByValue={true}
                innerRadius={0.5}
                padAngle={0.6}
                cornerRadius={2}
                activeInnerRadiusOffset={10}
                activeOuterRadiusOffset={20}
                arcLinkLabelsSkipAngle={10}
                colors={(d) => partyColors[d.id as string] || '#cccccc'}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        translateY: 56,
                        itemWidth: 100,
                        itemHeight: 18,
                        symbolShape: 'circle',
                    },
                ]}
            />
        </div>
    );
}

export default StatsSection;
