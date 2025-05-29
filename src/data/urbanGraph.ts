import { Graph } from '../types';

// Grafo urbano que representa una ciudad con varias ubicaciones
export const urbanGraph: Graph = {
  nodes: [
    { id: "A", label: "Centro", x: 100, y: 100 },
    { id: "B", label: "Parque", x: 250, y: 50 },
    { id: "C", label: "Centro Comercial", x: 400, y: 100 },
    { id: "D", label: "Universidad", x: 100, y: 250 },
    { id: "E", label: "Hospital", x: 250, y: 200 },
    { id: "F", label: "Estadio", x: 400, y: 250 },
    { id: "G", label: "Aeropuerto", x: 550, y: 175 },
    { id: "H", label: "Zona Residencial", x: 300, y: 300 },
    { id: "I", label: "Zona Industrial", x: 175, y: 350 },
    { id: "J", label: "Estación de Tren", x: 450, y: 375 }
  ],
  edges: [
    { source: "A", target: "B", weight: 5 },
    { source: "A", target: "D", weight: 7 },
    { source: "A", target: "E", weight: 12 },
    { source: "B", target: "C", weight: 8 },
    { source: "B", target: "E", weight: 4 },
    { source: "C", target: "G", weight: 9 },
    { source: "C", target: "F", weight: 6 },
    { source: "D", target: "E", weight: 6 },
    { source: "D", target: "I", weight: 5 },
    { source: "E", target: "F", weight: 7 },
    { source: "E", target: "H", weight: 3 },
    { source: "F", target: "G", weight: 8 },
    { source: "F", target: "J", weight: 4 },
    { source: "G", target: "J", weight: 10 },
    { source: "H", target: "I", weight: 6 },
    { source: "H", target: "J", weight: 7 },
    { source: "I", target: "J", weight: 9 }
  ]
};