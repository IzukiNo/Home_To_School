// Algorithm Visualization Engine
// Handles step-by-step playback of Dijkstra and Bellman-Ford algorithms

class AlgorithmVisualizer {
  constructor() {
    this.steps = [];
    this.currentStep = -1;
    this.isPlaying = false;
    this.playInterval = null;
    this.speed = 1.0;
    this.result = null;
    this.algorithmName = "";
    this.isRunning = false;

    // Visual state
    this.highlightedNodes = new Set();
    this.highlightedEdges = new Set();
    this.visitedNodes = new Set();
    this.currentChosenNode = null;
    this.pathHighlight = new Set();
    this.pathNodes = new Set(); // Store help panel state
    this.helpPanelWasOpen = false; // Step table state
    this.stepTableData = [];
    this.nodeOrder = [];
    this.stepTableWindow = null;
    this.isDragging = false;
    this.isResizing = false;
    this.dragOffset = { x: 0, y: 0 };
    this.currentIterationRow = null; // Current row being updated
    this.iterationCount = 0; // Number of iterations (select steps)
    this.currentRowData = {}; // Current state of distances and previous for current row
    this.lastStepType = null; // Track the last step type for conditional row creation
    this.pendingSelected = null; // Track node that was selected but not yet marked visited in new row

    this.initializeControls();
    this.initializeStepTable();
  }

  initializeControls() {
    // Algorithm selector and start button
    const startBtn = document.getElementById("startAlgorithmBtn");

    startBtn.addEventListener("click", () => {
      if (!this.isRunning) {
        this.startAlgorithm();
      } else {
        this.stopAlgorithm();
      }
    });

    // Step controller buttons
    document
      .getElementById("firstStepBtn")
      .addEventListener("click", () => this.goToFirstStep());
    document
      .getElementById("prevStepBtn")
      .addEventListener("click", () => this.previousStep());
    document
      .getElementById("playPauseBtn")
      .addEventListener("click", () => this.togglePlay());
    document
      .getElementById("nextStepBtn")
      .addEventListener("click", () => this.nextStep());
    document
      .getElementById("lastStepBtn")
      .addEventListener("click", () => this.goToLastStep());

    // Speed slider
    const speedSlider = document.getElementById("speedSlider");
    const speedValue = document.getElementById("speedValue");
    speedSlider.addEventListener("input", (e) => {
      this.speed = parseFloat(e.target.value);
      speedValue.textContent = `${this.speed.toFixed(2)}x`;

      // Restart play interval if playing
      if (this.isPlaying) {
        clearInterval(this.playInterval);
        this.startPlayInterval();
      }
    });

    // Path selector
    const pathSelector = document.getElementById("pathSelector");
    pathSelector.addEventListener("change", (e) => {
      const targetId = e.target.value;
      if (targetId) {
        this.highlightPath(targetId);
      } else {
        this.clearPathHighlight();
      }
    });

    // Close result button
    document.getElementById("closeResultBtn").addEventListener("click", () => {
      document.getElementById("resultPanel").classList.add("hidden");
    });
  }
  async startAlgorithm() {
    const algorithmSelector = document.getElementById("algorithmSelector");
    const algorithm = algorithmSelector.value;
    this.algorithmName = algorithm;

    // Get start node (always 'home')
    const startId = "home"; // Disable graph editing
    this.disableGraphEditing();

    // Show step controller
    document.getElementById("stepController").classList.remove("hidden");

    // Update button UI
    const startBtn = document.getElementById("startAlgorithmBtn");
    startBtn.classList.add("running");
    startBtn.querySelector(".btn-text").textContent = "Stop";
    startBtn.querySelector(".btn-icon").innerHTML =
      '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';

    this.isRunning = true;

    // Update UI for algorithm running state
    if (typeof isAlgoRunning !== "undefined") {
      isAlgoRunning = true;
      updateUIForAlgoState();
    }

    try {
      // Run the algorithm
      let algorithmResult;
      if (algorithm === "dijkstra") {
        algorithmResult = dijkstraDetailed(gData, startId, isDirectedGraph);
      }
      // else if (algorithm === "bellman-ford") {
      //   algorithmResult = bellmanFordDetailed(gData, startId, isDirectedGraph);
      // }

      this.steps = algorithmResult.steps;
      this.result = algorithmResult.result;
      this.currentStep = -1;

      // Update step counter
      document.getElementById(
        "stepCounter"
      ).textContent = `Step 0 / ${this.steps.length}`; // Populate path selector
      this.populatePathSelector(); // Show path visualizer
      document.getElementById("pathVisualizer").classList.remove("hidden");

      // Show result panel (not on mobile initially)
      this.displayResults();
      if (typeof isMobileMode !== "undefined" && isMobileMode) {
        document.getElementById("resultPanel").classList.add("hidden");
      }

      // Build and show step table (not on mobile initially)
      this.buildStepTableStructure();
      this.showStepTable();
      if (typeof isMobileMode !== "undefined" && isMobileMode) {
        document.getElementById("stepTableWindow").classList.add("hidden");
      }

      // Go to first step
      this.nextStep();
    } catch (error) {
      console.error("Algorithm error:", error);
      await popupManager.showConfirm(
        `Error running algorithm: ${error.message}`
      );
      this.stopAlgorithm();
    }
  }
  stopAlgorithm() {
    this.isRunning = false;
    this.isPlaying = false;

    if (this.playInterval) {
      clearInterval(this.playInterval);
      this.playInterval = null;
    } // Enable graph editing
    this.enableGraphEditing(); // Hide controllers and result panel
    document.getElementById("stepController").classList.add("hidden");
    document.getElementById("pathVisualizer").classList.add("hidden");
    document.getElementById("resultPanel").classList.add("hidden");

    // Hide and clear step table
    this.hideStepTable();
    this.clearStepTable();

    // Update button UI
    const startBtn = document.getElementById("startAlgorithmBtn");
    startBtn.classList.remove("running");
    startBtn.querySelector(".btn-text").textContent = "Start";
    startBtn.querySelector(".btn-icon").innerHTML = '<path d="M8 5v14l11-7z"/>';

    // Update UI for algorithm stopped state
    if (typeof isAlgoRunning !== "undefined") {
      isAlgoRunning = false;
      updateUIForAlgoState();
    }

    // Reset visual state
    this.resetAllVisuals();

    // Reset Graph visual functions to defaults
    Graph.nodeColor((node) => {
      // Default colors based on node type
      if (node.id === "home") return "#4CAF50";
      if (node.id === "school") return "#FF9800";
      return "#69b3a2";
    })
      .linkColor((link) =>
        link === hoverLink
          ? "rgba(108, 110, 255, 0.6)"
          : "rgba(100, 100, 100, 0.6)"
      )
      .linkWidth((link) => (link === hoverLink ? 8 : 5));

    // Refresh graph
    Graph.graphData(gData);
  }
  disableGraphEditing() {
    // Disable toolbar buttons with CSS class (prevents clicks)
    document.getElementById("addNodeBtn").classList.add("disabled");
    document.getElementById("importBtn").classList.add("disabled");
    document.getElementById("exportBtn").classList.add("disabled");
    document.getElementById("resetBtn").classList.add("disabled");

    // Disable graph direction toggle
    const toggleBtn = document.getElementById("graphDirectionToggle");
    toggleBtn.style.pointerEvents = "none";
    toggleBtn.style.opacity = "0.5";

    // Disable algorithm dropdown
    const algorithmSelector = document.getElementById("algorithmSelector");
    algorithmSelector.disabled = true;
    algorithmSelector.style.opacity = "0.6";
    algorithmSelector.style.cursor = "not-allowed";

    // Hide help panel if open and remember state
    const helpPanel = document.getElementById("helpPanel");
    if (helpPanel && helpPanel.classList.contains("active")) {
      helpPanel.classList.remove("active");
      this.helpPanelWasOpen = true;
    } else {
      this.helpPanelWasOpen = false;
    } // Disable help panel toggle
    const helpToggle = document.getElementById("helpPanelToggle");
    if (helpToggle) {
      helpToggle.style.pointerEvents = "none";
      helpToggle.style.opacity = "0.5";
    }

    // Disable graph interactions (prevent node/link editing)
    Graph.onNodeClick(null);
    Graph.onLinkClick(null);

    // Visual indicator - locked cursor
    const graphContainer = document.getElementById("graph");
    if (graphContainer) {
      graphContainer.style.cursor = "not-allowed";
      graphContainer.style.opacity = "0.95";
    }
  }
  enableGraphEditing() {
    // Enable toolbar buttons
    document.getElementById("addNodeBtn").classList.remove("disabled");
    document.getElementById("importBtn").classList.remove("disabled");
    document.getElementById("exportBtn").classList.remove("disabled");
    document.getElementById("resetBtn").classList.remove("disabled");

    // Enable graph direction toggle
    const toggleBtn = document.getElementById("graphDirectionToggle");
    toggleBtn.style.pointerEvents = "auto";
    toggleBtn.style.opacity = "1";

    // Enable algorithm dropdown
    const algorithmSelector = document.getElementById("algorithmSelector");
    algorithmSelector.disabled = false;
    algorithmSelector.style.opacity = "1";
    algorithmSelector.style.cursor = "pointer";

    // Restore help panel if it was open
    if (this.helpPanelWasOpen) {
      const helpPanel = document.getElementById("helpPanel");
      if (helpPanel) {
        helpPanel.classList.add("active");
      }
      this.helpPanelWasOpen = false;
    } // Enable help panel toggle
    const helpToggle = document.getElementById("helpPanelToggle");
    if (helpToggle) {
      helpToggle.style.pointerEvents = "auto";
      helpToggle.style.opacity = "1";
    }

    // Restore graph container styling
    const graphContainer = document.getElementById("graph");
    if (graphContainer) {
      graphContainer.style.cursor = "default";
      graphContainer.style.opacity = "1";
    }

    // Restore graph interaction handlers
    // These handlers are defined in script.js and need to be reattached
    if (window.restoreGraphHandlers) {
      window.restoreGraphHandlers();
    }
  }
  goToFirstStep() {
    if (this.steps.length > 0) {
      this.currentStep = -1;
      this.clearStepTable();
      this.buildStepTableStructure();
      this.nextStep();
    }
  }
  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      // Rebuild table from scratch for backward navigation
      this.rebuildStepTableToCurrentStep();
      this.applyStep(this.currentStep);
      this.updateStepUI();
    }
  }
  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.applyStep(this.currentStep);
      this.updateStepUI();
      return true;
    }
    return false;
  }
  goToLastStep() {
    if (this.steps.length > 0) {
      this.currentStep = this.steps.length - 1;
      // Rebuild entire table to last step
      this.rebuildStepTableToCurrentStep();
      this.applyStep(this.currentStep);
      this.updateStepUI();
    }
  }
  togglePlay() {
    if (this.isPlaying) {
      this.pausePlay();
    } else {
      this.startPlay();
    }
  }
  startPlay() {
    if (this.currentStep >= this.steps.length - 1) {
      this.goToFirstStep();
    }

    this.isPlaying = true;
    const playBtn = document.getElementById("playPauseBtn");
    playBtn.classList.add("playing");
    playBtn.querySelector(".play-icon").classList.add("hidden");
    playBtn.querySelector(".pause-icon").classList.remove("hidden");

    // Disable path selector during playback
    const pathSelector = document.getElementById("pathSelector");
    if (pathSelector) {
      pathSelector.disabled = true;
      pathSelector.style.opacity = "0.6";
      pathSelector.style.cursor = "not-allowed";
    }

    this.startPlayInterval();
  }
  startPlayInterval() {
    const delay = 1000 / this.speed;
    this.playInterval = setInterval(() => {
      const hasNext = this.nextStep();
      if (!hasNext) {
        this.pausePlay();
      }
    }, delay);
  }
  pausePlay() {
    this.isPlaying = false;
    const playBtn = document.getElementById("playPauseBtn");
    playBtn.classList.remove("playing");
    playBtn.querySelector(".play-icon").classList.remove("hidden");
    playBtn.querySelector(".pause-icon").classList.add("hidden");

    // Re-enable path selector when playback pauses
    const pathSelector = document.getElementById("pathSelector");
    if (pathSelector) {
      pathSelector.disabled = false;
      pathSelector.style.opacity = "1";
      pathSelector.style.cursor = "pointer";
    }

    if (this.playInterval) {
      clearInterval(this.playInterval);
      this.playInterval = null;
    }
  }
  applyStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= this.steps.length) return;

    const step = this.steps[stepIndex];
    console.log(`=== applyStep(${stepIndex}) ===`);
    console.log("Step type:", step.type);
    console.log("Step data:", step);

    // Reset visual state
    this.resetAllVisuals(); // Apply step-specific visuals
    switch (step.type) {
      case "init":
        console.log("applyStep: Processing INIT case");
        this.highlightNode(step.chosen, "#10b981"); // Green for init
        this.currentChosenNode = step.chosen;
        break;

      case "select":
        console.log("applyStep: Processing SELECT case");
        this.highlightNode(step.chosen, "#6366f1"); // Blue for selected
        this.currentChosenNode = step.chosen;
        // Mark as visited
        if (step.visited) {
          step.visited.forEach((visited, idx) => {
            if (visited && idx !== step.chosen) {
              this.visitedNodes.add(idx);
            }
          });
        }
        break;

      case "check":
        this.highlightNode(step.chosen, "#6366f1"); // Blue for current
        this.highlightEdge(step.from, step.to, "#fbbf24"); // Yellow for checking
        this.highlightNode(step.to, "#fbbf24"); // Yellow for target
        break;

      case "update":
        this.highlightNode(step.chosen, "#6366f1"); // Blue for current
        this.highlightEdge(step.from, step.to, "#10b981"); // Green for updated
        this.highlightNode(step.to, "#10b981"); // Green for updated node
        break;

      case "iteration":
        // Bellman-Ford iteration marker
        break;

      case "negative_cycle":
        this.highlightEdge(step.from, step.to, "#ef4444"); // Red for negative cycle
        break;

      case "end":
        // Final step - all visuals already cleared by resetAllVisuals()
        // Just show the completion message
        break;
    } // Update node labels with current distances
    if (step.distances) {
      this.updateNodeDistances(step.distances);
    }

    // Update step table based on step type
    console.log("applyStep: About to call updateStepTable");
    this.updateStepTable(step, stepIndex);
    console.log("applyStep: updateStepTable completed");

    // Refresh graph rendering
    this.refreshGraphVisuals();
  }
  highlightNode(nodeIndex, color) {
    if (nodeIndex >= 0 && nodeIndex < gData.nodes.length) {
      gData.nodes[nodeIndex]._highlightColor = color;
      gData.nodes[nodeIndex]._highlighted = true;
      this.highlightedNodes.add(nodeIndex);
    }
  }
  highlightEdge(fromIndex, toIndex, color) {
    const link = gData.links.find((l) => {
      const sourceIdx =
        typeof l.source === "object"
          ? l.source.index
          : gData.nodes.findIndex((n) => n.id === l.source);
      const targetIdx =
        typeof l.target === "object"
          ? l.target.index
          : gData.nodes.findIndex((n) => n.id === l.target);
      return sourceIdx === fromIndex && targetIdx === toIndex;
    });

    if (link) {
      link._highlightColor = color;
      link._highlighted = true;
      this.highlightedEdges.add(link);
    }
  }
  updateNodeDistances(distances) {
    distances.forEach((dist, idx) => {
      if (idx < gData.nodes.length) {
        gData.nodes[idx]._distance = dist === Infinity ? "∞" : dist;
      }
    });
  }
  resetAllVisuals() {
    // Clear node highlights and visual properties
    gData.nodes.forEach((node) => {
      delete node._highlighted;
      delete node._highlightColor;
      delete node._distance;
      delete node._visualRingColor; // Clear visualizer ring color
    });

    // Clear link highlights
    gData.links.forEach((link) => {
      delete link._highlighted;
      delete link._highlightColor;
    });

    // Clear path visualization
    this.pathHighlight.clear();
    this.pathNodes.clear();

    this.highlightedNodes.clear();
    this.highlightedEdges.clear();
    this.visitedNodes.clear();
    this.currentChosenNode = null;
  }
  clearAllVisualizationEffects() {
    // Clear all algorithm step visualization effects
    gData.nodes.forEach((node) => {
      delete node._highlighted;
      delete node._highlightColor;
      delete node._distance;
      delete node._visualRingColor; // Clear algorithm ring colors
    });

    gData.links.forEach((link) => {
      delete link._highlighted;
      delete link._highlightColor;
    });

    // Clear sets
    this.highlightedNodes.clear();
    this.highlightedEdges.clear();
    this.visitedNodes.clear();
    this.currentChosenNode = null;

    // Clear path highlights
    this.pathHighlight.clear();
    this.pathNodes.clear();
  }
  refreshGraphVisuals() {
    // Clear all visual ring colors first
    gData.nodes.forEach((node) => {
      delete node._visualRingColor;
    });

    // Set visual ring colors for highlighted nodes
    gData.nodes.forEach((node) => {
      if (node._highlighted) {
        node._visualRingColor = node._highlightColor;
      } else if (this.pathNodes.has(node.index)) {
        node._visualRingColor = "#8b5cf6"; // Purple for path
      }
    });

    // Force a visual update without changing data structure
    Graph.nodeColor((node) => {
      // Dim non-path nodes during path visualization
      if (this.pathHighlight.size > 0 && !this.pathNodes.has(node.index)) {
        return "#d1d5db"; // Light gray for dimmed nodes
      }
      if (this.visitedNodes.has(node.index)) {
        return "#9ca3af"; // Gray for visited
      }
      // Default colors based on node type
      if (node.id === "home") return "#4CAF50";
      if (node.id === "school") return "#FF9800";
      return "#69b3a2";
    })
      .linkColor((link) => {
        if (link._highlighted) {
          return link._highlightColor;
        }
        if (this.pathHighlight.has(link)) {
          return "#8b5cf6"; // Purple for path
        }
        // Dim non-path links during path visualization
        if (this.pathHighlight.size > 0 && !this.pathHighlight.has(link)) {
          return "rgba(200, 200, 200, 0.3)";
        }
        return link === hoverLink
          ? "rgba(108, 110, 255, 0.6)"
          : "rgba(100, 100, 100, 0.6)";
      })
      .linkWidth((link) => {
        if (link._highlighted) {
          return 8;
        }
        if (this.pathHighlight.has(link)) {
          return 6;
        }
        return link === hoverLink ? 8 : 5;
      });

    // Trigger graph refresh to apply changes
    Graph.graphData(gData);
  }
  updateStepUI() {
    const step = this.steps[this.currentStep];

    // Update step counter
    document.getElementById("stepCounter").textContent = `Step ${
      this.currentStep + 1
    } / ${this.steps.length}`;

    // Update description
    document.getElementById("stepDescription").textContent =
      step.description || "Processing...";

    // Update button states
    document.getElementById("firstStepBtn").disabled = this.currentStep === 0;
    document.getElementById("prevStepBtn").disabled = this.currentStep === 0;
    document.getElementById("nextStepBtn").disabled =
      this.currentStep === this.steps.length - 1;
    document.getElementById("lastStepBtn").disabled =
      this.currentStep === this.steps.length - 1;
  }
  populatePathSelector() {
    const pathSelector = document.getElementById("pathSelector");
    pathSelector.innerHTML = '<option value="">None</option>';

    gData.nodes.forEach((node) => {
      if (node.id !== "home") {
        const option = document.createElement("option");
        option.value = node.id;
        option.textContent = node.name;
        pathSelector.appendChild(option);
      }
    });
  }
  highlightPath(targetId) {
    if (!this.result || !this.result[targetId]) return;

    const pathData = this.result[targetId];
    if (!pathData.reachable || pathData.pathIds.length === 0) return;

    // Clear ALL current visualization effects (not just path)
    this.clearAllVisualizationEffects();

    // Highlight path edges and track path nodes
    for (let i = 0; i < pathData.pathIds.length - 1; i++) {
      const fromId = pathData.pathIds[i];
      const toId = pathData.pathIds[i + 1];

      const link = gData.links.find((l) => {
        const sourceId = typeof l.source === "object" ? l.source.id : l.source;
        const targetId = typeof l.target === "object" ? l.target.id : l.target;
        return sourceId === fromId && targetId === toId;
      });

      if (link) {
        this.pathHighlight.add(link);
      }
    }

    // Track path nodes for ring highlighting
    pathData.pathIds.forEach((nodeId) => {
      const node = gData.nodes.find((n) => n.id === nodeId);
      if (node) {
        this.pathNodes.add(node.index);
      }
    });

    this.refreshGraphVisuals();
  }
  clearPathHighlight() {
    this.pathHighlight.clear();
    this.pathNodes.clear();
    this.refreshGraphVisuals();
  }
  displayResults() {
    const resultPanel = document.getElementById("resultPanel");
    const tableBody = document.getElementById("resultTableBody");

    tableBody.innerHTML = "";

    // Convert result object to array and sort
    const resultsArray = Object.values(this.result);
    resultsArray.sort((a, b) => {
      // Sort: home first, school last, others by name
      if (a.id === "home") return -1;
      if (b.id === "home") return 1;
      if (a.id === "school") return 1;
      if (b.id === "school") return -1;
      return a.name.localeCompare(b.name);
    });
    resultsArray.forEach((data) => {
      const row = document.createElement("tr");

      const nodeCell = document.createElement("td");
      nodeCell.textContent = data.name;
      row.appendChild(nodeCell);

      const distanceCell = document.createElement("td");
      distanceCell.textContent =
        data.distance === Infinity ? "∞" : data.distance;
      row.appendChild(distanceCell);

      const pathCell = document.createElement("td");
      pathCell.textContent = data.pathString || "—";
      pathCell.title = data.pathString;
      row.appendChild(pathCell);

      const reachableCell = document.createElement("td");
      if (data.reachable) {
        reachableCell.innerHTML = '<span class="reachable-yes">Yes</span>';
      } else {
        reachableCell.innerHTML = '<span class="reachable-no">No</span>';
      }
      row.appendChild(reachableCell); // Add click handler to show path when clicking on row
      if (data.id !== "home" && data.reachable) {
        row.style.cursor = "pointer";
        row.addEventListener("click", () => {
          // Only allow clicking during playback (not when just paused or stopped)
          if (this.isPlaying) {
            return; // Ignore click during active playback
          }

          // Update dropdown value
          const pathSelector = document.getElementById("pathSelector");
          pathSelector.value = data.id;

          // Highlight the path
          this.highlightPath(data.id);

          // Add visual feedback
          row.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
          setTimeout(() => {
            row.style.backgroundColor = "";
          }, 300);
        }); // Add hover effect
        row.addEventListener("mouseenter", () => {
          // Only show hover effect if not playing
          if (
            !this.isPlaying &&
            row.style.backgroundColor !== "rgba(139, 92, 246, 0.1)"
          ) {
            row.style.backgroundColor = "rgba(139, 92, 246, 0.05)";
            row.style.cursor = "pointer";
          } else if (this.isPlaying) {
            row.style.cursor = "not-allowed";
          }
        });
        row.addEventListener("mouseleave", () => {
          if (row.style.backgroundColor !== "rgba(139, 92, 246, 0.1)") {
            row.style.backgroundColor = "";
          }
          row.style.cursor = this.isPlaying ? "not-allowed" : "pointer";
        });
      }

      tableBody.appendChild(row);
    });
    resultPanel.classList.remove("hidden");
  }

  // ========================================
  // Step Table Methods
  // ========================================

  initializeStepTable() {
    this.stepTableWindow = document.getElementById("stepTableWindow");
    const header = this.stepTableWindow.querySelector(".step-table-header");
    const resizeHandle = this.stepTableWindow.querySelector(
      ".step-table-resize-handle"
    );
    const collapseBtn = document.getElementById("stepTableCollapse");
    const closeBtn = document.getElementById("stepTableClose");

    // Dragging functionality
    header.addEventListener("mousedown", (e) => {
      if (e.target.closest(".step-table-controls")) return;
      this.isDragging = true;
      const rect = this.stepTableWindow.getBoundingClientRect();
      this.dragOffset = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      this.stepTableWindow.style.transition = "none";
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (this.isDragging) {
        const x = e.clientX - this.dragOffset.x;
        const y = e.clientY - this.dragOffset.y;
        this.stepTableWindow.style.left = `${Math.max(
          0,
          Math.min(x, window.innerWidth - 200)
        )}px`;
        this.stepTableWindow.style.top = `${Math.max(
          0,
          Math.min(y, window.innerHeight - 100)
        )}px`;
      } else if (this.isResizing) {
        const width =
          e.clientX - this.stepTableWindow.getBoundingClientRect().left;
        const height =
          e.clientY - this.stepTableWindow.getBoundingClientRect().top;
        this.stepTableWindow.style.width = `${Math.max(
          300,
          Math.min(width, window.innerWidth - 40)
        )}px`;
        this.stepTableWindow.style.maxHeight = `${Math.max(
          200,
          Math.min(height, window.innerHeight - 140)
        )}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.stepTableWindow.style.transition = "";
      }
      if (this.isResizing) {
        this.isResizing = false;
      }
    });

    // Resizing functionality
    resizeHandle.addEventListener("mousedown", (e) => {
      this.isResizing = true;
      e.preventDefault();
      e.stopPropagation();
    });

    // Collapse/Expand
    collapseBtn.addEventListener("click", () => {
      this.stepTableWindow.classList.toggle("collapsed");
    });

    // Close
    closeBtn.addEventListener("click", () => {
      this.stepTableWindow.classList.add("hidden");
    });
  }
  showStepTable() {
    this.stepTableWindow.classList.remove("hidden");
  }
  hideStepTable() {
    this.stepTableWindow.classList.add("hidden");
  }
  buildStepTableStructure() {
    // Create node order (Home, A, B, C, ..., School)
    this.nodeOrder = [];

    // Sort nodes: Home first, School last, others in between
    const sortedNodes = [];
    const homeNode = gData.nodes.find((n) => n.id === "home");
    const schoolNode = gData.nodes.find((n) => n.id === "school");
    const otherNodes = gData.nodes
      .filter((n) => n.id !== "home" && n.id !== "school")
      .sort((a, b) => {
        // Sort alphabetically by icon/id
        const aKey = a.icon || a.id;
        const bKey = b.icon || b.id;
        return aKey.localeCompare(bKey);
      });

    if (homeNode) sortedNodes.push(homeNode);
    sortedNodes.push(...otherNodes);
    if (schoolNode) sortedNodes.push(schoolNode);

    this.nodeOrder = sortedNodes;

    // Build table header
    const tableHead = document.getElementById("stepTableHead");
    tableHead.innerHTML = "";

    const headerRow = document.createElement("tr");

    // Step index column
    const stepCol = document.createElement("th");
    stepCol.className = "step-index-col";
    stepCol.textContent = "Step";
    headerRow.appendChild(stepCol);

    // Node columns
    this.nodeOrder.forEach((node) => {
      const th = document.createElement("th");
      th.textContent = node.name || node.id.toUpperCase();
      th.setAttribute("data-node-id", node.id);
      headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow); // Clear table body and state
    document.getElementById("stepTableBody").innerHTML = "";
    this.stepTableData = [];
    this.currentIterationRow = null;
    this.iterationCount = 0;
    this.currentRowData = {};
    this.lastStepType = null;
    this.pendingSelected = null;
  }
  createNewIterationRow(step) {
    console.log("createNewIterationRow called with step type:", step.type);
    const tableBody = document.getElementById("stepTableBody");
    const row = document.createElement("tr");

    this.iterationCount++;
    row.setAttribute("data-iteration", this.iterationCount);
    console.log("Created row with iteration count:", this.iterationCount);

    // Step index cell (iteration number)
    const stepCell = document.createElement("td");
    stepCell.className = "step-index";
    stepCell.textContent = this.iterationCount;
    row.appendChild(stepCell);

    // Get current state
    const distances = step.distances || [];
    const previous = step.previous || [];
    const visited = step.visited || [];

    // Initialize current row data with previous row's data (if exists)
    if (this.stepTableData.length > 0) {
      // Copy from previous row
      this.currentRowData = {
        ...this.stepTableData[this.stepTableData.length - 1].data,
      };
    } else {
      // First row - initialize empty
      this.currentRowData = {};
    }

    // Create cells for each node
    this.nodeOrder.forEach((node) => {
      const cell = document.createElement("td");
      const nodeIndex = gData.nodes.findIndex((n) => n.id === node.id);
      cell.setAttribute("data-node-index", nodeIndex);

      if (nodeIndex >= 0) {
        // Check if this node is visited
        if (visited[nodeIndex]) {
          cell.textContent = "-";
          cell.className = "visited-node";
          this.currentRowData[nodeIndex] = { value: "-", visited: true };
        } else if (distances[nodeIndex] !== undefined) {
          const dist = distances[nodeIndex];
          const prev = previous[nodeIndex];

          if (dist === Infinity) {
            cell.textContent = "(∞, -)";
            cell.className = "infinity-value";
            this.currentRowData[nodeIndex] = {
              value: "(∞, -)",
              dist: Infinity,
              prev: null,
              visited: false,
            };
          } else {
            const prevNode =
              prev !== null && prev !== undefined ? gData.nodes[prev] : null;
            const prevLabel = prevNode ? prevNode.id : "-";
            cell.textContent = `(${dist}, ${prevLabel})`;
            this.currentRowData[nodeIndex] = {
              value: `(${dist}, ${prevLabel})`,
              dist,
              prev,
              visited: false,
            };
          }

          // Highlight chosen node (the one being selected in this iteration)
          if (step.chosen === nodeIndex) {
            cell.classList.add("chosen-node");
          }
        } else {
          cell.textContent = "-";
          cell.className = "empty-value";
          this.currentRowData[nodeIndex] = { value: "-", visited: false };
        }
      } else {
        cell.textContent = "-";
        cell.className = "empty-value";
      }

      row.appendChild(cell);
    });

    tableBody.appendChild(row);
    this.currentIterationRow = row;

    // Store row data
    this.stepTableData.push({
      iteration: this.iterationCount,
      row: row,
      data: { ...this.currentRowData },
    });

    // Auto-scroll to latest row
    const scrollContainer =
      this.stepTableWindow.querySelector(".step-table-scroll");
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }
  updateCurrentIterationCell(step) {
    if (!this.currentIterationRow) return;

    // Find the cell for the node being updated
    const nodeIndex = step.to;
    if (nodeIndex === undefined) return;

    const cell = this.currentIterationRow.querySelector(
      `[data-node-index="${nodeIndex}"]`
    );
    if (!cell) return;

    // Get updated distances and previous
    const distances = step.distances || [];
    const previous = step.previous || [];
    const visited = step.visited || [];

    // Check if node is visited
    if (visited[nodeIndex]) {
      cell.textContent = "-";
      cell.className = "visited-node";
      this.currentRowData[nodeIndex] = { value: "-", visited: true };
    } else if (distances[nodeIndex] !== undefined) {
      const dist = distances[nodeIndex];
      const prev = previous[nodeIndex];

      if (dist === Infinity) {
        cell.textContent = "(∞, -)";
        cell.className = "infinity-value";
        this.currentRowData[nodeIndex] = {
          value: "(∞, -)",
          dist: Infinity,
          prev: null,
          visited: false,
        };
      } else {
        const prevNode =
          prev !== null && prev !== undefined ? gData.nodes[prev] : null;
        const prevLabel = prevNode ? prevNode.id : "-";
        cell.textContent = `(${dist}, ${prevLabel})`;
        cell.className = "";
        this.currentRowData[nodeIndex] = {
          value: `(${dist}, ${prevLabel})`,
          dist,
          prev,
          visited: false,
        };

        // Highlight as updated
        if (step.type === "update") {
          cell.classList.add("updated-node");
        }
      }
    }

    // Update stored data
    if (this.stepTableData.length > 0) {
      this.stepTableData[this.stepTableData.length - 1].data = {
        ...this.currentRowData,
      };
    }
  }
  highlightCheckedCell(step) {
    if (!this.currentIterationRow) return;

    const nodeIndex = step.to;
    if (nodeIndex === undefined) return;

    const cell = this.currentIterationRow.querySelector(
      `[data-node-index="${nodeIndex}"]`
    );
    if (!cell) return;

    // Temporarily add checked highlight (will be removed on next step)
    cell.classList.add("checked-node");
  }
  clearCellHighlights() {
    if (!this.currentIterationRow) return;

    const cells = this.currentIterationRow.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.classList.remove("checked-node", "updated-node");
      // Keep chosen-node class
    });
  }
  // Helper function to update select in current row (without creating new row)
  updateSelectInCurrentRow(step) {
    if (!this.currentIterationRow) return;

    console.log(
      "updateSelectInCurrentRow - updating chosen node in current row"
    );

    // Get current state
    const distances = step.distances || [];
    const previous = step.previous || [];
    const visited = step.visited || [];

    // Remove previous chosen-node highlights
    const cells = this.currentIterationRow.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.classList.remove("chosen-node");
    });

    // Update the chosen node cell with its distance and highlight
    const chosenNodeIndex = step.chosen;
    if (chosenNodeIndex !== undefined && chosenNodeIndex >= 0) {
      const chosenCell = this.currentIterationRow.querySelector(
        `[data-node-index="${chosenNodeIndex}"]`
      );

      if (chosenCell) {
        const dist = distances[chosenNodeIndex];
        const prev = previous[chosenNodeIndex];

        if (dist !== Infinity && dist !== undefined) {
          const prevNode =
            prev !== null && prev !== undefined ? gData.nodes[prev] : null;
          const prevLabel = prevNode ? prevNode.id : "-";
          chosenCell.textContent = `(${dist}, ${prevLabel})`;
          chosenCell.className = "chosen-node"; // Highlight as chosen

          this.currentRowData[chosenNodeIndex] = {
            value: `(${dist}, ${prevLabel})`,
            dist,
            prev,
            visited: false,
          };
        }
      }
    }

    // Update stored data
    if (this.stepTableData.length > 0) {
      this.stepTableData[this.stepTableData.length - 1].data = {
        ...this.currentRowData,
      };
    }

    // Mark this node as pending to be visited in the next row
    this.pendingSelected = step.chosen;
    console.log("Set pendingSelected to:", this.pendingSelected);
  }

  // Helper to create a "post-select" row where the selected node becomes visited
  createPostSelectRow(step) {
    console.log(
      "createPostSelectRow - Creating row where selected node becomes visited"
    );

    // Build a step-like object with the selected node marked as visited
    const postSelectStep = {
      ...step,
      distances: [],
      previous: [],
      visited: [],
    };

    // Reconstruct distances and previous from currentRowData
    this.nodeOrder.forEach((node) => {
      const nodeIndex = gData.nodes.findIndex((n) => n.id === node.id);
      if (nodeIndex >= 0 && this.currentRowData[nodeIndex]) {
        const data = this.currentRowData[nodeIndex];
        postSelectStep.distances[nodeIndex] =
          data.dist !== undefined ? data.dist : Infinity;
        postSelectStep.previous[nodeIndex] =
          data.prev !== undefined ? data.prev : null;
        postSelectStep.visited[nodeIndex] = data.visited || false;
      }
    });

    // Mark the pending selected node as visited
    if (this.pendingSelected !== null) {
      postSelectStep.visited[this.pendingSelected] = true;
      postSelectStep.chosen = this.pendingSelected;
    }

    // Create the new row
    this.createNewIterationRow(postSelectStep);

    // Clear pending selected
    console.log("Clearing pendingSelected after creating post-select row");
    this.pendingSelected = null;
  }
  updateStepTable(step, stepIndex) {
    console.log(">>> updateStepTable called <<<");
    console.log("Step index:", stepIndex);
    console.log("Step type:", step.type);
    console.log("Last step type:", this.lastStepType);
    console.log("Pending selected:", this.pendingSelected);
    console.log("Full step object:", step);

    // Clear previous highlights
    this.clearCellHighlights();

    console.log("About to enter switch statement with step.type =", step.type);
    switch (step.type) {
      case "init":
        console.log("✓ MATCHED INIT CASE - Creating 2 init rows");

        // ROW #1: Initialization state
        this.createNewIterationRow(step);

        // ROW #2: Start node becomes visited (mark as "-")
        // Create a modified step with visited start node
        const initStep2 = {
          ...step,
          visited: [...step.visited],
        };
        initStep2.visited[step.chosen] = true; // Mark start as visited

        console.log("Creating second init row (start node visited)");
        this.createNewIterationRow(initStep2);

        break;
      case "select":
        console.log("✓ MATCHED SELECT CASE");

        // HANDLE SELECT → SELECT case (dead-end / no edges case)
        // If there's a pending selected node from a previous SELECT
        // (and last step wasn't a check that already handled it),
        // create a new row where the pending node becomes visited first
        if (this.pendingSelected !== null && this.lastStepType !== "check") {
          console.log(
            "→ SELECT after SELECT detected! Creating post-select row for previous selection first"
          );
          this.createPostSelectRow(step);
        }

        // Now update the selected node in the current row and mark as pending
        console.log("→ Updating current row with new selection");
        this.updateSelectInCurrentRow(step);
        break;

      case "check":
        console.log("✓ MATCHED CHECK CASE");

        // If there's a pending selected node, create a new row where it becomes visited
        if (this.pendingSelected !== null) {
          console.log(
            "→ Found pendingSelected, creating post-select row first"
          );
          this.createPostSelectRow(step);
        }

        // Now highlight the cell being checked in the current row
        this.highlightCheckedCell(step);
        break;

      case "update":
        console.log("✓ MATCHED UPDATE CASE");
        // Update the value in current row
        this.updateCurrentIterationCell(step);
        break;

      case "iteration":
        console.log("✓ MATCHED ITERATION CASE");
        // Bellman-Ford iteration marker - no table update needed
        break;

      case "end":
        console.log("✓ MATCHED END CASE");
        // Final step - just keep current state
        break;

      default:
        console.log("⚠️ NO CASE MATCHED! step.type =", step.type);
    }

    // Track last step type for next iteration
    this.lastStepType = step.type;

    console.log("Calling updateIterationHighlight");
    // Update row highlight
    this.updateIterationHighlight();
    console.log(">>> updateStepTable completed <<<");
  }
  updateIterationHighlight() {
    const tableBody = document.getElementById("stepTableBody");
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row, idx) => {
      row.classList.remove("current-step", "previous-step");

      if (row === this.currentIterationRow) {
        row.classList.add("current-step");
        // Scroll to current row
        row.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        row.classList.add("previous-step");
      }
    });
  }
  updateStepTableHighlight(stepIndex) {
    const tableBody = document.getElementById("stepTableBody");
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row, idx) => {
      row.classList.remove("current-step", "previous-step");

      if (idx === stepIndex) {
        row.classList.add("current-step");
        // Scroll to current row
        row.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (idx < stepIndex) {
        row.classList.add("previous-step");
      }
    });
  }
  rebuildStepTableToCurrentStep() {
    // Clear table
    document.getElementById("stepTableBody").innerHTML = "";
    this.stepTableData = [];
    this.currentIterationRow = null;
    this.iterationCount = 0;
    this.currentRowData = {};
    this.lastStepType = null;
    this.pendingSelected = null; // Reset pending selected during rebuild

    // Replay all steps up to current step
    for (let i = 0; i <= this.currentStep && i < this.steps.length; i++) {
      const step = this.steps[i];
      const nextStep = i < this.steps.length - 1 ? this.steps[i + 1] : null;

      switch (step.type) {
        case "init":
          // Create 2 rows for init
          this.createNewIterationRow(step);

          // Second row: start node visited
          const initStep2 = {
            ...step,
            visited: [...step.visited],
          };
          initStep2.visited[step.chosen] = true;
          this.createNewIterationRow(initStep2);
          break;

        case "select":
          // Update current row and set pendingSelected
          this.updateSelectInCurrentRow(step);

          // If next step is NOT a check, or we're at the last step, create the post-select row now
          if (!nextStep || nextStep.type !== "check") {
            this.createPostSelectRow(step);
          }
          // Otherwise, the post-select row will be created when we process the check step
          break;

        case "check":
          // If there's a pending selected, create the post-select row
          if (this.pendingSelected !== null) {
            this.createPostSelectRow(step);
          }
          // Note: we don't need to highlight during rebuild
          break;

        case "update":
          this.updateCurrentIterationCell(step);
          break;
        // iteration, end don't create/update rows during rebuild
      }

      this.lastStepType = step.type;
    }

    this.updateIterationHighlight();
  }
  clearStepTable() {
    document.getElementById("stepTableBody").innerHTML = "";
    this.stepTableData = [];
    this.currentIterationRow = null;
    this.iterationCount = 0;
    this.currentRowData = {};
    this.lastStepType = null;
    this.pendingSelected = null;
  }
}

// Initialize visualizer when DOM is ready
let algorithmVisualizer;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    algorithmVisualizer = new AlgorithmVisualizer();
    window.algorithmVisualizer = algorithmVisualizer;
  });
} else {
  algorithmVisualizer = new AlgorithmVisualizer();
  window.algorithmVisualizer = algorithmVisualizer;
}
