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

  // get neighbors of a node
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

      // Forward edge
      if (sourceIdx === nodeIndex) {
        neighbors.push({ to: targetIdx, weight });
      }

      if (!isDirected && targetIdx === nodeIndex) {
        const reverseExists = gData.links.some((l) => {
          const s =
            typeof l.source === "object"
              ? l.source.index
              : gData.nodes.findIndex((n) => n.id === l.source);
          const t =
            typeof l.target === "object"
              ? l.target.index
              : gData.nodes.findIndex((n) => n.id === l.target);

          return s === nodeIndex && t === sourceIdx;
        });

        if (!reverseExists) {
          neighbors.push({ to: sourceIdx, weight });
        }
      }
    });

    return neighbors;
  }

  // Buoc init
  distances[startIndex] = 0;

  pushStep({
    type: "init",
    chosen: startIndex,
    description: `Initialize: selected node ${gData.nodes[startIndex].name} (index ${startIndex})`,
  });

  // tim cac neighbor cua start node
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

  // loop chinh cua Dijkstra
  for (let iter = 1; iter < n; iter++) {
    let minNode = -1;
    let minDist = Infinity;

    // Find unvisited node with smallest dist
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

    // Tim neighbors cua minNode -> cap nhat dist neu can
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

  // build result object
  const result = {};

  for (let i = 0; i < n; i++) {
    const node = gData.nodes[i];
    const dist = distances[i];

    let pathIndexes = [];
    if (dist !== Infinity) {
      let cur = i;
      while (cur !== null) {
        pathIndexes.push(cur);
        cur = previous[cur];
      }
      pathIndexes.reverse();
    }

    result[node.id] = {
      id: node.id,
      name: node.name,
      distance: dist,
      totalWeight: dist,
      reachable: dist !== Infinity,
      pathIds: pathIndexes.map((idx) => gData.nodes[idx].id),
      pathNames: pathIndexes.map((idx) => gData.nodes[idx].name),
      pathString: pathIndexes.map((idx) => gData.nodes[idx].name).join(" → "),
    };
  }

  pushStep({
    type: "end",
    description: "Algorithm complete - all shortest paths found",
    chosen: null,
  });

  return { steps, result };
}
