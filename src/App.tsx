import React, { useState } from 'react';
import { urbanGraph } from './data/urbanGraph';
import { dijkstra } from './utils/dijkstra';
import { Path } from './types';
import NodeSelector from './components/NodeSelector';
import PathDisplay from './components/PathDisplay';
import GraphVisualization from './components/GraphVisualization';
import { Map } from 'lucide-react';

function App() {
  // Estado
  const [startNode, setStartNode] = useState<string>('');
  const [endNode, setEndNode] = useState<string>('');
  const [path, setPath] = useState<Path | null>(null);
  const [calculating, setCalculating] = useState<boolean>(false);

  // Manejar cambio de nodo inicial
  const handleStartNodeChange = (nodeId: string) => {
    setStartNode(nodeId);
    // Limpiar ruta si cambia algún nodo
    setPath(null);
  };

  // Manejar cambio de nodo final
  const handleEndNodeChange = (nodeId: string) => {
    setEndNode(nodeId);
    // Limpiar ruta si cambia algún nodo
    setPath(null);
  };

  // Manejar clic en nodo del grafo
  const handleNodeClick = (nodeId: string) => {
    // Si no hay nodo inicial, establecerlo
    if (!startNode) {
      setStartNode(nodeId);
    } 
    // Si hay nodo inicial pero no final, establecer el final
    else if (!endNode) {
      // No permitir que el nodo final sea igual al inicial
      if (nodeId !== startNode) {
        setEndNode(nodeId);
      }
    } 
    // Si ambos están establecidos, reiniciar y establecer nodo inicial
    else {
      setStartNode(nodeId);
      setEndNode('');
      setPath(null);
    }
  };

  // Encontrar ruta
  const findPath = () => {
    if (!startNode || !endNode || startNode === endNode) {
      return;
    }

    setCalculating(true);

    // Agregar un pequeño retraso para permitir actualización de UI y simular tiempo de cálculo
    setTimeout(() => {
      const result = dijkstra(urbanGraph, startNode, endNode);
      setPath(result);
      setCalculating(false);
    }, 500);
  };

  // Reiniciar
  const reset = () => {
    setStartNode('');
    setEndNode('');
    setPath(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Encabezado */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Map className="w-8 h-8 mr-2" />
              <h1 className="text-2xl font-bold">Buscador de Rutas Urbanas</h1>
            </div>
            <div className="text-sm text-blue-200">Encuentra la ruta más corta entre ubicaciones</div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Controles */}
          <div className="lg:col-span-1">
            <NodeSelector
              graph={urbanGraph}
              startNode={startNode}
              endNode={endNode}
              onStartNodeChange={handleStartNodeChange}
              onEndNodeChange={handleEndNodeChange}
              onFindPath={findPath}
              onReset={reset}
              disabled={calculating}
            />

            {path && <PathDisplay path={path} graph={urbanGraph} />}

            {calculating && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-4 animate-pulse">
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mr-3"></div>
                  <p className="text-gray-700">Calculando la ruta más corta...</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Cómo Usar</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Selecciona un punto de partida y destino desde los menús desplegables, o haz clic directamente en el grafo</li>
                <li>Haz clic en "Buscar Ruta Más Corta" para calcular la ruta óptima</li>
                <li>Visualiza el resultado en el grafo (resaltado en azul)</li>
                <li>La distancia total y el detalle de la ruta se mostrarán en pantalla</li>
              </ol>
            </div>
          </div>

          {/* Columna derecha - Visualización */}
          <div className="lg:col-span-2">
            <GraphVisualization 
              graph={urbanGraph}
              path={path}
              startNode={startNode}
              endNode={endNode}
              onNodeClick={handleNodeClick}
            />
          </div>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            Buscador de Rutas Urbanas usando el Algoritmo de Dijkstra - 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;