import { getRoadmapBySlug } from '@/services/roadmapService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { layoutElements } from '@/services/roadmapService'; // We will create this
import CustomNode from '@/components/shared/roadmaps/CustomNode'; // And this

const nodeTypes = {
  custom: CustomNode,
};

const RoadmapPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchAndLayoutRoadmap = async () => {
      try {
        setLoading(true);
        const roadmapData = await getRoadmapBySlug(slug);
        const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(roadmapData.topics);
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
      } catch (err) {
        setError('Failed to load roadmap. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndLayoutRoadmap();
  }, [slug]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div style={{ height: 'calc(100vh - 80px)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-900"
      >
        <Controls />
        <MiniMap />
        <Background gap={16} color="#4a4a4a" />
      </ReactFlow>
    </div>
  );
};

export default RoadmapPage;
