/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { useState } from 'react';
import style from './KoreaAdministrativeMap.module.scss';
import { Minus, Plus } from 'lucide-react';

const SIDO_GEO_URL = '/src/assets/map/map_provinces.json';
const SIGUNGU_GEO_URL = '/src/assets/map/map_municipalities.json';
const EUPMYEONDONG_GEO_URL = '/src/assets/map/map_submunicipalities.json';

const ZOOM_LEVELS: Record<string, number> = {
    province: 3,
    municipality: 20,
};

function getFeatureCenter(geo: any): [number, number] {
    const coordsRoot = geo?.geometry?.coordinates;
    if (!coordsRoot) return [127.8, 36.2];
    const points: [number, number][] = [];
    const collect = (c: any) => {
        if (!Array.isArray(c)) return;
        if (typeof c[0] === 'number') {
            if (c.length >= 2) points.push([c[0], c[1]]);
        } else {
            for (const sub of c) collect(sub);
        }
    };
    collect(coordsRoot);
    if (!points.length) return [127.8, 36.2];
    let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
    for (const [x, y] of points) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }
    return [(minX + maxX) / 2, (minY + maxY) / 2];
}

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

function KoreaAdministrativeMap() {
    const [hoverName, setHoverName] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
    const [map, setMap] = useState<any>(SIDO_GEO_URL);

    // 대한민국 중심 좌표로 초기화
    const [position, setPosition] = useState({
        coordinates: [127.8, 36.2] as [number, number],
        zoom: 1,
    });

    //선택된 행정단위 코드 상태
    const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null);
    const [selectedMunicipalityCode, setSelectedMunicipalityCode] = useState<string | null>(null);

    const handleAdministrativeLevelChange = (geo: any) => {
        const level = geo?.properties?.level;
        const center = getFeatureCenter(geo);

        if (level === 'province') {
            const provinceCode = String(geo?.properties?.code ?? geo?.properties?.sido ?? '');
            setSelectedProvinceCode(provinceCode);
            setSelectedMunicipalityCode(null);
            setMap(SIGUNGU_GEO_URL);
            setPosition({ coordinates: center, zoom: ZOOM_LEVELS.province });
            return;
        }
        if (level === 'municipality') {
            const municipalityCode = String(geo?.properties?.code ?? geo?.properties?.sgg ?? '');
            setSelectedMunicipalityCode(municipalityCode);
            setMap(EUPMYEONDONG_GEO_URL);
            setPosition({ coordinates: center, zoom: ZOOM_LEVELS.municipality });
            return;
        }
    };

    const handleZoomIn = () => {
        if (position.zoom >= 20) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
    };

    const handleZoomOut = () => {
        if (position.zoom <= 1) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
    };

    return (
        <>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 6000, center: [127.8, 36.2] }}
                width={800}
                height={800}
                className={style.map}>
                <ZoomableGroup center={position.coordinates} zoom={position.zoom} maxZoom={2000}>
                    <Geographies geography={map}>
                        {({ geographies }) => {
                            // 선택된 상위 행정단위에 해당하는 feature만 필터
                            const filteredGeos = geographies.filter((g: any) => {
                                const p = g.properties || {};
                                // 시군구 지도에서는 선택된 시도 내부만 노출
                                if (map === SIGUNGU_GEO_URL) {
                                    if (!selectedProvinceCode) return false;
                                    const provinceCode = String(p.provinceCode ?? p.sido ?? '');
                                    return provinceCode === selectedProvinceCode;
                                }
                                // 읍면동 지도에서는 선택된 시군구(우선) 또는 시도 기준으로 노출
                                if (map === EUPMYEONDONG_GEO_URL) {
                                    if (selectedMunicipalityCode) {
                                        return String(p.sgg ?? '') === selectedMunicipalityCode;
                                    }
                                    if (selectedProvinceCode) {
                                        return String(p.sido ?? '') === selectedProvinceCode;
                                    }
                                    return false;
                                }
                                // 시도 지도는 전체 출력
                                return true;
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
                                        onMouseMove={(e) =>
                                            setTooltip({ x: e.clientX, y: e.clientY })
                                        }
                                        onMouseLeave={() => {
                                            setHoverName(null);
                                            setTooltip(null);
                                        }}
                                        onClick={() => handleAdministrativeLevelChange(geo)}
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
                </ZoomableGroup>
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
            <div className={style.zoomButtonWrapper}>
                <button onClick={handleZoomIn} className={style.zoomButton}>
                    <Plus />
                </button>
                <button onClick={handleZoomOut} className={style.zoomButton}>
                    <Minus />
                </button>
            </div>
        </>
    );
}

export default KoreaAdministrativeMap;
