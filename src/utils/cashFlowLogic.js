import BinaryHeap from './heap';

export const createRandomData = () => {
  const sz = Math.floor(Math.random() * 8) + 2;
  const nodes = [];
  const edges = [];

  // Create nodes
  for (let i = 0; i < sz; i++) {
    nodes.push({ id: i, label: `Person ${i + 1}` });
  }

  // Create edges
  for (let i = 0; i < sz; i++) {
    for (let j = i + 1; j < sz; j++) {
      if (Math.random() > 0.5) {
        if (Math.random() > 0.5) {
          edges.push({
            from: i,
            to: j,
            label: String(Math.floor(Math.random() * 100) + 1),
          });
        } else {
          edges.push({
            from: j,
            to: i,
            label: String(Math.floor(Math.random() * 100) + 1),
          });
        }
      }
    }
  }

  return { nodes, edges };
};

export const createDataFromInput = (inputData) => {
  const uniquePersons = new Set();
  inputData.forEach(row => {
    uniquePersons.add(row.from);
    uniquePersons.add(row.to);
  });

  const nodes = Array.from(uniquePersons).map((person, index) => ({
    id: index,
    label: person
  }));

  const edges = inputData.map(row => ({
    from: Array.from(uniquePersons).indexOf(row.from),
    to: Array.from(uniquePersons).indexOf(row.to),
    label: String(row.amount)
  }));

  return { nodes, edges };
};

export const solveCashFlow = (data) => {
  const sz = data.nodes.length;
  const vals = Array(sz).fill(0);

  // Calculate net balance for each person
  data.edges.forEach(edge => {
    vals[edge.to] += parseInt(edge.label);
    vals[edge.from] -= parseInt(edge.label);
  });

  const posHeap = new BinaryHeap();
  const negHeap = new BinaryHeap();

  // Create heaps for positive and negative balances
  for (let i = 0; i < sz; i++) {
    if (vals[i] > 0) {
      posHeap.insert([vals[i], i]);
    } else {
      negHeap.insert([-vals[i], i]);
      vals[i] *= -1;
    }
  }

  const newEdges = [];
  // Minimize cash flow
  while (!posHeap.empty() && !negHeap.empty()) {
    const mx = posHeap.extractMax();
    const mn = negHeap.extractMax();

    const amt = Math.min(mx[0], mn[0]);
    const to = mx[1];
    const from = mn[1];

    newEdges.push({
      from: from,
      to: to,
      label: String(Math.abs(amt))
    });

    vals[to] -= amt;
    vals[from] -= amt;

    if (mx[0] > mn[0]) {
      posHeap.insert([vals[to], to]);
    } else if (mx[0] < mn[0]) {
      negHeap.insert([vals[from], from]);
    }
  }

  return {
    nodes: data.nodes,
    edges: newEdges
  };
}; 