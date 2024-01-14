import Sidebar from '../components/SideBar';
import { Card, CardBody, CardTitle, Input, InputGroup,Button } from 'reactstrap';
import { useJsApiLoader, GoogleMap, Marker,Autocomplete, StandaloneSearchBox } from '@react-google-maps/api'
import Loading from '../components/Loading'
import { useRef, useState } from 'react';

const center = { lat: 43.2617, lng: -79.9228 }
const Depot = () => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyCoTnCGvNvkN-Cm9eks94YbgvpFtGxDhew',
        libraries: ['places'],
    })


      


    const[map,setMap] = useState(/**@type google.maps.Map */ (null))

    /**@type React.mutuableRefObject<HTMLInputElement> */
    const placeRef = useRef()

    if (!isLoaded) {
        return <Loading />
    }

    function search(){
        if(placeRef.current.value === ''){
            return alert
        }
    }
    return (
        <div className='d-flex'>
            <Sidebar />

            <div className="d-flex">
                <div className="p-2 flex-grow-1"></div>
                <div className="p-2 flex-grow-1 text-center">
                    <div className="flex-column text-center">
                        <Card>

                            <CardBody style={{ position: 'absolute', height: "85vh", width: "90vw" }}>
                                <CardTitle>
                                    <InputGroup>
                                    <Autocomplete>
                                    <StandaloneSearchBox>
                                    <Input placeholder='Enter Location Here' ref={placeRef} />
                                    </StandaloneSearchBox>
                                    </Autocomplete>
                                        <Button>
                                            Search
                                        </Button>
                                        <Button color= 'success' onClick={()=> map.panTo(center)}>Re-center Map</Button>
                                    </InputGroup>
                                    
                                </CardTitle>

                                <GoogleMap
                                    center={center}
                                    zoom={15}
                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                    options={{
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        fullscreenControl: false,

                                    }}
                                    onLoad={(map) => setMap(map)}
                                >
                                    <Marker position={{lat: 43.2617, lng: -79.9228}}/>
                                </GoogleMap>
                            </CardBody>
                        </Card>
                        <div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Depot