import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

const NetworkContainer = ({ network1Data, network2Data }) => {
  const network1Ref = useRef(null);
  const network2Ref = useRef(null);
  const network1Instance = useRef(null);
  const network2Instance = useRef(null);

  const options = {
    edges: {
      arrows: {
        to: true,
      },
      labelHighlightBold: true,
      font: {
        size: 20,
      },
    },
    nodes: {
      font: "12px arial red",
      scaling: {
        label: true,
      },
      shape: "icon",
      icon: {
        face: "custom",
        code: "assets/person-icon.png",
        size: 50,
        color: "#991133",
      },
    },
    autoResize: true,
    height: '100%'
  };

  // Initialize networks
  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (network1Ref.current) {
        try {
          network1Instance.current = new Network(
            network1Ref.current,
            { nodes: new DataSet([]), edges: new DataSet([]) },
            options
          );
        } catch (error) {
          console.error('Error initializing network 1:', error);
        }
      }

      if (network2Ref.current) {
        try {
          network2Instance.current = new Network(
            network2Ref.current,
            { nodes: new DataSet([]), edges: new DataSet([]) },
            options
          );
        } catch (error) {
          console.error('Error initializing network 2:', error);
        }
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      try {
        if (network1Instance.current) {
          network1Instance.current.destroy();
          network1Instance.current = null;
        }
        if (network2Instance.current) {
          network2Instance.current.destroy();
          network2Instance.current = null;
        }
      } catch (error) {
        console.error('Error cleaning up networks:', error);
      }
    };
  }, []);

  // Update network 1 data
  useEffect(() => {
    if (network1Data && network1Instance.current) {
      try {
        const nodes = new DataSet(network1Data.nodes || []);
        const edges = new DataSet(network1Data.edges || []);
        network1Instance.current.setData({ nodes, edges });
        setTimeout(() => network1Instance.current.fit(), 50);
      } catch (error) {
        console.error('Error updating network 1:', error);
      }
    }
  }, [network1Data]);

  // Update network 2 data
  useEffect(() => {
    if (network2Data && network2Instance.current) {
      try {
        const nodes = new DataSet(network2Data.nodes || []);
        const edges = new DataSet(network2Data.edges || []);
        network2Instance.current.setData({ nodes, edges });
        setTimeout(() => network2Instance.current.fit(), 50);
      } catch (error) {
        console.error('Error updating network 2:', error);
      }
    }
  }, [network2Data]);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[70vh]">
      <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden">
        <div ref={network1Ref} className="w-full h-full min-h-[400px] relative">
          {!network1Data && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <p className="text-xl font-bold text-gray-500 text-center px-4">
                Click on Get New Problem OR Generate Random to create problem
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden">
        <div ref={network2Ref} className="w-full h-full min-h-[400px] relative">
          {!network2Data && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <p className="text-xl font-bold text-gray-500 text-center px-4">
                Click on solve to get Solution !!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkContainer; 