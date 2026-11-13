import React, { useState } from 'react';
import CreateTicket from './CreateTicket';
import Hero from './Hero';

function SupportPage() {
    const [query, setQuery] = useState("");
    const submitSearch = (event) => event.preventDefault();

    return ( 
        <>
        <main className="iv-support-page">
          <Hero query={query} onSearch={setQuery} onSubmit={submitSearch} />
          <CreateTicket query={query} onClear={() => setQuery("")} />
        </main>
        
        
        </>
     );
}

export default SupportPage;
