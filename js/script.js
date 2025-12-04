// Initial data with Home and School nodes
const gData = {
  nodes: [
    { id: "home", name: "Home", icon: "home" },
    { id: "school", name: "School", icon: "school" },
  ],
  links: [{ source: "home", target: "school", weight: 1 }],
};

let nextChar = "A";

// Graph Direction State Management
let isDirectedGraph = true; // Current mode: true = directed, false = undirected
let savedDirectedGraph = null; // Stores the last known directed graph data

const NODE_R = 8; // Size for Home and School nodes
const REGULAR_NODE_R = 12; // Larger size for regular nodes
const highlightNodes = new Set();
const highlightLinks = new Set();
const selectedNodes = new Set();
let hoverNode = null;
let hoverLink = null;
let selectedNode = null;
let firstSelectedNode = null; // Node được chọn đầu tiên để tạo link

// Track drag vs click
let isDragging = false;
let dragStartTime = 0;

// Track double-click on links
let lastLinkClick = null;
let lastLinkClickTime = 0;

// Toolbar Toggle Functionality
let toolbarCollapsed = false;

function initToolbar() {
  const toolbar = document.getElementById("toolbar");
  const toggleBtn = document.getElementById("toolbarToggle");

  toggleBtn.addEventListener("click", () => {
    toolbarCollapsed = !toolbarCollapsed;
    if (toolbarCollapsed) {
      toolbar.classList.add("collapsed");
    } else {
      toolbar.classList.remove("collapsed");
    }
  });
}

// Hamburger Menu Functionality (Top Right Independent)
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const dropdown = document.getElementById("hamburgerDropdown");

  // Check if elements exist (for mobile view)
  if (!hamburgerBtn || !dropdown) return;

  const mobileGraphToggle = document.getElementById(
    "mobileGraphDirectionToggle"
  );
  const mobileAlgorithmSelector = document.getElementById(
    "mobileAlgorithmSelector"
  );
  const mobileStartBtn = document.getElementById("mobileStartAlgorithmBtn");

  // Desktop elements
  const desktopGraphToggle = document.getElementById("graphDirectionToggle");
  const desktopAlgorithmSelector = document.getElementById("algorithmSelector");
  const desktopStartBtn = document.getElementById("startAlgorithmBtn");

  let isDropdownOpen = false;
  // Toggle dropdown
  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
    if (isDropdownOpen) {
      dropdown.classList.add("show");
      hamburgerBtn.classList.add("open");
      syncMobileControls();
    } else {
      dropdown.classList.remove("show");
      hamburgerBtn.classList.remove("open");
    }
  });
  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      isDropdownOpen &&
      !dropdown.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      isDropdownOpen = false;
      dropdown.classList.remove("show");
      hamburgerBtn.classList.remove("open");
    }
  });

  // Prevent dropdown clicks from closing it
  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Sync mobile controls with desktop controls
  function syncMobileControls() {
    if (!desktopGraphToggle || !desktopAlgorithmSelector || !desktopStartBtn)
      return;

    // Sync graph direction state
    if (desktopGraphToggle.classList.contains("undirected")) {
      mobileGraphToggle.classList.add("undirected");
    } else {
      mobileGraphToggle.classList.remove("undirected");
    }

    // Sync algorithm selector
    mobileAlgorithmSelector.value = desktopAlgorithmSelector.value;

    // Sync button state
    if (desktopStartBtn.classList.contains("running")) {
      mobileStartBtn.classList.add("running");
      mobileStartBtn.querySelector(".btn-text").textContent = "Stop";
    } else {
      mobileStartBtn.classList.remove("running");
      mobileStartBtn.querySelector(".btn-text").textContent = "Start Algorithm";
    }

    if (desktopStartBtn.classList.contains("disabled")) {
      mobileStartBtn.classList.add("disabled");
    } else {
      mobileStartBtn.classList.remove("disabled");
    }
  }

  // Mobile graph direction toggle
  if (mobileGraphToggle) {
    mobileGraphToggle.addEventListener("click", () => {
      if (desktopGraphToggle) {
        desktopGraphToggle.click();
        // Sync state
        if (desktopGraphToggle.classList.contains("undirected")) {
          mobileGraphToggle.classList.add("undirected");
        } else {
          mobileGraphToggle.classList.remove("undirected");
        }
      }
    });
  }

  // Mobile algorithm selector
  if (mobileAlgorithmSelector) {
    mobileAlgorithmSelector.addEventListener("change", () => {
      if (desktopAlgorithmSelector) {
        desktopAlgorithmSelector.value = mobileAlgorithmSelector.value;
      }
    });
  }

  // Mobile start button
  if (mobileStartBtn) {
    mobileStartBtn.addEventListener("click", () => {
      if (desktopStartBtn) {
        desktopStartBtn.click();
        // Close dropdown after starting
        isDropdownOpen = false;
        dropdown.classList.remove("show");
      }
    });
  }

  // Listen for changes in desktop controls to update mobile
  if (desktopGraphToggle && desktopStartBtn && desktopAlgorithmSelector) {
    const observer = new MutationObserver(() => {
      if (isDropdownOpen) {
        syncMobileControls();
      }
    });

    observer.observe(desktopGraphToggle, {
      attributes: true,
      attributeFilter: ["class"],
    });

    observer.observe(desktopStartBtn, {
      attributes: true,
      attributeFilter: ["class"],
    });

    desktopAlgorithmSelector.addEventListener("change", () => {
      if (isDropdownOpen) {
        syncMobileControls();
      }
    });
  }
}

// Help Panel Toggle Functionality
function initHelpPanel() {
  const helpPanel = document.getElementById("helpPanel");
  const helpPanelToggle = document.getElementById("helpPanelToggle");
  const helpPanelClose = document.getElementById("helpPanelClose");

  // Toggle panel when clicking the question icon
  helpPanelToggle.addEventListener("click", () => {
    helpPanel.classList.toggle("active");
  });

  // Close panel when clicking the close button
  helpPanelClose.addEventListener("click", () => {
    helpPanel.classList.remove("active");
  });

  // Close panel when clicking outside (optional)
  document.addEventListener("click", (e) => {
    if (!helpPanel.contains(e.target) && !helpPanelToggle.contains(e.target)) {
      helpPanel.classList.remove("active");
    }
  });
}

// Graph Direction Management Functions
function saveDirectedGraph() {
  // Only save when in directed mode
  if (!isDirectedGraph) return;

  savedDirectedGraph = {
    nodes: JSON.parse(JSON.stringify(gData.nodes)),
    links: JSON.parse(
      JSON.stringify(
        gData.links.map((link) => ({
          source:
            typeof link.source === "object" ? link.source.id : link.source,
          target:
            typeof link.target === "object" ? link.target.id : link.target,
          weight: link.weight,
        }))
      )
    ),
  };
  console.log("Saved directed graph:", savedDirectedGraph);
}

function clearSavedDirectedGraph() {
  savedDirectedGraph = null;
  console.log("Cleared saved directed graph");
}

function convertToUndirected() {
  // Convert all links to bidirectional
  const existingLinks = new Set();
  const newLinks = [];

  gData.links.forEach((link) => {
    const sourceId =
      typeof link.source === "object" ? link.source.id : link.source;
    const targetId =
      typeof link.target === "object" ? link.target.id : link.target;
    const weight = link.weight;

    // Create a unique key for each pair (regardless of direction)
    const key1 = `${sourceId}-${targetId}`;
    const key2 = `${targetId}-${sourceId}`;

    if (!existingLinks.has(key1) && !existingLinks.has(key2)) {
      existingLinks.add(key1);
      existingLinks.add(key2);

      // Add both directions
      newLinks.push({ source: sourceId, target: targetId, weight: weight });
      newLinks.push({ source: targetId, target: sourceId, weight: weight });
    }
  });

  gData.links = newLinks;
  console.log("Converted to undirected graph:", gData.links.length, "links");
}

function restoreDirectedGraph() {
  if (!savedDirectedGraph) {
    console.log("No saved directed graph to restore");
    return;
  }

  // Restore the saved directed graph
  gData.nodes = JSON.parse(JSON.stringify(savedDirectedGraph.nodes));
  gData.links = JSON.parse(JSON.stringify(savedDirectedGraph.links));
  console.log("Restored directed graph:", gData.links.length, "links");
}

function toggleGraphDirection() {
  const toggleBtn = document.getElementById("graphDirectionToggle");

  if (isDirectedGraph) {
    // Switch to undirected
    saveDirectedGraph(); // Save current directed state
    convertToUndirected();
    isDirectedGraph = false;
    toggleBtn.classList.add("undirected");
    console.log("Switched to undirected mode");
  } else {
    // Switch to directed
    restoreDirectedGraph();
    isDirectedGraph = true;
    toggleBtn.classList.remove("undirected");
    console.log("Switched to directed mode");
  }

  // Update arrow visibility
  if (isDirectedGraph) {
    Graph.linkDirectionalArrowLength(12);
  } else {
    Graph.linkDirectionalArrowLength(0);
  }

  Graph.graphData(gData);
}

function initGraphDirectionToggle() {
  const toggleBtn = document.getElementById("graphDirectionToggle");

  toggleBtn.addEventListener("click", () => {
    toggleGraphDirection();
  });

  // Set initial state
  if (isDirectedGraph) {
    toggleBtn.classList.remove("undirected");
    Graph.linkDirectionalArrowLength(12);
  } else {
    toggleBtn.classList.add("undirected");
    Graph.linkDirectionalArrowLength(0);
  }
}

// Initialize toolbar when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initToolbar();
    initHelpPanel();
    initGraphDirectionToggle();
    initHamburgerMenu();
  });
} else {
  initToolbar();
  initHelpPanel();
  initGraphDirectionToggle();
  initHamburgerMenu();
}

// Load SVG images
const svgImages = {};
const svgPaths = {
  home: "assets/home.svg",
  school: "assets/school.svg",
};

// Function to load SVG as image
function loadSVGImage(name, path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      svgImages[name] = img;
      resolve(img);
    };
    img.onerror = reject;
    img.src = path;
  });
}

// Load all SVG images
Promise.all([
  loadSVGImage("home", svgPaths.home),
  loadSVGImage("school", svgPaths.school),
])
  .then(() => {})
  .catch((err) => {
    console.error("Error loading SVG images:", err);
  });

// Function to draw SVG icon
function drawIcon(ctx, icon, x, y, size, color) {
  if (svgImages[icon]) {
    const img = svgImages[icon];
    const imgSize = size * 1.25; // Increased from 1.5 to 2 for larger icons
    ctx.drawImage(img, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);
    return;
  }

  // Fallback to drawing basic shapes if SVG not loaded
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  if (icon === "home") {
    // Draw house icon
    const baseY = y + size * 0.3;
    const roofHeight = size * 0.4;

    // Roof (triangle)
    ctx.beginPath();
    ctx.moveTo(x, y - roofHeight);
    ctx.lineTo(x - size * 0.5, baseY - roofHeight);
    ctx.lineTo(x + size * 0.5, baseY - roofHeight);
    ctx.closePath();
    ctx.fill();

    // House body (rectangle)
    ctx.fillRect(x - size * 0.4, baseY - roofHeight, size * 0.8, size * 0.6);

    // Door (small rectangle)
    ctx.fillStyle =
      ctx.fillStyle === "#fff" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)";
    ctx.fillRect(
      x - size * 0.15,
      baseY - roofHeight + size * 0.2,
      size * 0.3,
      size * 0.4
    );
  } else if (icon === "school") {
    // Draw school icon
    const baseY = y + size * 0.3;

    // Bell tower roof (triangle)
    ctx.beginPath();
    ctx.moveTo(x, y - size * 0.5);
    ctx.lineTo(x - size * 0.2, y - size * 0.2);
    ctx.lineTo(x + size * 0.2, y - size * 0.2);
    ctx.closePath();
    ctx.fill();

    // Bell tower body
    ctx.fillRect(x - size * 0.15, y - size * 0.2, size * 0.3, size * 0.3);

    // Main building
    ctx.fillRect(x - size * 0.5, baseY - size * 0.2, size, size * 0.5);

    // Windows
    ctx.fillStyle =
      ctx.fillStyle === "#fff" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)";
    ctx.fillRect(x - size * 0.35, baseY - size * 0.05, size * 0.2, size * 0.2);
    ctx.fillRect(x + size * 0.15, baseY - size * 0.05, size * 0.2, size * 0.2);
  }
}

// Function to draw a node
function drawNode(node, ctx, globalScale) {
  if (
    typeof node.x !== "number" ||
    typeof node.y !== "number" ||
    !isFinite(node.x) ||
    !isFinite(node.y)
  ) {
    return;
  }
  // Check if visualizer is overriding ring color
  if (node._visualRingColor) {
    // Use visualizer's ring color for algorithm visualization
    const nodeRadius =
      node.id === "home" || node.id === "school"
        ? NODE_R * 1.2
        : REGULAR_NODE_R;
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius * 1.3, 0, 2 * Math.PI, false);
    ctx.strokeStyle = node._visualRingColor;
    ctx.lineWidth = 6 / globalScale;
    ctx.stroke();
  }
  // Draw ring for Home node (always highlighted with green)
  else if (node.id === "home") {
    ctx.beginPath();
    ctx.arc(node.x, node.y, NODE_R * 1.5, 0, 2 * Math.PI, false);
    // Gray if selected, green otherwise
    ctx.strokeStyle = selectedNodes.has(node) ? "#808080" : "#4CAF50";
    ctx.lineWidth = 6 / globalScale;
    ctx.stroke();
  }
  // Draw ring for School node (always highlighted with orange)
  else if (node.id === "school") {
    ctx.beginPath();
    ctx.arc(node.x, node.y, NODE_R * 1.5, 0, 2 * Math.PI, false);
    // Gray if selected, orange otherwise
    ctx.strokeStyle = selectedNodes.has(node) ? "#808080" : "#FF9800";
    ctx.lineWidth = 6 / globalScale;
    ctx.stroke();
  } // Draw ring for selected node (green)
  else if (selectedNodes.has(node)) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, REGULAR_NODE_R * 1.2, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 5 / globalScale;
    ctx.stroke();
  }
  // Draw ring for hovered node (gray)
  else if (node === hoverNode) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, REGULAR_NODE_R * 1.2, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 5 / globalScale;
    ctx.stroke();
  }

  // Draw main node circle
  ctx.beginPath();
  // Use different radius for regular nodes vs Home/School
  const nodeRadius =
    node.id === "home" || node.id === "school" ? NODE_R : REGULAR_NODE_R;
  ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI, false);

  // Màu nền khác cho Home và School
  if (node.id === "home") {
    ctx.fillStyle = "#4CAF50"; // Green for Home
  } else if (node.id === "school") {
    ctx.fillStyle = "#FF9800"; // Orange for School
  } else {
    ctx.fillStyle = "#69b3a2"; // Default color
  }
  ctx.fill();

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1.5 / globalScale;
  ctx.stroke(); // Draw icon/character in center
  if (node.icon === "home" || node.icon === "school") {
    drawIcon(ctx, node.icon, node.x, node.y, NODE_R * 1, "#fff");
  } else {
    const displayText = node.icon || node.id.toUpperCase();
    const fontSize = 18 / globalScale; // Larger font for regular nodes
    ctx.font = `bold ${fontSize}px Sans-Serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText(displayText, node.x, node.y);
  }
}

// Grid configuration
const GRID_SIZE = 50; // Size of each grid cell
const GRID_COLOR = "rgba(200, 200, 200, 0.3)"; // Light gray grid
const GRID_THICK_COLOR = "rgba(150, 150, 150, 0.5)"; // Darker grid every 5 lines

const Graph = new ForceGraph(document.getElementById("graph"))
  .graphData(gData)
  .nodeLabel("name")
  .nodeRelSize(NODE_R)
  .d3Force("link", d3.forceLink().distance(150)) // Tăng khoảng cách link từ 80 lên 150
  .d3Force("charge", d3.forceManyBody().strength(-200)) // Tăng lực đẩy từ -50 lên -200
  .d3Force("collide", d3.forceCollide().radius(35).strength(0.8)) // Tăng bán kính va chạm từ 20 lên 35
  .onNodeHover((node) => {
    hoverNode = node || null;
    document.getElementById("graph").style.cursor = node
      ? "pointer"
      : "default";
  })
  .onLinkHover((link) => {
    hoverLink = link || null;
    document.getElementById("graph").style.cursor = link
      ? "pointer"
      : "default";
  })
  // Add background grid that transforms with zoom/pan
  .onRenderFramePre((ctx, globalScale) => {
    // Get canvas dimensions
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Get current transform (zoom and pan)
    const transform = ctx.getTransform();

    // Calculate grid bounds in world coordinates
    const topLeft = {
      x: -transform.e / transform.a,
      y: -transform.f / transform.d,
    };
    const bottomRight = {
      x: (width - transform.e) / transform.a,
      y: (height - transform.f) / transform.d,
    };

    // Calculate grid line range
    const startX = Math.floor(topLeft.x / GRID_SIZE) * GRID_SIZE;
    const endX = Math.ceil(bottomRight.x / GRID_SIZE) * GRID_SIZE;
    const startY = Math.floor(topLeft.y / GRID_SIZE) * GRID_SIZE;
    const endY = Math.ceil(bottomRight.y / GRID_SIZE) * GRID_SIZE;

    // Draw vertical lines
    for (let x = startX; x <= endX; x += GRID_SIZE) {
      // Every 5th line is thicker
      const isThickLine = (x / GRID_SIZE) % 5 === 0;
      ctx.strokeStyle = isThickLine ? GRID_THICK_COLOR : GRID_COLOR;
      ctx.lineWidth = isThickLine ? 2 / globalScale : 1 / globalScale;

      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = startY; y <= endY; y += GRID_SIZE) {
      // Every 5th line is thicker
      const isThickLine = (y / GRID_SIZE) % 5 === 0;
      ctx.strokeStyle = isThickLine ? GRID_THICK_COLOR : GRID_COLOR;
      ctx.lineWidth = isThickLine ? 2 / globalScale : 1 / globalScale;

      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }
  })
  .onNodeClick((node) => {
    // Nếu chưa có node nào được chọn, chọn node này làm node đầu tiên
    if (firstSelectedNode === null) {
      firstSelectedNode = node;
      selectedNodes.clear();
      selectedNodes.add(node);
      selectedNode = node;
    }
    // Nếu click vào cùng node đã chọn, bỏ chọn
    else if (firstSelectedNode === node) {
      firstSelectedNode = null;
      selectedNodes.clear();
      selectedNode = null;
    }
    // Nếu đã có node đầu tiên, toggle link với node thứ hai
    else {
      toggleLinkBetweenNodes(firstSelectedNode, node);

      // Reset selection
      firstSelectedNode = null;
      selectedNodes.clear();
      selectedNode = null;
    }
  })
  .onLinkClick(async (link) => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastLinkClickTime;
    // Check if this is a double-click (within 300ms)
    if (lastLinkClick === link && timeDiff < 300) {
      // Show custom prompt to change weight
      const newWeight = await popupManager.showPrompt(
        `Change weight for link ${link.source.id} → ${link.target.id}\nCurrent weight: ${link.weight}`,
        link.weight
      );

      if (newWeight !== null && newWeight !== "") {
        const weight = parseInt(newWeight);
        if (!isNaN(weight) && weight > 0) {
          link.weight = weight;

          // Clear saved directed graph when modifying weights
          clearSavedDirectedGraph();

          // If in undirected mode, update the reverse link too
          if (!isDirectedGraph) {
            const sourceId =
              typeof link.source === "object" ? link.source.id : link.source;
            const targetId =
              typeof link.target === "object" ? link.target.id : link.target;
            const reverseLink = gData.links.find((l) => {
              const lSource =
                typeof l.source === "object" ? l.source.id : l.source;
              const lTarget =
                typeof l.target === "object" ? l.target.id : l.target;
              return lSource === targetId && lTarget === sourceId;
            });
            if (reverseLink) {
              reverseLink.weight = weight;
            }
          }

          Graph.graphData(gData); // Refresh graph
        } else {
          await popupManager.showConfirm(
            "Please enter a valid positive number"
          );
        }
      }

      // Reset after double-click
      lastLinkClick = null;
      lastLinkClickTime = 0;
    } else {
      // Single click - record it
      lastLinkClick = link;
      lastLinkClickTime = currentTime;
    }
  })
  .autoPauseRedraw(false)
  .nodeCanvasObjectMode(() => "replace")
  .nodeCanvasObject(drawNode)
  .linkDirectionalArrowLength(12)
  .linkDirectionalArrowRelPos(1)
  .linkColor((link) =>
    link === hoverLink ? "rgba(108, 110, 255, 0.6)" : "rgba(100, 100, 100, 0.6)"
  )
  .linkWidth((link) => (link === hoverLink ? 8 : 5))
  .linkCanvasObjectMode(() => "after")
  .linkCanvasObject((link, ctx, globalScale) => {
    const start = link.source;
    const end = link.target;

    if (typeof start.x !== "number" || typeof end.x !== "number") return;

    const textPos = {
      x: start.x + (end.x - start.x) / 2,
      y: start.y + (end.y - start.y) / 2,
    };
    const label = link.weight || "";
    const fontSize = 18 / globalScale;
    ctx.font = `bold ${fontSize}px Sans-Serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw multi-layer outline for maximum visibility over any edge color
    // Outer white stroke (thicker)
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineWidth = 3 / globalScale;
    ctx.lineJoin = "round";
    ctx.miterLimit = 2;
    ctx.strokeText(label, textPos.x, textPos.y);

    // Inner darker stroke for definition
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    ctx.lineWidth = 2.5 / globalScale;
    ctx.strokeText(label, textPos.x, textPos.y);

    // Fill text
    ctx.fillStyle = "#1f2937";
    ctx.fillText(label, textPos.x, textPos.y);
  });

// Auto zoom out on mobile devices
function setInitialZoom() {
  // Detect if device is mobile
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Calculate zoom level based on screen width
    let zoomLevel;
    if (window.innerWidth <= 480) {
      // Small mobile phones
      zoomLevel = 1.3;
    } else if (window.innerWidth <= 768) {
      // Tablets and larger phones
      zoomLevel = 2;
    }

    // Apply zoom with a slight delay to ensure graph is initialized
    setTimeout(() => {
      Graph.zoom(zoomLevel, 400); // 400ms animation duration
    }, 100);
  }
}

// Call initial zoom after graph is loaded
setInitialZoom();

// Re-adjust zoom on window resize (orientation change on mobile)
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setInitialZoom();
  }, 300);
});

// Function to restore graph interaction handlers after visualization
window.restoreGraphHandlers = function () {
  Graph.onNodeClick((node) => {
    // Nếu chưa có node nào được chọn, chọn node này làm node đầu tiên
    if (firstSelectedNode === null) {
      firstSelectedNode = node;
      selectedNodes.clear();
      selectedNodes.add(node);
      selectedNode = node;
    }
    // Nếu click vào cùng node đã chọn, bỏ chọn
    else if (firstSelectedNode === node) {
      firstSelectedNode = null;
      selectedNodes.clear();
      selectedNode = null;
    }
    // Nếu đã có node đầu tiên, toggle link với node thứ hai
    else {
      toggleLinkBetweenNodes(firstSelectedNode, node);

      // Reset selection
      firstSelectedNode = null;
      selectedNodes.clear();
      selectedNode = null;
    }
  }).onLinkClick(async (link) => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastLinkClickTime;
    // Check if this is a double-click (within 300ms)
    if (lastLinkClick === link && timeDiff < 300) {
      // Show custom prompt to change weight
      const newWeight = await popupManager.showPrompt(
        `Change weight for link ${link.source.id} → ${link.target.id}\nCurrent weight: ${link.weight}`,
        link.weight
      );

      if (newWeight !== null && newWeight !== "") {
        const weight = parseInt(newWeight);
        if (!isNaN(weight) && weight > 0) {
          link.weight = weight;

          // Clear saved directed graph when modifying weights
          clearSavedDirectedGraph();

          // If in undirected mode, update the reverse link too
          if (!isDirectedGraph) {
            const sourceId =
              typeof link.source === "object" ? link.source.id : link.source;
            const targetId =
              typeof link.target === "object" ? link.target.id : link.target;
            const reverseLink = gData.links.find((l) => {
              const lSource =
                typeof l.source === "object" ? l.source.id : l.source;
              const lTarget =
                typeof l.target === "object" ? l.target.id : l.target;
              return lSource === targetId && lTarget === sourceId;
            });
            if (reverseLink) {
              reverseLink.weight = weight;
            }
          }

          Graph.graphData(gData); // Refresh graph
        } else {
          await popupManager.showConfirm(
            "Please enter a valid positive number"
          );
        }
      }

      // Reset after double-click
      lastLinkClick = null;
      lastLinkClickTime = 0;
    } else {
      // Single click - record it
      lastLinkClick = link;
      lastLinkClickTime = currentTime;
    }
  });
};

function updateForces() {
  const nodeCount = gData.nodes.length;

  // Giảm mạnh lực đẩy để graph ổn định hơn
  let linkDistance = Math.max(40, 100 - nodeCount * 3);
  let chargeStrength = Math.max(-100, -50 - nodeCount * 2);

  // Cập nhật các forces
  Graph.d3Force("link", d3.forceLink().distance(linkDistance))
    .d3Force("charge", d3.forceManyBody().strength(chargeStrength))
    .d3Force("collide", d3.forceCollide().radius(20).strength(0.5));
}

// Function để tìm link giữa 2 nodes
function findLink(node1Id, node2Id) {
  return gData.links.find((link) => {
    const sourceId =
      typeof link.source === "object" ? link.source.id : link.source;
    const targetId =
      typeof link.target === "object" ? link.target.id : link.target;

    return (
      (sourceId === node1Id && targetId === node2Id) ||
      (sourceId === node2Id && targetId === node1Id)
    );
  });
}

// Function để toggle link giữa 2 nodes
function toggleLinkBetweenNodes(node1, node2) {
  if (node1.id === node2.id) {
    console.log("Cannot link a node to itself");
    return;
  }

  // Clear saved directed graph when modifying links
  clearSavedDirectedGraph();

  const existingLink = findLink(node1.id, node2.id);
  if (existingLink) {
    // Xóa link nếu đã tồn tại
    const index = gData.links.indexOf(existingLink);
    gData.links.splice(index, 1);

    // If in undirected mode, also remove the reverse link
    if (!isDirectedGraph) {
      const reverseLink = gData.links.find((link) => {
        const sourceId =
          typeof link.source === "object" ? link.source.id : link.source;
        const targetId =
          typeof link.target === "object" ? link.target.id : link.target;
        return sourceId === node2.id && targetId === node1.id;
      });
      if (reverseLink) {
        const reverseIndex = gData.links.indexOf(reverseLink);
        gData.links.splice(reverseIndex, 1);
      }
    }

    console.log(`Link removed: ${node1.id} ↔ ${node2.id}`);
  } else {
    // Tạo link mới với weight mặc định = 1
    const newLink = {
      source: node1.id,
      target: node2.id,
      weight: 1,
    };
    gData.links.push(newLink);

    // If in undirected mode, also add the reverse link
    if (!isDirectedGraph) {
      const reverseLink = {
        source: node2.id,
        target: node1.id,
        weight: 1,
      };
      gData.links.push(reverseLink);
    }

    console.log(`Link created: ${node1.id} → ${node2.id}, weight: 1`);
  }

  // Refresh graph
  Graph.graphData(gData);
}

function addNode(id, name, icon, linkToNodeId = null, weight = 1) {
  // Clear saved directed graph when adding nodes
  clearSavedDirectedGraph();

  const newNode = { id, name, icon };
  gData.nodes.push(newNode);

  if (linkToNodeId !== null) {
    const link = {
      source: linkToNodeId,
      target: id,
      weight: weight,
    };
    gData.links.push(link);

    // If in undirected mode, also add the reverse link
    if (!isDirectedGraph) {
      const reverseLink = {
        source: id,
        target: linkToNodeId,
        weight: weight,
      };
      gData.links.push(reverseLink);
    }
  }

  // Cập nhật forces trước khi refresh graph
  updateForces();

  Graph.graphData(gData);
}

// Function to reset graph to initial state
function resetGraph() {
  // Clear saved directed graph
  clearSavedDirectedGraph();

  // Reset to initial state
  gData.nodes = [
    { id: "home", name: "Home", icon: "home" },
    { id: "school", name: "School", icon: "school" },
  ];
  gData.links = [{ source: "home", target: "school", weight: 1 }];

  // Reset nextChar to 'A'
  nextChar = "A";

  // Clear selections
  selectedNodes.clear();
  firstSelectedNode = null;
  selectedNode = null;
  hoverNode = null;
  hoverLink = null;
  lastLinkClick = null;
  lastLinkClickTime = 0;

  // Clear all visual properties from nodes and links
  gData.nodes.forEach((node) => {
    delete node._visualRingColor;
    delete node._highlighted;
    delete node._highlightColor;
    delete node._distance;
  });
  gData.links.forEach((link) => {
    delete link._highlighted;
    delete link._highlightColor;
  });

  // Update forces and refresh graph
  updateForces();
  Graph.graphData(gData);

  console.log("Graph reset to initial state");
}

document.getElementById("addNodeBtn").addEventListener("click", async () => {
  if (nextChar > "Z") {
    await popupManager.showConfirm("Maximum nodes reached (A-Z)!");
    return;
  }

  const nodeId = nextChar.toUpperCase();
  const nodeName = `${nextChar}`;
  const nodeIcon = nextChar;

  // Get all nodes except School
  const nonSchoolNodes = gData.nodes.filter((n) => n.id !== "school");

  // Rule 1: First 4 nodes (A-D) form main path from home to school
  if (nonSchoolNodes.length <= 4) {
    let linkFrom, linkToSchool;
    if (nonSchoolNodes.length === 1) {
      // First node A: home -> A -> school
      linkFrom = "home";
      linkToSchool = true;

      // Remove home -> school link (and reverse if undirected)
      const homeSchoolLink = gData.links.find(
        (link) =>
          (link.source === "home" || link.source.id === "home") &&
          (link.target === "school" || link.target.id === "school")
      );
      if (homeSchoolLink) {
        gData.links.splice(gData.links.indexOf(homeSchoolLink), 1);
      }

      // If undirected, also remove school -> home
      if (!isDirectedGraph) {
        const schoolHomeLink = gData.links.find(
          (link) =>
            (link.source === "school" || link.source.id === "school") &&
            (link.target === "home" || link.target.id === "home")
        );
        if (schoolHomeLink) {
          gData.links.splice(gData.links.indexOf(schoolHomeLink), 1);
        }
      }

      console.log(`Main path started: home -> ${nodeId} -> school`);
    } else {
      // Nodes B, C, D: Insert before school in main path
      const nodeBeforeSchool = gData.links.find(
        (link) => link.target === "school" || link.target.id === "school"
      );

      if (nodeBeforeSchool) {
        linkFrom =
          typeof nodeBeforeSchool.source === "object"
            ? nodeBeforeSchool.source.id
            : nodeBeforeSchool.source;
        linkToSchool = true;

        // Remove old link to school
        gData.links.splice(gData.links.indexOf(nodeBeforeSchool), 1);

        // If undirected, also remove the reverse link
        if (!isDirectedGraph) {
          const reverseLink = gData.links.find((link) => {
            const sourceId =
              typeof link.source === "object" ? link.source.id : link.source;
            const targetId =
              typeof link.target === "object" ? link.target.id : link.target;
            return sourceId === "school" && targetId === linkFrom;
          });
          if (reverseLink) {
            gData.links.splice(gData.links.indexOf(reverseLink), 1);
          }
        }

        console.log(`Main path extended: ${linkFrom} -> ${nodeId} -> school`);
      }
    }

    // Add the new node
    const weight = Math.floor(Math.random() * 20) + 1;
    addNode(nodeId, nodeName, nodeIcon, linkFrom, weight);
    // Connect to school
    if (linkToSchool) {
      const schoolWeight = Math.floor(Math.random() * 20) + 1;
      gData.links.push({
        source: nodeId,
        target: "school",
        weight: schoolWeight,
      });

      // If in undirected mode, also add the reverse link
      if (!isDirectedGraph) {
        gData.links.push({
          source: "school",
          target: nodeId,
          weight: schoolWeight,
        });
      }
    }

    Graph.graphData(gData);
  } // Rule 2: After D, create branch nodes with diverse connections
  else {
    // Add the new node first (without connections)
    addNode(nodeId, nodeName, nodeIcon, null, 1);

    // Lower chance to connect with Home (30% only - for diversity)
    const connectToHome = Math.random() < 0.3; // Only 30% chance
    if (connectToHome) {
      const homeToNode = Math.random() < 0.8; // 80% Home -> Node, 20% Node -> Home
      const homeWeight = Math.floor(Math.random() * 20) + 1;

      if (homeToNode) {
        gData.links.push({
          source: "home",
          target: nodeId,
          weight: homeWeight,
        });

        // If in undirected mode, also add the reverse link
        if (!isDirectedGraph) {
          gData.links.push({
            source: nodeId,
            target: "home",
            weight: homeWeight,
          });
        }
      } else {
        gData.links.push({
          source: nodeId,
          target: "home",
          weight: homeWeight,
        });

        // If in undirected mode, also add the reverse link
        if (!isDirectedGraph) {
          gData.links.push({
            source: "home",
            target: nodeId,
            weight: homeWeight,
          });
        }
      }
    }

    // Calculate priorities for connections - FOCUS ON OTHER NODES, NOT HOME
    const possibleTargets = [
      ...nonSchoolNodes.filter((n) => n.id !== "home"), // Exclude Home
      gData.nodes.find((n) => n.id === "school"),
    ];

    const targetPriorities = possibleTargets.map((node) => {
      let priority = 1;

      // HIGH priority for School (to ensure paths to School exist)
      if (node.id === "school") priority = 3;
      // HIGHER priority for other random nodes (creates diverse paths)
      else {
        // Prefer nodes in main path
        const connectedToSchool = gData.links.some((link) => {
          const sourceId =
            typeof link.source === "object" ? link.source.id : link.source;
          const targetId =
            typeof link.target === "object" ? link.target.id : link.target;
          return (
            (sourceId === node.id && targetId === "school") ||
            (targetId === node.id && sourceId === "school")
          );
        });
        if (connectedToSchool) priority = 2.5;

        // Prefer less connected nodes (balance the graph)
        const connectionCount = gData.links.filter((link) => {
          const sourceId =
            typeof link.source === "object" ? link.source.id : link.source;
          const targetId =
            typeof link.target === "object" ? link.target.id : link.target;
          return sourceId === node.id || targetId === node.id;
        }).length;

        if (connectionCount < 3) priority += 1; // Significant boost for less connected
      }

      return { node, priority };
    });

    // Weighted random selection
    const weightedRandom = (items) => {
      const totalPriority = items.reduce((sum, item) => sum + item.priority, 0);
      let random = Math.random() * totalPriority;

      for (const item of items) {
        random -= item.priority;
        if (random <= 0) return item.node;
      }
      return items[items.length - 1].node;
    };

    // Determine number of connections (2-3 for more diversity)
    let numConnections = 2;
    const rand = Math.random();
    if (rand < 0.4) numConnections = 2; // 40% chance - connect to 2 nodes
    else if (rand < 0.8) numConnections = 3; // 40% chance - connect to 3 nodes
    else numConnections = 1; // 20% chance - only 1 connection

    numConnections = Math.min(numConnections, targetPriorities.length);

    // Select target nodes
    const selectedTargets = [];
    const availableTargets = [...targetPriorities];

    for (let i = 0; i < numConnections; i++) {
      if (availableTargets.length === 0) break;

      const targetNode = weightedRandom(availableTargets);
      selectedTargets.push(targetNode.id);

      // Remove selected node from available pool
      const index = availableTargets.findIndex(
        (item) => item.node.id === targetNode.id
      );
      if (index !== -1) availableTargets.splice(index, 1);
    }
    // Create links: New Node -> Target Nodes (directed or undirected based on mode)
    selectedTargets.forEach((targetId) => {
      const linkExists = gData.links.some((link) => {
        const sourceId =
          typeof link.source === "object" ? link.source.id : link.source;
        const linkTargetId =
          typeof link.target === "object" ? link.target.id : link.target;
        return sourceId === nodeId && linkTargetId === targetId;
      });

      if (!linkExists) {
        const linkWeight = Math.floor(Math.random() * 20) + 1;
        gData.links.push({
          source: nodeId,
          target: targetId,
          weight: linkWeight,
        });

        // If in undirected mode, also add the reverse link
        if (!isDirectedGraph) {
          gData.links.push({
            source: targetId,
            target: nodeId,
            weight: linkWeight,
          });
        }
      }
    });

    Graph.graphData(gData);

    // Log the connections
    const homeConnection = connectToHome
      ? Math.random() < 0.8
        ? `home → ${nodeId}`
        : `${nodeId} → home`
      : "no home link";
    console.log(
      `Branch node: ${homeConnection} | ${nodeId} → [${selectedTargets.join(
        ", "
      )}]`
    );
  }

  nextChar = String.fromCharCode(nextChar.charCodeAt(0) + 1);
});

// Reset button event listener
document.getElementById("resetBtn").addEventListener("click", async () => {
  // Stop algorithm if running
  if (window.algorithmVisualizer && window.algorithmVisualizer.isRunning) {
    window.algorithmVisualizer.stopAlgorithm();
  }

  const confirmed = await popupManager.showConfirm(
    "Are you sure you want to reset the graph? All nodes and links will be removed."
  );
  if (confirmed) {
    resetGraph();
  }
});

// Export button event listener
document.getElementById("exportBtn").addEventListener("click", () => {
  const { matrix, nodes } = generateAdjacencyMatrix();
  const matrixText = matrix.map((row) => row.join(", ")).join("\n");
  const nodeNames = nodes.map((n) => n.name || n.id).join(", ");

  popupManager.showExport(matrixText, nodeNames);
});

// Import button event listener
document.getElementById("importBtn").addEventListener("click", async () => {
  const { matrix } = generateAdjacencyMatrix();
  const matrixText = await popupManager.showImport(matrix);

  if (!matrixText) {
    return; // User cancelled
  }

  try {
    // Parse the matrix
    const rows = matrixText
      .split("\n")
      .map((row) => row.split(",").map((val) => parseInt(val.trim())));

    // Validate matrix
    if (rows.length === 0) {
      throw new Error("Empty matrix");
    }

    const n = rows.length;
    for (const row of rows) {
      if (row.length !== n) {
        throw new Error("Matrix must be square");
      }
      if (row.some((val) => isNaN(val) || val < 0)) {
        throw new Error("Matrix must contain only non-negative numbers");
      }
    }

    // Import the matrix
    importFromAdjacencyMatrix(rows);
  } catch (err) {
    await popupManager.showConfirm(
      `Invalid matrix format: ${err.message}\n\nPlease enter a square matrix with non-negative numbers.`
    );
  }
});

// Function to generate adjacency matrix from graph
function generateAdjacencyMatrix() {
  // Sort nodes: Home first, School last, others in between
  const sortedNodes = [];
  const homeNode = gData.nodes.find((n) => n.id === "home");
  const schoolNode = gData.nodes.find((n) => n.id === "school");
  const otherNodes = gData.nodes.filter(
    (n) => n.id !== "home" && n.id !== "school"
  );

  if (homeNode) sortedNodes.push(homeNode);
  sortedNodes.push(...otherNodes);
  if (schoolNode) sortedNodes.push(schoolNode);

  const n = sortedNodes.length;

  // Create a map of node IDs to indices in sorted order
  const nodeIndexMap = {};
  sortedNodes.forEach((node, index) => {
    nodeIndexMap[node.id] = index;
  });

  // Initialize matrix with zeros
  const matrix = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  // Fill matrix with weights
  gData.links.forEach((link) => {
    const sourceId =
      typeof link.source === "object" ? link.source.id : link.source;
    const targetId =
      typeof link.target === "object" ? link.target.id : link.target;
    const sourceIndex = nodeIndexMap[sourceId];
    const targetIndex = nodeIndexMap[targetId];

    if (sourceIndex !== undefined && targetIndex !== undefined) {
      matrix[sourceIndex][targetIndex] = link.weight || 1;
    }
  });
  return { matrix, nodes: sortedNodes };
}

// Function to check if a matrix is symmetric (undirected graph)
function isMatrixSymmetric(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] !== matrix[j][i]) {
        return false;
      }
    }
  }
  return true;
}

// Function to import adjacency matrix and recreate graph
function importFromAdjacencyMatrix(matrix) {
  const n = matrix.length;

  // Clear saved directed graph when importing
  clearSavedDirectedGraph();

  // Detect if matrix is symmetric (undirected)
  const isSymmetric = isMatrixSymmetric(matrix);
  const toggleBtn = document.getElementById("graphDirectionToggle");

  if (isSymmetric) {
    // Set to undirected mode
    isDirectedGraph = false;
    toggleBtn.classList.add("undirected");
    Graph.linkDirectionalArrowLength(0);
    console.log("Detected undirected graph (symmetric matrix)");
  } else {
    // Set to directed mode
    isDirectedGraph = true;
    toggleBtn.classList.remove("undirected");
    Graph.linkDirectionalArrowLength(12);
    console.log("Detected directed graph (asymmetric matrix)");
  }

  // Clear current graph
  gData.nodes = [];
  gData.links = [];

  // Create nodes based on matrix size
  // First node is always Home, last node is always School
  if (n >= 1) {
    gData.nodes.push({ id: "home", name: "Home", icon: "home" });
  }

  // Add middle nodes as A, B, C, etc.
  let currentChar = "A";
  for (let i = 1; i < n - 1; i++) {
    const nodeId = currentChar.toLowerCase();
    const nodeName = `Location ${currentChar}`;
    gData.nodes.push({
      id: nodeId,
      name: nodeName,
      icon: currentChar,
    });
    currentChar = String.fromCharCode(currentChar.charCodeAt(0) + 1);
  }

  // Add School as last node
  if (n >= 2) {
    gData.nodes.push({ id: "school", name: "School", icon: "school" });
  }

  // Update nextChar for future additions
  nextChar = currentChar;

  // Create links based on matrix
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] > 0) {
        const sourceId = gData.nodes[i].id;
        const targetId = gData.nodes[j].id;
        gData.links.push({
          source: sourceId,
          target: targetId,
          weight: matrix[i][j],
        });
      }
    }
  }

  // Clear selections
  selectedNodes.clear();
  firstSelectedNode = null;
  selectedNode = null;
  hoverNode = null;
  hoverLink = null;

  // Update forces and refresh graph
  updateForces();
  Graph.graphData(gData);

  console.log(`Graph imported with ${n} nodes and ${gData.links.length} links`);
}

// ============================================================
// Mobile Detection & Panels Toggle for Algorithm Running
// ============================================================

let isMobileMode = false;
let isAlgoRunning = false;

function detectMobile() {
  isMobileMode = window.innerWidth <= 768;
}

function updateUIForAlgoState() {
  const helpToggle = document.getElementById("helpPanelToggle");
  const panelsToggle = document.getElementById("panelsToggle");
  const toolbar = document.getElementById("toolbar");
  const stepTable = document.getElementById("stepTableWindow");
  const resultPanel = document.getElementById("resultPanel");

  if (isMobileMode && isAlgoRunning) {
    // Hide Help Panel button, show Panels button
    helpToggle.classList.add("hidden");
    panelsToggle.classList.remove("hidden");

    // Hide toolbar on mobile during algorithm
    toolbar.style.display = "none";

    // Hide Step Table and Result Panel initially on mobile
    // They will only show when user clicks Panels dropdown items
    stepTable.classList.add("hidden");
    resultPanel.classList.add("hidden");
  } else if (isMobileMode && !isAlgoRunning) {
    // Show Help Panel button, hide Panels button
    helpToggle.classList.remove("hidden");
    panelsToggle.classList.add("hidden");

    // Show toolbar on mobile when algorithm stops
    toolbar.style.display = "flex";
  } else {
    // Desktop: always show help, never show panels button
    helpToggle.classList.remove("hidden");
    panelsToggle.classList.add("hidden");

    // Desktop: always show toolbar
    toolbar.style.display = "flex";
  }
}

function initPanelsToggle() {
  const panelsToggle = document.getElementById("panelsToggle");
  const panelsDropdown = document.getElementById("panelsDropdown");
  const stepTableBtn = document.getElementById("panelsStepTableBtn");
  const resultBtn = document.getElementById("panelsResultBtn");

  let isDropdownOpen = false;

  // Toggle dropdown
  panelsToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
    if (isDropdownOpen) {
      panelsDropdown.classList.add("show");
    } else {
      panelsDropdown.classList.remove("show");
    }
  });
  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      isDropdownOpen &&
      !panelsDropdown.contains(e.target) &&
      !panelsToggle.contains(e.target)
    ) {
      isDropdownOpen = false;
      panelsDropdown.classList.remove("show");
    }
  });

  // Step Table button
  stepTableBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const stepTable = document.getElementById("stepTableWindow");
    if (stepTable.classList.contains("hidden")) {
      stepTable.classList.remove("hidden");
    } else {
      stepTable.classList.add("hidden");
    }
    // Close dropdown
    isDropdownOpen = false;
    panelsDropdown.classList.remove("show");
  });

  // Result button
  resultBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const resultPanel = document.getElementById("resultPanel");
    if (resultPanel.classList.contains("hidden")) {
      resultPanel.classList.remove("hidden");
    } else {
      resultPanel.classList.add("hidden");
    }
    // Close dropdown
    isDropdownOpen = false;
    panelsDropdown.classList.remove("show");
  });
}

// Detect mobile on load and resize
window.addEventListener("resize", () => {
  detectMobile();
  updateUIForAlgoState();
});

detectMobile();

// Initialize on load
initPanelsToggle();
