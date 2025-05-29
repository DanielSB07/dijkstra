export interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface Edge {
  source: string;
  target: string;
  weight: number;
}

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

export interface Path {
  nodes: string[];
  totalCost: number;
}