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
  const WEEKDAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const MONTHS = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const labels = [];
  let iterator;
  const now = moment();

  if (mode === 'week') {
    labels.push(WEEKDAYS[now.isoWeekday() - 1]);

    for (iterator = 0; iterator < 6; iterator += 1) {
      now.isoWeekday(now.isoWeekday() - 1);
      labels.push(WEEKDAYS[now.isoWeekday() - 1]);
    }
  } else if (mode === 'month') {
    labels.push(now.date());

    for (iterator = 0; iterator < 30; iterator += 1) {
      now.date(now.date() - 1);
      labels.push(now.date());
    }
  } else if (mode === 'lastSix') {
    labels.push(MONTHS[now.month()]);

    for (iterator = 0; iterator < 5; iterator += 1) {
      now.month(now.month() - 1);
      labels.push(MONTHS[now.month()]);
    }
  } else if (mode === 'lastTwelve') {
    labels.push(MONTHS[now.month()]);

    for (iterator = 0; iterator < 11; iterator += 1) {
      now.month(now.month() - 1);
      labels.push(MONTHS[now.month()]);
    }
  }

  labels.reverse();
  return labels;
};
