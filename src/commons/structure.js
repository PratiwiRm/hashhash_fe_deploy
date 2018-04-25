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
    delivery_date: 'YYYY/MM/DD',
    status: 'pending/doing/done',
    customer: 'Customer name',
    address: 'Customer address',
    address_guide: 'Customer address additional guide',
    product: 'Product name with brand and variant',
    packaging: 'Product packaging (units, metrics)',
    quantity: 'Number',
    assigned: 'Phone Number of Employee',
    type: 'purchase/cancel',
    supplier: 'Supplier Name/ID',
  },
];

export const pickerTaskTransformator = (tasks, employees) => {
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
    if (!isEmpty(bindedTasks[key].unassigned)) {
      flatten = flatten.concat(bindedTasks[key].unassigned);
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
