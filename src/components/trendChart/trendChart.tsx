import {
  Chart,
  ChartArea,
  ChartLegend,
  ChartTheme,
  ChartVoronoiContainer,
} from '@patternfly/react-charts';
import { css } from '@patternfly/react-styles';
import {
  ChartDatum,
  getDateRangeString,
  getTooltipContent,
  getTooltipLabel,
} from 'components/commonChart/chartUtils';
import React from 'react';
import { FormatOptions, ValueFormatter } from 'utils/formatValue';
import { VictoryAxis } from 'victory';
import { chartStyles, styles } from './trendChart.styles';

interface TrendChartProps {
  title?: string;
  height: number;
  currentData: any;
  previousData?: any;
  formatDatumValue: ValueFormatter;
  formatDatumOptions?: FormatOptions;
}

interface State {
  width: number;
}

class TrendChart extends React.Component<TrendChartProps, State> {
  private containerRef = React.createRef<HTMLDivElement>();
  public state: State = {
    width: 0,
  };

  public shouldComponentUpdate(nextProps: TrendChartProps) {
    if (!nextProps.currentData || !nextProps.previousData) {
      return false;
    }
    return true;
  }

  private getTooltipLabel = (datum: ChartDatum) => {
    const { formatDatumValue, formatDatumOptions } = this.props;
    return getTooltipLabel(
      datum,
      getTooltipContent(formatDatumValue),
      formatDatumOptions,
      'date'
    );
  };

  private handleResize = () => {
    this.setState({ width: this.containerRef.current.clientWidth });
  };

  public componentDidMount() {
    const node = this.containerRef.current;
    if (node) {
      this.setState({ width: node.clientWidth });
    }
    window.addEventListener('resize', this.handleResize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  public render() {
    const { title, currentData, previousData, height } = this.props;

    const legendData = [];
    if (previousData && previousData.length) {
      legendData.push({
        name: getDateRangeString(previousData, true, true),
      });
    }
    if (currentData && currentData.length) {
      legendData.push({
        name: getDateRangeString(currentData),
      });
    }
    const container = <ChartVoronoiContainer labels={this.getTooltipLabel} />;

    return (
      <div className={css(styles.reportSummaryTrend)} ref={this.containerRef}>
        <div>
          <Chart
            containerComponent={container}
            height={height}
            width={this.state.width}
          >
            {Boolean(previousData && previousData.length) && (
              <ChartArea
                style={chartStyles.previousMonth}
                data={previousData}
              />
            )}
            {Boolean(currentData && currentData.length) && (
              <ChartArea style={chartStyles.currentMonth} data={currentData} />
            )}
            <VictoryAxis style={chartStyles.axis} />
            <VictoryAxis dependentAxis style={chartStyles.axis} />
          </Chart>
        </div>
        {Boolean(legendData && legendData.length) && (
          <ChartLegend
            title={title}
            theme={ChartTheme.light.blue}
            colorScale={chartStyles.colorScale}
            data={legendData}
            height={50}
            width={this.state.width}
          />
        )}
      </div>
    );
  }
}

export { TrendChart, TrendChartProps };
