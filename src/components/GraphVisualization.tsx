import React, { useRef, useEffect } from 'react';
import { Graph, Path } from '../types';
import { findNodeById } from '../utils/graph';

interface GraphVisualizationProps {
  graph: Graph;
  path: Path | null;
  startNode: string;
  endNode: string;
  onNodeClick?: (nodeId: string) => void;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  graph,
  path,
  startNode,
  endNode,
  onNodeClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Calcular si un nodo está en la ruta
  const isNodeInPath = (nodeId: string): boolean => {
    return path ? path.nodes.includes(nodeId) : false;
  };
  
  // Calcular si una arista está en la ruta
  const isEdgeInPath = (source: string, target: string): boolean => {
    if (!path) return false;
    
    const nodes = path.nodes;
    
    for (let i = 0; i < nodes.length - 1; i++) {
      if ((nodes[i] === source && nodes[i + 1] === target) ||
          (nodes[i] === target && nodes[i + 1] === source)) {
        return true;
      }
    }
    
    return false;
  };

  // Manejar clic en el canvas
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !onNodeClick) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Verificar si el clic fue en un nodo
    for (const node of graph.nodes) {
      const dx = node.x - x;
      const dy = node.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= 15) { // Radio del nodo + margen
        onNodeClick(node.id);
        break;
      }
    }
  };

  // Dibujar grafo en el canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Limpiar canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Establecer tamaño del canvas basado en el elemento padre
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = 400; // Altura fija
    }

    // Calcular factores de escala
    const nodes = graph.nodes;
    const maxX = Math.max(...nodes.map(n => n.x)) + 50;
    const maxY = Math.max(...nodes.map(n => n.y)) + 50;
    const scaleX = canvas.width / maxX;
    const scaleY = canvas.height / maxY;

    // Dibujar aristas
    graph.edges.forEach(edge => {
      const sourceNode = findNodeById(graph, edge.source);
      const targetNode = findNodeById(graph, edge.target);

      if (sourceNode && targetNode) {
        const inPath = isEdgeInPath(edge.source, edge.target);
        
        context.beginPath();
        context.moveTo(sourceNode.x * scaleX, sourceNode.y * scaleY);
        context.lineTo(targetNode.x * scaleX, targetNode.y * scaleY);
        
        if (inPath) {
          context.strokeStyle = '#3B82F6'; // Azul para la ruta
          context.lineWidth = 3;
        } else {
          context.strokeStyle = '#CBD5E1'; // Gris claro para otras aristas
          context.lineWidth = 2;
        }
        
        context.stroke();
        
        // Dibujar peso
        const midX = (sourceNode.x + targetNode.x) / 2 * scaleX;
        const midY = (sourceNode.y + targetNode.y) / 2 * scaleY;
        
        context.fillStyle = inPath ? '#3B82F6' : '#64748B';
        context.font = '12px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Dibujar fondo para el peso
        const weightText = edge.weight.toString();
        const textMetrics = context.measureText(weightText);
        const padding = 4;
        
        context.fillStyle = inPath ? '#EFF6FF' : '#F8FAFC';
        context.fillRect(
          midX - textMetrics.width / 2 - padding,
          midY - 8 - padding,
          textMetrics.width + padding * 2,
          16 + padding * 2
        );
        
        // Dibujar texto del peso
        context.fillStyle = inPath ? '#3B82F6' : '#64748B';
        context.fillText(weightText, midX, midY);
      }
    });

    // Dibujar nodos
    graph.nodes.forEach(node => {
      const x = node.x * scaleX;
      const y = node.y * scaleY;
      const isStart = node.id === startNode;
      const isEnd = node.id === endNode;
      const inPath = isNodeInPath(node.id);
      
      // Dibujar círculo del nodo
      context.beginPath();
      context.arc(x, y, 15, 0, Math.PI * 2);
      
      if (isStart) {
        context.fillStyle = '#10B981'; // Verde para inicio
      } else if (isEnd) {
        context.fillStyle = '#EF4444'; // Rojo para fin
      } else if (inPath) {
        context.fillStyle = '#3B82F6'; // Azul para ruta
      } else {
        context.fillStyle = '#64748B'; // Gris para otros nodos
      }
      
      context.fill();
      
      // Dibujar etiqueta del nodo
      context.fillStyle = '#FFFFFF';
      context.font = 'bold 12px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(node.id, x, y);
      
      // Dibujar nombre del nodo
      context.fillStyle = '#1F2937';
      context.font = '12px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(node.label, x, y + 30);
    });

  }, [graph, path, startNode, endNode]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Grafo Urbano</h2>
      <div className="relative w-full">
        <canvas 
          ref={canvasRef} 
          className="border border-gray-200 rounded-lg"
          onClick={handleCanvasClick}
        />
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-700">Punto de Partida</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-700">Destino</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-700">Ruta</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gray-500 mr-2"></div>
            <span className="text-sm text-gray-700">Otras Ubicaciones</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;