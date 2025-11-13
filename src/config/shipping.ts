export const shippingConfig = {
  regions: {
    usEu: {
      name: 'US & EU',
      standard: {
        cost: 100,
        days: 7,
        label: 'Standard Shipping'
      },
      express: {
        cost: 250,
        days: 3,
        label: 'Express Shipping'
      }
    },
    international: {
      name: 'International',
      standard: {
        cost: 200,
        days: 10,
        label: 'Standard Shipping'
      },
      express: {
        cost: 400,
        days: 3,
        label: 'Express Shipping'
      }
    }
  }
};

export type ShippingRegion = keyof typeof shippingConfig.regions;
