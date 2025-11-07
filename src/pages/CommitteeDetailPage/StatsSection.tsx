import style from './StatsSection.module.scss';
import { Pie, PieChart, Tooltip, ResponsiveContainer } from 'recharts';
import { partyColors } from '../../constants/partyColors';

interface StatsSectionProps {
    statsData: Record<string, number>;
}

function StatsSection(props: StatsSectionProps) {
    const data = Object.entries(props.statsData)
        .filter(([name]) => name !== '총 인원')
        .map(([name, value]) => ({
            name,
            value,
            fill: partyColors[name] || '#cccccc',
        }));

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className={style.wrapper}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        labelLine={false}
                        label={(props) => {
                            const { name, value } = props as unknown as {
                                name: string;
                                value: number;
                            };
                            return `${name}: ${value}명 ${(total > 0
                                ? (value / total) * 100
                                : 0
                            ).toFixed(0)}%`;
                        }}
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StatsSection;
