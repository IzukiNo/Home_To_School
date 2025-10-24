# 🏠➡️🏫 Home to School - Graph Visualization Tool

An interactive, modern graph visualization tool for visualizing and analyzing shortest path algorithms. Built with vanilla JavaScript, D3.js, and force-graph library featuring a beautiful glassmorphism UI.

![Graph Visualization](https://img.shields.io/badge/Graph-Visualization-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![D3.js](https://img.shields.io/badge/D3.js-v7-orange)
![Mobile Ready](https://img.shields.io/badge/Mobile-Ready-green)

## 📑 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
- [How to Use](#-how-to-use)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#️-project-structure)
- [Algorithm Details](#-algorithm-details)
- [Customization](#-customization)
- [Browser Compatibility](#-browser-compatibility)
- [Responsive Design](#-responsive-design)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgments](#-acknowledgments)

## ✨ Features

### 🎯 Quick Overview

| Category | Features |
|----------|----------|
| **UI/UX** | Glassmorphism design, collapsible toolbar, help panel, watermark |
| **Graph Editing** | Add/delete nodes, create/remove links, adjust weights, drag nodes |
| **Algorithms** | Dijkstra, DFS, BFS with visual comparison |
| **Node Generation** | 2-phase intelligent algorithm with diverse path creation |
| **Import/Export** | Adjacency matrix format, clipboard support |
| **Mobile** | Auto-zoom, touch-optimized, no tap highlights, responsive |
| **Customization** | SVG icons, configurable colors, adjustable physics |

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effect with backdrop blur
- **Collapsible Toolbar**: Smooth animations with cubic-bezier easing
- **Help Panel**: Slide-up help panel with complete usage guide
- **Professional Watermark**: Clean attribution at bottom center
- **Responsive Icons**: SVG icons for all UI elements

### 🎯 Interactive Graph Creation
- **Visual Node Management**: Add, delete, and arrange nodes with intuitive drag-and-drop interface
- **Smart Link Creation**: Click two nodes to create/remove directed links between them
- **Weight Adjustment**: Double-click links to modify their weights (1-999)
- **Auto-generated Nodes**: Automatically creates nodes labeled A-Z with intelligent connection logic
- **Grid Background**: Aligned grid system for better spatial awareness

### 🧠 Intelligent Node Generation
The application features a sophisticated two-phase node generation algorithm:

**Phase 1 (Nodes A-D)**: Creates a main linear path
- Forms: `Home → A → B → C → D → School`

**Phase 2 (Nodes E-Z)**: Creates diverse branch connections
- **30% Home Connection**: Some nodes connect to/from Home
- **70% Internal Connections**: Most nodes connect to other random nodes
- **2-3 Outgoing Links**: Each node connects to multiple targets
- **Priority System**: School and well-connected nodes have higher priority
- **Weighted Random**: Ensures balanced and realistic graph topology

📚 **Documentation Available**:
- [GRAPH_LOGIC_VI.md](docs/GRAPH_LOGIC_VI.md) - Detailed algorithm documentation (Vietnamese)
- See [docs/](docs/) folder for complete documentation

### 🧮 Algorithm Implementation
The project includes three classic graph traversal and shortest path algorithms:

- **Dijkstra's Algorithm**: Finds the shortest weighted path between nodes
- **Depth-First Search (DFS)**: Explores graph depth-first to find a path
- **Breadth-First Search (BFS)**: Explores graph breadth-first to find shortest unweighted path

### 📊 Import/Export
- **Adjacency Matrix Export**: Export your graph as an adjacency matrix
- **Matrix Import**: Import graphs from adjacency matrix format
- **Copy to Clipboard**: Quick copy functionality for sharing
- **Node Ordering**: Consistent ordering (Home, A-Z, School)

### 🎯 Special Nodes & Styling
- **Home Node** (Green 🟢): Starting point for pathfinding with distinctive ring
- **School Node** (Orange 🟠): Destination for pathfinding with distinctive ring
- **Custom Nodes** (A-Z): Intermediate waypoints with bold letter labels
- **Hover Effects**: Nodes and links highlight on hover
- **Selection Rings**: Visual feedback for selected nodes

### 📱 Mobile Optimization
- **Auto Zoom**: Automatically zooms out on mobile devices for better overview
- **Touch-Friendly**: Optimized touch controls without blue tap highlights
- **Responsive Layout**: Adapts to all screen sizes (320px - 4K)
- **Help Panel**: Mobile-optimized sliding panel from bottom
- **Orientation Support**: Handles landscape/portrait changes gracefully

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- No installation required - runs entirely in the browser!
- No Node.js, npm, or build tools needed

### Quick Start

**Option 1: Download and Open**
1. Download the project as a ZIP file
2. Extract to your desired location
3. Open `index.html` in your web browser

**Option 2: Clone with Git**
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/home-to-school.git
   cd home-to-school
   ```

2. **Open the application**
   
   Simply open `index.html` in your web browser:
   ```bash
   # On Windows
   start index.html
   
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   ```

**Option 3: Use a Local Server (Optional)**

For the best experience, you can use a local HTTP server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then visit `http://localhost:8000` in your browser.

That's it! No build process, no dependencies to install.

## 📖 How to Use

### Basic Operations

1. **Add Nodes**
   - Click the "Add Node" button in the toolbar
   - Nodes are automatically labeled A, B, C, etc.
   - **Phase 1 (A-D)**: Creates main path: `Home → A → B → C → D → School`
   - **Phase 2 (E-Z)**: Creates diverse branch paths with:
     - 30% chance to connect with Home
     - 2-3 connections to other nodes
     - Priority given to School and less-connected nodes

2. **Create/Remove Links**
   - Click on the first node (it will be highlighted in green)
   - Click on the second node
   - A directed link will be created/removed between them
   - Links are directional (arrows show direction)

3. **Adjust Link Weight**
   - Double-click on any link
   - Enter the new weight value in the popup (1-999)
   - Weights represent distance/cost between nodes

4. **Move Nodes**
   - Simply drag any node to reposition it
   - The graph uses force simulation for automatic layout
   - Grid provides alignment reference

5. **Collapse/Expand Toolbar**
   - Click the circular toggle button to hide/show the toolbar
   - Keeps your workspace clean
   - Smooth slide animation

6. **Access Help**
   - Click the **?** icon in bottom-right corner
   - Comprehensive help panel slides up
   - Includes all features and shortcuts
   - Click outside or × to close

### Keyboard Shortcuts & Tips

| Action | Method |
|--------|--------|
| **Pan Graph** | Click and drag empty space |
| **Zoom In/Out** | Mouse wheel scroll |
| **Move Node** | Click and drag any node |
| **Select Node** | Single click (green highlight) |
| **Create Link** | Click first node, then second node |
| **Remove Link** | Click first node, then second node (if link exists) |
| **Edit Weight** | Double-click on a link |
| **Delete Node** | Click node to select, then click "Delete Selected Node" |
| **Close Popup** | Click outside popup or × button |
| **Toggle Toolbar** | Click ⊕/⊖ toggle button |

**💡 Pro Tips**:
- Nodes auto-arrange using physics simulation
- Links show direction with arrows
- Hover over elements for visual feedback
- Grid helps with manual alignment
- Use export/import for sharing graphs

### Advanced Features

#### Export Graph
1. Click "Export" button
2. View the adjacency matrix representation
3. Click "Copy to Clipboard" to copy the matrix
4. Node order is displayed at the top

#### Import Graph
1. Click "Import" button
2. Paste or type an adjacency matrix
3. Format: comma-separated values, one row per line
4. Example:
   ```
   0, 5, 0, 0
   0, 0, 3, 0
   0, 0, 0, 7
   0, 0, 0, 0
   ```

#### Reset Graph
1. Click "Reset Graph" button
2. Confirm the action
3. Graph returns to initial state (only Home and School)

## 🛠️ Tech Stack

### Core Technologies
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with glassmorphism effects
- **JavaScript (ES6+)**: Application logic and interactivity

### Libraries & Frameworks
- **[D3.js v7](https://d3js.org/)** - Force simulation and physics
- **[force-graph](https://github.com/vasturiano/force-graph)** - Graph rendering engine
- **No build tools required** - Pure vanilla implementation

### Features Used
- **CSS**:
  - `backdrop-filter: blur()` for glassmorphism
  - Flexbox & Grid for layouts
  - CSS animations & transitions
  - Custom properties (CSS variables)
  - Media queries for responsive design
  
- **JavaScript**:
  - ES6+ classes and modules
  - Canvas API for custom rendering
  - Event delegation
  - Local storage (future enhancement)
  
- **D3.js**:
  - Force-directed graph layout
  - Collision detection
  - Link distance constraints
  - Many-body forces

### Browser APIs
- Canvas 2D Context
- DOM Manipulation
- Event Handling
- Clipboard API

## 🗂️ Project Structure

```
Home_To_School/
├── index.html              # Main HTML file with UI structure
├── README.md              # This file
├── css/
│   └── styles.css         # Modern glassmorphism styling & animations
├── js/
│   ├── script.js          # Main application logic & graph visualization
│   ├── popup.js           # Popup/modal management system
│   └── algorithm.js       # Dijkstra, DFS, BFS implementations
├── assets/
│   ├── home.svg           # Home node custom icon
│   └── school.svg         # School node custom icon
└── docs/
    ├── GRAPH_LOGIC_VI.md  # Algorithm documentation (Vietnamese)
    ├── GUIDE.md           # User guide
    ├── CREDITS.md         # Credits and attributions
    └── TODO.md            # Future enhancements
```

### File Descriptions

- **`index.html`**: Main entry point with toolbar, help panel, and popup dialogs
- **`css/styles.css`**: 
  - Glassmorphism effects with backdrop blur
  - Responsive design (mobile, tablet, desktop)
  - Animations and transitions
  - Help panel and watermark styling
- **`js/script.js`**: 
  - Graph data management and visualization
  - Force-graph integration with D3.js
  - Two-phase intelligent node generation
  - User interaction handlers (drag, click, hover)
  - Import/export functionality
  - Mobile optimization (auto-zoom, touch handling)
- **`js/popup.js`**: Reusable popup system with stack management
- **`js/algorithm.js`**: Implementation of graph algorithms with comparison utilities
- **`docs/`**: Complete documentation in multiple languages

## 🧪 Algorithm Details

### Dijkstra's Algorithm
```javascript
dijkstra(graph, startNodeId, endNodeId)
```
- Finds the shortest weighted path
- Time Complexity: O((V + E) log V)
- Optimal for weighted graphs

### Depth-First Search (DFS)
```javascript
dfs(graph, startNodeId, endNodeId)
```
- Explores as far as possible along each branch
- Time Complexity: O(V + E)
- May not find shortest path

### Breadth-First Search (BFS)
```javascript
bfs(graph, startNodeId, endNodeId)
```
- Explores neighbors level by level
- Time Complexity: O(V + E)
- Finds shortest path in unweighted graphs

### Compare All Algorithms
```javascript
compareAlgorithms(graph, startNodeId, endNodeId)
```
- Runs all three algorithms
- Compares paths, weights, and execution times
- Outputs detailed comparison to console

## 🎨 Customization

### Colors
Edit `css/styles.css` to change theme colors:
```css
/* Glassmorphism background */
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);

/* Primary accent color */
--primary-color: #4CAF50;
```

Edit `js/script.js` to change node colors:
```css
/* Home node color */
ctx.fillStyle = '#4CAF50';  /* Green */

/* School node color */
ctx.fillStyle = '#FF9800';  /* Orange */

/* Default node color */
ctx.fillStyle = '#69b3a2';  /* Teal */
```

### Graph Physics
Adjust force simulation in `js/script.js`:
```javascript
.d3Force('link', d3.forceLink().distance(80))
.d3Force('charge', d3.forceManyBody().strength(-50))
.d3Force('collide', d3.forceCollide().radius(20))
```

### Node Generation Behavior
Modify node generation probabilities in `js/script.js` (Phase 2):
```javascript
// Chance to connect new node to Home
const connectToHome = Math.random() < 0.3;  // 30% chance

// Number of outgoing connections per node
const numConnections = Math.random() < 0.4 ? 2 : 
                       Math.random() < 0.8 ? 3 : 1;  // 40%/40%/20%

// Priority weighting for target selection
priorities.set(schoolId, 3.0);  // School priority
```

## 🌐 Browser Compatibility

Tested and optimized for:
- ✅ **Chrome/Edge** (Recommended) - Full support including backdrop-filter
- ✅ **Firefox** - Full support
- ✅ **Safari** - Full support with `-webkit-` prefixes
- ✅ **Opera** - Full support

**Note**: Glassmorphism effects (backdrop blur) work best on modern browsers (2020+).

## 📱 Responsive Design

The application is fully responsive with optimized experiences for:
- 💻 **Desktop** (1920px+): Full toolbar, standard zoom
- 💻 **Laptop** (1366px - 1920px): Optimized layout
- 📱 **Tablet** (768px - 1366px): Auto zoom 2x, touch-friendly
- 📱 **Mobile** (320px - 768px): Auto zoom 1.3x, bottom toolbar
- 🔄 **Orientation**: Auto-adjusts on rotation

### Mobile-Specific Features:
- No blue tap highlights on nodes/buttons
- Disabled text selection on canvas (enabled on inputs)
- Touch pan & zoom gestures
- Help panel slides from bottom
- Compact toolbar layout

## 🔧 Troubleshooting

### Common Issues

**Q: Glassmorphism effects not showing**
- A: Update to a modern browser (Chrome 76+, Firefox 70+, Safari 9+)
- Check browser support for `backdrop-filter` CSS property

**Q: Graph nodes are too small on mobile**
- A: The app auto-zooms on mobile. Try rotating device or manual zoom with pinch gesture

**Q: Can't see the help panel**
- A: Click the **?** button in bottom-right corner
- Ensure JavaScript is enabled in browser settings

**Q: Import/Export not working**
- A: Check matrix format - should be comma-separated numbers
- Ensure matrix is square (same rows and columns)
- Node order: Home, A-Z (alphabetically), School

**Q: Links not creating between nodes**
- A: Click first node (turns green), then click second node
- Both nodes must be different
- Check console (F12) for error messages

**Q: Performance issues with many nodes**
- A: Force simulation is CPU-intensive with 20+ nodes
- Try reducing number of connections per node
- Pause simulation by calling `Graph.pauseAnimation()` in console

### Browser Console Commands

Open browser DevTools (F12) and try these commands:

```javascript
// Pause/Resume physics simulation
Graph.pauseAnimation();
Graph.resumeAnimation();

// Get current graph data
console.log('Nodes:', graphData.nodes);
console.log('Links:', graphData.links);

// Manually adjust zoom
Graph.zoom(2, 1000);  // Zoom to 2x over 1 second

// Center graph on screen
Graph.centerAt(0, 0, 1000);

// Run algorithms programmatically
const result = dijkstra(graphData, 'home', 'school');
console.log('Shortest path:', result.path);
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

IzukiNo - [GitHub](https://github.com/IzukiNo)

## 🙏 Acknowledgments

- [D3.js](https://d3js.org/) - Powerful data visualization library for force simulation
- [force-graph](https://github.com/vasturiano/force-graph) - Force-directed graph visualization component
- [Material Design Icons](https://fonts.google.com/icons) - SVG icons for UI elements
- Glassmorphism design inspired by modern UI trends

## 💡 Features Roadmap

Potential future enhancements:
- [ ] A* pathfinding algorithm
- [ ] Graph export to PNG/SVG
- [ ] Undo/Redo functionality
- [ ] Custom node colors and labels
- [ ] Save/Load graph presets
- [ ] Animation speed control
- [ ] Dark/Light theme toggle

## 📧 Contact

For questions, suggestions, or bug reports:
- 🐛 Open an issue on [GitHub Issues](https://github.com/IzukiNo/home-to-school/issues)
- 💬 Start a discussion on [GitHub Discussions](https://github.com/IzukiNo/home-to-school/discussions)

---

Made with ❤️ for learning and teaching graph algorithms
