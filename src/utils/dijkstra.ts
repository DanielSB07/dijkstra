import { Graph, Path } from '../types';
import { createAdjacencyList } from './graph';

// Implementation of Dijkstra's algorithm
export function dijkstra(graph: Graph, startNodeId: string, endNodeId: string): Path | null {
  // Create adjacency list
  const adjacencyList = createAdjacencyList(graph);
  
  // Set of visited nodes
  const visited = new Set<string>();
  
  // Priority queue (simplified as an array of [nodeId, distance] pairs)
  const queue: [string, number][] = [[startNodeId, 0]];
  
  // Distance from start to each node
  const distances = new Map<string, number>();
  
  // Previous node in optimal path
  const previous = new Map<string, string | null>();
  
  // Initialize distances
  graph.nodes.forEach(node => {
    distances.set(node.id, node.id === startNodeId ? 0 : Infinity);
    previous.set(node.id, null);
  });

  // Main algorithm loop
  while (queue.length > 0) {
    // Sort queue to get node with minimum distance
    queue.sort((a, b) => a[1] - b[1]);
    
    // Get node with minimum distance
    const [currentNodeId, currentDistance] = queue.shift()!;
    
    // If we've reached the end node, we're done
    if (currentNodeId === endNodeId) {
      break;
    }
    
    // Skip if already visited
    if (visited.has(currentNodeId)) {
      continue;
    }
    
    // Mark as visited
    visited.add(currentNodeId);
    
    // Get neighbors
    const neighbors = adjacencyList.get(currentNodeId);
    
    if (!neighbors) continue;
    
    // For each neighbor
    neighbors.forEach((weight, neighborId) => {
      // If not visited
      if (!visited.has(neighborId)) {
        // Calculate new distance
        const distance = currentDistance + weight;
        
        // If new distance is shorter than known distance
        if (distance < (distances.get(neighborId) || Infinity)) {
          // Update distance
          distances.set(neighborId, distance);
          
          // Update previous
          previous.set(neighborId, currentNodeId);
          
          // Add to queue
          queue.push([neighborId, distance]);
        }
      }
    });
  }
  
  // If end node is not reachable
  if (distances.get(endNodeId) === Infinity) {
    return null;
  }
  
  // Reconstruct path
  const path: string[] = [];
  let current: string | null = endNodeId;
  
  while (current !== null) {
    path.unshift(current);
    current = previous.get(current) || null;
  }
  
  // If no path found
  if (path.length === 0 || path[0] !== startNodeId) {
    return null;
  }
  
  // Return path and total cost
  return {
    nodes: path,
    totalCost: distances.get(endNodeId) || 0
  };
}