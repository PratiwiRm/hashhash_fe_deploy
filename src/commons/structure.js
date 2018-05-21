import { isEmpty } from 'lodash';

export const PICKER_TASK_HEADER_FIELDS = [
  'jenis_sub_task',
  'total_jumlah',
  'nama_barang',
  'id_supplier',
  'foto_contoh_barang',
];

export const PICKER_TASK_TEMPLATE = [
  {
    jenis_sub_task: '0 Untuk Pembatalan, 1 Untuk Pembelian',
    total_jumlah: 'Angka',
    nama_barang: 'Kombo Nama',
    id_supplier: 'ID Supplier sesuai dengan data di halaman supplier',
    foto_contoh_barang: 'URL Foto Barang',
  },
];

export const DRIVER_TASK_HEADER_FIELDS = [
  'task',
  'type',
  'outlite',
  'lokasi',
  'note',
  'nama_pic',
  'kontak_pic',
];

export const DRIVER_TASK_TEMPLATE = [
  {
    task: 'Nomor identifikasi pengiriman (id rantai pengiriman), URUTAN DIPERHATIKAN!',
    type: 'PICKUP/DROPOFF',
    outlite: 'Nama outlet tujuan',
    lokasi: 'Alamat outlet tujuan',
    note: 'Catatan pengiriman (paket untuk diambil/diturunkan)',
    nama_pic: 'Nama person in charge di outlet/cabang tujuan',
    kontak_pic: 'nomor telpon yang valid dan bisa dihubungi',
  },
];

export const driverTaskIdBuilder = task =>
  `logistic-${task.id}-${task.pick_up.map(e => e.id).join('.')}-${task.drop_off
    .map(e => e.id)
    .join('.')}`;

export const driverTaskUniqueMapper = task =>
  `logistic-${task.pick_up
    .map(e => `${e.outlite},${e.lokasi},${e.nama_pic}`)
    .join('.')}-${task.drop_off.map(e => `${e.outlite},${e.lokasi},${e.nama_pic}`).join('.')}`;

export const newLineFormatter = multiLine => multiLine.replace(/[\u21b5\n\r]/g, '\n');

export const taskStructureTransformator = (tasks, employees) => {
  const newTasks = {
    unassigned: [],
  };

  employees.forEach(employee => {
    newTasks[employee.username] = {
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

export const taskStructurize = (tasks, employees, signed) => {
  const newTasks = {
    unassigned: [],
  };

  employees.forEach(employee => {
    newTasks[employee.username] = {
      local: [],
      signed: [],
    };
  });

  tasks.forEach(task => {
    const isSigned = signed.find(sign => task.id === sign.id_task);

    if (isEmpty(isSigned)) {
      const newUnassigned = newTasks.unassigned;
      newUnassigned.push(task);
      newTasks.unassigned = newUnassigned;
    } else {
      const newEmpTasks = newTasks[isSigned.username_pegawai_lapangan].signed;
      newEmpTasks.push(task);
      newTasks[isSigned.username_pegawai_lapangan] = {
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

export const removeUnsignedTasks = source => {
  let signed = [];

  const newSource = { ...source };
  delete newSource.unassigned;

  Object.keys(newSource).forEach(key => {
    if (!isEmpty(newSource[key].signed)) {
      signed = signed.concat(newSource[key].signed);
    }
  });

  return signed;
};

export const countDuplicatedPickerTasks = (source, check) => {
  const flattenSource = flattenTasks(source);

  const duplicateTemp = {};
  let duplicateCounter = 0;

  flattenSource.concat(check).forEach(task => {
    const key = `${task.id_supplier}-${task.nama_barang}-${task.total_jumlah}-${
      task.jenis_sub_task
    }`;
    console.log(key);

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
    const { outlite, lokasi, nama_pic, kontak_pic } = task;
    const note = newLineFormatter(task.note);

    if (task.task === identifierCounter) {
      const currentFormattedTask = formatted[formatted.length - 1];

      if (task.type.toLowerCase() === 'pickup') {
        currentFormattedTask.pick_up.push({
          outlite,
          lokasi,
          note,
          nama_pic,
          kontak_pic,
        });
      } else {
        currentFormattedTask.drop_off.push({
          outlite,
          lokasi,
          note,
          nama_pic,
          kontak_pic,
        });
      }

      formatted[formatted.length - 1] = currentFormattedTask;
    } else {
      identifierCounter = task.task;

      const newFormatted = {
        pick_up: [],
        drop_off: [],
      };

      if (task.type.toLowerCase() === 'pickup') {
        newFormatted.pick_up.push({
          outlite,
          lokasi,
          note,
          nama_pic,
          kontak_pic,
        });
      } else {
        newFormatted.drop_off.push({
          outlite,
          lokasi,
          note,
          nama_pic,
          kontak_pic,
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
    console.log(task);
    const key = driverTaskUniqueMapper(task);

    if (key in duplicateTemp) {
      duplicateCounter += 1;
    } else {
      duplicateTemp[key] = key;
    }
  });

  return duplicateCounter;
};

export const destructurizeDriverTask = task => {
  const destructurized = [];

  task.pick_up.forEach(node => destructurized.push({ ...node, type: 'PICKUP' }));
  task.drop_off.forEach(node => destructurized.push({ ...node, type: 'DROPOFF' }));

  return destructurized;
};

export const destructurizeDriverTasks = tasks => {
  const destructurized = [];

  tasks.forEach(task => destructurized.concat(destructurizeDriverTask(task)));

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
