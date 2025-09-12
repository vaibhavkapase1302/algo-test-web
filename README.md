# AlgoTest Web

A modern React web application for testing and visualizing algorithms with real-time execution and performance metrics.

## 🚀 Features

- **Interactive Algorithm Testing**: Test various algorithms with custom inputs
- **Real-time Execution**: See algorithm results with execution time metrics
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Algorithm Visualization**: Visual feedback for algorithm execution
- **Docker Ready**: Fully containerized with multi-stage Docker build

## 🛠️ Tech Stack

- React 18
- Tailwind CSS
- Lucide React (Icons)
- Axios for API calls
- Multi-stage Docker build

## 📁 Project Structure

```
algo-test-web/
├── src/
│   ├── App.js           # Main React component
│   ├── App.css          # Custom styles
│   ├── index.js         # React entry point
│   └── index.css        # Tailwind CSS
├── public/
│   ├── index.html       # HTML template
│   └── manifest.json    # PWA manifest
├── package.json         # Dependencies
├── Dockerfile           # Multi-stage Docker build
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── .env                # Environment variables
└── README.md           # This file
```

## 🚀 Quick Start

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Make sure the API is running on http://localhost:3001

### Docker

1. **Build the image**:
   ```bash
   docker build -t algo-test-web .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3000:3000 algo-test-web
   ```

## 🎨 UI Features

### Algorithm Selection
- Browse available algorithms
- View algorithm descriptions and difficulty levels
- Categorized by type (Sorting, Search, Graph)

### Input Interface
- Custom input for different algorithm types
- Special handling for Binary Search (array + target)
- Real-time input validation

### Results Display
- Execution results with formatted output
- Performance metrics (execution time)
- Timestamp and algorithm information

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:3001
```

### For Production
```env
REACT_APP_API_URL=https://your-api-domain.com
```

## 🐳 Docker Deployment

The web app uses a multi-stage Docker build:

- **Build stage**: Installs dependencies and builds React app
- **Production stage**: Serves static files with `serve` package

## 🎯 Available Algorithms

1. **Bubble Sort** - Simple sorting algorithm
2. **Quick Sort** - Efficient sorting algorithm  
3. **Binary Search** - Search in sorted arrays
4. **Dijkstra's Algorithm** - Shortest path algorithm

## 🚀 Deployment

### AWS EKS
1. Build and push Docker image to ECR
2. Deploy using Kubernetes manifests
3. Configure ingress for external access

### Environment Variables for Production
- `REACT_APP_API_URL=https://your-api-domain.com`

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional interface
- **Animations**: Smooth transitions and hover effects

## 📱 Responsive Design

- Mobile-friendly interface
- Tablet and desktop optimized
- Touch-friendly controls

## 🚀 Performance

- Optimized React build
- Code splitting ready
- Efficient re-renders
- Fast loading times

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Happy Algorithm Testing! 🎉**
