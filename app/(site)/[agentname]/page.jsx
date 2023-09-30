// app/[agentname]/page.jsx



export default async function AgentProfile({ params }) {
    const { agentname } = params;
    const data = await fetch(`http://localhost:3000/api/agents/${agentname}`); 
    const agentData = await data.json();
    
    if (!agentData) {
        return <div>Agent not found</div>;
    }

    return (
        <div>
            <h1>{agentData.name}</h1>
            <h2>{agentData.username}</h2>
            {/* ... */}
        </div>
    );
};
