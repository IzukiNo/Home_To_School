function dijkstraDetailed(gData, startId, isDirected = true) {
  const n = gData.nodes.length;

  const distances = new Array(n).fill(Infinity);
  const previous = new Array(n).fill(null);
  const visited = new Array(n).fill(false);

  const startIndex = gData.nodes.findIndex((n) => n.id === startId);
  if (startIndex === -1)
    throw new Error("Start nodeId không tồn tại trong gData");

  const steps = [];

  function pushStep(step) {
    steps.push({
      ...step,
      distances: [...distances],
      previous: [...previous],
      visited: [...visited],
    });
  }

  // Helper function to get neighbors
  function getNeighbors(nodeIndex) {
    const neighbors = [];
    gData.links.forEach((link) => {
      const sourceIdx =
        typeof link.source === "object"
          ? link.source.index
          : gData.nodes.findIndex((n) => n.id === link.source);
      const targetIdx =
        typeof link.target === "object"
          ? link.target.index
          : gData.nodes.findIndex((n) => n.id === link.target);
      const weight = link.weight ?? 1;

      if (sourceIdx === nodeIndex) {
        neighbors.push({ to: targetIdx, weight });
      } else if (!isDirected && targetIdx === nodeIndex) {
        // In undirected mode, also consider reverse edges
        neighbors.push({ to: sourceIdx, weight });
      }
    });
    return neighbors;
  }

  // =========================
  // INIT
  // =========================
  distances[startIndex] = 0;

  pushStep({
    type: "init",
    chosen: startIndex,
    description: `Initialize: selected node ${gData.nodes[startIndex].name} (index ${startIndex})`,
  });

  // Relax directly from start
  const startNeighbors = getNeighbors(startIndex);
  startNeighbors.forEach(({ to, weight }) => {
    distances[to] = weight;
    previous[to] = startIndex;

    pushStep({
      type: "update",
      from: startIndex,
      to,
      newDistance: weight,
      chosen: startIndex,
      description: `Update start → ${gData.nodes[to].name} = ${weight}`,
    });
  });

  visited[startIndex] = true;

  // =========================
  // MAIN LOOP
  // =========================
  for (let iter = 1; iter < n; iter++) {
    // Chọn node chưa thăm có distance nhỏ nhất
    let minNode = -1;
    let minDist = Infinity;

    for (let i = 0; i < n; i++) {
      if (!visited[i] && distances[i] < minDist) {
        minDist = distances[i];
        minNode = i;
      }
    }

    if (minNode === -1) break;

    pushStep({
      type: "select",
      chosen: minNode,
      description: `Chọn node ${gData.nodes[minNode].name} (index ${minNode}) với distance ${minDist}`,
    });
    visited[minNode] = true;

    // Relax all edges from minNode
    const neighbors = getNeighbors(minNode);
    neighbors.forEach(({ to, weight }) => {
      if (!visited[to]) {
        const newDist = distances[minNode] + weight;

        pushStep({
          type: "check",
          from: minNode,
          to,
          newDistance: newDist,
          chosen: minNode,
          description: `Check edge ${gData.nodes[minNode].name} → ${gData.nodes[to].name}: ${distances[minNode]} + ${weight} = ${newDist}`,
        });

        if (newDist < distances[to]) {
          distances[to] = newDist;
          previous[to] = minNode;

          pushStep({
            type: "update",
            from: minNode,
            to,
            newDistance: newDist,
            chosen: minNode,
            description: `→ UPDATE: distance ${gData.nodes[to].name} = ${newDist}, previous = ${gData.nodes[minNode].name}`,
          });
        }
      }
    });
  }
  const result = {};

  for (let i = 0; i < n; i++) {
    const node = gData.nodes[i];
    const dist = distances[i];

    // reconstruct path
    let pathIndexes = [];
    if (dist !== Infinity) {
      let cur = i;
      while (cur !== null) {
        pathIndexes.push(cur);
        cur = previous[cur];
      }
      pathIndexes.reverse();
    }

    const pathIds = pathIndexes.map((idx) => gData.nodes[idx].id);
    const pathNames = pathIndexes.map((idx) => gData.nodes[idx].name);

    result[node.id] = {
      id: node.id,
      name: node.name,

      distance: dist,
      totalWeight: dist,

      reachable: dist !== Infinity,

      pathIds,
      pathNames,
      pathString: pathNames.join(" → "),
    };
  }

  // Add final "end" step to clear all visual effects
  pushStep({
    type: "end",
    description: "Algorithm complete - all shortest paths found",
    chosen: null,
  });

  return {
    steps,
    result,
  };
}

// Bellman-Ford Algorithm with detailed steps
function bellmanFordDetailed(gData, startId, isDirected = true) {
  const n = gData.nodes.length;

  const distances = new Array(n).fill(Infinity);
  const previous = new Array(n).fill(null);

  const startIndex = gData.nodes.findIndex((n) => n.id === startId);
  if (startIndex === -1) throw new Error("Start nodeId not found in gData");

  const steps = [];

  function pushStep(step) {
    steps.push({
      ...step,
      distances: [...distances],
      previous: [...previous],
    });
  }

  // Helper function to get all edges
  function getAllEdges() {
    const edges = [];
    gData.links.forEach((link) => {
      const sourceIdx =
        typeof link.source === "object"
          ? link.source.index
          : gData.nodes.findIndex((n) => n.id === link.source);
      const targetIdx =
        typeof link.target === "object"
          ? link.target.index
          : gData.nodes.findIndex((n) => n.id === link.target);
      const weight = link.weight ?? 1;

      edges.push({ from: sourceIdx, to: targetIdx, weight });

      // In undirected mode, add reverse edge
      if (!isDirected) {
        edges.push({ from: targetIdx, to: sourceIdx, weight });
      }
    });
    return edges;
  }

  // =========================
  // INIT
  // =========================
  distances[startIndex] = 0;

  pushStep({
    type: "init",
    chosen: startIndex,
    description: `Initialize: selected node ${gData.nodes[startIndex].name} (index ${startIndex})`,
  });

  const edges = getAllEdges();

  // =========================
  // MAIN LOOP - Relax all edges (n-1) times
  // =========================
  for (let i = 0; i < n - 1; i++) {
    pushStep({
      type: "iteration",
      iteration: i + 1,
      description: `Iteration ${i + 1} of ${n - 1}: Relaxing all edges`,
    });

    let updated = false;

    edges.forEach(({ from, to, weight }) => {
      if (distances[from] !== Infinity) {
        const newDist = distances[from] + weight;

        pushStep({
          type: "check",
          from,
          to,
          newDistance: newDist,
          description: `Check edge ${gData.nodes[from].name} → ${gData.nodes[to].name}: ${distances[from]} + ${weight} = ${newDist}`,
        });

        if (newDist < distances[to]) {
          distances[to] = newDist;
          previous[to] = from;
          updated = true;

          pushStep({
            type: "update",
            from,
            to,
            newDistance: newDist,
            description: `→ UPDATE: distance ${gData.nodes[to].name} = ${newDist}, previous = ${gData.nodes[from].name}`,
          });
        }
      }
    });

    // Early termination if no updates
    if (!updated) {
      pushStep({
        type: "early_stop",
        iteration: i + 1,
        description: `No updates in iteration ${i + 1}, early termination`,
      });
      break;
    }
  }

  // =========================
  // NEGATIVE CYCLE CHECK
  // =========================
  let hasNegativeCycle = false;

  edges.forEach(({ from, to, weight }) => {
    if (distances[from] !== Infinity) {
      const newDist = distances[from] + weight;
      if (newDist < distances[to]) {
        hasNegativeCycle = true;
        pushStep({
          type: "negative_cycle",
          from,
          to,
          description: `⚠ Negative cycle detected! Edge ${gData.nodes[from].name} → ${gData.nodes[to].name} can still be relaxed`,
        });
      }
    }
  });
  // Build result
  const result = {};

  for (let i = 0; i < n; i++) {
    const node = gData.nodes[i];
    const dist = distances[i];

    // Reconstruct path
    let pathIndexes = [];
    if (dist !== Infinity && !hasNegativeCycle) {
      let cur = i;
      const visited = new Set();
      while (cur !== null && !visited.has(cur)) {
        visited.add(cur);
        pathIndexes.push(cur);
        cur = previous[cur];
      }
      pathIndexes.reverse();
    }

    const pathIds = pathIndexes.map((idx) => gData.nodes[idx].id);
    const pathNames = pathIndexes.map((idx) => gData.nodes[idx].name);

    result[node.id] = {
      id: node.id,
      name: node.name,
      distance: dist,
      totalWeight: dist,
      reachable: dist !== Infinity && !hasNegativeCycle,
      pathIds,
      pathNames,
      pathString: pathNames.join(" → "),
      hasNegativeCycle: hasNegativeCycle,
    };
  }

  // Add final "end" step to clear all visual effects
  pushStep({
    type: "end",
    description: hasNegativeCycle
      ? "Algorithm complete - negative cycle detected"
      : "Algorithm complete - all shortest paths found",
    chosen: null,
  });

  return {
    steps,
    result,
    hasNegativeCycle,
  };
}
