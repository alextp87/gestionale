import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package2, PackageCheck, UserRound, PlusCircle, Search, FileText, Wrench } from 'lucide-react';
import GaugeCard from './GaugeCard';
import ActionButton from './ActionButton';
import { useOrdersStore } from '../../store/ordersStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const orders = useOrdersStore(state => state.orders);
  
  const toProcessCount = orders.filter(order => 
    ['RICAMBI_DA_ORDINARE', 'RICAMBI_ORDINATI_PARZIALMENTE'].includes(order.status)
  ).length;

  const arrivedCount = orders.filter(order => 
    ['RICAMBI_ARRIVATI', 'RICAMBI_ARRIVATI_PARZIALMENTE'].includes(order.status)
  ).length;

  const awaitingPickupCount = orders.filter(order => 
    order.status === 'IN_ATTESA_DI_RITIRO_CLIENTE'
  ).length;

  const handleNewOrder = () => {
    navigate('/orders/new');
  };

  const handleSearchOrders = () => {
    // TODO: Implement search orders functionality
  };

  const handlePickupSlips = () => {
    // TODO: Implement pickup slips functionality
  };

  const handleWarehouseUtils = () => {
    // TODO: Implement warehouse utilities functionality
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {/* Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <GaugeCard
            title="Ordini da Processare"
            count={toProcessCount}
            icon={<Package2 className="w-8 h-8 text-violet-600" />}
            color="text-violet-600"
          />
          
          <GaugeCard
            title="Ricambi Arrivati"
            count={arrivedCount}
            icon={<PackageCheck className="w-8 h-8 text-blue-600" />}
            color="text-blue-600"
          />
          
          <GaugeCard
            title="In Attesa di Ritiro"
            count={awaitingPickupCount}
            icon={<UserRound className="w-8 h-8 text-indigo-600" />}
            color="text-indigo-600"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionButton
            icon={PlusCircle}
            label="+ NUOVO ORDINE"
            onClick={handleNewOrder}
          />
          <ActionButton
            icon={Search}
            label="RICERCA ORDINI"
            onClick={handleSearchOrders}
          />
          <ActionButton
            icon={FileText}
            label="BOLLE DI RITIRO"
            onClick={handlePickupSlips}
          />
          <ActionButton
            icon={Wrench}
            label="UTILITY PER MAGAZZINIERE"
            onClick={handleWarehouseUtils}
          />
        </div>
      </div>
    </div>
  );
}