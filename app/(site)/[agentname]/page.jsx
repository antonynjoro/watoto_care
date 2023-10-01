// app/[agentname]/page.jsx

import Image from 'next/image';

export default async function AgentProfile({ params }) {
    const { agentname } = params;
    const data = await fetch(`http://localhost:3000/api/agents/${agentname}`); 

    if (!data.ok) {
        return <div>Agent not found</div>;
    }

    const agentData = await data.json();
    
    if (!agentData) {
        return <div>Agent not found</div>;
    }

    return (
        <div>
            <h1>{agentData.name}</h1>
            <h2>{agentData.username}</h2>
            <p>{agentData.image}</p>
            <Image
                src={agentData.image}
                alt={agentData.name}
                width={1000}
                height={1000}
            />
            {/* ... */}
        </div>
    );
};
