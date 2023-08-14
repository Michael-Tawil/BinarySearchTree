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
  sortedmerge(arr){
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return this.merge(this.sortedmerge(left), this.sortedmerge(right));
}

    merge(left, right) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }
  

  buildTree(arr) {
    let sortedarr = this.sortedmerge(arr)
    if (sortedarr == 0) return null;

    let mid = Math.floor(sortedarr.length / 2);
    let start = sortedarr.slice(0, mid);
    let end = sortedarr.slice(mid + 1);
    let node = new Node(sortedarr[mid],this.buildTree(start),this.buildTree(end));

    return node;
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

let tree1 = new Tree([2,7,3,1,4,6,5])

prettyPrint(tree1.root)