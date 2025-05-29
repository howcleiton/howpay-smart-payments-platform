import React from 'react';

interface StatusPillProps {
  status: string;
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const config = {
    paid: { label: 'Pago', color: 'bg-green-100 text-green-800' },
    pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
    expired: { label: 'Não Pago', color: 'bg-red-100 text-red-800' }
  };

  const { label, color } = config[status as keyof typeof config] || {
    label: status,
    color: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}>
      {label}
    </span>
  );
};

export default StatusPill;
