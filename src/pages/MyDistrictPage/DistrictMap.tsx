/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import style from './DistrictMap.module.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function getRegionName(props: Record<string, any> | undefined, fallback: string) {
    if (!props) return fallback;
    const keys = [
        'name',
        'NAME',
        'NAME_KOR',
        'NAME_ENG',
        'adm_nm',
        'ADM_NM',
        'SIG_KOR_NM',
        'SIG_ENG_NM',
        'CTP_KOR_NM',
        'CTP_ENG_NM',
        'sido',
        'sigungu',
        'SIG_CD',
        'CTPRVN_NM',
    ];
    for (const k of keys) {
        const v = props[k];
        if (typeof v === 'string' && v.trim()) return v.trim();
    }

    for (const k of Object.keys(props)) {
        const v = props[k];
        if (typeof v === 'string' && v.trim()) return v.trim();
    }
    return fallback;
}

function DistrictMap() {
    const map = '/assets/map/map_submunicipalities.json';
    const [hoverName, setHoverName] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
    const [center, setCenter] = useState<[number, number]>([127.05, 37.27]);
    const [scale, setScale] = useState<number>(30000);
    const param = useParams();

    useEffect(() => {
        fetch('/assets/map/center.json')
            .then((res) => res.json())
            .then((centers: Record<string, [number, number, number]>) => {
                const c = centers?.[param.regionCd as string];
                if (Array.isArray(c) && c.length >= 2) {
                    setCenter([c[0], c[1]]);
                    if (c.length >= 3 && Number.isFinite(c[2])) {
                        setScale(c[2] as number);
                    } else {
                        setScale(30000);
                    }
                } else {
                    setCenter([127.05, 37.27]);
                    setScale(30000);
                }
            });
    }, [param.regionCd]);

    return (
        <>
            <ComposableMap
                key={`${param.regionCd}-${center.join(',')}-${scale}`}
                projection="geoMercator"
                projectionConfig={{ scale, center }}
                className={style.map}>
                <Geographies geography={map}>
                    {({ geographies }) => {
                        const filteredGeos = geographies.filter((g: any) => {
                            const p = g.properties || {};
                            // 선택된 행정구역의 code에 해당하는 지도만 필터링
                            if (Number(param.regionCd)) {
                                return String(p.sgg ?? '') === param.regionCd;
                            }
                            return false;
                        });

                        return filteredGeos.map((geo: any) => {
                            const id = geo.properties?.name || geo.rsmKey;
                            const regionName = getRegionName(geo.properties, String(id));
                            const isHovered = hoverName === regionName;

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={isHovered ? '#7FC5E0' : '#DDD'}
                                    stroke="#999"
                                    strokeWidth="0.1px"
                                    onMouseEnter={() => setHoverName(regionName)}
                                    onMouseMove={(e) => setTooltip({ x: e.clientX, y: e.clientY })}
                                    onMouseLeave={() => {
                                        setHoverName(null);
                                        setTooltip(null);
                                    }}
                                    style={{
                                        default: { transition: 'fill 0.2s' },
                                        hover: { transition: 'fill 0.2s' },
                                        pressed: { transition: 'fill 0.2s' },
                                    }}
                                />
                            );
                        });
                    }}
                </Geographies>
            </ComposableMap>
            {hoverName && tooltip && (
                <div
                    className={style.districtHoverName}
                    style={{
                        top: tooltip.y + 12,
                        left: tooltip.x + 12,
                    }}>
                    {hoverName}
                </div>
            )}
        </>
    );
}

export default DistrictMap;
