const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('./access.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  var firstip = []
  var secondip = []

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if(line) {
        if(/89.123.1.41/.test(line)) {
            firstip.push(line)
            //console.log(`Line1 from file: ${line}`);
        } else if(/34.48.240.111/.test(line)) {
            //console.log(`Line2 from file: ${line}`);
            secondip.push(line)
        }
    }
  }

  if(firstip.length>0) {
    const firstwriteStream = fs.createWriteStream('./89.123.1.41_requests.log',  { flags: 'a', encoding: 'utf8' });
    firstip.forEach((element) => {
        firstwriteStream.write('\n');
        firstwriteStream.write(element);
    })
  }

  if(secondip.length>0) {
    const secondtwriteStream = fs.createWriteStream('./34.48.240.111_requests.log',  { flags: 'a', encoding: 'utf8' });
    secondip.forEach((element) => {
        secondtwriteStream.write('\n');
        secondtwriteStream.write(element);
    })
  }
}

processLineByLine();