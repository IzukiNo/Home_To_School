# 🏠➡️🏫 Home to School - Interactive Graph Visualization Tool

> A sophisticated, web-based graph visualization platform for exploring and learning shortest path algorithms through interactive, step-by-step visualizations.

[![Graph Visualization](https://img.shields.io/badge/Graph-Visualization-blue)](https://github.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![D3.js](https://img.shields.io/badge/D3.js-v7-orange)](https://d3js.org/)
[![Mobile Ready](https://img.shields.io/badge/Mobile-Optimized-green)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-purple)](LICENSE)

**Home to School** is an educational tool designed for students, educators, and algorithm enthusiasts to visualize and understand graph algorithms in an intuitive, interactive environment. Built with modern web technologies and featuring a beautiful glassmorphism UI, it transforms complex algorithmic concepts into engaging visual experiences.

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [🚀 Quick Start](#-quick-start)
- [📖 User Guide](#-user-guide)
- [🧮 Algorithm Visualization](#-algorithm-visualization)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🎨 Customization](#-customization)
- [📱 Browser Support](#-browser-support)
- [🔧 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Credits](#-credits)

## ✨ Key Features

### 🎯 At a Glance

| Category                | Capabilities                                                                |
| ----------------------- | --------------------------------------------------------------------------- |
| **🎨 User Interface**   | Glassmorphism design • Collapsible toolbar • Contextual help panel          |
| **📊 Graph Editing**    | Visual node/link creation • Drag & drop • Weight adjustment • Smart linking |
| **🔄 Graph Modes**      | Directed/Undirected toggle • Auto-detection on import                       |
| **🧮 Algorithms**       | Dijkstra's algorithm • Step-by-step visualization • Interactive playback    |
| **🤖 Smart Generation** | 2-phase intelligent node placement • Weighted random connections            |
| **💾 Data Management**  | Adjacency matrix import/export • Clipboard integration                      |
| **📱 Mobile Ready**     | Touch-optimized • Responsive design • Auto-zoom support                     |
| **🎯 Visualization**    | Force-directed layout • Real-time physics • Interactive step table          |

---

### 🎨 Beautiful User Experience

#### Modern Glassmorphism UI

- **Frosted Glass Effects**: Backdrop blur with semi-transparent layers
- **Smooth Animations**: Cubic-bezier easing for natural motion
- **Collapsible Controls**: Minimize UI clutter with animated toolbar
- **Contextual Help**: Comprehensive slide-up panel with usage instructions
- **SVG Icons**: Crisp, scalable icons for all interface elements

#### Interactive Graph Canvas

- **Force-Directed Layout**: Physics-based node positioning using D3.js
- **Drag & Drop**: Intuitive node repositioning with visual feedback
- **Grid Alignment**: Optional grid overlay for precise placement
- **Zoom & Pan**: Smooth mouse wheel zoom and click-drag navigation
- **Smart Highlighting**: Hover effects on nodes and edges

---

### 🧠 Intelligent Node Generation System

The application implements a sophisticated **two-phase algorithm** for automatic graph generation:

#### **Phase 1: Main Path Construction (Nodes A-D)**

Creates a foundational linear path ensuring basic connectivity:

```
Home → A → B → C → D → School
```

- Sequentially inserts nodes into the main pathway
- Removes direct Home→School link
- Assigns random edge weights (1-20)
- Guarantees at least one path to destination

#### **Phase 2: Branch Network Creation (Nodes E-Z)**

Generates a diverse network topology with strategic connections:

- **30% Home Connectivity**: Limited direct connections to start node (prevents star topology)
- **70% Internal Connections**: Focuses on inter-node relationships
- **2-3 Outgoing Edges**: Each new node creates multiple paths
- **Weighted Priority System**:
  - School node: 3.0x priority (ensures goal reachability)
  - Less-connected nodes: Higher priority (balances topology)
- **Bidirectional Options**: Randomly assigns edge directions

**📚 Implementation Details**: See [GRAPH_LOGIC_VI.md](docs/GRAPH_LOGIC_VI.md)

---

### 🧮 Algorithm Visualization Engine

#### Step-by-Step Dijkstra's Algorithm

- **Interactive Playback**: Play, pause, step forward/backward through algorithm execution
- **Visual State Display**: See distances, visited nodes, and current frontier
- **Step Table Window**: Resizable, draggable table showing algorithm state at each iteration
- **Path Highlighting**: Select any destination to highlight the shortest path
- **Speed Control**: Adjustable playback speed (0.25x - 4.0x)

#### Real-Time Algorithm State

- **Distance Updates**: Watch distances change as algorithm explores
- **Node Selection**: Visual indication of current node being processed
- **Edge Relaxation**: See edge weights being evaluated
- **Final Results**: Complete path summary with total weights

---

### 🔄 Graph Direction Management

#### Directed & Undirected Modes

- **Toggle Button**: Easily switch between directed and undirected graphs
- **Auto-Detection**: Imports automatically detect symmetry (undirected) vs asymmetry (directed)
- **State Preservation**: Directed state saved when switching to undirected mode
- **Visual Feedback**: Arrow indicators show/hide based on current mode
- **Smart Conversion**: Bidirectional edge creation in undirected mode

---

### 📊 Data Import/Export

#### Adjacency Matrix Support

- **Export Format**: Standard comma-separated matrix representation
- **Import Validation**: Checks for square matrix and valid numeric values
- **Node Ordering**: Consistent ordering (Home, A-Z alphabetically, School)
- **Clipboard Integration**: One-click copy to clipboard
- **Format Example**:
  ```
  0, 5, 0, 10
  0, 0, 3, 0
  0, 0, 0, 7
  0, 0, 0, 0
  ```

---

### 🎯 Special Node Types

| Node Type        | Color  | Symbol | Purpose                    |
| ---------------- | ------ | ------ | -------------------------- |
| **Home**         | Green  | 🏠     | Algorithm start point      |
| **School**       | Orange | 🏫     | Algorithm goal/destination |
| **Custom (A-Z)** | Teal   | A-Z    | Intermediate waypoints     |

#### Visual Enhancements

- **Distinctive Rings**: Special nodes have colored highlight rings
- **Custom SVG Icons**: Home and School nodes display custom graphics
- **Hover States**: All elements highlight on mouse hover
- **Selection Feedback**: Green rings indicate selected nodes for linking

---

### 📱 Mobile & Responsive Design

#### Adaptive Layout

- **Breakpoint Optimization**:
  - Desktop (1920px+): Full feature set
  - Laptop (1366px-1920px): Optimized spacing
  - Tablet (768px-1366px): Auto-zoom 2x
  - Mobile (320px-768px): Auto-zoom 1.3x, simplified UI

#### Touch Optimization

- **No Tap Highlights**: Disabled blue touch highlights for native feel
- **Touch Gestures**: Pinch-to-zoom, drag-to-pan support
- **Orientation Handling**: Smooth transitions on device rotation
- **Bottom Panels**: Help panel slides from bottom on mobile

---

## 🚀 Quick Start

### Prerequisites

**Required:**

- Modern web browser (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- JavaScript enabled

**Optional:**

- Local HTTP server (for optimal development experience)
- Git (for cloning repository)

**No Installation Required!** This is a pure client-side application with zero dependencies to install.

---

### Installation Methods

#### Method 1: Direct Download (Easiest)

1. Download the project as a ZIP file
2. Extract to any folder on your computer
3. Double-click `index.html` to open in your default browser

```bash
# Windows PowerShell
Expand-Archive home-to-school.zip -DestinationPath .\home-to-school
cd home-to-school
start index.html
```

#### Method 2: Git Clone (Recommended for Developers)

```bash
# Clone the repository
git clone https://github.com/yourusername/home-to-school.git
cd home-to-school

# Open in browser
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

#### Method 3: Local Development Server (Best Experience)

For features requiring local server (clipboard API, certain browser security features):

**Using Python 3:**

```bash
cd home-to-school
python -m http.server 8000
```

**Using Node.js:**

```bash
cd home-to-school
npx http-server -p 8000
```

**Using PHP:**

```bash
cd home-to-school
php -S localhost:8000
```

**Using VS Code:**

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

Then navigate to: **`http://localhost:8000`**

---

### First Run Checklist

✅ Browser JavaScript is enabled  
✅ Browser allows canvas rendering  
✅ Popup blocker doesn't interfere with dialogs  
✅ Clipboard access permission granted (for export feature)

**That's it!** The application is now ready to use—no build process, no npm install, no configuration files.

## 📖 User Guide

### Getting Started with the Interface

#### Main Components

1. **Graph Canvas**: Central interactive area showing nodes and edges
2. **Toolbar** (Top): Main controls for graph manipulation
3. **Algorithm Controls** (Right side): Start algorithm visualization
4. **Step Controller** (Bottom): Control algorithm playback
5. **Help Button** (Bottom-right): Access comprehensive help panel

---

### Basic Graph Operations

#### Adding Nodes

1. Click **"Add Node"** button in the toolbar
2. A new node is created with automatic label (A-Z)
3. Node is positioned using force-directed layout

**Intelligent Placement:**

- **First 4 nodes (A-D)**: Form main path `Home → A → B → C → D → School`
- **Subsequent nodes (E-Z)**: Create branch connections with:
  - 30% chance to connect with Home
  - 2-3 connections to other nodes
  - Higher priority given to School and less-connected nodes

#### Creating Links Between Nodes

1. **Click first node** → Node highlights with green ring
2. **Click second node** → Creates directed edge between them
3. **Click same pair again** → Removes the edge

**Features:**

- Links are directional (arrows indicate direction)
- In undirected mode, creates bidirectional edges
- Visual feedback during selection process

#### Editing Link Weights

1. **Double-click** on any edge/link
2. Enter new weight value in popup dialog (range: 1-999)
3. Click **OK** to apply changes

**Note:** Weights represent distance/cost/time between nodes

#### Moving Nodes

- **Click and drag** any node to reposition it
- Force simulation automatically adjusts connected nodes
- Grid overlay helps with precise alignment
- Release to let physics engine stabilize layout

#### Toggling Toolbar Visibility

- Click **circular toggle button** (⊕/⊖) at top-center
- Hides/shows toolbar with smooth animation
- Provides clean workspace for focused viewing

#### Accessing Help

- Click **"?"** icon in bottom-right corner
- Comprehensive help panel slides up
- Includes all features, shortcuts, and usage tips
- Close by clicking **×** or outside the panel

---

### Navigation & Interaction Reference

| Action                | Method                                  | Notes                          |
| --------------------- | --------------------------------------- | ------------------------------ |
| **Pan Canvas**        | Click & drag empty space                | Move entire graph view         |
| **Zoom In/Out**       | Mouse wheel scroll                      | Smooth zoom to cursor position |
| **Select Node**       | Single click on node                    | Green highlight ring appears   |
| **Create Link**       | Click node 1 → Click node 2             | Directed edge created          |
| **Remove Link**       | Click node 1 → Click node 2 (if exists) | Existing edge deleted          |
| **Edit Weight**       | Double-click on edge                    | Popup dialog for new value     |
| **Move Node**         | Click & drag node                       | Repositions with animation     |
| **Toggle Toolbar**    | Click toggle button (top-center)        | Show/hide main toolbar         |
| **Switch Graph Mode** | Click direction toggle (near toolbar)   | Directed ↔ Undirected          |
| **Close Dialog**      | Click outside or × button               | Dismisses popup windows        |

**💡 Pro Tips:**

- **Hover effects**: Edges and nodes highlight for easy identification
- **Physics simulation**: Graph auto-organizes for optimal viewing
- **Grid alignment**: Use grid as visual guide for neat layouts
- **Undo workaround**: Use Export before major changes for quick rollback

---

### Advanced Features

#### Exporting Your Graph

1. Click **"Export"** button in toolbar
2. Review adjacency matrix in popup dialog
3. Node order displayed at top (Home, A-Z, School)
4. Click **"Copy to Clipboard"** to copy matrix
5. Paste into spreadsheet or text editor

**Matrix Format:**

```
0, 5, 0, 10
0, 0, 3, 0
0, 0, 0, 7
0, 0, 0, 0
```

- Rows represent source nodes
- Columns represent target nodes
- Values are edge weights (0 = no edge)

#### Importing a Graph

1. Click **"Import"** button in toolbar
2. Paste adjacency matrix into text area
3. Format: comma-separated values, one row per line
4. Matrix must be square (n×n for n nodes)
5. Click **"Import"** to load

**Auto-Detection:**

- Symmetric matrix → Detected as **undirected**
- Asymmetric matrix → Detected as **directed**

**Example Input:**

```
0, 5, 0, 0
5, 0, 3, 0
0, 3, 0, 7
0, 0, 7, 0
```

#### Resetting the Graph

1. Click **"Reset Graph"** button
2. Confirm action in popup dialog
3. Graph returns to initial state: `Home → School`
4. All custom nodes (A-Z) are removed
5. Node counter resets to 'A'

**Use Cases:**

- Start fresh design
- Clear complex graphs
- Reset after experiments

---

## 🧮 Algorithm Visualization

### Dijkstra's Algorithm Implementation

The application provides an **interactive, step-by-step visualization** of Dijkstra's shortest path algorithm.

#### How It Works

**Algorithm Overview:**

- Finds shortest weighted path from Home (source) to all other nodes
- Time Complexity: **O((V + E) log V)** where V = vertices, E = edges
- Optimal for graphs with non-negative edge weights
- Uses priority queue for efficient node selection

**Visualization Features:**

1. **Start Algorithm**

   - Click **"Start"** button in algorithm controls
   - Algorithm automatically runs from Home node
   - Step controller appears at bottom

2. **Playback Controls**

   - ▶️ **Play**: Auto-advance through steps (adjustable speed)
   - ⏸️ **Pause**: Stop auto-playback
   - ⏮️ **First Step**: Jump to algorithm initialization
   - ◀️ **Previous Step**: Step backward one iteration
   - ▶️ **Next Step**: Step forward one iteration
   - ⏭️ **Last Step**: Jump to final result

3. **Speed Control**

   - Slider adjusts playback speed: **0.25x to 4.0x**
   - Real-time speed display
   - Instant application during playback

4. **Visual Indicators**

   - 🟢 **Current Node**: Node being processed (highlighted)
   - 🔵 **Visited Nodes**: Already processed (blue tint)
   - 🟡 **Frontier**: Nodes with tentative distances (yellow)
   - 🟠 **Edges Being Relaxed**: Current edge evaluation (orange)
   - 🟣 **Shortest Path**: Final path highlighted (purple)

5. **Step Table Window**

   - **Resizable & Draggable**: Position and size to preference
   - **Iteration Rows**: Each row shows algorithm state at that step
   - **Distance Updates**: See how distances change per iteration
   - **Previous Node Tracking**: Shows parent pointers for path reconstruction
   - **Visited Status**: Visual indication of processed nodes

6. **Path Selector**

   - Dropdown to select any destination node
   - Highlights shortest path from Home to selected node
   - Displays total path weight
   - Shows node sequence

7. **Result Panel**
   - Complete distance table for all nodes
   - Path strings for each destination
   - Reachability status
   - Total weights calculated

#### Understanding the Visualization

**Step Types:**

| Step Type  | Description                                   | Visual Effect           |
| ---------- | --------------------------------------------- | ----------------------- |
| **init**   | Algorithm initialization, start node selected | Home node highlighted   |
| **select** | New node selected from priority queue         | Node glows green        |
| **check**  | Edge being evaluated for relaxation           | Edge highlighted orange |
| **update** | Distance improved, parent updated             | Node updates to yellow  |
| **end**    | Algorithm complete, all paths found           | Final highlighting      |

**Reading the Step Table:**

```
| Iteration | Node | Distance | Previous |
|-----------|------|----------|----------|
| 1         | Home | 0        | -        |
| 2         | A    | 5        | Home     |
| 3         | B    | 8        | A        |
```

- **Iteration**: Step number in algorithm execution
- **Node**: Node currently selected/processed
- **Distance**: Current shortest distance from Home
- **Previous**: Parent node in shortest path tree

---

## 🏗️ Architecture

### System Design Overview

The application follows a **component-based architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────┐
│           User Interface Layer              │
│  (HTML/CSS - Glassmorphism UI Components)   │
└─────────────┬───────────────────────────────┘
              │
┌─────────────▼───────────────────────────────┐
│        Application Logic Layer              │
│   (JavaScript - Event Handlers & State)     │
├─────────────────────────────────────────────┤
│  • script.js      - Main app & graph mgmt   │
│  • visualizer.js  - Algorithm visualization │
│  • popup.js       - Dialog management       │
│  • algorithm.js   - Dijkstra implementation │
└─────────────┬───────────────────────────────┘
              │
┌─────────────▼───────────────────────────────┐
│         Visualization Layer                 │
│     (D3.js + force-graph Library)           │
├─────────────────────────────────────────────┤
│  • Force-directed layout                    │
│  • Canvas rendering                         │
│  • Interactive physics simulation           │
└─────────────────────────────────────────────┘
```

### Core Components

#### 1. **Graph Manager** (`script.js`)

**Responsibilities:**

- Graph data structure management (`nodes`, `links`)
- Force-graph instance initialization and configuration
- User interaction handling (click, drag, hover)
- Node generation algorithm (2-phase system)
- Import/export functionality
- Directed/undirected mode management

**Key Functions:**

- `addNode()` - Adds new node with intelligent connection logic
- `resetGraph()` - Returns to initial state
- `toggleGraphDirection()` - Switches between directed/undirected
- `exportGraph()` - Generates adjacency matrix
- `importGraph()` - Parses and loads matrix data

#### 2. **Algorithm Visualizer** (`visualizer.js`)

**Responsibilities:**

- Step-by-step algorithm execution management
- Playback controls (play, pause, step forward/backward)
- Visual state highlighting on graph
- Step table generation and updates
- Result panel display

**Key Class: `AlgorithmVisualizer`**

```javascript
class AlgorithmVisualizer {
  startAlgorithm()      // Initiates visualization
  nextStep()            // Advances to next step
  previousStep()        // Goes back one step
  togglePlay()          // Starts/stops auto-play
  highlightPath(nodeId) // Shows shortest path
  displayResults()      // Shows final results
}
```

#### 3. **Algorithm Engine** (`algorithm.js`)

**Responsibilities:**

- Pure algorithm implementations
- Detailed step generation for visualization
- Distance and path calculations

**Key Function: `dijkstraDetailed()`**

```javascript
function dijkstraDetailed(gData, startId, isDirected) {
  // Returns: { steps: [], result: {} }
  // steps: Array of algorithm state snapshots
  // result: Final distances and paths for all nodes
}
```

**Step Object Structure:**

```javascript
{
  type: 'select' | 'check' | 'update' | 'init' | 'end',
  chosen: nodeIndex,
  from: sourceNodeIndex,
  to: targetNodeIndex,
  newDistance: number,
  description: string,
  distances: [...],
  previous: [...],
  visited: [...]
}
```

#### 4. **Popup Manager** (`popup.js`)

**Responsibilities:**

- Dialog/modal stack management
- Promise-based async dialog handling
- Overlay and keyboard event handling

**Key Class: `PopupManager`**

```javascript
class PopupManager {
  show(dialogId, setupCallback)  // Shows dialog
  showConfirm(message)           // Confirmation dialog
  showPrompt(message, value)     // Input dialog
  closeTopPopup()                // Closes active dialog
}
```

### Data Flow

#### Graph Editing Flow

```
User Click → Event Handler → Update gData → Force-graph Update → Canvas Re-render
```

#### Algorithm Visualization Flow

```
Start Button → Run Algorithm → Generate Steps → Initialize Visualizer
     ↓
Step Control → Update Visual State → Highlight Graph Elements → Update Step Table
     ↓
Path Selector → Reconstruct Path → Highlight Path Edges → Show in Result Panel
```

### State Management

**Global State Objects:**

```javascript
// Graph data
const gData = { nodes: [...], links: [...] }

// Graph mode
let isDirectedGraph = true
let savedDirectedGraph = null

// Selection state
const selectedNodes = new Set()
let firstSelectedNode = null

// Visual state
const highlightNodes = new Set()
const highlightLinks = new Set()
let hoverNode = null
let hoverLink = null
```

**Visualizer State:**

```javascript
{
  steps: [],              // Algorithm step history
  currentStep: -1,        // Current playback position
  isPlaying: false,       // Auto-play status
  speed: 1.0,            // Playback speed
  result: {},            // Final algorithm results
  highlightedNodes: Set, // Nodes to highlight
  visitedNodes: Set,     // Processed nodes
  pathHighlight: Set     // Current path edges
}
```

---

## 🛠️ Tech Stack

### Core Technologies

| Technology     | Version | Purpose                            |
| -------------- | ------- | ---------------------------------- |
| **HTML5**      | -       | Semantic structure, Canvas element |
| **CSS3**       | -       | Styling, animations, glassmorphism |
| **JavaScript** | ES6+    | Application logic, algorithms      |

### External Libraries

| Library         | Version | CDN Link                             | Purpose                     |
| --------------- | ------- | ------------------------------------ | --------------------------- |
| **D3.js**       | v7      | `https://d3js.org/d3.v7.min.js`      | Force simulation & physics  |
| **force-graph** | Latest  | `//cdn.jsdelivr.net/npm/force-graph` | Interactive graph rendering |

**Zero Dependencies**: No npm, no build process, no bundlers required!

### Browser APIs Utilized

- **Canvas 2D Context**: Custom node/link rendering
- **DOM API**: Dynamic UI updates and event handling
- **Clipboard API**: Copy adjacency matrix to clipboard
- **ResizeObserver**: Responsive canvas sizing
- **Web Storage API**: (Future: Persist user preferences)

### CSS Features

| Feature                   | Usage                                 |
| ------------------------- | ------------------------------------- |
| `backdrop-filter: blur()` | Glassmorphism effect                  |
| CSS Grid & Flexbox        | Responsive layouts                    |
| CSS Transitions           | Smooth animations (0.4s cubic-bezier) |
| CSS Custom Properties     | Theme colors and consistent spacing   |
| Media Queries             | Mobile, tablet, desktop optimizations |
| Transform & Animation     | Toolbar collapse, panel slides        |

### JavaScript ES6+ Features

- **Classes**: `AlgorithmVisualizer`, `PopupManager`
- **Arrow Functions**: Concise event handlers
- **Template Literals**: Dynamic string building
- **Destructuring**: Clean parameter extraction
- **Promises**: Async dialog management
- **Set/Map**: Efficient collection management
- **Modules**: (Future: Could be modularized with ES6 modules)

### D3.js Force Simulation

**Forces Applied:**

```javascript
.d3Force('link', d3.forceLink()
  .distance(link => link.weight * 2 + 50)
  .strength(0.5))
.d3Force('charge', d3.forceManyBody()
  .strength(-300))
.d3Force('collide', d3.forceCollide()
  .radius(25))
.d3Force('center', d3.forceCenter())
```

- **Link Force**: Edge length proportional to weight
- **Charge Force**: Node repulsion for spacing
- **Collide Force**: Prevents node overlap
- **Center Force**: Keeps graph centered

---

## 📂 Project Structure

```
Home_To_School/
│
├── 📄 index.html                    # Main application entry point
├── 📄 README.md                     # Complete project documentation
│
├── 📁 css/
│   └── styles.css                   # Main stylesheet (1787 lines)
│       ├── Glassmorphism UI effects
│       ├── Responsive breakpoints
│       ├── Toolbar & control styling
│       ├── Popup/dialog system
│       ├── Step table & visualizer
│       └── Animation keyframes
│
├── 📁 js/
│   ├── script.js                    # Core application logic (1326 lines)
│   │   ├── Graph data management
│   │   ├── Force-graph initialization
│   │   ├── Node generation algorithms
│   │   ├── Event handlers (click, drag, hover)
│   │   ├── Import/export functions
│   │   ├── Directed/undirected toggle
│   │   └── Custom node rendering
│   │
│   ├── algorithm.js                 # Algorithm implementations (357 lines)
│   │   ├── dijkstraDetailed() - Step-by-step Dijkstra
│   │   ├── bellmanFordDetailed() - Bellman-Ford (partial)
│   │   └── Step object generation for visualization
│   │
│   ├── visualizer.js                # Algorithm visualization engine (1383 lines)
│   │   ├── AlgorithmVisualizer class
│   │   ├── Playback controls (play, pause, step)
│   │   ├── Step table management (resizable, draggable)
│   │   ├── Path highlighting
│   │   ├── Result panel display
│   │   └── Speed control
│   │
│   └── popup.js                     # Dialog management system (338 lines)
│       ├── PopupManager class
│       ├── Dialog stack handling
│       ├── Promise-based async dialogs
│       ├── showConfirm(), showPrompt() utilities
│       └── Overlay & keyboard event handling
│
├── 📁 assets/
│   ├── favicon.png                  # Browser tab icon
│   ├── home.svg                     # Home node custom icon (🏠)
│   └── school.svg                   # School node custom icon (🏫)
│
└── 📁 docs/
    ├── GRAPH_LOGIC_VI.md            # Node generation algorithm (Vietnamese, 424 lines)
    ├── GUIDE.md                     # Extended user guide
    └── CREDITS.md                   # Attributions & licenses (135 lines)
```

### Detailed File Descriptions

#### **`index.html`** (533 lines)

**Purpose**: Main HTML structure and UI components

**Key Sections:**

- `<head>`: Meta tags, Open Graph, Twitter Card, external CDN links
- Collapsible toolbar with button controls
- Graph direction toggle button (directed/undirected)
- Algorithm controls (selector, start button)
- Graph canvas container (force-graph renders here)
- Step controller with playback buttons
- Step table window (resizable, draggable)
- Path visualizer and result panel
- Help panel with comprehensive instructions
- Popup dialogs (confirm, prompt, import, export)
- Watermark footer

**External Dependencies:**

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/force-graph"></script>
```

---

#### **`css/styles.css`** (1787 lines)

**Purpose**: Complete styling system with modern UI effects

**Style Categories:**

| Section                  | Lines     | Purpose                             |
| ------------------------ | --------- | ----------------------------------- |
| Global Reset             | 1-20      | Box-sizing, tap highlight removal   |
| Toolbar                  | 21-150    | Collapsible toolbar, glassmorphism  |
| Graph Direction Toggle   | 151-200   | Toggle button styling               |
| Algorithm Controls       | 201-280   | Right-side control panel            |
| Step Controller          | 281-420   | Bottom playback controls            |
| Step Table               | 421-680   | Resizable table window              |
| Path Visualizer          | 681-780   | Path selector and display           |
| Result Panel             | 781-900   | Algorithm results display           |
| Help Panel               | 901-1080  | Slide-up help documentation         |
| Popup System             | 1081-1320 | Modal dialogs and overlays          |
| Watermark                | 1321-1380 | Footer attribution                  |
| Responsive Media Queries | 1381-1787 | Mobile, tablet, desktop breakpoints |

**Key CSS Techniques:**

- `backdrop-filter: blur(10px)` - Glassmorphism
- `transition: all 0.4s cubic-bezier(...)` - Smooth animations
- Flexbox & Grid for responsive layouts
- CSS custom properties for theming
- Media queries for 4 breakpoints (320px, 768px, 1366px, 1920px+)

---

#### **`js/script.js`** (1326 lines)

**Purpose**: Main application controller and graph management

**Major Sections:**

| Section                     | Lines     | Description                            |
| --------------------------- | --------- | -------------------------------------- |
| Initial Data Setup          | 1-50      | Default graph (Home → School)          |
| Graph Direction Management  | 51-180    | Directed/undirected toggle logic       |
| Toolbar & UI Initialization | 181-220   | Event listeners for toolbar buttons    |
| SVG Icon Loading            | 221-260   | Async loading of home/school SVG icons |
| Custom Node Drawing         | 261-380   | Canvas rendering for custom node types |
| Force-Graph Configuration   | 381-580   | D3.js force-graph initialization       |
| Node Interaction Handlers   | 581-720   | Click, drag, hover event handlers      |
| Link Interaction Handlers   | 721-820   | Double-click for weight editing        |
| Node Generation Algorithm   | 821-1050  | 2-phase intelligent node placement     |
| Import/Export Functions     | 1051-1200 | Adjacency matrix conversion            |
| Reset & Utility Functions   | 1201-1326 | Graph reset, force updates             |

**Key Global Variables:**

```javascript
const gData = { nodes: [...], links: [...] }  // Main graph data
let nextChar = "A"                             // Node label counter
let isDirectedGraph = true                     // Graph mode
let savedDirectedGraph = null                  // State backup
const selectedNodes = new Set()                // Selection tracking
```

**Core Functions:**

- `addNode(id, name, icon, linkFrom, weight)` - Node creation with connection logic
- `toggleGraphDirection()` - Switches between directed/undirected modes
- `exportGraph()` - Generates adjacency matrix string
- `importGraph(matrixText)` - Parses and validates matrix input
- `resetGraph()` - Clears all custom nodes, returns to initial state

---

#### **`js/algorithm.js`** (357 lines)

**Purpose**: Pure algorithm implementations with detailed step tracking

**Functions:**

| Function                | Lines   | Purpose                                   |
| ----------------------- | ------- | ----------------------------------------- |
| `dijkstraDetailed()`    | 1-180   | Dijkstra's algorithm with step generation |
| `bellmanFordDetailed()` | 181-357 | Bellman-Ford algorithm (partial impl.)    |

**`dijkstraDetailed()` Return Structure:**

```javascript
{
  steps: [
    { type: 'init', chosen: 0, description: '...', distances: [...] },
    { type: 'select', chosen: 2, description: '...', distances: [...] },
    { type: 'check', from: 2, to: 3, newDistance: 15, ... },
    { type: 'update', from: 2, to: 3, newDistance: 15, ... },
    { type: 'end', description: '...', ... }
  ],
  result: {
    'home': { distance: 0, pathIds: ['home'], pathNames: ['Home'], ... },
    'school': { distance: 25, pathIds: ['home', 'A', 'B', 'school'], ... },
    ...
  }
}
```

**Step Types:**

- `init` - Algorithm initialization
- `select` - Node selected from priority queue
- `check` - Edge being evaluated (relaxation check)
- `update` - Distance updated (relaxation performed)
- `end` - Algorithm completion

---

#### **`js/visualizer.js`** (1383 lines)

**Purpose**: Manages step-by-step algorithm visualization

**Class: `AlgorithmVisualizer`**

**Major Methods:**

| Method              | Lines     | Purpose                              |
| ------------------- | --------- | ------------------------------------ |
| `constructor()`     | 1-40      | Initialize state and bind controls   |
| `startAlgorithm()`  | 90-150    | Run algorithm, generate steps        |
| `stopAlgorithm()`   | 151-180   | Reset visualizer state               |
| `nextStep()`        | 200-280   | Advance to next step, update visuals |
| `previousStep()`    | 281-320   | Go back one step                     |
| `togglePlay()`      | 321-360   | Start/stop auto-playback             |
| `goToFirstStep()`   | 361-380   | Jump to beginning                    |
| `goToLastStep()`    | 381-400   | Jump to end                          |
| `highlightPath()`   | 500-580   | Highlight shortest path to node      |
| `displayResults()`  | 620-720   | Show final results panel             |
| `buildStepTable()`  | 800-1000  | Generate resizable step table        |
| `updateStepTable()` | 1001-1100 | Update table row for current step    |

**Visual State Properties:**

```javascript
this.highlightedNodes = new Set(); // Nodes to highlight
this.highlightedEdges = new Set(); // Edges to highlight
this.visitedNodes = new Set(); // Already processed
this.currentChosenNode = null; // Currently selected
this.pathHighlight = new Set(); // Current path edges
this.pathNodes = new Set(); // Current path nodes
```

**Step Table Features:**

- Resizable width (drag right edge)
- Draggable window (drag header)
- Dynamic row creation per iteration
- Real-time distance updates
- Color-coded visited status

---

#### **`js/popup.js`** (338 lines)

**Purpose**: Promise-based dialog management system

**Class: `PopupManager`**

**Public Methods:**

```javascript
show(dialogId, setupCallback, allowOverlayClose, allowEscapeClose);
showConfirm(message); // Returns: Promise<boolean>
showPrompt(message, defaultValue); // Returns: Promise<string|null>
close(popup);
closeTopPopup();
```

**Features:**

- Stack-based dialog management (multiple popups supported)
- Promise-based async/await support
- Overlay click handling
- Escape key handling
- Clean setup/teardown with callbacks

**Usage Example:**

```javascript
const confirmed = await popupManager.showConfirm("Delete node?");
if (confirmed) {
  deleteNode();
}

const weight = await popupManager.showPrompt("Enter weight:", "10");
if (weight !== null) {
  updateWeight(parseInt(weight));
}
```

---

#### **`docs/` Documentation Files**

| File                | Size      | Language   | Content                        |
| ------------------- | --------- | ---------- | ------------------------------ |
| `GRAPH_LOGIC_VI.md` | 424 lines | Vietnamese | Node generation algorithm docs |
| `GUIDE.md`          | TBD       | English    | Extended user guide            |
| `CREDITS.md`        | 135 lines | English    | Library attributions           |

---

### File Size Summary

| File Type          | Total Lines | Percentage |
| ------------------ | ----------- | ---------- |
| JavaScript         | 3,404       | 61%        |
| CSS                | 1,787+      | 32%        |
| HTML               | 533         | 10%        |
| **Total Codebase** | **~5,724**  | **100%**   |

**Excluding documentation and assets, the core application is approximately 5,700 lines of well-structured code.**

---

## 🎨 Customization

### Theming & Colors

#### UI Color Scheme (`css/styles.css`)

**Glassmorphism Effects:**

```css
/* Toolbar background */
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);

/* Panel transparency */
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(8px);
```

**Primary Colors:**

```css
/* Primary accent (toolbar toggle) */
--primary-color: #6366f1;

/* Success (Home node) */
--success-color: #4caf50;

/* Warning (School node) */
--warning-color: #ff9800;

/* Danger (delete actions) */
--danger-color: #ef4444;
```

#### Node & Edge Colors (`js/script.js`)

**Node Rendering:**

```javascript
// In drawNode() function
if (node.id === "home") {
  ctx.fillStyle = "#4CAF50"; // Green
} else if (node.id === "school") {
  ctx.fillStyle = "#FF9800"; // Orange
} else {
  ctx.fillStyle = "#69b3a2"; // Teal
}
```

**Edge/Link Colors:**

```javascript
Graph.linkColor((link) => {
  if (link === hoverLink) return "rgba(108, 110, 255, 0.6)"; // Hover
  return "rgba(100, 100, 100, 0.6)"; // Default
});
```

---

### Physics Simulation

#### Adjusting Force Parameters (`js/script.js`)

**Link Force** - Controls edge length:

```javascript
.d3Force('link', d3.forceLink()
  .distance(link => link.weight * 2 + 50)  // Length proportional to weight
  .strength(0.5)                            // Stiffness (0-1)
)
```

**Charge Force** - Node repulsion:

```javascript
.d3Force('charge', d3.forceManyBody()
  .strength(-300)  // Negative = repulsion, Positive = attraction
)
```

**Collision Force** - Prevents overlap:

```javascript
.d3Force('collide', d3.forceCollide()
  .radius(25)      // Collision radius around nodes
  .strength(0.7)   // Collision strength
)
```

**Center Force** - Keeps graph centered:

```javascript
.d3Force('center', d3.forceCenter()
  .strength(0.05)  // Gentle centering
)
```

#### Tuning Tips:

- **Increase repulsion** (`charge.strength(-500)`): More spread out graph
- **Increase link distance**: Longer edges, more spacious layout
- **Increase collision radius**: Prevents nodes from getting too close
- **Adjust center strength**: Balance between centering and natural layout

---

### Node Generation Algorithm

#### Phase 2 Connection Probabilities (`js/script.js`, line ~870)

**Home Connection Chance:**

```javascript
const connectToHome = Math.random() < 0.3; // 30% chance
// Increase to 0.5 for more Home connections
// Decrease to 0.1 for fewer Home connections
```

**Number of Outgoing Connections:**

```javascript
const numConnections =
  Math.random() < 0.4
    ? 2 // 40% chance: 2 connections
    : Math.random() < 0.8
    ? 3 // 40% chance: 3 connections
    : 1; // 20% chance: 1 connection
```

**Priority Weights for Target Selection:**

```javascript
const priorities = new Map();
priorities.set(schoolId, 3.0); // School has 3x priority

// Higher priority = more likely to be selected as target
// Increase School priority (e.g., 5.0) for more paths to goal
// Add priority for specific nodes if desired
```

**Edge Weight Range:**

```javascript
const weight = Math.floor(Math.random() * 20) + 1; // 1-20
// Change to: Math.floor(Math.random() * 50) + 10   // 10-59
```

---

### Custom Icons

#### Replacing Home/School Icons

**Option 1: Replace SVG files**

1. Place new SVG files in `assets/` folder
2. Name them `home.svg` and `school.svg`
3. Icons automatically load on page refresh

**Option 2: Use different icon library**

In `js/script.js`, modify the SVG paths:

```javascript
const svgPaths = {
  home: "assets/your-custom-home-icon.svg",
  school: "assets/your-custom-school-icon.svg",
};
```

---

### Responsive Breakpoints

#### Mobile Auto-Zoom (`js/script.js`)

```javascript
// Detect mobile and adjust zoom
if (window.innerWidth < 768) {
  Graph.zoom(1.3, 0); // Mobile: 1.3x zoom
} else if (window.innerWidth < 1366) {
  Graph.zoom(2, 0); // Tablet: 2x zoom
}
```

**Customize breakpoints:**

```javascript
const isMobile = window.innerWidth < 640; // Your mobile threshold
const isTablet = window.innerWidth < 1024; // Your tablet threshold
```

---

### Animation Timing

#### Toolbar Collapse Animation (`css/styles.css`)

```css
.toolbar-content {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  /* Duration: 0.4s | Easing: bounce effect */
}
```

**Easing curves:**

- `ease-in-out`: Smooth acceleration/deceleration
- `cubic-bezier(0.68, -0.55, 0.265, 1.55)`: Bounce effect
- `linear`: Constant speed

#### Step Playback Speed (`js/visualizer.js`)

```javascript
// Default speed
this.speed = 1.0; // 1x speed

// Interval between steps (milliseconds)
const baseInterval = 1000; // 1 second
const interval = baseInterval / this.speed;
```

**Modify default speed range:**

```javascript
// Speed slider in index.html
<input type="range" min="0.1" max="5.0" step="0.1" value="1.0">
```

---

## 📱 Browser Support

### Compatibility Matrix

| Browser              | Version | Support Level | Notes                              |
| -------------------- | ------- | ------------- | ---------------------------------- |
| **Chrome**           | 90+     | ✅ Full       | Recommended - Best performance     |
| **Edge**             | 90+     | ✅ Full       | Chromium-based - Excellent support |
| **Firefox**          | 88+     | ✅ Full       | Great performance                  |
| **Safari**           | 14+     | ✅ Full       | Requires `-webkit-` prefixes       |
| **Opera**            | 76+     | ✅ Full       | Chromium-based                     |
| **Samsung Internet** | 14+     | ✅ Full       | Mobile-optimized                   |
| **Brave**            | Latest  | ✅ Full       | Chromium-based                     |

### Browser Feature Requirements

| Feature              | Required    | Fallback Available   |
| -------------------- | ----------- | -------------------- |
| **Canvas 2D**        | ✅ Yes      | ❌ No                |
| **ES6+ JavaScript**  | ✅ Yes      | ❌ No                |
| **backdrop-filter**  | ⚠️ Optional | ✅ Solid backgrounds |
| **CSS Grid/Flexbox** | ✅ Yes      | ❌ No                |
| **Clipboard API**    | ⚠️ Optional | ✅ Manual copy       |
| **SVG Support**      | ✅ Yes      | ✅ Fallback shapes   |

### Known Limitations

**Internet Explorer 11 and below:**

- ❌ Not supported (lacks ES6+, Canvas API features)

**Older Mobile Browsers:**

- ⚠️ May experience performance issues with 20+ nodes
- ⚠️ Glassmorphism effects may not render

### Performance Benchmarks

**Desktop (Chrome 120, Intel i7):**

- 50 nodes: Smooth 60 FPS
- 100 nodes: 45-60 FPS
- 200 nodes: 30-45 FPS

**Mobile (Safari iOS 16, iPhone 12):**

- 30 nodes: Smooth 60 FPS
- 50 nodes: 40-50 FPS
- 100 nodes: 25-35 FPS

### Responsive Design Details

#### Breakpoint System

| Device Class | Screen Width | Zoom Level | Layout Changes                    |
| ------------ | ------------ | ---------- | --------------------------------- |
| **Desktop**  | 1920px+      | 1.0x       | Full toolbar, side-by-side panels |
| **Laptop**   | 1366-1920px  | 1.0x       | Compact spacing                   |
| **Tablet**   | 768-1366px   | 2.0x       | Stacked panels                    |
| **Mobile**   | 320-768px    | 1.3x       | Bottom panels, simplified UI      |

#### Mobile Optimizations

**Touch Handling:**

- ✅ Tap highlight removed (`-webkit-tap-highlight-color: transparent`)
- ✅ Text selection disabled on canvas (enabled in inputs)
- ✅ Pinch-to-zoom gesture support
- ✅ Drag-to-pan smooth scrolling

**Layout Adjustments:**

- **Toolbar**: Slides in from top, more compact buttons
- **Help Panel**: Slides up from bottom (easier thumb reach)
- **Step Table**: Full-width overlay on mobile
- **Dialogs**: Adapt to screen width (min 90% viewport)

**Orientation Support:**

- ✅ Portrait: Vertical stack layout
- ✅ Landscape: Optimized horizontal space usage
- ✅ Smooth transitions on rotation

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### UI & Display Problems

**❓ Glassmorphism effects not showing (no blur effect)**

**Symptoms:** Toolbar and panels appear solid instead of frosted glass  
**Causes:**

- Older browser version lacking `backdrop-filter` support
- Hardware acceleration disabled

**Solutions:**

1. Update browser to latest version (Chrome 90+, Firefox 88+, Safari 14+)
2. Enable hardware acceleration:
   - **Chrome/Edge**: Settings → System → "Use hardware acceleration"
   - **Firefox**: Settings → Performance → Uncheck "Use recommended performance settings"
3. Check browser support: Visit https://caniuse.com/css-backdrop-filter

---

**❓ Graph nodes too small/large on mobile**

**Symptoms:** Nodes difficult to see or tap  
**Causes:** Automatic zoom not applied

**Solutions:**

1. App auto-zooms on mobile (1.3x for phones, 2x for tablets)
2. Manual zoom: Pinch gesture on canvas
3. Rotate device for better view (landscape mode)
4. Adjust zoom in code:
   ```javascript
   // In js/script.js, modify auto-zoom value
   Graph.zoom(2.0, 0); // Increase from 1.3 to 2.0
   ```

---

**❓ Help panel not appearing**

**Symptoms:** Clicking "?" button does nothing  
**Solutions:**

1. Ensure JavaScript is enabled in browser settings
2. Check browser console (F12) for errors
3. Try refreshing page (Ctrl+F5 / Cmd+Shift+R)
4. Clear browser cache
5. Verify `js/script.js` loaded correctly (Network tab in DevTools)

---

#### Graph Editing Issues

**❓ Can't create links between nodes**

**Symptoms:** Clicking two nodes doesn't create edge  
**Causes:**

- Clicking too quickly
- Nodes are the same
- Algorithm is running

**Solutions:**

1. Click **first node** → Wait for green highlight → Click **second node**
2. Ensure two different nodes are selected
3. Stop algorithm visualization if running (click "Stop" button)
4. Check console (F12) for error messages:
   ```
   Press F12 → Console tab → Look for red errors
   ```

---

**❓ Double-click to edit weight not working**

**Symptoms:** Weight popup doesn't appear  
**Solutions:**

1. Ensure you're double-clicking on the **edge/link**, not nodes
2. Click directly on the line connecting two nodes
3. Try zooming in for easier targeting
4. Check if popup is hidden behind other elements (try clicking outside)

---

**❓ Import adjacency matrix fails**

**Symptoms:** "Invalid matrix" error or nothing happens  
**Common Mistakes:**

❌ **Wrong format:**

```
1 2 3 4  // Wrong: Space-separated
```

✅ **Correct format:**

```
0, 1, 0, 4
1, 0, 3, 0
0, 3, 0, 5
4, 0, 5, 0
```

**Validation Checklist:**

- ✅ Comma-separated values (CSV format)
- ✅ Square matrix (same number rows and columns)
- ✅ Numeric values only (0 = no edge)
- ✅ One row per line
- ✅ No extra commas or spaces at line endings

---

#### Performance Issues

**❓ Laggy/slow graph with many nodes**

**Symptoms:** Stuttering animation, slow interactions  
**Causes:** Physics simulation CPU-intensive with 30+ nodes

**Solutions:**

**1. Pause simulation when not needed:**

```javascript
// Open browser console (F12)
Graph.pauseAnimation(); // Freeze physics
Graph.resumeAnimation(); // Resume physics
```

**2. Reduce force strength (in `js/script.js`):**

```javascript
.d3Force('charge', d3.forceManyBody()
  .strength(-200)  // Reduce from -300 to -200
)
```

**3. Limit number of nodes:**

- Keep graph under 50 nodes for smooth performance
- Remove unnecessary connections

**4. Close other browser tabs:**

- Free up CPU/RAM resources
- Disable browser extensions temporarily

---

**❓ Algorithm visualization too fast/slow**

**Solutions:**

1. Use speed slider in step controller (0.5x - 10x)
2. Use step-by-step controls (◀️ Previous, ▶️ Next buttons)
3. Pause auto-play and manually step through

---

#### Data & Export Issues

**❓ Copy to clipboard not working**

**Symptoms:** "Copy to Clipboard" button does nothing  
**Causes:** Browser clipboard permission denied

**Solutions:**

1. **Grant permission:** Browser may show permission prompt - click "Allow"
2. **Manual copy:**
   - Select all text in export dialog (Ctrl+A / Cmd+A)
   - Copy manually (Ctrl+C / Cmd+C)
3. **Use local server:** Some clipboard features require HTTPS or localhost
   ```powershell
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

---

**❓ Graph reset doesn't work**

**Solutions:**

1. Confirm action in popup dialog (click "OK")
2. Refresh page (Ctrl+R / Cmd+R) as last resort
3. Check console for JavaScript errors

---

### Browser Console Commands

Open **Developer Tools** (F12) and use these commands for debugging:

#### Graph Inspection

```javascript
// View current graph data
console.log("Nodes:", gData.nodes);
console.log("Links:", gData.links);

// Count elements
console.log("Node count:", gData.nodes.length);
console.log("Link count:", gData.links.length);

// Check graph mode
console.log("Is directed:", isDirectedGraph);
```

#### Force Simulation Control

```javascript
// Pause/Resume physics
Graph.pauseAnimation();
Graph.resumeAnimation();

// Manually trigger simulation step
Graph.d3ReheatSimulation();
```

#### View Manipulation

```javascript
// Zoom controls
Graph.zoom(2, 1000); // Zoom to 2x over 1 second
Graph.zoom(1, 500); // Reset zoom

// Center graph
Graph.centerAt(0, 0, 1000); // Center with animation
Graph.centerAt(100, 50); // Center at specific coordinates

// Get current camera position
Graph.zoomToFit(400); // Auto-fit entire graph
```

#### Debug Information

```javascript
// Check if force-graph loaded
console.log("Graph object:", typeof Graph);

// Check D3.js loaded
console.log("D3 version:", d3.version);

// View next node character
console.log("Next node will be:", nextChar);
```

---

### Error Messages Guide

| Error Message                       | Meaning                              | Solution                              |
| ----------------------------------- | ------------------------------------ | ------------------------------------- |
| `Maximum nodes reached (A-Z)`       | All 26 nodes already created         | Delete nodes or reset graph           |
| `Invalid matrix format`             | Import matrix not properly formatted | Check CSV format, square matrix       |
| `Start nodeId not found`            | Algorithm can't find Home node       | Don't delete Home node before running |
| `Cannot read property of undefined` | JavaScript error in code             | Refresh page, check console details   |

---

### Still Having Issues?

If problems persist:

1. **Check browser console** (F12 → Console tab) for detailed error messages
2. **Try different browser** (Chrome recommended)
3. **Clear browser cache** (Ctrl+Shift+Del / Cmd+Shift+Del)
4. **Disable browser extensions** temporarily
5. **Use local HTTP server** instead of file:// protocol
6. **Report bug** on GitHub Issues with:
   - Browser name and version
   - Screenshot of issue
   - Console error messages
   - Steps to reproduce

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

#### 1. **Fork the Repository**

```powershell
# Click the "Fork" button on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/home-to-school.git
cd home-to-school
```

#### 2. **Create a Feature Branch**

```powershell
git checkout -b feature/amazing-new-feature
# or
git checkout -b bugfix/fix-issue-123
```

#### 3. **Make Your Changes**

- Write clean, documented code
- Follow existing code style and conventions
- Test your changes thoroughly
- Update documentation if needed

#### 4. **Commit Your Changes**

```powershell
git add .
git commit -m "Add: Implement amazing new feature"
```

**Commit Message Convention:**

- `Add:` New features
- `Fix:` Bug fixes
- `Update:` Updates to existing features
- `Docs:` Documentation changes
- `Style:` Code style changes (formatting, etc.)
- `Refactor:` Code refactoring
- `Test:` Adding/updating tests

#### 5. **Push to Your Fork**

```powershell
git push origin feature/amazing-new-feature
```

#### 6. **Open a Pull Request**

- Go to the original repository on GitHub
- Click "New Pull Request"
- Select your branch
- Describe your changes clearly
- Link related issues if applicable

---

### Contribution Guidelines

#### Code Style

- **Indentation:** 2 spaces (no tabs)
- **Naming:** camelCase for variables/functions, PascalCase for classes
- **Comments:** Explain "why", not "what"
- **Semicolons:** Use semicolons consistently

#### Testing Checklist

Before submitting PR, ensure:

- ✅ Code runs without errors in console
- ✅ Works in Chrome, Firefox, Safari
- ✅ Responsive on mobile devices
- ✅ No breaking changes to existing features
- ✅ Documentation updated if needed

#### What to Contribute

**Good First Issues:**

- 🐛 Bug fixes
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ♿ Accessibility improvements
- 🌍 Translations (add new language docs)

**Feature Ideas:**

- Additional algorithms (A\*, Bellman-Ford completion, BFS, DFS)
- Export graph as PNG/SVG image
- Undo/Redo functionality
- Graph templates/presets
- Custom node styling
- Dark mode theme
- Keyboard shortcuts
- Animation recording

---

### Development Setup

**No build tools required!** Simply:

1. Clone repository
2. Open `index.html` in browser
3. Make changes
4. Refresh to see updates

**Recommended Tools:**

- **Editor:** VS Code with Live Server extension
- **Browser:** Chrome with DevTools
- **Git:** For version control

---

### Reporting Bugs

**Before reporting:**

1. Check [existing issues](https://github.com/IzukiNo/home-to-school/issues)
2. Try latest version
3. Reproduce in different browser

**Bug Report Template:**

```markdown
## Bug Description

Clear description of the issue

## Steps to Reproduce

1. Open application
2. Click "Add Node" 3 times
3. ...

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- Browser: Chrome 120
- OS: Windows 11
- Screen Size: 1920x1080

## Screenshots

[Attach if relevant]

## Console Errors

[Copy from F12 Console]
```

---

### Suggesting Features

**Feature Request Template:**

```markdown
## Feature Description

Brief description of the feature

## Use Case

Why is this feature needed?

## Proposed Solution

How should it work?

## Alternatives Considered

Other approaches you've thought about

## Additional Context

Mockups, examples, etc.
```

---

## 📄 License

This project is licensed under the **MIT License** - see below for details.

```
MIT License

Copyright (c) 2025 IzukiNo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**What this means:**

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ Liability and warranty not provided
- ⚠️ Must include original copyright notice

---

## 🙏 Credits

### Project Creator

**IzukiNo** - _Initial work and development_

- GitHub: [@IzukiNo](https://github.com/IzukiNo)

### Open Source Libraries

This project wouldn't exist without these amazing libraries:

#### [D3.js](https://d3js.org/)

- **Version:** 7.x
- **License:** BSD 3-Clause
- **Purpose:** Force-directed graph physics simulation
- **Author:** Mike Bostock
- **Repository:** [github.com/d3/d3](https://github.com/d3/d3)

#### [force-graph](https://github.com/vasturiano/force-graph)

- **License:** MIT
- **Purpose:** Interactive graph visualization with Canvas rendering
- **Author:** Vasco Asturiano
- **Repository:** [github.com/vasturiano/force-graph](https://github.com/vasturiano/force-graph)

### Design Resources

**Icons:**

- Custom SVG home and school icons
- UI button icons designed with modern aesthetic

**Color Palette:**

- Primary: `#6366f1` (Indigo)
- Success: `#4CAF50` (Green)
- Warning: `#FF9800` (Orange)
- Danger: `#ef4444` (Red)
- Graph: `#69b3a2` (Teal)

### Educational Inspiration

**Algorithm Resources:**

- [Introduction to Algorithms (CLRS)](https://mitpress.mit.edu/9780262046305/) - Algorithm theory
- [VisuAlgo](https://visualgo.net/) - Algorithm visualization inspiration
- [Graph Theory - Wikipedia](https://en.wikipedia.org/wiki/Graph_theory)

**Similar Projects:**

- [Algorithm Visualizer](https://algorithm-visualizer.org/)
- [Graph Online](http://graphonline.ru/en/)
- Various academic graph visualization tools

### Documentation

**References:**

- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript/CSS reference
- [D3.js API Reference](https://github.com/d3/d3/blob/main/API.md)
- [force-graph Documentation](https://github.com/vasturiano/force-graph#api-reference)

### Special Thanks

- **Computer Science Community** - For freely sharing knowledge
- **Open Source Contributors** - For building amazing tools
- **Students & Educators** - For inspiring educational tools
- **You** - For using and contributing to this project!

**Full credits available in:** [docs/CREDITS.md](docs/CREDITS.md)

---

## 🗺️ Roadmap

### Current Version Features

✅ Interactive graph editing  
✅ Dijkstra's algorithm visualization  
✅ Directed/undirected graphs  
✅ Import/export adjacency matrix  
✅ Step-by-step algorithm playback  
✅ Mobile responsive design

### Planned Features

#### Version 2.0 (Q1 2026)

- [ ] **Additional Algorithms**

  - [ ] A\* (A-Star) pathfinding
  - [ ] Bellman-Ford (complete implementation)
  - [ ] Breadth-First Search (BFS)
  - [ ] Depth-First Search (DFS)
  - [ ] Prim's MST algorithm
  - [ ] Kruskal's MST algorithm

- [ ] **Graph Export**

  - [ ] Export as PNG image
  - [ ] Export as SVG vector
  - [ ] Export as JSON format

- [ ] **Enhanced Editing**
  - [ ] Undo/Redo functionality
  - [ ] Multi-select nodes
  - [ ] Bulk operations
  - [ ] Node grouping/clustering

#### Version 3.0 (Q2 2026)

- [ ] **Customization**

  - [ ] Custom node colors per node
  - [ ] Custom labels and annotations
  - [ ] Theme system (Light/Dark mode)
  - [ ] Preset color schemes

- [ ] **Data Persistence**

  - [ ] Save graph presets
  - [ ] LocalStorage auto-save
  - [ ] Load example graphs
  - [ ] Graph library/templates

- [ ] **Advanced Features**
  - [ ] Weighted vs unweighted toggle
  - [ ] Multiple source/destination
  - [ ] Path comparison mode
  - [ ] Algorithm performance metrics

#### Future Considerations

- [ ] User accounts & cloud save
- [ ] Collaborative editing
- [ ] Animation recording/export
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements (ARIA labels, screen reader)
- [ ] Internationalization (i18n) - Multiple languages
- [ ] Graph generation algorithms (random, complete, bipartite)
- [ ] Tutorial/walkthrough mode
- [ ] Integration with graph theory courses

---

## 📧 Contact & Support

### Get Help

**Documentation:**

- 📖 Read this README thoroughly
- 📘 Check [docs/GUIDE.md](docs/GUIDE.md) for extended guide
- 🇻🇳 Vietnamese docs: [docs/GRAPH_LOGIC_VI.md](docs/GRAPH_LOGIC_VI.md)

**Issues & Bugs:**

- 🐛 Report bugs: [GitHub Issues](https://github.com/IzukiNo/home-to-school/issues)
- 🔍 Search existing issues first
- 📋 Use issue templates for better responses

**Questions & Discussions:**

- 💬 Ask questions: [GitHub Discussions](https://github.com/IzukiNo/home-to-school/discussions)
- 💡 Share ideas and feature requests
- 🤝 Connect with other users

---

## 📊 Project Statistics

**Development Timeline:** December 2025 - Present  
**Codebase Size:** ~5,700 lines (excluding docs)  
**Languages:** JavaScript (61%), CSS (32%), HTML (10%)  
**External Dependencies:** 2 (D3.js, force-graph)  
**License:** MIT  
**Status:** ✅ Active Development

---

## 🌟 Show Your Support

If you find this project helpful, please consider:

⭐ **Star this repository** on GitHub  
🐛 **Report bugs** to help improve the project  
💡 **Suggest features** for future versions  
🤝 **Contribute code** or documentation  
📢 **Share with others** who might benefit  
☕ **Sponsor development** (coming soon)

---

<div align="center">

### Made with ❤️ for Learning Graph Algorithms

**Home to School** • 2025 • MIT Licensed

[⬆ Back to Top](#-home-to-school---interactive-graph-visualization-tool)

</div>
