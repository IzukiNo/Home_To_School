# TODO - Dijkstra Table Visualization

## 🎯 Current Status
Project đang có:
- ✅ Graph visualization with force-directed layout
- ✅ Node và Link management (add, delete, edit weight)
- ✅ Dijkstra, DFS, BFS algorithms implemented
- ✅ Import/Export adjacency matrix
- ✅ Grid background
- ✅ Responsive toolbar
- ✅ Custom popup system

## 📋 Implementation Plan - Resizable Sidebar

### Phase 1: Resizable Sidebar Infrastructure (Priority: HIGH)
- [ ] **1.1. Create Sidebar Component**
  - [ ] HTML structure cho sidebar container (left side, full height)
  - [ ] Sidebar header với title + close button
  - [ ] Sidebar body cho table content
  - [ ] Sidebar footer cho controls
  
- [ ] **1.2. Sidebar Toggle Functionality**
  - [ ] Toggle button trong toolbar để show/hide sidebar
  - [ ] Slide in/out animation từ left edge
  - [ ] Update graph canvas width when sidebar visible
  - [ ] Smooth transition với CSS transitions
  - [ ] Remember state (localStorage)

- [ ] **1.3. Resizable Width (Right Edge Only)**
  - [ ] Add resize handle on right edge của sidebar
  - [ ] Mouse down/move/up events cho resize
  - [ ] Min/max width constraints (e.g., 300px - 600px)
  - [ ] **Height is always 100vh** (full viewport height)
  - [ ] Update graph canvas width during resize
  - [ ] Touch support cho mobile

- [ ] **1.4. Sidebar Controls**
  - [ ] Close button → hide sidebar
  - [ ] Clear button → reset table
  - [ ] Export button → export table data
  - [ ] Remember width (localStorage)

- [ ] **1.5. CSS Styling**
  - [ ] Sidebar container styling (shadow on right edge)
  - [ ] Header gradient (purple theme matching toolbar)
  - [ ] Resize handle visibility on hover
  - [ ] Z-index below toolbar but above graph
  - [ ] Mobile: Full width overlay or slide-over
  - [ ] Smooth transitions for open/close

### Phase 2: Dijkstra Table Implementation (Priority: HIGH)
- [ ] **2.1. Algorithm Adaptation**
  - [ ] Convert gData → adjacency matrix
  - [ ] Implement dijkstraWithSteps(graph, start)
  - [ ] Generate step-by-step state:
    - `iteration`: Step number
    - `distances`: Array of distances
    - `previous`: Array of previous nodes
    - `visited`: Array of boolean
    - `chosen`: Index of chosen node

- [ ] **2.2. Table Structure**
  - [ ] Header row: Empty | Home | A | B | C | ... | School
  - [ ] Each row = 1 iteration
  - [ ] Columns cho mỗi node
  - [ ] Cell format: `(distance, previous)*` hoặc `-`
  - [ ] Sticky header khi scroll

- [ ] **2.3. Table Rendering**
  - [ ] Create table HTML dynamically
  - [ ] Render all steps at once (complete table)
  - [ ] Cell content formatting:
    - Chosen node: `(15, H)*` với class `.chosen`
    - Processed node: `-` với class `.processed`
    - Unprocessed: `(20, A)` hoặc `(∞, -)`
  - [ ] Node label mapping (index → name)

- [ ] **2.4. Table Styling**
  - [ ] Professional table design
  - [ ] Color coding:
    - `.chosen`: Yellow/Gold background
    - `.processed`: Gray text
    - Current iteration row: Blue highlight
  - [ ] Border styling
  - [ ] Cell padding và spacing
  - [ ] Responsive font sizes

### Phase 3: Controls & Interaction (Priority: MEDIUM)
- [ ] **3.1. Algorithm Controls trong Window**
  - [ ] From dropdown (trong header/body)
  - [ ] To dropdown (có option "All Nodes")
  - [ ] Start/Run button
  - [ ] Clear/Reset button
  - [ ] Populate dropdowns từ gData.nodes

- [ ] **3.2. Step Navigation**
  - [ ] Current step indicator
  - [ ] Highlight current step row trong table
  - [ ] Prev/Next step buttons
  - [ ] First/Last step buttons
  - [ ] Keyboard shortcuts (←/→ arrows)

- [ ] **3.3. Playback Controls**
  - [ ] Play button → auto-advance steps
  - [ ] Pause button
  - [ ] Speed control slider (slow/medium/fast)
  - [ ] Auto-stop ở cuối
  - [ ] Loop option

- [ ] **3.4. Result Display**
  - [ ] Show path found (dưới table hoặc trong footer)
  - [ ] Total distance
  - [ ] Number of iterations
  - [ ] Highlight path trong table

### Phase 4: Graph Synchronization (Priority: MEDIUM)
- [ ] **4.1. Highlight Current Node**
  - [ ] Khi step thay đổi → highlight chosen node trên graph
  - [ ] Color coding:
    - Chosen node: Gold/Yellow
    - Visited nodes: Green
    - Unvisited: Default
  - [ ] Pulse animation effect

- [ ] **4.2. Highlight Edges**
  - [ ] Show edge being relaxed
  - [ ] Color visited edges
  - [ ] Highlight final path edges
  - [ ] Edge weight animation

- [ ] **4.3. Distance Labels**
  - [ ] Show current distance next to nodes
  - [ ] Update khi step changes
  - [ ] Fade in/out animation
  - [ ] Position smart (không overlap)

### Phase 5: Polish & UX (Priority: LOW)
- [ ] **5.1. Responsive Design**
  - [ ] Mobile: Window becomes bottom sheet
  - [ ] Tablet: Smaller default size
  - [ ] Desktop: Full features
  - [ ] Touch-friendly controls

- [ ] **5.2. Persistence**
  - [ ] Save window position (localStorage)
  - [ ] Save window size
  - [ ] Remember last algorithm run
  - [ ] Auto-restore on refresh

- [ ] **5.3. Accessibility**
  - [ ] Keyboard navigation
  - [ ] ARIA labels
  - [ ] Focus management
  - [ ] Screen reader support

- [ ] **5.4. Error Handling**
  - [ ] No path found message
  - [ ] Invalid node selection
  - [ ] Empty graph warning
  - [ ] Graceful fallbacks

### Phase 6: Advanced Features (Priority: OPTIONAL)
- [ ] **6.1. Export Table**
  - [ ] Export as CSV
  - [ ] Export as image (PNG)
  - [ ] Copy to clipboard (formatted)
  - [ ] Print view

- [ ] **6.2. Multiple Windows**
  - [ ] Compare different algorithms
  - [ ] Side-by-side view
  - [ ] Z-index stacking
  - [ ] Window focus management

- [ ] **6.3. Educational Mode**
  - [ ] Tooltips explaining each step
  - [ ] Why this node was chosen
  - [ ] Distance calculation details
  - [ ] Pseudocode alongside table

- [ ] **6.4. A* Algorithm Support**
  - [ ] Add heuristic column
  - [ ] f(n) = g(n) + h(n) display
  - [ ] Different table format
  - [ ] Toggle between Dijkstra/A*

## 🎨 Design Specifications

### Sidebar Layout (Full Height, Resizable Width)
```
┌─ Screen ──────────────────────────────────┐
│ [Toolbar: full width]                     │
├───────────────┬───────────────────────────┤
│ ← Sidebar   ║ │  Graph Canvas             │
│  (resizable) ║ │  (adjusts width)          │
│              ║ │                           │
│ [Header]     ║ │                           │
│ ┌──────────┐ ║ │                           │
│ │From: [▾] │ ║ │                           │
│ │To:   [▾] │ ║ │                           │
│ │[Start]   │ ║ │                           │
│ └──────────┘ ║ │                           │
│              ║ │                           │
│ [Table]      ║ │                           │
│ ┌──────────┐ ║ │                           │
│ │  Steps   │ ║ │                           │
│ │  Table   │ ║ │                           │
│ │  ...     │ ║ │                           │
│ └──────────┘ ║ │                           │
│              ║ │                           │
│ [Result]     ║ │                           │
│ [Controls]   ║ │                           │
└──────────────┴───────────────────────────┘
    ↑
    Drag here to resize width
    (Height is always 100vh)
```

### Sidebar Internal Structure
```
┌─────────────────────────────────────────────┐
│ DIJKSTRA VISUALIZATION           [×]        │ ← Header (50px)
├─────────────────────────────────────────────┤
│ From: [Home ▾]  To: [School ▾]  [Start]    │ ← Inputs (60px)
├─────────────────────────────────────────────┤
│ ┌───┬──────┬─────┬─────┬────────┐          │
│ │ # │ Home │  A  │  B  │ School │          │ ← Table (flexible)
│ ├───┼──────┼─────┼─────┼────────┤          │
│ │ 1 │  0*  │(∞,-)│(∞,-)│ (∞,-)  │          │
│ │ 2 │  -   │15,H*│(∞,-)│ (∞,-)  │          │
│ │ 3 │  -   │  -  │20,A*│ (∞,-)  │          │
│ └───┴──────┴─────┴─────┴────────┘          │
├─────────────────────────────────────────────┤
│ 📍 Path: Home → A → B → School              │ ← Result (60px)
│    Distance: 35  |  Steps: 3                │
├─────────────────────────────────────────────┤
│ Step: 2/3  [⏮][◄][▶][⏭] [⏸] Speed:●──○   │ ← Controls (50px)
└─────────────────────────────────────────────┘
```

### Default Sidebar Settings
```javascript
{
    minWidth: 300px,        // Minimum sidebar width
    maxWidth: 600px,        // Maximum sidebar width  
    defaultWidth: 400px,    // Initial width
    height: '100vh',        // Always full viewport height
    position: 'left',       // Fixed to left side
    zIndex: 999,           // Below toolbar (1000) but above graph
    resizeHandleWidth: 4px  // Right edge resize handle
}
```

### Color Scheme
```css
/* Sidebar Theme */
--sidebar-bg: #ffffff;
--sidebar-header: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--sidebar-border: #e0e0e0;
--sidebar-shadow: 2px 0 10px rgba(0,0,0,0.1);  /* Shadow on right edge */
--resize-handle: #667eea;
--resize-handle-hover: #764ba2;

/* Table Colors */
--cell-chosen: #ffd93d;        /* Gold - node được chọn */
--cell-processed: #95a5a6;     /* Gray - đã xử lý */
--cell-current-row: #e3f2fd;   /* Light blue - row hiện tại */
--cell-border: #dee2e6;

/* Text Colors */
--text-primary: #333333;
--text-secondary: #666666;
--text-infinity: #999999;
```

### Table Cell Format
```
Format: (distance, previous)* hoặc -

Examples:
- "0*"          → Start node (iteration 1)
- "(15, H)*"    → Chosen node with distance 15, previous = Home
- "(20, A)"     → Not chosen yet, distance 20, previous = A
- "(∞, -)"      → Unreachable node
- "-"           → Already processed
```

### Resize Handle Interaction
```
Sidebar edge:
│              ║  ← 4px resize handle (visible on hover)
│              ║     - Cursor: col-resize
│              ║     - Drag to adjust width
│              ║     - Constrained by min/max width
│              ║     - Graph canvas auto-adjusts
```

## 📝 Implementation Notes

### Data Flow
```
1. User clicks "Start" 
   ↓
2. Get From/To nodes
   ↓
3. Convert gData → adjacency matrix
   ↓
4. Run dijkstraWithSteps(matrix, startIndex)
   ↓
5. Generate steps array
   ↓
6. Render complete table (all steps)
   ↓
7. Initialize step navigator (currentStep = 0)
   ↓
8. User navigates steps → highlight row + sync graph
```

### Key Functions to Implement

```javascript
// 1. Convert graph to matrix
function graphToAdjacencyMatrix(gData) {
    // Returns: { matrix, nodeIds }
}

// 2. Dijkstra with steps
function dijkstraWithSteps(matrix, startIdx) {
    // Returns: steps array
    // Each step: { iteration, distances, previous, visited, chosen }
}

// 3. Render table
function renderDijkstraTable(steps, nodeIds) {
    // Creates complete table HTML
    // Adds classes: .chosen, .processed
}

// 4. Navigate steps
function goToStep(stepIndex) {
    // Highlights row in table
    // Updates graph visualization
}

// 5. Node label helper
function getVertexLabel(index, nodeIds) {
    // Maps index → node name (Home, A, B...)
}
```

### localStorage Keys
```javascript
{
    'dijkstra-sidebar-width': 400,
    'dijkstra-sidebar-visible': false,
    'dijkstra-last-from': 'home',
    'dijkstra-last-to': 'school'
}
```

### Mobile Adaptations
```css
@media (max-width: 768px) {
    .dijkstra-sidebar {
        /* Full width overlay on mobile */
        width: 100% !important;
        max-width: 100%;
        min-width: 100%;
    }
    
    /* Hide resize handle on mobile */
    .sidebar-resize-handle {
        display: none;
    }
    
    /* Adjust table for smaller screens */
    .dijkstra-table {
        font-size: 12px;
    }
}
```

## 🐛 Known Issues to Fix
- [ ] Grid lines sometimes flicker on zoom
- [ ] Link weight text overlap when nodes too close
- [ ] Mobile toolbar toggle position needs fine-tuning
- [ ] Import dialog doesn't validate matrix dimensions properly

## 📚 Documentation Needed
- [ ] Update README with algorithm visualization features
- [ ] Add screenshots/GIFs
- [ ] Create video tutorial
- [ ] Update GUIDE.md with step-by-step usage

## 🚀 Development Timeline

### Sprint 1 (Days 1-3): Sidebar Infrastructure
- **Day 1**: HTML structure + Basic CSS
  - Create sidebar container (left side, full height)
  - Header, body, footer layout
  - Toggle button in toolbar
  
- **Day 2**: Toggle & animations
  - Show/hide functionality
  - Slide in/out transitions
  - Graph canvas width adjustment
  
- **Day 3**: Resizable width functionality
  - Right edge resize handle
  - Min/max width constraints
  - localStorage persistence

### Sprint 2 (Days 4-6): Table Implementation
- **Day 4**: Algorithm adaptation
  - graphToAdjacencyMatrix()
  - dijkstraWithSteps()
  - Test với graphs khác nhau
  
- **Day 5**: Table rendering
  - renderDijkstraTable()
  - Cell formatting
  - Styling
  
- **Day 6**: Controls integration
  - From/To dropdowns
  - Start button
  - Result display

### Sprint 3 (Days 7-9): Step Navigation
- **Day 7**: Step controls
  - Prev/Next buttons
  - First/Last buttons
  - Current step indicator
  
- **Day 8**: Playback
  - Play/Pause
  - Speed control
  - Auto-advance
  
- **Day 9**: Graph synchronization
  - Highlight nodes
  - Color edges
  - Distance labels

### Sprint 4 (Days 10-12): Polish
- **Day 10**: Mobile responsive
- **Day 11**: Bug fixes + testing
- **Day 12**: Documentation + screenshots

**Total estimated time**: 12 days (~2 weeks)

---

## 📚 Resources & References

### Draggable/Resizable Libraries (For reference)
- [interact.js](https://interactjs.io/docs/draggable/)
- [Moveable.js](https://daybrush.com/moveable/)
- [GridStack](https://gridstackjs.com/)

### CSS Inspiration
- [VS Code Window](https://code.visualstudio.com/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Figma Panels](https://www.figma.com/)

### Dijkstra Visualization References
- [VisuAlgo](https://visualgo.net/en/sssp)
- [Algorithm Visualizer](https://algorithm-visualizer.org/greedy/dijkstras-shortest-path)
- [USFCA Visualization](https://www.cs.usfca.edu/~galles/visualization/Dijkstra.html)

---

## ✅ Definition of Done

Each task is considered DONE when:
- [ ] Code is written and tested
- [ ] Works on Chrome, Firefox, Edge
- [ ] Responsive on desktop, tablet, mobile
- [ ] No console errors
- [ ] Code is commented
- [ ] Follows existing code style
- [ ] Git committed with clear message

---

**Last Updated**: October 24, 2025  
**Status**: Ready to Start  
**Next Action**: Phase 1.1 - Create Draggable Window HTML Structure  
**Priority Focus**: Table-first design for students
