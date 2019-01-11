/*
This file contains any server side modules needed.
*/

module.exports = {
// Returns hello to the Autheicted Routes File when it is called
  test: async () => {
    const hello = 'This is dynamically rendered from the Server! Find me in src/server-controllers/';
    console.log(hello);
    return hello;
  },
};
