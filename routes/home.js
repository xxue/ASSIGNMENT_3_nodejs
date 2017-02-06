const Express = require('express');
const router = Express.Router();

//read ejs page
router.get('/', (req, res)=> {
  let cookies = req.cookies;
  let namelist = '';
  let count = 1;
  if (cookies.namelist) {
    namelist = cookies.namelist;
  }
  if (cookies.count) {
    count = cookies.count;
  }
  res.render('team',{namelist, 'final': {}, count});
})

//post the form
router.post('/', (req, res) => {
  const params = req.body;
  res.cookie('namelist', params.namelist);
  res.cookie('count', params.count);

  let namelist = params.namelist.split(',');

  let count = T(params.sortingmethod, namelist.length, params.count);
  let final = sort(namelist, count);

  params.final = final;

  console.log(final);
  // if (count > namelist.length) { //STRETCH #1
  //   params.final = 'Error';
  // }
  res.render('team', params);
});
//===========FUNCTIONS===========================
//to make number of teams, either by number of team (when sortingmethod is "T") or by number of ppl (sortingmethod is "P") STRETCH #3
  function T(method, namelistLen, count) {
    if (method == "T") {
      return count;
    } else {
      return Math.ceil(namelistLen / count);
    }
  }

//shuffle the names in the array
function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

//put in names sequentially into each team, after shuffling once
function sort (namelist, count) {
  namelist = shuffle(namelist);
  let teams = {};
  for (let i = 1; i <= count; i++) {
      teams[i] = [];
    };
  for (let k = namelist.length; k > 0 ; k--) {
      let thinger = k % count;
      teams[thinger+1].push(namelist[0]);
      namelist.shift();
      };
  return teams;
};

module.exports = router;
