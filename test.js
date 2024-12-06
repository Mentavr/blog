const obj1 = {
  e: {},
  a: {
    e: {},
    b: {
      c: {
        t: {},
        y: {},
        d: {
          y: {},
        },
      },
    },
  },
};

const arr1 = ['a', 'b', 'c', 'd']; // {'y': {}}

console.log(obj1[arr1[0]]);

// const obj2 = {
//     'e': {},
//     'b': {
//         'c': {
//             't':{},
//             'y':{},
//             'd': {
//                 'y': {}
//             }
//         }
//     }
// }

// const arr2 = ['b', 'c', 'd']; // {'y': {}}
