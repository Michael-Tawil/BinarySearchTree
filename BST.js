class Node{
    constructor(data,left = null,right = null){
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = this.buildTree(arr);
  }
  buildTree(arr){
    if (arr.length == 0) return null

    let sorarr = [...new Set(arr)].sort((a,b) => a-b)
    let mid = Math.floor(sorarr.length/2)
    let start = sorarr.slice(0,mid)
    let end = sorarr.slice(mid + 1)

    
    let node = new Node(sorarr[mid])
    node.left = this.buildTree(start)
    node.right = this.buildTree(end)
  
    return node;
  }
  Insert(value, root = this.root){

    if (root === null) return new Node(value)

    if (root.data < value){
      root.right = this.Insert(value,root.right)
    }else{
      root.left = this.Insert(value,root.left)
  }
  return root;
 }

 minValue(root){
  let minv = root.data;
    while (root.left != null) {
      minv = root.left.data;
      root = root.left;
    }
    return minv;
 }
 
 Delete(value,root = this.root){
    if(root === null) return root

    if (root.data < value){
      root.right = this.Delete(value,root.right)
    }else if (root.data > value){
      root.left = this.Delete(value,root.left)
    }else{
      if(root.left === null) return root.right
      else if(root.right === null) return root.left

      root.data = this.minValue(root.right)
      root.right = this.Delete(value,root.right)
    }
    return root
  }

  Find(value,root = this.root){

    if(root === null) return null

    if (root.data < value){
      return this.Find(value,root.right)
    }else if (root.data > value){
      return this.Find(value,root.left)
  }else
  return root;
  
  }
  
  Levelorder(callback){
    if (!this.root) return []

    let q = [this.root]
    let result = []

    while(q.length){
      
      let node = q.shift()

      result.push(node.data)

      if(node.left){

        q.push(node.left)

      }
      if(node.right){

        q.push(node.right)

      }
      if (typeof callback === 'function') {
        result.forEach(callback)
      }
     
    }
    return result
  }
  Inorder(node = this.root, callback, result = []) {
    if (!this.root) return [];
    if (node === null) return;
    this.Inorder(node.left, callback, result);
    callback ? callback(node) : result.push(node.data);
    this.Inorder(node.right, callback, result);
    if (result) return result;
  }

  Preorder(callback){
    if(this.root == null) return[]
    let stack = [this.root]
    let results = []
    while(stack.length){
      let node = stack.pop()
      if (node.right) stack.push(node.right)
      if (node.left) stack.push(node.left)
      if (callback) callback(node)
      results.push(node.data)

    }
    return results
  }
  Postorder(callback){
    if(this.root == null) return[]
    let stack = [this.root]
    let results = []
    while(stack.length){
      let node = stack.pop()
      if (node.left) stack.push(node.left)
      if (node.right) stack.push(node.right)
      if (callback) callback(node)
      results.push(node.data)

    }
    return results
  }

  Height(node = this.root){
    if (node === null) return -1;
    const leftHeight = this.Height(node.left);
    const rightHeight = this.Height(node.right);
    return Math.max(leftHeight, rightHeight) +1;
  }

  
    Depth(node, root = this.root, level = 0) {
      if (!node) return null;
      if (!root) return null; // Return null for non-existent node
      if (root.key === node.key) return level;
      let count = this.Depth(node, root.left, level + 1);
      if (count !== null) return count; // Node found in the left subtree
      return this.Depth(node, root.right, level + 1); // Node found in the right subtree, or null if not found
  
  }
  isBalanced(node = this.root) {
    if (node === null) return true;
    const heightDiff = Math.abs(
      this.Height(node.left) - this.Height(node.right)
    );
    return (
      heightDiff <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    if (this.root === null) return;
    const sorted = [...new Set(this.Inorder().sort((a, b) => a - b))];
    this.root = this.buildTree(sorted);
  }

}


let prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

let tree1 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
tree1.Insert(900)
tree1.Delete(3)
prettyPrint(tree1.root)
console.log(tree1.Find(67))
console.log(tree1.Levelorder())
console.log(tree1.Inorder())
console.log(tree1.Preorder())
console.log(tree1.Postorder())
console.log(tree1.Height(tree1.Find(8)))
console.log(tree1.Depth(tree1.Find(9)))
console.log(tree1.isBalanced()); // false
tree1.rebalance();
console.log(tree1.isBalanced()); //true;
module.exports = Tree;