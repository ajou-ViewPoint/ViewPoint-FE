// 필요한 타입만 복사해서 수정
export interface ScatterPlotDatum {
    x: ScatterPlotValue;
    y: ScatterPlotValue;
    name: string;
    party: string;
}

export type ScatterPlotRawSerie<RawDatum extends ScatterPlotDatum> = {
    id: string | number;
    data: RawDatum[];
};

export interface ScatterPlotNodeData<RawDatum extends ScatterPlotDatum> {
    index: number;
    serieIndex: number;
    id: string;
    serieId: ScatterPlotRawSerie<RawDatum>['id'];
    x: number;
    xValue: RawDatum['x'];
    formattedX: string | number;
    y: number;
    yValue: RawDatum['y'];
    formattedY: string | number;
    size: number;
    color: string;
    data: RawDatum;
}
