// react imports and other packages
import { FormEvent, useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import Leaflet from "leaflet";
import { v4 as uuidv4 } from "uuid";

// utils
import { formatDate } from "./utils/formatMomentDate";

// components
import { InputField } from "./components/InputField";
import { AddressSelectField } from "./components/AddressSelectField";
import { DateTimeField } from './components/DatetimeField/index';
import { DeliveryPopup } from './components/DeliveryPopup';
import { LeafletMap } from "./components/LeafletMap";

// image files
import packageIcon from './assets/images/packageIcon.svg'
import illustrationDelivery from './assets/images/illustration-delivery.svg'

// styles and icons import
import { FiPackage, FiTruck, FiChevronRight } from 'react-icons/fi'
// - Importar a estilização da biblioteca Leaflet
import 'leaflet/dist/leaflet.css'
import './styles/App.scss'

const initialPosition = { lat: -23.5593602, lng: -46.6608744 };

const initialDate = formatDate(new Date().toString())

// - Customização dos marcadores do mapa, para renderizar no mapa
const mapPackageIcon = Leaflet.icon({
  iconUrl: packageIcon,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
})

// Tipagem do Delivery (Entrega) com seus atributos
export type DeliveryType = {
  id: string;
  name: string;
  address: string;
  complement: string;
  date: string;
  latitude: number;
  longitude: number;
}

export type PositionType = {
  longitude: number;
  latitude: number;
};

export type AddressType = {
  label: string;
  value: string;
} | null

export function App() {
  // - Definiçãao das variaavéis de estado do componente

  // - Array que armazenará todos os dados das entregas
  const [deliveries, setDeliveries] = useState<DeliveryType[]>([]);

  // - Objeto que representa uma coordenada geográfica, utilizado para
  // mostar o marcador (pin) quando o usuário digitar a sua localização
  const [position, setPosition] = useState<PositionType | null>(null);

  // - Variavél auxiliar para centralizar o mapa assim que o usuário escolhe um endereço
  const [location, setLocation] = useState(initialPosition);

  // - Variavéis que armazenam os dados do formulário.
  const [name, setName] = useState("");
  const [complement, setComplement] = useState("");
  const [address, setAddress] = useState<AddressType>(null);
  const [date, setDate] = useState(initialDate);

  const [sidebarIsHidden, setSidebarIsHidden] = useState(false);

  const [confirmButtonTitle, setConfirmButtonTitle] = useState('Confirmar')

  // - useEffect utilizado para atualizar os deliveries no local storage
  useEffect(() => {
    if (deliveries.length > 0) {
      localStorage.setItem('@deliveries', JSON.stringify(deliveries))
    }
  }, [deliveries])

  // - useEffect para pegar (se existir) do local storage os deliveries
  // assim que a aplicação for iniciada
  useEffect(() => {
    const LS_Deliveries = localStorage.getItem('@deliveries')

    if (LS_Deliveries !== null) {
      setDeliveries(JSON.parse(LS_Deliveries))
    }
  }, [])

  const handleChangeSelect = (event: any) => {
    setPosition({
      longitude: event.coords[0],
      latitude: event.coords[1],
    });

    setAddress({ label: event.place, value: event.place });

    setLocation({
      lng: event.coords[0],
      lat: event.coords[1],
    });
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (confirmButtonTitle !== 'Confirmar') setConfirmButtonTitle('Confirmar');
 
    if (!address || !name || !date) return;

    setDeliveries([
      ...deliveries,
      {
        id: uuidv4(),
        name,
        address: address?.value || "",
        complement,
        date,
        latitude: location.lat,
        longitude: location.lng,
      },
    ]);
 
    setName("");
    setAddress(null);
    setComplement("");
    setDate(initialDate);
    setPosition(null);
  }

  function handleDeleteDelivery(id: string) {

    const deletedDeliveryIndex = deliveries.findIndex(d => d.id === id)
    if (deletedDeliveryIndex > -1) {
      deliveries.splice(deletedDeliveryIndex, 1)
      setDeliveries([...deliveries])
    }

    if(deliveries.length === 0) {
      localStorage.setItem('@deliveries', '[]')
    }
  }

  function handleEditDelivery(delivery: DeliveryType ) {
    
    setPosition({
      latitude: delivery.latitude,
      longitude: delivery.longitude,
    });

    setLocation({
      lat: delivery.latitude,
      lng: delivery.longitude,
    })

    setName(delivery.name)
    setAddress({value: delivery.address, label: delivery.address})
    setComplement(delivery.complement)
    setDate(delivery.date)
    handleDeleteDelivery(delivery.id)
    setConfirmButtonTitle('Salvar')
  }


  return (
    <div id="page-map">
      <aside className={`${sidebarIsHidden ? 'hidden' : ''}`}>
        <h1 className="aside-title"> Delivery.it <FiTruck /> </h1>
        
        <form className='landing-page-form'
          onSubmit={handleSubmit}
        >
          <fieldset>
            <AddressSelectField
              address={address} onChangeSelect={handleChangeSelect}
              clearAddressEvent={() => setAddress(null)}
            />

            <DateTimeField
              value={date}
              inputProps={{placeholder: 'Digite a Data de Entrega', readOnly: true}}
              onChange={(data) => setDate(formatDate(data.toString()))}
            />

            <InputField
              id='name' label='Nome' placeholder='Digite o nome da entrega'
              value={name} onChange={event => setName(event.target.value)}
            />

            <InputField
              id='complement' label='Complemento' placeholder='Apto / Nr / Casa...'
              value={complement} onChange={(event) => setComplement(event.target.value)}
            />

          </fieldset>

          <button className="confirm-button" type="submit">
            {confirmButtonTitle}
            <FiPackage />
          </button>
          <div id="aside-background">
            <div className="circle-top" />
            <div className="circle-middle" />
            <div className="circle-bottom" />
          </div>
        </form>
        <div className="delivery-image">
          <img src={illustrationDelivery} alt="Ilustração de entregas e caixas" />
        </div>
      </aside>

      <div className={`pseudo-aside ${sidebarIsHidden ? 'hidden' : ''}`}>
        <div className="toggle-sidebar-button" onClick={() => setSidebarIsHidden(!sidebarIsHidden)}>
          <FiChevronRight />
        </div>
      </div>

      {/* toda as configurações do mapa, está dentro do componente LeafletMap */}
      <LeafletMap
        location={location}
        position={position}
      >
        {/* A cada elemento do array Deliveries exibir o Marker (com o icone de package.svg)
            na posição definida no objeto delivery. Quando clicado no marcador,
            aparece um Popup com os dados da entrega */}
        {deliveries.map((delivery) => (
          <Marker
            key={delivery.id}
            icon={mapPackageIcon}
            position={[delivery.latitude, delivery.longitude]}
          >
            <DeliveryPopup
              delivery={delivery}
              deleteDeliveryFunction={() => handleDeleteDelivery(delivery.id)}
              editDeliveryFunction={() => handleEditDelivery(delivery)}
            />
          </Marker>
        ))}
      </LeafletMap>

    </div>
  );
}
