var when = require('when');

when(function()
{
  return false;
}).then(function()
{
  console.warn(2);
});