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
