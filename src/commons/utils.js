import moment from 'moment';

import theme from 'commons/theme';

export const chartGradientBuilderPlugin = (chart, color) => {
  const { width, height, ctx } = chart;

  // initiate gradient object
  const gradient = ctx.createLinearGradient(width / 2, 0, width / 2, height);

  const backgroundColor = [];
  const borderColor = [];

  // Add colors
  if (color === 'green') {
    gradient.addColorStop(0.5, 'rgba(0, 227, 174, 0.75)');
    gradient.addColorStop(1, 'rgba(155, 225, 93, 0.25)');

    chart.data.datasets[0].data.forEach(() => {
      backgroundColor.push('rgba(155, 225, 93, 1)');
      borderColor.push('rgba(255, 255, 255, 1)');
    });

    chart.data.datasets[0].borderColor = 'rgba(155, 225, 93, 1)';
    chart.legend.legendItems[0].fillStyle = 'rgba(155, 225, 93, 1)';
  } else {
    gradient.addColorStop(0.5, 'rgba(0, 198, 251, 0.75)');
    gradient.addColorStop(1, 'rgba(0, 91, 234, 0.25)');

    chart.data.datasets[0].data.forEach(() => {
      backgroundColor.push('rgba(0, 91, 234, 1)');
      borderColor.push('rgba(255, 255, 255, 1)');
    });

    chart.data.datasets[0].borderColor = 'rgba(0, 91, 234, 1)';
    chart.legend.legendItems[0].fillStyle = 'rgba(0, 91, 234, 1)';
  }

  chart.data.datasets[0].backgroundColor = gradient;
  chart.data.datasets[0].pointBackgroundColor = backgroundColor;
  chart.data.datasets[0].pointBorderColor = borderColor;
  chart.legend.legendItems[0].lineWidth = 0;
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

export const labelBuilder = mode => {
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

export const employeesArrToObject = employees => {
  const empObject = {};

  employees.forEach(employee => {
    empObject[employee.username] = employee;
  });

  return empObject;
};

export const htmlInputDateFormatter = date => {
  const defaultHTMLInput = /\d{4}-\d{2}-\d{2}/;

  if (defaultHTMLInput.test(date)) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  const [day, month, year] = date.split('/');
  return `${day}-${month}-${year}`;
};

export const modalBodyScroll = show => {
  if (show) {
    const noScrollWidth = window.innerWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.width = `${noScrollWidth}px`;
  } else {
    document.body.style.overflow = 'auto';
    document.body.style.width = 'auto';
  }
};
