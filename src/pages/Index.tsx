import ChatSection from "@/components/ChatSection";

const Index = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Project Discussion</h1>
        <ChatSection />
      </div>
    </div>
  );
};

export default Index;