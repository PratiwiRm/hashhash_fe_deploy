import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { chartGradientBuilderPlugin, lineChartOptionsBuilder, labelBuilder } from 'commons/utils';

import { Wrapper, ControlPanel, Controls, Control, PageTitle } from 'components/SharedElements';

import { getPerformance } from 'reducers/performance';

import Navigation from '../Navigation';

const randomScalingFactor = max => Math.floor(Math.random() * max);

@connect(state => ({ auth: state.auth, performance: state.performance }), { getPerformance })
export default class Performance extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    performance: PropTypes.object.isRequired,
    getPerformance: PropTypes.func.isRequired,
  };

  static AVG_TASKS_CFG = {
    type: 'line',
    data: {
      labels: labelBuilder('week'),
      datasets: [
        {
          label: '# of Tugas Terselesaikan',
          data: [],
        },
      ],
    },
    options: lineChartOptionsBuilder('Bulan', 'Tugas'),
    plugins: [
      {
        afterLayout: chart => chartGradientBuilderPlugin(chart, 'green'),
      },
    ],
  };

  static AVG_ERRORS_CFG = {
    type: 'line',
    data: {
      labels: labelBuilder('week'),
      datasets: [
        {
          label: '# of Kesalahan Terjadi',
          data: [],
        },
      ],
    },
    options: lineChartOptionsBuilder('Bulan', 'Kesalahan'),
    plugins: [
      {
        afterLayout: chartGradientBuilderPlugin,
      },
    ],
  };

  // constructor() {
  //   super();

  //   this.state = {
  //     avgTasksRange: 'lastSix',
  //     avgErrorsRange: 'lastSix',
  //     avgHoursRange: 'lastSix',
  //   };
  // }

  componentDidMount() {
    if (this.props.auth.token) {
      this.props.getPerformance();
    }

    this.ctxAvgTasks = document.getElementById('avgTasks').getContext('2d');
    this.avgTasksChart = new Chart(this.ctxAvgTasks, Performance.AVG_TASKS_CFG);

    this.ctxAvgErrors = document.getElementById('avgErrors').getContext('2d');
    this.avgErrorsChart = new Chart(this.ctxAvgErrors, Performance.AVG_ERRORS_CFG);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.token && nextProps.auth.token) {
      this.props.getPerformance();
    }

    if (!isEmpty(nextProps.performance.data)) {
      this.initialLoad(nextProps.performance.data);
    }
  }

  // setRange = (field, range) => {
  //   this.setState({ [field]: range });
  // };

  initialLoad = data => {
    const labels = [];
    const avgTasks = [];
    const avgErrors = [];

    data.forEach(d => {
      labels.push(d.hari);
      avgTasks.push(d.tugas_selesai);
      avgErrors.push(d.tugas_gagal);
    });

    this.avgTasksChart.data.labels = labels;
    this.avgTasksChart.data.datasets.forEach(datasets => {
      datasets.data.push(...avgTasks);
    });

    this.avgErrorsChart.data.labels = labels;
    this.avgErrorsChart.data.datasets.forEach(datasets => {
      datasets.data.push(...avgErrors);
    });

    this.avgTasksChart.update();
    this.avgErrorsChart.update();
  };

  // updateAvgTasksChart = range => {
  //   const dummy = [[], []];
  //   let scaleLabel = '';

  //   // TODO: change this to fetch action call
  //   if (range === 'week') {
  //     dummy.forEach(data => {
  //       let iterator;

  //       for (iterator = 0; iterator < 7; iterator += 1) {
  //         data.push(randomScalingFactor(40));
  //       }
  //     });
  //     scaleLabel = 'Hari';
  //   } else if (range === 'month') {
  //     dummy.forEach(data => {
  //       let iterator;

  //       for (iterator = 0; iterator < 30; iterator += 1) {
  //         data.push(randomScalingFactor(40));
  //       }
  //     });
  //     scaleLabel = 'Tanggal';
  //   } else if (range === 'lastSix') {
  //     dummy.forEach(data => {
  //       let iterator;

  //       for (iterator = 0; iterator < 6; iterator += 1) {
  //         data.push(randomScalingFactor(40));
  //       }
  //     });
  //     scaleLabel = 'Bulan';
  //   } else if (range === 'lastTwelve') {
  //     dummy.forEach(data => {
  //       let iterator;

  //       for (iterator = 0; iterator < 12; iterator += 1) {
  //         data.push(randomScalingFactor(40));
  //       }
  //     });
  //     scaleLabel = 'Bulan';
  //   }

  //   // Set Labels
  //   this.avgTasksChart.data.labels.splice(
  //     0,
  //     this.avgTasksChart.data.labels.length,
  //     ...labelBuilder(range)
  //   );

  //   // Set Label Legend
  //   this.avgTasksChart.options.scales = {
  //     ...this.avgTasksChart.options.scales,
  //     xAxes: [
  //       {
  //         ...this.avgTasksChart.options.scales.xAxes[0],
  //         scaleLabel: {
  //           ...this.avgTasksChart.options.scales.xAxes[0].scaleLabel,
  //           labelString: scaleLabel,
  //         },
  //       },
  //     ],
  //   };

  //   // Set New Data
  //   this.avgTasksChart.data.datasets.forEach((datasets, index) => {
  //     datasets.data.push(...dummy[index]);
  //   });

  //   // Redraw the chart
  //   this.avgTasksChart.update();

  //   this.setRange('avgTasksRange', range);
  // };

  // updateAvgErrorsChart = range => {
  //   const dummy = [[], []];
  //   let scaleLabel = '';

  //   // TODO: change this to fetch action call
  //   if (range === 'week') {
  //     dummy.forEach(data => {
  //       let iterator;

  //       for (iterator = 0; iterator < 7; iterator += 1) {
  //         data.push(randomScalingFactor(40));
  //       }
  //     });
  //     scaleLabel = 'Hari';
  //   } else if (range === 'month') {
  //     dummy.forEach(data => {
  //       let iterator;

  //       for (iterator = 0; iterator < 30; iterator += 1) {
  //         data.push(randomScalingFactor(40));
  //       }
  //     });
  //     scaleLabel = 'Tanggal';
  //   } else if (range === 'lastSix') {
  //     dummy.forEach(data => {
  //       let iterator;

  //       for (iterator = 0; iterator < 6; iterator += 1) {
  //         data.push(randomScalingFactor(40));
  //       }
  //     });
  //     scaleLabel = 'Bulan';
  //   } else if (range === 'lastTwelve') {
  //     dummy.forEach(data => {
  //       let iterator;

  //       for (iterator = 0; iterator < 12; iterator += 1) {
  //         data.push(randomScalingFactor(40));
  //       }
  //     });
  //     scaleLabel = 'Bulan';
  //   }

  //   // Set Labels
  //   this.avgErrorsChart.data.labels.splice(
  //     0,
  //     this.avgErrorsChart.data.labels.length,
  //     ...labelBuilder(range)
  //   );

  //   // Set Label Legend
  //   this.avgErrorsChart.options.scales = {
  //     ...this.avgErrorsChart.options.scales,
  //     xAxes: [
  //       {
  //         ...this.avgErrorsChart.options.scales.xAxes[0],
  //         scaleLabel: {
  //           ...this.avgErrorsChart.options.scales.xAxes[0].scaleLabel,
  //           labelString: scaleLabel,
  //         },
  //       },
  //     ],
  //   };

  //   // Set New Data
  //   this.avgErrorsChart.data.datasets.forEach((datasets, index) => {
  //     datasets.data.push(...dummy[index]);
  //   });

  //   // Redraw the chart
  //   this.avgErrorsChart.update();

  //   this.setRange('avgErrorsRange', range);
  // };

  // <RangeSelector>
  //   <button
  //     onClick={() => this.updateAvgTasksChart('week')}
  //     disabled={this.state.avgTasksRange === 'week'}
  //   >
  //     Minggu Ini
  //   </button>
  //   <button
  //     onClick={() => this.updateAvgTasksChart('month')}
  //     disabled={this.state.avgTasksRange === 'month'}
  //   >
  //     Bulan Ini
  //   </button>
  //   <button
  //     onClick={() => this.updateAvgTasksChart('lastSix')}
  //     disabled={this.state.avgTasksRange === 'lastSix'}
  //   >
  //     6 Bulan Terakhir
  //   </button>
  //   <button
  //     onClick={() => this.updateAvgTasksChart('lastTwelve')}
  //     disabled={this.state.avgTasksRange === 'lastTwelve'}
  //   >
  //     12 Bulan Terakhir
  //   </button>
  // </RangeSelector>

  // <RangeSelector>
  //   <button
  //     onClick={() => this.updateAvgErrorsChart('week')}
  //     disabled={this.state.avgErrorsRange === 'week'}
  //   >
  //     Minggu Ini
  //   </button>
  //   <button
  //     onClick={() => this.updateAvgErrorsChart('month')}
  //     disabled={this.state.avgErrorsRange === 'month'}
  //   >
  //     Bulan Ini
  //   </button>
  //   <button
  //     onClick={() => this.updateAvgErrorsChart('lastSix')}
  //     disabled={this.state.avgErrorsRange === 'lastSix'}
  //   >
  //     6 Bulan Terakhir
  //   </button>
  //   <button
  //     onClick={() => this.updateAvgErrorsChart('lastTwelve')}
  //     disabled={this.state.avgErrorsRange === 'lastTwelve'}
  //   >
  //     12 Bulan Terakhir
  //   </button>
  // </RangeSelector>

  render() {
    return (
      <Wrapper>
        <Navigation />
        <TitleBar>
          <h1>Rata-rata Jumlah Tugas Selesai per Hari</h1>
        </TitleBar>
        <CanvasWrapper>
          <canvas id="avgTasks" />
        </CanvasWrapper>
        <TitleBar>
          <h1>Rata-rata Jumlah Kesalahan per Hari</h1>
        </TitleBar>
        <CanvasWrapper>
          <canvas id="avgErrors" />
        </CanvasWrapper>
      </Wrapper>
    );
  }
}

const CanvasWrapper = styled.div`
  width: 100%;
  margin: 0 0 4rem;
`;

const CanvasWrapperMini = styled.div`
  width: 60%;
  margin: 4rem 0 0;
`;

const TitleBar = styled.div`
  width: ${props => (props.small ? '35%' : '100%')};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin-bottom: ${props => (props.small ? '0' : '2rem')};

  h1 {
    flex: ${props => (props.small ? 'none' : '1')};
    width: ${props => (props.small ? '100%' : 'auto')};
    font-size: ${props => (props.small ? '1.5rem' : '2rem')};
    text-align: ${props => (props.right ? 'right' : 'left')};
    margin-bottom: ${props => (props.small ? '1rem' : '0')};
  }
`;

const RangeSelector = styled.div`
  width: ${props => (props.small ? '100%' : 'auto')};
  display: flex;
  justify-content: ${props => (props.right ? 'flex-end' : 'flex-start')};
  align-items: stretch;
  align-content: stretch;

  button {
    padding: ${props => (props.small ? '0.35rem 0.7rem' : '0.5rem 1rem')};
    font-size: ${props => (props.small ? '0.85rem' : '1rem')};
    color: ${props => props.theme.color.blue};
    border: 0.1rem solid ${props => props.theme.color.blue};
    border-right: none;
    transition: 0.25s ease all;

    &:first-of-type {
      border-radius: ${props => props.theme.sizing.radius.small} 0 0
        ${props => props.theme.sizing.radius.small};
    }

    &:last-of-type {
      border-right: 0.1rem solid ${props => props.theme.color.blue};
      border-radius: 0 ${props => props.theme.sizing.radius.small}
        ${props => props.theme.sizing.radius.small} 0;
    }

    &:disabled,
    &:hover,
    &:focus {
      color: ${props => props.theme.color.white};
      background: ${props => props.theme.color.blue};
      transition: 0.25s ease all;
    }
  }
`;
