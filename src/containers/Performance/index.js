import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Chart from 'chart.js';

import theme from 'commons/theme';
import { chartGradientBuilderPlugin, lineChartOptionsBuilder, labelBuilder } from 'commons/utils';

import { Wrapper, ControlPanel, Controls, Control, PageTitle } from 'components/SharedElements';

import Navigation from '../Navigation';

const randomScalingFactor = max => Math.floor(Math.random() * max);

export default class Performance extends Component {
  static AVG_TASKS_CFG = {
    type: 'line',
    data: {
      labels: labelBuilder('lastSix'),
      datasets: [
        {
          label: 'Picker',
          data: [],
        },
        {
          label: 'Driver',
          data: [],
        },
      ],
    },
    options: lineChartOptionsBuilder('Bulan', 'Tugas'),
    plugins: [
      {
        afterLayout: chartGradientBuilderPlugin,
      },
    ],
  };

  static AVG_ERRORS_CFG = {
    type: 'line',
    data: {
      labels: labelBuilder('lastSix'),
      datasets: [
        {
          label: 'Picker',
          data: [],
        },
        {
          label: 'Driver',
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

  static AVG_HOURS_CFG = {
    type: 'line',
    data: {
      labels: labelBuilder('lastSix'),
      datasets: [
        {
          label: 'Picker',
          data: [],
        },
        {
          label: 'Driver',
          data: [],
        },
      ],
    },
    options: lineChartOptionsBuilder('Bulan', 'Jam'),
    plugins: [
      {
        afterLayout: chartGradientBuilderPlugin,
      },
    ],
  };

  constructor() {
    super();

    this.state = {
      avgTasksRange: 'lastSix',
      avgErrorsRange: 'lastSix',
      avgHoursRange: 'lastSix',
    };
  }

  componentDidMount() {
    this.ctxAvgTasks = document.getElementById('avgTasks').getContext('2d');
    this.avgTasksChart = new Chart(this.ctxAvgTasks, Performance.AVG_TASKS_CFG);

    this.ctxAvgErrors = document.getElementById('avgErrors').getContext('2d');
    this.avgErrorsChart = new Chart(this.ctxAvgErrors, Performance.AVG_ERRORS_CFG);

    this.ctxAvgHours = document.getElementById('avgHours').getContext('2d');
    this.avgHoursChart = new Chart(this.ctxAvgHours, Performance.AVG_HOURS_CFG);

    this.initialLoad();
  }

  setRange = (field, range) => {
    this.setState({ [field]: range });
  };

  initialLoad = () => {
    const dummy = [
      [
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
      ],
      [
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
      ],
      [
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
      ],
      [
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
      ],
      [
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
      ],
      [
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
        randomScalingFactor(40),
      ],
    ];

    this.avgTasksChart.data.datasets.forEach((datasets, index) => {
      datasets.data.push(...dummy[index]);
    });

    this.avgErrorsChart.data.datasets.forEach((datasets, index) => {
      datasets.data.push(...dummy[2 + index]);
    });

    this.avgHoursChart.data.datasets.forEach((datasets, index) => {
      datasets.data.push(...dummy[4 + index]);
    });

    this.avgTasksChart.update();
    this.avgErrorsChart.update();
    this.avgHoursChart.update();
  };

  updateAvgTasksChart = range => {
    const dummy = [[], []];
    let scaleLabel = '';

    // TODO: change this to fetch action call
    if (range === 'week') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 7; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Hari';
    } else if (range === 'month') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 30; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Tanggal';
    } else if (range === 'lastSix') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 6; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Bulan';
    } else if (range === 'lastTwelve') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 12; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Bulan';
    }

    // Set Labels
    this.avgTasksChart.data.labels.splice(
      0,
      this.avgTasksChart.data.labels.length,
      ...labelBuilder(range)
    );

    // Set Label Legend
    this.avgTasksChart.options.scales = {
      ...this.avgTasksChart.options.scales,
      xAxes: [
        {
          ...this.avgTasksChart.options.scales.xAxes[0],
          scaleLabel: {
            ...this.avgTasksChart.options.scales.xAxes[0].scaleLabel,
            labelString: scaleLabel,
          },
        },
      ],
    };

    // Set New Data
    this.avgTasksChart.data.datasets.forEach((datasets, index) => {
      datasets.data.push(...dummy[index]);
    });

    // Redraw the chart
    this.avgTasksChart.update();

    this.setRange('avgTasksRange', range);
  };

  updateAvgErrorsChart = range => {
    const dummy = [[], []];
    let scaleLabel = '';

    // TODO: change this to fetch action call
    if (range === 'week') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 7; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Hari';
    } else if (range === 'month') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 30; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Tanggal';
    } else if (range === 'lastSix') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 6; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Bulan';
    } else if (range === 'lastTwelve') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 12; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Bulan';
    }

    // Set Labels
    this.avgErrorsChart.data.labels.splice(
      0,
      this.avgErrorsChart.data.labels.length,
      ...labelBuilder(range)
    );

    // Set Label Legend
    this.avgErrorsChart.options.scales = {
      ...this.avgErrorsChart.options.scales,
      xAxes: [
        {
          ...this.avgErrorsChart.options.scales.xAxes[0],
          scaleLabel: {
            ...this.avgErrorsChart.options.scales.xAxes[0].scaleLabel,
            labelString: scaleLabel,
          },
        },
      ],
    };

    // Set New Data
    this.avgErrorsChart.data.datasets.forEach((datasets, index) => {
      datasets.data.push(...dummy[index]);
    });

    // Redraw the chart
    this.avgErrorsChart.update();

    this.setRange('avgErrorsRange', range);
  };

  updateAvgHoursChart = range => {
    const dummy = [[], []];
    let scaleLabel = '';

    // TODO: change this to fetch action call
    if (range === 'week') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 7; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Hari';
    } else if (range === 'month') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 30; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Tanggal';
    } else if (range === 'lastSix') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 6; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Bulan';
    } else if (range === 'lastTwelve') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 12; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Bulan';
    }

    // Set Labels
    this.avgHoursChart.data.labels.splice(
      0,
      this.avgHoursChart.data.labels.length,
      ...labelBuilder(range)
    );

    // Set Label Legend
    this.avgHoursChart.options.scales = {
      ...this.avgHoursChart.options.scales,
      xAxes: [
        {
          ...this.avgHoursChart.options.scales.xAxes[0],
          scaleLabel: {
            ...this.avgHoursChart.options.scales.xAxes[0].scaleLabel,
            labelString: scaleLabel,
          },
        },
      ],
    };

    // Set New Data
    this.avgHoursChart.data.datasets.forEach((datasets, index) => {
      datasets.data.push(...dummy[index]);
    });

    // Redraw the chart
    this.avgHoursChart.update();

    this.setRange('avgHoursRange', range);
  };

  render() {
    return (
      <Wrapper>
        <Navigation />
        <TitleBar>
          <h1>Rata-rata Jumlah Tugas Selesai per Hari</h1>
          <RangeSelector>
            <button
              onClick={() => this.updateAvgTasksChart('week')}
              disabled={this.state.avgTasksRange === 'week'}
            >
              Minggu Ini
            </button>
            <button
              onClick={() => this.updateAvgTasksChart('month')}
              disabled={this.state.avgTasksRange === 'month'}
            >
              Bulan Ini
            </button>
            <button
              onClick={() => this.updateAvgTasksChart('lastSix')}
              disabled={this.state.avgTasksRange === 'lastSix'}
            >
              6 Bulan Terakhir
            </button>
            <button
              onClick={() => this.updateAvgTasksChart('lastTwelve')}
              disabled={this.state.avgTasksRange === 'lastTwelve'}
            >
              12 Bulan Terakhir
            </button>
          </RangeSelector>
        </TitleBar>
        <CanvasWrapper>
          <canvas id="avgTasks" />
        </CanvasWrapper>
        <TitleBar small>
          <h1>Rata-rata Jumlah Kesalahan per Hari</h1>
          <RangeSelector small>
            <button
              onClick={() => this.updateAvgErrorsChart('week')}
              disabled={this.state.avgErrorsRange === 'week'}
            >
              Minggu Ini
            </button>
            <button
              onClick={() => this.updateAvgErrorsChart('month')}
              disabled={this.state.avgErrorsRange === 'month'}
            >
              Bulan Ini
            </button>
            <button
              onClick={() => this.updateAvgErrorsChart('lastSix')}
              disabled={this.state.avgErrorsRange === 'lastSix'}
            >
              6 Bulan Terakhir
            </button>
            <button
              onClick={() => this.updateAvgErrorsChart('lastTwelve')}
              disabled={this.state.avgErrorsRange === 'lastTwelve'}
            >
              12 Bulan Terakhir
            </button>
          </RangeSelector>
        </TitleBar>
        <CanvasWrapperMini>
          <canvas id="avgErrors" />
        </CanvasWrapperMini>
        <CanvasWrapperMini>
          <canvas id="avgHours" />
        </CanvasWrapperMini>
        <TitleBar small right>
          <h1>Rata-rata Jumlah Jam Kerja per Hari</h1>
          <RangeSelector small right>
            <button
              onClick={() => this.updateAvgHoursChart('week')}
              disabled={this.state.avgHoursRange === 'week'}
            >
              Minggu Ini
            </button>
            <button
              onClick={() => this.updateAvgHoursChart('month')}
              disabled={this.state.avgHoursRange === 'month'}
            >
              Bulan Ini
            </button>
            <button
              onClick={() => this.updateAvgHoursChart('lastSix')}
              disabled={this.state.avgHoursRange === 'lastSix'}
            >
              6 Bulan Terakhir
            </button>
            <button
              onClick={() => this.updateAvgHoursChart('lastTwelve')}
              disabled={this.state.avgHoursRange === 'lastTwelve'}
            >
              12 Bulan Terakhir
            </button>
          </RangeSelector>
        </TitleBar>
      </Wrapper>
    );
  }
}

const CanvasWrapper = styled.div`
  width: 100%;
  margin: 0;
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
