import { ServiceItem, Order, UserProfile } from './types';

export const CATEGORIES = ['All', 'Drones', 'Humanoid', 'Industrial', 'Toys'];

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Propeller Balance & Fix',
    description: 'Complete realignment of rotor blades and motor sync for quadcopters.',
    price: 550,
    category: 'Drones',
    imageUrl: 'https://picsum.photos/seed/drone1/400/300'
  },
  {
    id: '2',
    title: 'Servo Motor Calibration',
    description: 'High-precision calibration for joint actuators. Includes lubricant flush.',
    price: 480,
    category: 'Humanoid',
    imageUrl: 'https://picsum.photos/seed/robotarm/400/300'
  },
  {
    id: '3',
    title: 'Optical Sensor Cleaning',
    description: 'Deep cleaning for LIDAR and optical cameras. Removes dust and scratches.',
    price: 620,
    category: 'Industrial',
    imageUrl: 'https://picsum.photos/seed/sensor/400/300'
  },
  {
    id: '4',
    title: 'Battery Core Replacement',
    description: 'Replace aging lithium-ion cells with high-capacity alternatives.',
    price: 1200,
    category: 'Drones',
    imageUrl: 'https://picsum.photos/seed/battery/400/300'
  },
  {
    id: '5',
    title: 'AI Logic Board Reset',
    description: 'Factory reset and firmware update for malfunctioning neural cores.',
    price: 890,
    category: 'Humanoid',
    imageUrl: 'https://picsum.photos/seed/chip/400/300'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: '254',
    date: '26.10.2023',
    status: 'Diagnosing',
    items: [SERVICES[0]],
    total: 550
  },
  {
    id: '250',
    date: '24.10.2023',
    status: 'Ready',
    items: [SERVICES[1], SERVICES[2]],
    total: 1100
  },
  {
    id: '245',
    date: '12.10.2023',
    status: 'Completed',
    items: [SERVICES[3]],
    total: 1200
  }
];

export const MOCK_USER: UserProfile = {
  name: 'Alex Artificial',
  phone: '+1 (555) 123-45-67',
  avatarUrl: 'https://picsum.photos/seed/useravatar/200/200'
};