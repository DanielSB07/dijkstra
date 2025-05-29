import React from 'react';
import { Graph, Path } from '../types';

interface PathDisplayProps {
  path: Path | null;
  graph: Graph;
}

const PathDisplay: React.FC<PathDisplayProps> = ({ path, graph }) => {
  if (!path) {
    return null;
  }

  // Obtener etiquetas de nodos desde IDs
  const pathWithLabels = path.nodes.map(nodeId => {
    const node = graph.nodes.find(n => n.id === nodeId);
    return node ? node.label : nodeId;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-fade-in">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Ruta Más Corta</h2>
      
      <div className="mb-3">
        <div className="text-lg font-medium text-blue-600">
          Distancia Total: <span className="font-bold">{path.totalCost} unidades</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="flex items-center flex-wrap gap-2 mb-2">
          {pathWithLabels.map((label, index) => (
            <React.Fragment key={index}>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {label}
              </div>
              {index < pathWithLabels.length - 1 && (
                <div className="text-gray-500">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <h3 className="text-md font-medium text-gray-700 mb-2">Detalles de la Ruta:</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          {path.nodes.map((nodeId, index) => {
            if (index === path.nodes.length - 1) return null;
            
            const currentNode = graph.nodes.find(n => n.id === nodeId);
            const nextNode = graph.nodes.find(n => n.id === path.nodes[index + 1]);
            
            if (!currentNode || !nextNode) return null;
            
            const edge = graph.edges.find(
              e => (e.source === nodeId && e.target === path.nodes[index + 1]) || 
                  (e.target === nodeId && e.source === path.nodes[index + 1])
            );
            
            return (
              <li key={index} className="flex items-center">
                <span className="font-medium">{currentNode.label}</span>
                <span className="mx-2">→</span>
                <span className="font-medium">{nextNode.label}</span>
                <span className="ml-2 text-gray-500">
                  ({edge?.weight} unidades)
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PathDisplay;