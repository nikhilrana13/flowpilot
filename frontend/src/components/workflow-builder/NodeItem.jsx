const NodeItem = ({ node }) => {
  const Icon = node.icon;
   const onDragStart = (event) => {
    event.dataTransfer.setData("application/reactflow", node.type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
     draggable 
     onDragStart={onDragStart}
      className="group cursor-grab rounded-xl border border-[#27272A] bg-[#18181B] p-4 transition hover:border-[#7C3AED]/40 hover:bg-[#1D1D22]"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            background: `${node.color}20`,
            color: node.color,
          }}
        >
          <Icon size={22} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            {node.title}
          </h3>

          <p className="text-xs text-[#71717A]">
            {node.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NodeItem;