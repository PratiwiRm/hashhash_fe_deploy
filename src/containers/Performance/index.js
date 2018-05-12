import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Chart from 'chart.js';

import theme from 'commons/theme';
import { chartGradientBuilderPlugin, lineChartOptionsBuilder, buildLabels } from 'commons/utils';

import { Wrapper, ControlPanel, Controls, Control, PageTitle } from 'components/SharedElements';

import Navigation from '../Navigation';

const randomScalingFactor = max => Math.floor(Math.random() * max);

export default class Performance extends Component {
  static AVG_TASKS_CFG = {
    type: 'line',
    data: {
      labels: buildLabels('lastSix'),
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
    options: lineChartOptionsBuilder('Month', 'Tasks'),
    plugins: [
      {
        afterLayout: chartGradientBuilderPlugin,
      },
    ],
  };

  static AVG_ERRORS_CFG = {
    type: 'line',
    data: {
      labels: buildLabels('lastSix'),
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
    options: lineChartOptionsBuilder('Month', 'Errors'),
    plugins: [
      {
        afterLayout: chartGradientBuilderPlugin,
      },
    ],
  };

  static AVG_HOURS_CFG = {
    type: 'line',
    data: {
      labels: buildLabels('lastSix'),
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
    options: lineChartOptionsBuilder('Month', 'Hours'),
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
      scaleLabel = 'Days';
    } else if (range === 'month') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 30; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Dates';
    } else if (range === 'lastSix') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 6; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Months';
    } else if (range === 'lastTwelve') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 12; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Months';
    }

    // Set Labels
    this.avgTasksChart.data.labels.splice(
      0,
      this.avgTasksChart.data.labels.length,
      ...buildLabels(range)
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
      scaleLabel = 'Days';
    } else if (range === 'month') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 30; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Dates';
    } else if (range === 'lastSix') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 6; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Months';
    } else if (range === 'lastTwelve') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 12; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Months';
    }

    // Set Labels
    this.avgErrorsChart.data.labels.splice(
      0,
      this.avgErrorsChart.data.labels.length,
      ...buildLabels(range)
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
      scaleLabel = 'Days';
    } else if (range === 'month') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 30; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Dates';
    } else if (range === 'lastSix') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 6; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Months';
    } else if (range === 'lastTwelve') {
      dummy.forEach(data => {
        let iterator;

        for (iterator = 0; iterator < 12; iterator += 1) {
          data.push(randomScalingFactor(40));
        }
      });
      scaleLabel = 'Months';
    }

    // Set Labels
    this.avgHoursChart.data.labels.splice(
      0,
      this.avgHoursChart.data.labels.length,
      ...buildLabels(range)
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
          <h1>Average # of Tasks Done in a Day</h1>
          <RangeSelector>
            <button
              onClick={() => this.updateAvgTasksChart('week')}
              disabled={this.state.avgTasksRange === 'week'}
            >
              This Week
            </button>
            <button
              onClick={() => this.updateAvgTasksChart('month')}
              disabled={this.state.avgTasksRange === 'month'}
            >
              This Month
            </button>
            <button
              onClick={() => this.updateAvgTasksChart('lastSix')}
              disabled={this.state.avgTasksRange === 'lastSix'}
            >
              Last Six Month
            </button>
            <button
              onClick={() => this.updateAvgTasksChart('lastTwelve')}
              disabled={this.state.avgTasksRange === 'lastTwelve'}
            >
              Last Twelve Month
            </button>
          </RangeSelector>
        </TitleBar>
        <CanvasWrapper>
          <canvas id="avgTasks" />
        </CanvasWrapper>
        <TitleBar half>
          <h1>Average # of Errors Done in a Day</h1>
          <RangeSelector full>
            <button
              onClick={() => this.updateAvgErrorsChart('week')}
              disabled={this.state.avgErrorsRange === 'week'}
            >
              This Week
            </button>
            <button
              onClick={() => this.updateAvgErrorsChart('month')}
              disabled={this.state.avgErrorsRange === 'month'}
            >
              This Month
            </button>
            <button
              onClick={() => this.updateAvgErrorsChart('lastSix')}
              disabled={this.state.avgErrorsRange === 'lastSix'}
            >
              Last Six Month
            </button>
            <button
              onClick={() => this.updateAvgErrorsChart('lastTwelve')}
              disabled={this.state.avgErrorsRange === 'lastTwelve'}
            >
              Last Twelve Month
            </button>
          </RangeSelector>
        </TitleBar>
        <CanvasWrapperMini>
          <canvas id="avgErrors" />
        </CanvasWrapperMini>
        <CanvasWrapperMini>
          <canvas id="avgHours" />
        </CanvasWrapperMini>
        <TitleBar half right>
          <h1>Average # of Daily Work Hours</h1>
          <RangeSelector full right>
            <button
              onClick={() => this.updateAvgHoursChart('week')}
              disabled={this.state.avgHoursRange === 'week'}
            >
              This Week
            </button>
            <button
              onClick={() => this.updateAvgHoursChart('month')}
              disabled={this.state.avgHoursRange === 'month'}
            >
              This Month
            </button>
            <button
              onClick={() => this.updateAvgHoursChart('lastSix')}
              disabled={this.state.avgHoursRange === 'lastSix'}
            >
              Last Six Month
            </button>
            <button
              onClick={() => this.updateAvgHoursChart('lastTwelve')}
              disabled={this.state.avgHoursRange === 'lastTwelve'}
            >
              Last Twelve Month
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
  width: 50%;
  margin: 4rem 0 0;
`;

const TitleBar = styled.div`
  width: ${props => (props.half ? '50%' : '100%')};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin-bottom: ${props => (props.half ? '0' : '2rem')};

  h1 {
    flex: ${props => (props.half ? 'none' : '1')};
    width: ${props => (props.half ? '100%' : 'auto')};
    font-size: 2rem;
    text-align: ${props => (props.right ? 'right' : 'left')};
    margin-bottom: ${props => (props.half ? '1rem' : '0')};
  }
`;

const RangeSelector = styled.div`
  width: ${props => (props.full ? '100%' : 'auto')};
  display: flex;
  justify-content: ${props => (props.right ? 'flex-end' : 'flex-start')};
  align-items: stretch;
  align-content: stretch;

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
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
