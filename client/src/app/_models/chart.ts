
export class Chart {
    id: string;
    name: string;
    lines: ChartLine[];
}

export class ChartLine {
    device: string;
    id: string;
    name: string;
    color: string;
    label: string;
}

export enum ChartViewType {
    realtime1 = 'chart.viewtype-realtime1',
    history = 'chart.viewtype-history'
}

export enum ChartRangeType {
    last15min = 'chart.rangetype-last15min',
    last30min = 'chart.rangetype-last30min',
    last1h = 'chart.rangetype-last1h',
    last8h = 'chart.rangetype-last8h',
    last1d = 'chart.rangetype-last1d',
    last3d = 'chart.rangetype-last3d',
    last1w = 'chart.rangetype-last1w'
}
export enum ChartRangeTypeSeconds {
    last15min = 900,
    last30min = 1800,
    last1h = 3600,
    last8h = 28800,
    last1d = 86400,
    last3d = 259200,
    last1w = 604800,
}


export enum ChartLegendMode {
    always = 'chart.legend-always',
    // follow = 'chart.legend-follow',
    // onmouseover = 'chart.legend-onmouseover',
    never = 'chart.legend-never'
}

export class ChartRangeConverter {
    static ChartRangeToHours (crt: ChartRangeType) {
        let types = Object.keys(ChartRangeType);
        if (crt === types[0]) {         // ChartRangeType.last8h) {
            return 8;
        } else if (crt === types[1]) {  // ChartRangeType.last1d) {
            return 24;
        } else if (crt === types[2]) {  // ChartRangeType.last3d) {
            return 24 * 3;
        } else if (crt === types[3]) {  // ChartRangeType.last1w) {
            return 24 * 7;
        }
        return 0;
    }

    static chartRangeToMs(crt: ChartRangeType) {
        return ChartRangeTypeSeconds[crt] * 1000;
    }
}
