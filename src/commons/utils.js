import moment from 'moment';

import theme from 'commons/theme';

export const chartGradientBuilderPlugin = chart => {
  const { width, height, ctx } = chart;

  // initiate gradient object
  const pickerGradient = ctx.createLinearGradient(width / 2, 0, width / 2, height);
  const driverGradient = ctx.createLinearGradient(width / 2, 0, width / 2, height);

  // Add colors
  pickerGradient.addColorStop(0.5, 'rgba(0, 227, 174, 0.75)');
  pickerGradient.addColorStop(1, 'rgba(155, 225, 93, 0.25)');

  driverGradient.addColorStop(0.5, 'rgba(0, 198, 251, 0.75)');
  driverGradient.addColorStop(1, 'rgba(0, 91, 234, 0.25)');

  const pickerPointBackgroundColor = [];
  const pickerPointBorderColor = [];

  const driverPointBackgroundColor = [];
  const driverPointBorderColor = [];

  chart.data.datasets[0].data.forEach(() => {
    pickerPointBackgroundColor.push('rgba(155, 225, 93, 1)');
    pickerPointBorderColor.push('rgba(255, 255, 255, 1)');
  });

  chart.data.datasets[1].data.forEach(() => {
    driverPointBackgroundColor.push('rgba(0, 91, 234, 1)');
    driverPointBorderColor.push('rgba(255, 255, 255, 1)');
  });

  chart.data.datasets[0].backgroundColor = pickerGradient;
  chart.data.datasets[0].borderColor = 'rgba(155, 225, 93, 1)';
  chart.data.datasets[0].pointBackgroundColor = pickerPointBackgroundColor;
  chart.data.datasets[0].pointBorderColor = pickerPointBorderColor;
  chart.legend.legendItems[0].fillStyle = 'rgba(155, 225, 93, 1)';
  chart.legend.legendItems[0].lineWidth = 0;
  chart.data.datasets[1].backgroundColor = driverGradient;
  chart.data.datasets[1].borderColor = 'rgba(0, 91, 234, 1)';
  chart.data.datasets[1].pointBackgroundColor = driverPointBackgroundColor;
  chart.data.datasets[1].pointBorderColor = driverPointBorderColor;
  chart.legend.legendItems[1].fillStyle = 'rgba(0, 91, 234, 1)';
  chart.legend.legendItems[1].lineWidth = 0;
};

export const lineChartOptionsBuilder = (xLabel, yLabel) => ({
  responsive: true,
  title: {
    display: false,
  },
  hover: {
    mode: 'index',
  },
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: xLabel,
          fontSize: 16,
          fontStyle: 'bold',
          fontFamily: theme.font.heading,
          fontColor: theme.color.black,
          lineHeight: 1,
          padding: {
            top: 8,
            bottom: 0,
          },
        },
        gridLines: {
          display: false,
        },
        ticks: {
          fontStyle: 'bold',
          fontFamily: theme.font.body,
          fontColor: theme.color.dark,
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: yLabel,
          fontSize: 16,
          fontStyle: 'bold',
          fontFamily: theme.font.heading,
          fontColor: theme.color.black,
          lineHeight: 1,
          padding: {
            top: 0,
            bottom: 8,
          },
        },
        gridLines: {
          color: theme.color.pegasus,
          lineWidth: 1,
        },
        ticks: {
          fontStyle: 'bold',
          fontFamily: theme.font.body,
          fontColor: theme.color.dark,
        },
      },
    ],
  },
});

export const buildLabels = mode => {
  const LABEL_TEMPLATE_WEEK = [
    ['Monday', 'Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday'],
    ['Tuesday', 'Monday', 'Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday'],
    ['Wednesday', 'Tuesday', 'Monday', 'Sunday', 'Saturday', 'Friday', 'Thursday'],
    ['Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday', 'Saturday', 'Friday'],
    ['Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday', 'Saturday'],
    ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'],
    ['Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday'],
  ];

  const LABEL_TEMPLATE_LAST_SIX = [
    ['January', 'December', 'November', 'October', 'September', 'August'],
    ['February', 'January', 'December', 'November', 'October', 'September'],
    ['March', 'February', 'January', 'December', 'November', 'October'],
    ['April', 'March', 'February', 'January', 'December', 'November'],
    ['May', 'April', 'March', 'February', 'January', 'December'],
    ['June', 'May', 'April', 'March', 'February', 'January'],
    ['July', 'June', 'May', 'April', 'March', 'February'],
    ['August', 'July', 'June', 'May', 'April', 'March'],
    ['September', 'August', 'July', 'June', 'May', 'April'],
    ['October', 'September', 'August', 'July', 'June', 'May'],
    ['November', 'October', 'September', 'August', 'July', 'June'],
    ['December', 'November', 'October', 'September', 'August', 'July'],
  ];

  const LABEL_TEMPLATE_LAST_TWELVE = [
    [
      'January',
      'December',
      'November',
      'October',
      'September',
      'August',
      'July',
      'June',
      'May',
      'April',
      'March',
      'February',
    ],
    [
      'February',
      'January',
      'December',
      'November',
      'October',
      'September',
      'August',
      'July',
      'June',
      'May',
      'April',
      'March',
    ],
    [
      'March',
      'February',
      'January',
      'December',
      'November',
      'October',
      'September',
      'August',
      'July',
      'June',
      'May',
      'April',
    ],
    [
      'April',
      'March',
      'February',
      'January',
      'December',
      'November',
      'October',
      'September',
      'August',
      'July',
      'June',
      'May',
    ],
    [
      'May',
      'April',
      'March',
      'February',
      'January',
      'December',
      'November',
      'October',
      'September',
      'August',
      'July',
      'June',
    ],
    [
      'June',
      'May',
      'April',
      'March',
      'February',
      'January',
      'December',
      'November',
      'October',
      'September',
      'August',
      'July',
    ],
    [
      'July',
      'June',
      'May',
      'April',
      'March',
      'February',
      'January',
      'December',
      'November',
      'October',
      'September',
      'August',
    ],
    [
      'August',
      'July',
      'June',
      'May',
      'April',
      'March',
      'February',
      'January',
      'December',
      'November',
      'October',
      'September',
    ],
    [
      'September',
      'August',
      'July',
      'June',
      'May',
      'April',
      'March',
      'February',
      'January',
      'December',
      'November',
      'October',
    ],
    [
      'October',
      'September',
      'August',
      'July',
      'June',
      'May',
      'April',
      'March',
      'February',
      'January',
      'December',
      'November',
    ],
    [
      'November',
      'October',
      'September',
      'August',
      'July',
      'June',
      'May',
      'April',
      'March',
      'February',
      'January',
      'December',
    ],
    [
      'December',
      'November',
      'October',
      'September',
      'August',
      'July',
      'June',
      'May',
      'April',
      'March',
      'February',
      'January',
    ],
  ];

  let labels = [];
  const now = moment();

  if (mode === 'week') {
    labels = LABEL_TEMPLATE_WEEK[now.isoWeekday() - 1].reverse();
  } else if (mode === 'month') {
    let iterator;
    labels.push(now.date());

    for (iterator = 0; iterator < 30; iterator += 1) {
      now.date(-1);
      labels.push(now.date());
    }
    labels.reverse();
  } else if (mode === 'lastSix') {
    labels = LABEL_TEMPLATE_LAST_SIX[now.month()].reverse();
  } else if (mode === 'lastTwelve') {
    labels = LABEL_TEMPLATE_LAST_TWELVE[now.month()].reverse();
  }

  return labels;
};
