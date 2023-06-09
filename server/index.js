const express = require('express');
const verifyProof = require('../utils/verifyProof');
// const MerkleTree = require('../utils/MerkleTree');
// const niceList = require('../utils/niceList.json');


const port = 1225;

const app = express();
app.use(express.json());

// hardcoded merkle root, representing the whole nice list
const MERKLE_ROOT =  'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';
//const MERKLE_ROOT =  new MerkleTree(niceList).getRoot();

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  //prove that a name is in the list 
  const isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
