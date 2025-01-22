import ChatSection from "@/components/ChatSection";
import EcoInfluencer from "@/components/EcoInfluencer";

const Index = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Project Discussion</h1>
        <EcoInfluencer />
        <ChatSection />
      </div>
    </div>
  );
};

export default Index;