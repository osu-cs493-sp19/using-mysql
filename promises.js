function waitAndEcho(message, callback) {
  setTimeout(() => {
    if (message === 'generate error') {
      callback({
        error: `we didn't like this message: "${message}"`
      }, null);
    } else {
      callback(null, message);
    }
  }, 1000);
}

// waitAndEcho("3", (err, data) => {
//   if (err) {
//     console.error("Error:", err);
//   } else {
//     console.log(data);
//     waitAndEcho("2", (err, data) => {
//       if (err) {
//         console.error("Error:", err);
//       } else {
//         console.log(data);
//         waitAndEcho("generate error", (err, data) => {
//           if (err) {
//             console.error("Error:", err);
//           } else {
//             console.log(data);
//             waitAndEcho("... blastoff", (err, data) => {
//               if (err) {
//                 console.error("Error:", err);
//               } else {
//                 console.log(data);
//               }
//             });
//           }
//         });
//       }
//     });
//   }
// });

function waitAndEchoWithPromise(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (message === 'generate error') {
        reject({
          error: `we didn't like this message: "${message}"`
        });
      } else {
        resolve(message);
      }
    }, 1000);
  });
}

// waitAndEchoWithPromise("3")
//   .then((data) => {
//     console.log(data);
//     return waitAndEchoWithPromise("2");
//   })
//   .then((data) => {
//     console.log(data);
//     return waitAndEchoWithPromise("1");
//   })
//   .then((data) => {
//     console.log(data);
//     return waitAndEchoWithPromise("... blastoff");
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//   });

async function doWaitAndEchoes() {
  try {
    let data = await waitAndEchoWithPromise("3");
    console.log(data);
    data = await waitAndEchoWithPromise("2");
    console.log(data);
    data = await waitAndEchoWithPromise("generate error");
    console.log(data);
    data = await waitAndEchoWithPromise("...blastoff");
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
}

doWaitAndEchoes();
