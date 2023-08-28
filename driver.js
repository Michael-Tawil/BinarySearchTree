Tree = require('./BST')

const randomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const tree = new Tree(randomArray(30));
console.log('Balanced:', tree.isBalanced());
console.log('Lever Order =>', tree.Levelorder());
console.log('Preorder =>', tree.Preorder());
console.log('Inorder =>', tree.Inorder());
console.log('Postorder =>', tree.Postorder());

for (let i = 0; i < 5; i++) {
  tree.Insert(Math.floor(Math.random() * 20));
}
console.log('Balanced:', tree.isBalanced());

tree.rebalance();
console.log('Balanced:', tree.isBalanced());
console.log('Lever Order =>', tree.Levelorder());
console.log('Preorder =>', tree.Preorder());
console.log('In-order =>', tree.Inorder());
console.log('Post-order =>', tree.Postorder());