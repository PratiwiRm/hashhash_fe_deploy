import { isEmpty } from 'lodash';

export const PICKER_TASK_HEADER_FIELDS = [
  'order_id',
  'delivery_date',
  'status',
  'customer',
  'address',
  'address_guide',
  'product',
  'packaging',
  'quantity',
  'assigned',
  'type',
  'supplier',
];

export const PICKER_TASK_TEMPLATE = [
  {
    order_id: 'Unique UUID16 order_id from XYZ',
    delivery_date: 'Tanggal pengiriman dengan format YYYY/MM/DD',
    status: 'pending/doing/done',
    customer: 'Nama pembeli',
    address: 'Alamat pembeli',
    address_guide: 'Patokan alamat pembeli',
    product: 'Nama produk dengan Brand dan Varian produk',
    packaging: 'Packaging produk (units, metrics)',
    quantity: 'Angka',
    assigned: 'Nomor telpon pegawai yang diberi tugas (KOSONGKAN)',
    type: 'purchase/cancel',
    supplier: 'Nama Supplier',
  },
];

export const DRIVER_TASK_HEADER_FIELDS = [
  'task',
  'type',
  'outlet',
  'address',
  'notes',
  'pic',
  'contact',
];

export const DRIVER_TASK_TEMPLATE = [
  {
    task: 'Nomor identifikasi pengiriman (id rantai pengiriman), URUTAN DIPERHATIKAN!',
    type: 'PICKUP/DROPOFF',
    outlet: 'Nama outlet tujuan',
    address: 'Alamat outlet tujuan',
    notes: 'Catatan pengiriman (paket untuk diambil/diturunkan)',
    pic: 'Nama person in charge di outlet/cabang tujuan',
    contact: 'nomor telpon yang valid dan bisa dihubungi',
  },
];

export const driverTaskIdBuilder = task =>
  `logistic-${task.delivery_id}-${task.pick_ups.map(e => e.outlet).join('')}-${task.drop_offs
    .map(e => e.outlet)
    .join('')}`;

export const newLineFormatter = multiLine => multiLine.replace(/[\u21b5\n\r]/g, '\n');

export const taskStructureTransformator = (tasks, employees) => {
  const newTasks = {
    unassigned: [],
  };

  employees.forEach(employee => {
    newTasks[employee.phone_num] = {
      local: [],
      signed: [],
    };
  });

  tasks.forEach(task => {
    if (isEmpty(task.assigned)) {
      const newUnassigned = newTasks.unassigned;
      newUnassigned.push(task);
      newTasks.unassigned = newUnassigned;
    } else {
      const newEmpTasks = newTasks[task.assigned].signed;
      newEmpTasks.push(task);
      newTasks[task.assigned] = {
        local: [],
        signed: newEmpTasks,
      };
    }
  });

  return newTasks;
};

export const flattenTasks = source => {
  let flatten = [...source.unassigned];

  const bindedTasks = { ...source };
  delete bindedTasks.unassigned;

  Object.keys(bindedTasks).forEach(key => {
    if (!isEmpty(bindedTasks[key].local)) {
      flatten = flatten.concat(bindedTasks[key].local);
    }

    if (!isEmpty(bindedTasks[key].signed)) {
      flatten = flatten.concat(bindedTasks[key].signed);
    }
  });

  return flatten;
};

export const countDuplicatedPickerTasks = (source, check) => {
  const flattenSource = flattenTasks(source);

  const duplicateTemp = {};
  let duplicateCounter = 0;

  flattenSource.concat(check).forEach(task => {
    const key = `${task.supplier}-${task.order_id}-${task.product}`;

    if (key in duplicateTemp) {
      duplicateCounter += 1;
    } else {
      duplicateTemp[key] = key;
    }
  });

  return duplicateCounter;
};

export const driverTaskCsvStructureTransformator = tasks => {
  let identifierCounter = '';
  const formatted = [];

  tasks.forEach(task => {
    const { outlet, address, pic, contact } = task;
    const notes = newLineFormatter(task.notes);

    if (task.task === identifierCounter) {
      const currentFormattedTask = formatted[formatted.length - 1];

      if (task.type.toLowerCase() === 'pickup') {
        currentFormattedTask.pick_ups.push({
          outlet,
          address,
          notes,
          pic,
          contact,
        });
      } else {
        currentFormattedTask.drop_offs.push({
          outlet,
          address,
          notes,
          pic,
          contact,
        });
      }

      formatted[formatted.length - 1] = currentFormattedTask;
    } else {
      identifierCounter = task.task;

      const newFormatted = {
        assigned: '',
        pick_ups: [],
        drop_offs: [],
      };

      if (task.type.toLowerCase() === 'pickup') {
        newFormatted.pick_ups.push({
          outlet,
          address,
          notes,
          pic,
          contact,
        });
      } else {
        newFormatted.drop_offs.push({
          outlet,
          address,
          notes,
          pic,
          contact,
        });
      }

      formatted.push(newFormatted);
    }
  });

  return formatted;
};

export const countDuplicatedDriverTasks = (source, check) => {
  const flattenSource = flattenTasks(source);

  const duplicateTemp = {};
  let duplicateCounter = 0;

  flattenSource.concat(check).forEach(task => {
    const key = driverTaskIdBuilder(task);

    if (key in duplicateTemp) {
      duplicateCounter += 1;
    } else {
      duplicateTemp[key] = key;
    }
  });

  return duplicateCounter;
};

export const destructurizeDriverTasks = task => {
  const destructurized = [];

  task.pick_ups.forEach(node => destructurized.push(node));
  task.drop_offs.forEach(node => destructurized.push(node));

  return destructurized;
};

export const arrayRearanger = (arr, src, dest) => {
  const [srcContent] = arr.splice(src, 1);
  const newArr = arr;
  newArr.splice(dest, 0, srcContent);

  return newArr;
};

export const arrayMover = (srcArr, srcIdx, destArr, destIdx) => {
  const [srcContent] = srcArr.splice(srcIdx, 1);
  destArr.splice(destIdx, 0, srcContent);

  return {
    source: srcArr,
    dest: destArr,
  };
};

export const newLineToBreak = multiLine => multiLine.replace(/[\u21b5\n\r]/g, '<br />');
