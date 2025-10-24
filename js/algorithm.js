
/**
 * Dijkstra Algorithm - Tìm đường đi ngắn nhất từ node nguồn đến tất cả các node khác
 * @param {Object} graph - Graph data với nodes và links
 * @param {string} startNodeId - ID của node bắt đầu
 * @param {string} endNodeId - ID của node kết thúc (optional)
 * @returns {Object} - { distances, previous, path }
 */
function dijkstra(graph, startNodeId, endNodeId = null) {
    const distances = {};
    const previous = {};
    const unvisited = new Set();
    
    // Khởi tạo distances và previous
    graph.nodes.forEach(node => {
        distances[node.id] = Infinity;
        previous[node.id] = null;
        unvisited.add(node.id);
    });
    
    distances[startNodeId] = 0;
    
    // Tạo adjacency list từ links
    const adjacencyList = {};
    graph.nodes.forEach(node => {
        adjacencyList[node.id] = [];
    });
    
    graph.links.forEach(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const weight = link.weight || 1;
        
        // Vì graph là directed, chỉ thêm một chiều
        adjacencyList[sourceId].push({ node: targetId, weight });
    });
    
    // Dijkstra algorithm
    while (unvisited.size > 0) {
        // Tìm node chưa visit có distance nhỏ nhất
        let currentNode = null;
        let minDistance = Infinity;
        
        unvisited.forEach(nodeId => {
            if (distances[nodeId] < minDistance) {
                minDistance = distances[nodeId];
                currentNode = nodeId;
            }
        });
        
        // Nếu không tìm thấy node hoặc distance = Infinity, dừng
        if (currentNode === null || minDistance === Infinity) {
            break;
        }
        
        // Nếu đã đến đích, có thể dừng sớm
        if (endNodeId && currentNode === endNodeId) {
            break;
        }
        
        unvisited.delete(currentNode);
        
        // Update distances của các neighbor
        adjacencyList[currentNode].forEach(neighbor => {
            const alt = distances[currentNode] + neighbor.weight;
            if (alt < distances[neighbor.node]) {
                distances[neighbor.node] = alt;
                previous[neighbor.node] = currentNode;
            }
        });
    }
    
    // Tạo path nếu có endNodeId
    let path = [];
    if (endNodeId) {
        let current = endNodeId;
        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }
        
        // Nếu path không bắt đầu từ start, không có đường đi
        if (path[0] !== startNodeId) {
            path = [];
        }
    }
    
    return {
        distances,
        previous,
        path,
        totalDistance: endNodeId ? distances[endNodeId] : null
    };
}

/**
 * DFS (Depth-First Search) - Tìm kiếm theo chiều sâu
 * @param {Object} graph - Graph data với nodes và links
 * @param {string} startNodeId - ID của node bắt đầu
 * @param {string} endNodeId - ID của node kết thúc
 * @returns {Object} - { path, visited }
 */
function dfs(graph, startNodeId, endNodeId) {
    const visited = new Set();
    const path = [];
    
    // Tạo adjacency list
    const adjacencyList = {};
    graph.nodes.forEach(node => {
        adjacencyList[node.id] = [];
    });
    
    graph.links.forEach(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        adjacencyList[sourceId].push(targetId);
    });
    
    // DFS recursive function
    function dfsRecursive(nodeId, currentPath) {
        visited.add(nodeId);
        currentPath.push(nodeId);
        
        // Nếu đã đến đích
        if (nodeId === endNodeId) {
            path.push(...currentPath);
            return true;
        }
        
        // Duyệt các neighbor
        const neighbors = adjacencyList[nodeId] || [];
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                if (dfsRecursive(neighbor, currentPath)) {
                    return true;
                }
            }
        }
        
        // Backtrack
        currentPath.pop();
        return false;
    }
    
    dfsRecursive(startNodeId, []);
    
    return {
        path,
        visited: Array.from(visited),
        found: path.length > 0 && path[path.length - 1] === endNodeId
    };
}

/**
 * BFS (Breadth-First Search) - Tìm kiếm theo chiều rộng
 * @param {Object} graph - Graph data với nodes và links
 * @param {string} startNodeId - ID của node bắt đầu
 * @param {string} endNodeId - ID của node kết thúc
 * @returns {Object} - { path, visited }
 */
function bfs(graph, startNodeId, endNodeId) {
    const visited = new Set();
    const queue = [startNodeId];
    const previous = {};
    
    visited.add(startNodeId);
    previous[startNodeId] = null;
    
    // Tạo adjacency list
    const adjacencyList = {};
    graph.nodes.forEach(node => {
        adjacencyList[node.id] = [];
    });
    
    graph.links.forEach(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        adjacencyList[sourceId].push(targetId);
    });
    
    // BFS algorithm
    while (queue.length > 0) {
        const currentNode = queue.shift();
        
        // Nếu đã đến đích
        if (currentNode === endNodeId) {
            break;
        }
        
        // Duyệt các neighbor
        const neighbors = adjacencyList[currentNode] || [];
        neighbors.forEach(neighbor => {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                previous[neighbor] = currentNode;
                queue.push(neighbor);
            }
        });
    }
    
    // Tạo path từ previous
    const path = [];
    let current = endNodeId;
    
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }
    
    // Nếu path không bắt đầu từ start, không có đường đi
    if (path[0] !== startNodeId) {
        return {
            path: [],
            visited: Array.from(visited),
            found: false
        };
    }
    
    return {
        path,
        visited: Array.from(visited),
        found: true
    };
}

/**
 * Tính tổng weight của một đường đi
 * @param {Object} graph - Graph data
 * @param {Array} path - Mảng các node IDs
 * @returns {number} - Tổng weight
 */
function calculatePathWeight(graph, path) {
    let totalWeight = 0;
    
    for (let i = 0; i < path.length - 1; i++) {
        const sourceId = path[i];
        const targetId = path[i + 1];
        
        // Tìm link giữa 2 nodes
        const link = graph.links.find(link => {
            const linkSource = typeof link.source === 'object' ? link.source.id : link.source;
            const linkTarget = typeof link.target === 'object' ? link.target.id : link.target;
            
            return linkSource === sourceId && linkTarget === targetId;
        });
        
        if (link) {
            totalWeight += link.weight || 1;
        }
    }
    
    return totalWeight;
}

/**
 * So sánh kết quả của 3 thuật toán
 * @param {Object} graph - Graph data
 * @param {string} startNodeId - Node bắt đầu
 * @param {string} endNodeId - Node kết thúc
 * @returns {Object} - Kết quả so sánh
 */
function compareAlgorithms(graph, startNodeId, endNodeId) {
    console.log('\n========== ALGORITHM COMPARISON ==========');
    console.log(`From: ${startNodeId} → To: ${endNodeId}\n`);
    
    // Dijkstra
    const dijkstraStart = performance.now();
    const dijkstraResult = dijkstra(graph, startNodeId, endNodeId);
    const dijkstraTime = performance.now() - dijkstraStart;
    
    console.log('📊 DIJKSTRA (Shortest Path by Weight):');
    console.log(`   Path: ${dijkstraResult.path.join(' → ')}`);
    console.log(`   Total Weight: ${dijkstraResult.totalDistance}`);
    console.log(`   Time: ${dijkstraTime.toFixed(3)}ms\n`);
    
    // DFS
    const dfsStart = performance.now();
    const dfsResult = dfs(graph, startNodeId, endNodeId);
    const dfsTime = performance.now() - dfsStart;
    const dfsWeight = calculatePathWeight(graph, dfsResult.path);
    
    console.log('🔍 DFS (Depth-First Search):');
    console.log(`   Path: ${dfsResult.path.join(' → ')}`);
    console.log(`   Total Weight: ${dfsWeight}`);
    console.log(`   Nodes Visited: ${dfsResult.visited.length}`);
    console.log(`   Time: ${dfsTime.toFixed(3)}ms\n`);
    
    // BFS
    const bfsStart = performance.now();
    const bfsResult = bfs(graph, startNodeId, endNodeId);
    const bfsTime = performance.now() - bfsStart;
    const bfsWeight = calculatePathWeight(graph, bfsResult.path);
    
    console.log('🌐 BFS (Breadth-First Search):');
    console.log(`   Path: ${bfsResult.path.join(' → ')}`);
    console.log(`   Total Weight: ${bfsWeight}`);
    console.log(`   Nodes Visited: ${bfsResult.visited.length}`);
    console.log(`   Time: ${bfsTime.toFixed(3)}ms\n`);
    
    console.log('==========================================\n');
    
    return {
        dijkstra: {
            path: dijkstraResult.path,
            weight: dijkstraResult.totalDistance,
            time: dijkstraTime
        },
        dfs: {
            path: dfsResult.path,
            weight: dfsWeight,
            visited: dfsResult.visited,
            time: dfsTime
        },
        bfs: {
            path: bfsResult.path,
            weight: bfsWeight,
            visited: bfsResult.visited,
            time: bfsTime
        }
    };
}
