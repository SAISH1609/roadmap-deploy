import apiClient from './apiClient';
import dagre from 'dagre';
import type { Node, Edge } from 'reactflow';

export const getRoadmaps = async () => {
  const response = await apiClient.get('/roadmaps/');
  return response.data;
};

export const getRoadmapBySlug = async (slug: string) => {
  const response = await apiClient.get(`/roadmaps/${slug}`);
  return response.data;
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250;
const nodeHeight = 150;

export const layoutElements = (topics: any[]): { nodes: Node[], edges: Edge[] } => {
  dagreGraph.setGraph({ rankdir: 'TB' });

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const topicMap: { [key: number]: any } = {};
  const allTopics: any[] = [];

  // 1. Flatten the topic tree and build a map for easy access
  const flattenTopics = (topicList: any[]) => {
    topicList.forEach(topic => {
      allTopics.push(topic);
      topicMap[topic.id] = topic;
      if (topic.children && topic.children.length > 0) {
        flattenTopics(topic.children);
      }
    });
  };
  flattenTopics(topics);

  // 2. Add all nodes and hierarchical edges to the graph
  allTopics.forEach(topic => {
    dagreGraph.setNode(String(topic.id), { width: nodeWidth, height: nodeHeight });
    if (topic.parent_id && topicMap[topic.parent_id]) {
      dagreGraph.setEdge(String(topic.parent_id), String(topic.id));
    }
  });

  // 3. Connect the main chapters (root topics) sequentially
  const rootTopics = topics.filter(t => !t.parent_id).sort((a, b) => a.order_index - b.order_index);
  for (let i = 0; i < rootTopics.length - 1; i++) {
    dagreGraph.setEdge(String(rootTopics[i].id), String(rootTopics[i + 1].id));
  }

  dagre.layout(dagreGraph);

  // 4. Create React Flow nodes and edges from the layouted graph
  allTopics.forEach(topic => {
    const node = dagreGraph.node(String(topic.id));
    if (node) {
      nodes.push({
        id: String(topic.id),
        type: 'custom',
        data: { label: topic.title, description: topic.description },
        position: { x: node.x - nodeWidth / 2, y: node.y - nodeHeight / 2 },
      });
    }
  });

  dagreGraph.edges().forEach(edge => {
    edges.push({
        id: `e${edge.v}-${edge.w}`,
        source: edge.v,
        target: edge.w,
        animated: true,
        style: { stroke: '#6366f1' },
    });
  });

  return { nodes, edges };
};