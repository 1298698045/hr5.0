export const formTreeData = (list, id, pid) => {
    var result = [];
    if (!Array.isArray(list)) {
        return result;
    }
    var map = {};
    list.forEach(function (item) {
        map[item[id]] = item;
    });
    list.forEach(function (item) {
        var parent = map[item[pid]];
        if (parent) {
            parent.children = parent.children || [];
            parent.children.push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}
export const getTree = (listData, id, list) => {
    for(let item of listData){
        if(item.id == id){
            list.push(item);
        }
    }
    for(let i of list){
        i.children = [];
        getTree(list, i.id, i.children);
        if(i.children.length == 0){
            delete i.children;
        }
    }
};


export const unique = (list, field) => {
    for(let i = 0; i < list.length; i++){
        for(let j = i + 1; j < list.length; j++) {
            if(list[i][field]==list[j][field]){
                list.splice(j, 1);
                j--;
            }
        }
    }
    return list;
}
export const compareIgnoreCase = (str1, str2) => {
    console.log("str1", str1, str2)
    return str1.toLowerCase() === str2.toLowerCase();
}

export const searchTree = (tree, keyword) => {
    let results = [];  
  
    function traverse(nodes) {  
        nodes.forEach(node => {  
        if (node.label.toLowerCase().includes(keyword.toLowerCase())) {  
            results.push(node);  
        }  
        if (node.children && node.children.length > 0) {  
            traverse(node.children);  
        }  
        }); 
    }
    traverse(tree);
    return results; 
}


export const  filterTreeWithParents = (tree, keyword) => {  
    // 辅助函数来过滤并返回新的树结构  
    function traverse(nodes) {  
        return nodes.reduce((acc, node) => {  
          // 检查当前节点是否匹配  
          if (node.label.toLowerCase().includes(keyword.toLowerCase())) {  
            // 如果匹配，则将其添加到结果中  
            acc.push(node);  
          }  
  
          // 如果存在子节点，则递归过滤它们  
          if (node.children && node.children.length > 0) {  
            const filteredChildren = traverse(node.children);  
            // 如果子节点中有匹配的，则保留当前节点（即使它本身不匹配）  
            if (filteredChildren.length > 0) {  
              node.children = filteredChildren; // 更新子节点  
              acc.push(node); // 将当前节点（现在包含过滤后的子节点）添加到结果中  
            }  
          }  
  
          return acc;  
        }, []);  
    }  
    return traverse(tree);  
}