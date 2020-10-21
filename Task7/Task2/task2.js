"use strict";

const execSync = require('child_process').execSync;

function useCmd(s) {
	const options = {encoding: 'utf8'};
	const cmd = s.toString();
	const answer = execSync(cmd, options);
	return answer.toString();
}

let arr = []
for (let i = 2; i < process.argv.length; i++) {
    arr.push(Number(process.argv[i]));
}

for (let i = 0; i < arr.length; i++) {
    const sumCommand = `node task1.js ${arr[i]}`;
    let res = useCmd(sumCommand);
    res = parseInt(res);
    console.log(res);
}