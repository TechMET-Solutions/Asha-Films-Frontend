// import React from 'react'
// import { Title } from '../../components/ui';


// function OurClients() {
//     return (
//         <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//             <div className="text-center mb-10">
//                 <Title title="Our Client Production House" />
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-9 gap-4 sm:gap-6">
//                 {clientdata.map((client) => (
//                     <div
//                         key={client.id}
//                         className="group bg-white aspect-[4/3] shadow-sm shadow-black/10 border border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-md transition-shadow duration-300"
//                     >
//                         <img
//                             src={client.img}
//                             alt={client.alt}
//                             className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default OurClients


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Title } from '../../components/ui';
import { API } from '../../api';

// ✅ Your backend base URL

function OurClients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
    document.title = "Our Clients | 1 on 1 Screen";
  }, []);

    useEffect(() => {
    const fetchClients = async () => {
        try {
            const res = await axios.get(`${API}/api/content/clients`);

            // Sort by created_at (oldest first → first uploaded first)
            const sortedClients = res.data.clients.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );

            setClients(sortedClients);
        } catch (error) {
            console.error("Error fetching clients:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchClients();
}, []);


    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <Title title="Our Client Production House" />
            </div>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-9 gap-4 sm:gap-6">
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            className="group bg-white aspect-[4/3] shadow-sm shadow-black/10 border border-gray-300 flex items-center justify-center hover:shadow-md transition-shadow duration-300"
                        >
                            <img
                                src={`${client.image_url}`} // image_url returned from backend
                                alt="client"
                                className="w-full h-full object-cover group-hover:scale-105 p-1.5 transition-transform duration-300"
                            />
                        </div>
                    ))}

                    {/* {clients.map((client, index) => (
                        <div
                            key={client.id}
                            className={`group bg-white aspect-[4/3] shadow-sm shadow-black/10 border border-gray-300 flex items-center justify-center hover:shadow-md transition-shadow duration-300
            ${index === 0 ? "col-span-2 row-span-2" : ""}`} // make first image bigger
                        >
                            <img
                                src={`${client.image_url}`}
                                alt="client"
                                className="w-full h-full object-cover group-hover:scale-105 p-1.5 transition-transform duration-300"
                            />
                        </div>
                    ))} */}

                </div>
            )}
        </div>
    );
}

export default OurClients;
