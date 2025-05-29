import { Graph, Edge } from '../types';

// Convert graph to adjacency list for Dijkstra's algorithm
export function createAdjacencyList(graph: Graph): Map<string, Map<string, number>> {
  const adjacencyList = new Map<string, Map<string, number>>();

  // Initialize empty adjacency list for all nodes
  graph.nodes.forEach(node => {
    adjacencyList.set(node.id, new Map<string, number>());
  });

  // Add edges to adjacency list (undirected graph)
  graph.edges.forEach(edge => {
    // Add edge in both directions since it's an undirected graph
    adjacencyList.get(edge.source)?.set(edge.target, edge.weight);
    adjacencyList.get(edge.target)?.set(edge.source, edge.weight);
  });

  return adjacencyList;
}

// Get all node IDs from the graph
export function getNodeIds(graph: Graph): string[] {
  return graph.nodes.map(node => node.id);
}

// Find a node by ID
export function findNodeById(graph: Graph, id: string) {
  return graph.nodes.find(node => node.id === id);
}

// Find an edge between two nodes
export function findEdge(graph: Graph, source: string, target: string): Edge | undefined {
  return graph.edges.find(
    edge => 
      (edge.source === source && edge.target === target) || 
      (edge.source === target && edge.target === source)
  );
}