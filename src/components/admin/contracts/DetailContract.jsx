import { Page, Text, View, Document, PDFViewer, Image } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DetailContract() {
    const { contractid } = useParams();
    const [contract, setContract] = useState();
    const [client, setClient] = useState();
    const [car, setCar] = useState();

    useEffect(() => {
        fetch(`https://json-server-api-q84y.onrender.com/contracts/${contractid}`)
            .then(res => res.json())
            .then(data => setContract(data))
            .catch(err => console.log(err.message));
    }, [contractid]);
    useEffect(() => {
        if (contract) {
            fetch(`https://json-server-api-q84y.onrender.com/clients/${contract.client_id}`)
            .then(res => res.json())
            .then(data => setClient(data))
            .catch(err => console.log(err.message));
        }
    }, [contract]);
    useEffect(() => {
        if (contract) {
            fetch(`https://json-server-api-q84y.onrender.com/cars/${contract.car_id}`)
            .then(res => res.json())
            .then(data => setCar(data))
            .catch(err => console.log(err.message));
        }
    }, [contract]);

    const ContractPDF = () => (
        <Document>
            <Page size="A4" style={{ padding: "20px", fontSize: '13px', flexDirection: 'column', alignItems: "center", gap: "20px" }}>
                <View style={{ flexDirection: 'row', alignItems: "center", gap: "3px" }}>
                    <Image src='/car.png' style={{ width: "25px" }} />
                    <Text>Location</Text>
                </View>
                {/* Contract */}
                <View style={{ flexDirection: 'column', alignItems: "center", gap: "30px", width: "100%" }}>
                    <View style={{ flexDirection: "col", alignItems: "center", gap:"5px", width: "100%" }}>
                        <Text>The Contract Information</Text>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            <Image src={contract.image} style={{ width: "400px" }} />
                            {/* Contract Table */}
                            <View style={{ display: 'flex', flexDirection: "column", justifyContent: "space-between", backgroundColor: "#aaa", width: '100%'}}>
                                {/* Contract Id */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Contract Id</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{contract ? contract.id : 'Loading...'}</Text>
                                </View>
                                {/* Client Name */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Client Name</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{client ? client.first_name + " " + client.last_name : 'Loading...'}</Text>
                                </View>
                                {/* Car Name */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Car Name</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{contract ? contract.car_name : 'Loading...'}</Text>
                                </View>
                                {/* Start Date */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Start Date</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{contract ? contract.start_date : 'Loading...'}</Text>
                                </View>
                                {/* End Date */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>End Date</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{contract ? contract.end_date : 'Loading...'}</Text>
                                </View>
                                {/* Amount */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Amount</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>${contract ? contract.amount : 'Loading...'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Client */}
                <View style={{ flexDirection: 'column', alignItems: "center", gap: "30px", width: "100%" }}>
                    <View style={{ flexDirection: "col", alignItems: "center", gap:"5px", width: "100%" }}>
                        <Text>The Client Information</Text>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            {/* <Image src={contract.image} style={{ width: "390px" }} /> */}
                            {/* Contract Table */}
                            <View style={{ display: 'flex', flexDirection: "column", justifyContent: "space-between", backgroundColor: "#aaa", width: '100%'}}>
                                {/* Client Id */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Client Id</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{contract ? contract.id : 'Loading...'}</Text>
                                </View>
                                {/* Client First Name */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Client First Name</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{client ? client.first_name : 'Loading...'}</Text>
                                </View>
                                {/* Client Last Name */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Client Last Name</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{client ? client.last_name : 'Loading...'}</Text>
                                </View>
                                {/* Client Phone */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Client Phone</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{client ? client.phone : 'Loading...'}</Text>
                                </View>
                                {/* Client Phone */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Client Email</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{client ? client.email : 'Loading...'}</Text>
                                </View>
                                {/* Client City */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Client City</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{client ? client.city : 'Loading...'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Car */}
                <View style={{ flexDirection: 'column', alignItems: "center", gap: "30px", width: "100%" }}>
                    <View style={{ flexDirection: "col", alignItems: "center", gap:"5px", width: "100%" }}>
                        <Text>The Car Information</Text>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                            {/* Contract Table */}
                            <View style={{ display: 'flex', flexDirection: "column", justifyContent: "space-between", backgroundColor: "#aaa", width: '100%'}}>
                                {/* Car Id */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Car Id</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{car ? car.id : 'Loading...'}</Text>
                                </View>
                                {/* Car Name */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Car Name</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{car ? car.name : 'Loading...'}</Text>
                                </View>
                                {/* Car Price */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Car Price (day)</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>${car ? car.price_now : 'Loading...'}</Text>
                                </View>
                                {/* Car Marc */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Car Marc</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{car ? car.marc : 'Loading...'}</Text>
                                </View>
                                {/* Car Model */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Car Model</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{car ? car.model : 'Loading...'}</Text>
                                </View>
                                {/* Car Feul */}
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, fontWeight: 'bold', flex: 1 }}>Car Feul</Text>
                                    <Text style={{padding:"5px", backgroundColor:"#fff", margin: 1, flex: 1 }}>{car ? car.type : 'Loading...'}</Text>
                                </View>
                                
                            </View>
                        </View>
                    </View>
                </View>
                {/* Stamp */}
                <View style={{ flexDirection: 'row', justifyContent:"space-around", alignItems: "center", marginTop:"-15px", width: "100%" }}>
                        <Image src='/stamp2.png' style={{ width: "150px" }} />
                        <Image src='/sign.png' style={{ width: "150px" }} />
                        <Image src='/stamp.png' style={{ width: "100px"}} />
                </View>
            </Page>
        </Document>
    );

    return (
        <div className='h-screen'>
            <PDFViewer className='w-full h-full'>
                {contract ? <ContractPDF /> : <div>Loading...</div>}
            </PDFViewer>
        </div>
    );
}
