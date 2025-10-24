# 🏠➡️🏫 Home to School - Graph Visualization Tool

An interactive graph visualization tool for visualizing and analyzing shortest path algorithms. Built with vanilla JavaScript and force-graph library.

![Graph Visualization](https://img.shields.io/badge/Graph-Visualization-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![D3.js](https://img.shields.io/badge/D3.js-v7-orange)

## ✨ Features

### 🎨 Interactive Graph Creation
- **Visual Node Management**: Add, delete, and arrange nodes with intuitive drag-and-drop interface
- **Smart Link Creation**: Click two nodes to create/remove directed links between them
- **Weight Adjustment**: Double-click links to modify their weights
- **Auto-generated Nodes**: Automatically creates nodes labeled A-Z with smart connection logic

### 🧮 Algorithm Implementation
The project includes three classic graph traversal and shortest path algorithms:

- **Dijkstra's Algorithm**: Finds the shortest weighted path between nodes
- **Depth-First Search (DFS)**: Explores graph depth-first to find a path
- **Breadth-First Search (BFS)**: Explores graph breadth-first to find shortest unweighted path

### 📊 Import/Export
- **Adjacency Matrix Export**: Export your graph as an adjacency matrix
- **Matrix Import**: Import graphs from adjacency matrix format
- **Copy to Clipboard**: Quick copy functionality for sharing

### 🎯 Special Nodes
- **Home Node** (Green): Starting point for pathfinding
- **School Node** (Orange): Destination for pathfinding
- **Custom Nodes** (A-Z): Intermediate waypoints with labels

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- No installation required - runs entirely in the browser!

### Installation

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

That's it! No build process, no npm install, no dependencies to manage.

## 📖 How to Use

### Basic Operations

1. **Add Nodes**
   - Click the "Add Node" button in the toolbar
   - Nodes are automatically labeled A, B, C, etc.
   - First 4 nodes (A-D) create a main path: Home → A → B → C → D → School
   - Additional nodes create branch paths

2. **Create/Remove Links**
   - Click on the first node (it will be highlighted in green)
   - Click on the second node
   - A directed link will be created/removed between them

3. **Adjust Link Weight**
   - Double-click on any link
   - Enter the new weight value in the popup
   - Weights represent distance/cost between nodes

4. **Move Nodes**
   - Simply drag any node to reposition it
   - The graph uses force simulation for automatic layout

5. **Collapse/Expand Toolbar**
   - Click the circular button to hide/show the toolbar
   - Keeps your workspace clean

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

## 🗂️ Project Structure

```
Home_To_School/
├── index.html              # Main HTML file
├── styles.css              # All styling and animations
├── script.js               # Main application logic & graph visualization
├── popupManager.js         # Popup/modal management system
├── Algorithm.js            # Dijkstra, DFS, BFS implementations
├── assets/
│   ├── home.svg           # Home node icon
│   └── school.svg         # School node icon
└── README.md              # This file
```

### File Descriptions

- **`index.html`**: Main entry point with UI structure and popup dialogs
- **`styles.css`**: Modern, responsive styling with animations and transitions
- **`script.js`**: 
  - Graph data management
  - Force-graph visualization
  - User interaction handlers
  - Import/export functionality
- **`popupManager.js`**: Reusable popup system with stack management
- **`Algorithm.js`**: Implementation of graph algorithms with comparison utilities

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
Edit `styles.css` to change node and link colors:
```css
/* Home node color */
ctx.fillStyle = '#4CAF50';  /* Green */

/* School node color */
ctx.fillStyle = '#FF9800';  /* Orange */

/* Default node color */
ctx.fillStyle = '#69b3a2';  /* Teal */
```

### Graph Physics
Adjust force simulation in `script.js`:
```javascript
.d3Force('link', d3.forceLink().distance(80))
.d3Force('charge', d3.forceManyBody().strength(-50))
.d3Force('collide', d3.forceCollide().radius(20))
```

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## 📱 Responsive Design

The application is fully responsive and works on:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

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

- [D3.js](https://d3js.org/) - Data visualization library
- [force-graph](https://github.com/vasturiano/force-graph) - Force-directed graph visualization
- Icons from [SVG Repo](https://www.svgrepo.com/)

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

Made with ❤️ for learning and teaching graph algorithms
