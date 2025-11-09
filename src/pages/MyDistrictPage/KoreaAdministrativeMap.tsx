/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import style from './KoreaAdministrativeMap.module.scss';

const provincesUrl = new URL('../../assets/map/skorea-provinces-2018-geo.json', import.meta.url)
    .href;
const municipalitiesUrl = new URL(
    '../../assets/map/skorea-municipalities-2018-geo.json',
    import.meta.url
).href;
const submunicipalitiesUrl = new URL(
    '../../assets/map/skorea-submunicipalities-2018-geo.json',
    import.meta.url
).href;

type GeoFeature = Record<string, any>;
type MapLevel = 'provinces' | 'municipalities' | 'submunicipalities';

const DEFAULT_CENTER: [number, number] = [127.5, 36];
const DEFAULT_SCALE = 4500;
const BASE_WIDTH = 8;
const BASE_HEIGHT = 6;
const MAX_SCALE = 150000;

type Bounds = {
    minLng: number;
    maxLng: number;
    minLat: number;
    maxLat: number;
};

const computeFeatureBounds = (feature: GeoFeature): Bounds | null => {
    const geometry = feature?.geometry;
    if (!geometry?.coordinates) return null;

    const bounds: Bounds = {
        minLng: Infinity,
        maxLng: -Infinity,
        minLat: Infinity,
        maxLat: -Infinity,
    };

    const processCoordinates = (coordinates: any[]): void => {
        coordinates.forEach((entry) => {
            if (!Array.isArray(entry)) return;
            if (typeof entry[0] === 'number' && typeof entry[1] === 'number') {
                const [lng, lat] = entry;
                if (Number.isFinite(lng) && Number.isFinite(lat)) {
                    bounds.minLng = Math.min(bounds.minLng, lng);
                    bounds.maxLng = Math.max(bounds.maxLng, lng);
                    bounds.minLat = Math.min(bounds.minLat, lat);
                    bounds.maxLat = Math.max(bounds.maxLat, lat);
                }
            } else {
                processCoordinates(entry);
            }
        });
    };

    processCoordinates(geometry.coordinates);

    return bounds.minLng === Infinity ? null : bounds;
};

const mergeBounds = (current: Bounds | null, next: Bounds | null): Bounds | null => {
    if (!next) return current;
    if (!current) return next;
    return {
        minLng: Math.min(current.minLng, next.minLng),
        maxLng: Math.max(current.maxLng, next.maxLng),
        minLat: Math.min(current.minLat, next.minLat),
        maxLat: Math.max(current.maxLat, next.maxLat),
    };
};

// 지도 확대 정도를 계산
const computeProjectionConfig = (features: GeoFeature[]) => {
    if (!features.length) {
        return { scale: DEFAULT_SCALE, center: DEFAULT_CENTER };
    }

    const bounds = features.reduce<Bounds | null>(
        (acc, feature) => mergeBounds(acc, computeFeatureBounds(feature)),
        null
    );

    if (!bounds) {
        return { scale: DEFAULT_SCALE, center: DEFAULT_CENTER };
    }

    const width = Math.max(bounds.maxLng - bounds.minLng, 0.01);
    const height = Math.max(bounds.maxLat - bounds.minLat, 0.01);
    const center: [number, number] = [
        (bounds.minLng + bounds.maxLng) / 2,
        (bounds.minLat + bounds.maxLat) / 2,
    ];

    const widthRatio = BASE_WIDTH / width;
    const heightRatio = BASE_HEIGHT / height;
    const scaleMultiplier = Math.max(1, Math.min(widthRatio, heightRatio));
    const scale = Math.min(DEFAULT_SCALE * scaleMultiplier, MAX_SCALE);

    return { scale, center };
};

function KoreaAdministrativeMap() {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
    const [currentLevel, setCurrentLevel] = useState<MapLevel>('provinces');
    const [features, setFeatures] = useState<GeoFeature[]>([]);
    const [geoCache, setGeoCache] = useState<{
        provinces: GeoFeature[] | null;
        municipalities: GeoFeature[] | null;
        submunicipalities: GeoFeature[] | null;
    }>({
        provinces: null,
        municipalities: null,
        submunicipalities: null,
    });

    const [selectedCodes, setSelectedCodes] = useState<{
        province?: string;
        municipality?: string;
    }>({});

    const sanitizeFeature = useCallback((feature: any) => {
        const geometry = feature?.geometry;
        if (!geometry || !geometry.type || !geometry.coordinates) return null;

        if (geometry.type === 'Polygon') {
            const rings = Array.isArray(geometry.coordinates)
                ? geometry.coordinates.filter((ring: any) => Array.isArray(ring) && ring.length > 3)
                : [];
            if (rings.length === 0) return null;
            return { ...feature, geometry: { ...geometry, coordinates: rings } };
        }

        if (geometry.type === 'MultiPolygon') {
            const polygons = Array.isArray(geometry.coordinates)
                ? geometry.coordinates
                      .map((polygon: any) =>
                          Array.isArray(polygon)
                              ? polygon.filter(
                                    (ring: any) => Array.isArray(ring) && ring.length > 3
                                )
                              : []
                      )
                      .filter((polygon: any) => polygon.length > 0)
                : [];
            if (polygons.length === 0) return null;
            return { ...feature, geometry: { ...geometry, coordinates: polygons } };
        }

        return null;
    }, []);

    const sanitizeCollection = useCallback(
        (collection: any) => {
            if (!collection?.features) return [];
            return collection.features
                .map(sanitizeFeature)
                .filter(
                    (feature: any) =>
                        feature &&
                        feature.geometry &&
                        Array.isArray(feature.geometry.coordinates) &&
                        feature.geometry.coordinates.length > 0
                );
        },
        [sanitizeFeature]
    );

    const fetchAndSanitize = useCallback(
        async (url: string, label: string) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                return sanitizeCollection(data);
            } catch (error) {
                console.error(`Error fetching ${label} GeoJSON data:`, error);
                return [];
            }
        },
        [sanitizeCollection]
    );

    const ensureMunicipalities = useCallback(async () => {
        if (geoCache.municipalities) return geoCache.municipalities;
        const sanitized = await fetchAndSanitize(municipalitiesUrl, 'municipalities');
        setGeoCache((prev) => ({ ...prev, municipalities: sanitized }));
        return sanitized;
    }, [geoCache.municipalities, fetchAndSanitize]);

    const ensureSubMunicipalities = useCallback(async () => {
        if (geoCache.submunicipalities) return geoCache.submunicipalities;
        const sanitized = await fetchAndSanitize(submunicipalitiesUrl, 'submunicipalities');
        setGeoCache((prev) => ({ ...prev, submunicipalities: sanitized }));
        return sanitized;
    }, [geoCache.submunicipalities, fetchAndSanitize]);

    const ensureProvinces = useCallback(async () => {
        if (geoCache.provinces) return geoCache.provinces;
        const sanitized = await fetchAndSanitize(provincesUrl, 'provinces');
        setGeoCache((prev) => ({ ...prev, provinces: sanitized }));
        return sanitized;
    }, [geoCache.provinces, fetchAndSanitize]);

    const filterByParentCode = useCallback((collection: GeoFeature[], parentCode: string) => {
        if (!parentCode) return [];
        return collection.filter((feature) => {
            const code = String(feature?.properties?.code ?? '');
            return code.startsWith(parentCode);
        });
    }, []);

    const handleRegionClick = useCallback(
        async (geo: any) => {
            const code = String(geo?.properties?.code ?? '');
            if (!code) return;

            if (currentLevel === 'provinces') {
                const municipalities = await ensureMunicipalities();
                const filtered = filterByParentCode(municipalities, code);
                if (filtered.length === 0) {
                    console.warn(`No municipalities found for province code ${code}`);
                    return;
                }
                setSelectedCodes({ province: code });
                setFeatures(filtered);
                setCurrentLevel('municipalities');
                setHoveredRegion(null);
                return;
            }

            if (currentLevel === 'municipalities') {
                const submunicipalities = await ensureSubMunicipalities();
                const filtered = filterByParentCode(submunicipalities, code);
                if (filtered.length === 0) {
                    console.warn(`No submunicipalities found for municipality code ${code}`);
                    return;
                }
                setSelectedCodes((prev) => ({ ...prev, municipality: code }));
                setFeatures(filtered);
                setCurrentLevel('submunicipalities');
                setHoveredRegion(null);
                return;
            }

            console.log('Selected region:', {
                code,
                name: geo?.properties?.name,
                level: currentLevel,
                parentCodes: selectedCodes,
            });
        },
        [
            currentLevel,
            ensureMunicipalities,
            ensureSubMunicipalities,
            filterByParentCode,
            selectedCodes,
        ]
    );

    const projectionConfig = useMemo(() => computeProjectionConfig(features), [features]);

    const handleBackClick = useCallback(async () => {
        if (currentLevel === 'submunicipalities') {
            const provinceCode = selectedCodes.province;
            const municipalities = await ensureMunicipalities();
            if (provinceCode) {
                const filtered = filterByParentCode(municipalities, provinceCode);
                setFeatures(filtered);
                setCurrentLevel('municipalities');
                setSelectedCodes({ province: provinceCode });
            } else {
                const provinces = await ensureProvinces();
                setFeatures(provinces);
                setCurrentLevel('provinces');
                setSelectedCodes({});
            }
            setHoveredRegion(null);
            return;
        }

        if (currentLevel === 'municipalities') {
            const provinces = await ensureProvinces();
            setFeatures(provinces);
            setCurrentLevel('provinces');
            setSelectedCodes({});
            setHoveredRegion(null);
        }
    }, [
        currentLevel,
        ensureMunicipalities,
        ensureProvinces,
        filterByParentCode,
        selectedCodes.province,
    ]);

    useEffect(() => {
        let isMounted = true;

        fetchAndSanitize(provincesUrl, 'provinces').then((sanitized) => {
            if (!isMounted) return;
            setGeoCache((prev) => ({ ...prev, provinces: sanitized }));
            setFeatures(sanitized);
            setCurrentLevel('provinces');
            setSelectedCodes({});
            setHoveredRegion(null);
        });

        return () => {
            isMounted = false;
        };
    }, [fetchAndSanitize]);

    return (
        <div className={style.wrapper}>
            <button
                type="button"
                onClick={() => {
                    void handleBackClick();
                }}
                disabled={currentLevel === 'provinces'}>
                뒤로가기
            </button>
            <ComposableMap projection="geoMercator" projectionConfig={projectionConfig}>
                {features.length > 0 && (
                    <Geographies
                        key={`${currentLevel}-${selectedCodes.province ?? ''}-${
                            selectedCodes.municipality ?? ''
                        }`}
                        geography={features as any}>
                        {({ geographies }) =>
                            geographies.map((geoItem) => {
                                const regionName = geoItem?.properties?.name;
                                const isHovered = hoveredRegion === regionName;
                                return (
                                    <Geography
                                        key={geoItem.rsmKey}
                                        geography={geoItem}
                                        onMouseEnter={() => setHoveredRegion(regionName)}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                        onClick={() => {
                                            void handleRegionClick(geoItem);
                                        }}
                                        style={{
                                            default: {
                                                fill: isHovered ? '#3b82f6' : '#e5e7eb',
                                                stroke: '#9ca3af',
                                                strokeWidth: 0.5,
                                                outline: 'none',
                                            },
                                            hover: { fill: '#2563eb', cursor: 'pointer' },
                                            pressed: { fill: '#1d4ed8' },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                )}
            </ComposableMap>
            <p className={style.hoveredRegion ?? ''}>
                {hoveredRegion ? `${hoveredRegion}` : '지도 위에 마우스를 올려보세요.'}
            </p>
        </div>
    );
}

export default memo(KoreaAdministrativeMap);
