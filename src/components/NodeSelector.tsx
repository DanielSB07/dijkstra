import React from 'react';
import { Graph } from '../types';
import { getNodeIds } from '../utils/graph';

interface NodeSelectorProps {
  graph: Graph;
  startNode: string;
  endNode: string;
  onStartNodeChange: (nodeId: string) => void;
  onEndNodeChange: (nodeId: string) => void;
  onFindPath: () => void;
  onReset: () => void;
  disabled: boolean;
}

const NodeSelector: React.FC<NodeSelectorProps> = ({
  graph,
  startNode,
  endNode,
  onStartNodeChange,
  onEndNodeChange,
  onFindPath,
  onReset,
  disabled
}) => {
  const nodeIds = getNodeIds(graph);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Seleccionar Ubicaciones</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="start-node" className="block text-sm font-medium text-gray-700 mb-1">
            Punto de Partida
          </label>
          <select
            id="start-node"
            value={startNode}
            onChange={(e) => onStartNodeChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={disabled}
          >
            <option value="">Seleccionar punto de partida</option>
            {nodeIds.map(id => (
              <option key={id} value={id}>
                {graph.nodes.find(node => node.id === id)?.label || id}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="end-node" className="block text-sm font-medium text-gray-700 mb-1">
            Destino
          </label>
          <select
            id="end-node"
            value={endNode}
            onChange={(e) => onEndNodeChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={disabled}
          >
            <option value="">Seleccionar destino</option>
            {nodeIds.map(id => (
              <option key={id} value={id}>
                {graph.nodes.find(node => node.id === id)?.label || id}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={onFindPath}
          disabled={!startNode || !endNode || startNode === endNode || disabled}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            !startNode || !endNode || startNode === endNode || disabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 transition duration-200'
          }`}
        >
          Buscar Ruta Más Corta
        </button>
        
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 font-medium hover:bg-gray-300 transition duration-200"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default NodeSelector;