// Services data
export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  fullDescription: string;
  icon: string;
  image: string;
  slug: string;
  features: string[];
}

export const transportServices: Service[] = [
  {
    id: 'ground-shipping',
    title: 'Ground Shipping',
    shortTitle: 'Land Transport',
    description: 'Reliable, Cost-Effective Land Transport',
    fullDescription: 'Our ground shipping services provide reliable and cost-effective solutions for transporting goods across land routes. With modern fleet management and experienced drivers, we ensure your cargo reaches its destination safely and on time.',
    icon: 'truck',
    image: '/images/services/ground-shipping.webp',
    slug: 'ground-shipping',
    features: [
      'Full and partial truckload options',
      'Real-time GPS tracking',
      'Temperature-controlled transport',
      'Cross-border logistics',
      'Express delivery services',
      'Customs clearance support'
    ]
  },
  {
    id: 'air-delivery',
    title: 'Air Delivery',
    shortTitle: 'Air Cargo',
    description: 'Fastest Way to Move Your Cargo',
    fullDescription: 'When speed is critical, our air delivery services offer the fastest way to transport your cargo anywhere in the world. We partner with major airlines to provide express shipping solutions with guaranteed delivery times.',
    icon: 'plane',
    image: '/images/services/air-delivery.webp',
    slug: 'air-delivery',
    features: [
      'Express and standard air freight',
      'Door-to-door delivery',
      'Dangerous goods handling',
      'Charter services available',
      'Airport-to-airport services',
      'Priority handling options'
    ]
  },
  {
    id: 'sea-delivery',
    title: 'Sea Delivery',
    shortTitle: 'Ocean Freight',
    description: 'Economical Shipping for Large Volumes',
    fullDescription: 'For large volume shipments, our sea delivery services provide the most economical solution. We offer FCL (Full Container Load) and LCL (Less than Container Load) options to meet your specific needs.',
    icon: 'ship',
    image: '/images/services/sea-delivery.webp',
    slug: 'sea-delivery',
    features: [
      'FCL and LCL container shipping',
      'Bulk cargo handling',
      'Break-bulk services',
      'Port-to-port and door-to-door',
      'Reefer container solutions',
      'Project cargo logistics'
    ]
  }
];

export const mainServices: Service[] = [
  {
    id: 'logistics',
    title: 'International Transportation & Logistics',
    shortTitle: 'Logistics',
    description: 'With modern infrastructure and a professional team, we offer comprehensive land, sea, and air transportation services.',
    fullDescription: `At AYBARS GLOBAL, our Logistics and Global Trade Division stands at the core of seamless international operations. With a deep understanding of global supply chains, we ensure the efficient movement of goods across borders — connecting producers, distributors, and markets worldwide.

Through strategic partnerships, innovative logistics solutions, and unwavering commitment to reliability, we deliver not only products but also trust and performance across every route we navigate.

Our logistics operations ensure secure, transparent, and on-time delivery, meeting the highest standards of global trade efficiency.`,
    icon: 'globe',
    image: '/images/services/logistics.webp',
    slug: 'logistics',
    features: [
      'Comprehensive land, sea, and air transportation',
      'Modern infrastructure and professional team',
      'Strategic global partnerships',
      'Real-time shipment tracking',
      'Customs brokerage services',
      'Warehousing and distribution',
      'Supply chain optimization',
      'Risk management solutions'
    ]
  },
  {
    id: 'grain-supply',
    title: 'Grain Procurement & Supply',
    shortTitle: 'Grain Supply',
    description: 'Focused on quality and supply stability, we source premium grains from reputable international producers.',
    fullDescription: `Aybar Global specializes in the procurement and supply of various grains, including wheat, corn, barley, and soybeans, through an extensive network of international suppliers.

With a strong focus on quality, competitive pricing, and timely delivery, we ensure that our clients' needs are met in both domestic and global markets.

Our expert team closely monitors every stage of the process — from sourcing and transportation to customs clearance — guaranteeing the authenticity, safety, and standard compliance of all products.

Our goal is to build a reliable and sustainable supply chain for the food, livestock, and commercial industries.`,
    icon: 'grain',
    image: '/images/services/grain-supply.webp',
    slug: 'grain-supply',
    features: [
      'Wheat procurement and supply',
      'Corn trading and distribution',
      'Barley sourcing',
      'Soybean supply chain',
      'Quality testing and certification',
      'Competitive pricing strategies',
      'Timely delivery guarantee',
      'Standard compliance assurance'
    ]
  },
  {
    id: 'industrial-metals',
    title: 'Metals & Industrial Materials Supply',
    shortTitle: 'Industrial Metals',
    description: 'From rebar and steel to copper and aluminum, we deliver essential industrial metals that power multiple sectors.',
    fullDescription: `Aybar Global specializes in the procurement and supply of a wide range of industrial metals, including rebar, copper, aluminum, steel, and other essential alloys.

Through partnerships with reputable global suppliers and a reliable logistics network, we ensure the delivery of high-quality materials that meet international standards.

Our focus on quality, price stability, and on-time delivery enables industries such as construction, energy, and manufacturing to depend confidently on our supply chain solutions.`,
    icon: 'metal',
    image: '/images/services/industrial-metals.webp',
    slug: 'industrial-metals',
    features: [
      'Rebar supply for construction',
      'Copper procurement',
      'Aluminum trading',
      'Steel distribution',
      'Essential alloys supply',
      'International standards compliance',
      'Price stability programs',
      'Construction industry solutions'
    ]
  }
];

export const allServices = [...mainServices];
