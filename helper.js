// HelperJS will be poulated with the helper functions that are used in main.js.
// Discord Bot: Endless Online
// Author: AstralSkies
// Version: 1.0

// // RobotJS to simulate keyboard input.
// npm install robotjs --save
// https://robotjs.io/
const robot = require('robotjs');

// ffi-napi to send mouse input.
// npm install ffi-napi --save
// https://www.npmjs.com/package/ffi-napi
const ffi = require('ffi-napi');

// Find process module.
// https://www.npmjs.com/package/find-process
// npm install find-process --save
const find = require('find-process');

// Obtains the needed user32.dll functions.
const user32 = new ffi.Library('user32', {
    'FindWindowA': ['int32', ['string', 'string']],
    'SetForegroundWindow': ['bool', ['int32']],
    'SendMessageA': ['int32', ['int32', 'uint32', 'int32', 'string']]
    });


const fs = require('fs');

const client = require('./main.js');

// The path to the chatlog file.
const chatlog = 'YOUR CHATLOG FILE DIRECTORY';

// Read the chatlog file, return the last line and send it to Discord.
function readChatlog(client) {
    // Read the chatlog file.
    const data = fs.readFileSync(chatlog, 'utf8');
    // If there was an error reading the file.
    if (data == null) {
        console.log('Error reading chatlog.txt');
        return;
    }
    // Split the file into an array.
    const lines = data.split('\n');
    // Get the last line.
    const lastLine = lines[lines.length - 2];
    // Return the last line to main.js.
    return lastLine;
}

// Function which simulates keyboard input.
function postMessage(message) {
    // Obtain Endless online window handle.
    let hwnd = user32.FindWindowA(null, 'Endless Online');
    // if hwnd is null, the window was not found.
    if (hwnd == 0) {
        console.log('Window not found');
        return;
    }
    // else the window was found.
    else {
        // Set the window to the foreground.
        user32.SetForegroundWindow(hwnd);
        // Send the message via postMessage().
        // Switch statements are used to simulate keyboard input.
        // Set a delay to ensure the window is in focus.
        setTimeout(() => {
            switch (message) {
                // if up arrow key.
                case 'up':
                    robot.keyTap('up');
                    break;
                // if down arrow key.
                case 'down':
                    robot.keyTap('down');
                    break;
                // if left arrow key.
                case 'left':
                    robot.keyTap('left');
                    break;
                // if right arrow key.
                case 'right':
                    robot.keyTap('right');
                    break;
                default:
                    // Send the message via RobotJS.
                    robot.typeString(message);
                    // Simulate the enter key.
                    robot.keyTap('enter');
                    break;
            }
        }, 100);
}
}


// Export the functions so they can be used in main.js.
exports.readChatlog = readChatlog;
exports.postMessage = postMessage;
