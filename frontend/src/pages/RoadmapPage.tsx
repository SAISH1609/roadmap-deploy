// frontend/src/pages/RoadmapPage.tsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

import { getRoadmapBySlug } from '@/services/roadmapService';
import { layoutElements } from '@/services/roadmapService';
import CustomNode from '@/components/shared/roadmaps/CustomNode';
import { TopicDrawer } from '@/components/shared/roadmaps/TopicDrawer';
import { useProgressStore } from '@/store/progressStore'; // Import the store

const nodeTypes = {
  custom: CustomNode,
};

const RoadmapPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [roadmap, setRoadmap] = useState<any | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  
  // Get state and actions from the progress store
  const { progress, fetchProgressForRoadmap } = useProgressStore();

  const [selectedTopic, setSelectedTopic] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch roadmap and progress data
  useEffect(() => {
    const fetchRoadmap = async () => {
      if (slug) {
        const roadmapData = await getRoadmapBySlug(slug);
        setRoadmap(roadmapData);
        // Fetch progress after getting roadmap data
        await fetchProgressForRoadmap(roadmapData.id);
      }
    };
    fetchRoadmap();
  }, [slug, fetchProgressForRoadmap]);

  // Update nodes whenever the roadmap or progress data changes
  useEffect(() => {
    if (roadmap) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(roadmap.topics);
      
      const updatedNodes = layoutedNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          // Pass completion status to the node data
          is_completed: progress[Number(node.id)] || false,
        },
      }));
      
      setNodes(updatedNodes);
      setEdges(layoutedEdges);
    }
  }, [roadmap, progress]);

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    const topic = roadmap?.topics.find((t: any) => String(t.id) === node.id);
    if (topic) {
        setSelectedTopic(topic);
        setIsDrawerOpen(true);
    }
  };

  return (
    <div style={{ height: 'calc(100vh - 80px)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        className="bg-gray-900"
      >
        <Controls />
        <MiniMap />
        <Background gap={16} color="#4a4a4a" />
      </ReactFlow>
      <TopicDrawer
        topic={selectedTopic}
        roadmapId={roadmap?.id} // Pass roadmapId to the drawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
};

export default RoadmapPage;