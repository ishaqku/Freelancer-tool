export interface CityData {
  name: string;
  country: string;
  countryCode: string;
  costIndex: number; // Relative to NYC = 100
  rentIndex: number;
  groceriesIndex: number;
  multiplier: number; // Applied to base rate
}

export const cityDatabase: Record<string, CityData[]> = {
  "IN": [
    { name: "Mumbai", country: "India", countryCode: "IN", costIndex: 65, rentIndex: 55, groceriesIndex: 60, multiplier: 0.28 },
    { name: "Bangalore", country: "India", countryCode: "IN", costIndex: 55, rentIndex: 45, groceriesIndex: 50, multiplier: 0.25 },
    { name: "Delhi", country: "India", countryCode: "IN", costIndex: 58, rentIndex: 48, groceriesIndex: 52, multiplier: 0.26 },
    { name: "Hyderabad", country: "India", countryCode: "IN", costIndex: 48, rentIndex: 38, groceriesIndex: 45, multiplier: 0.22 },
    { name: "Pune", country: "India", countryCode: "IN", costIndex: 50, rentIndex: 40, groceriesIndex: 47, multiplier: 0.23 },
    { name: "Other", country: "India", countryCode: "IN", costIndex: 50, rentIndex: 40, groceriesIndex: 47, multiplier: 0.23 }
  ],
  "US": [
    { name: "New York", country: "United States", countryCode: "US", costIndex: 100, rentIndex: 100, groceriesIndex: 100, multiplier: 1.0 },
    { name: "San Francisco", country: "United States", countryCode: "US", costIndex: 95, rentIndex: 105, groceriesIndex: 95, multiplier: 1.0 },
    { name: "Los Angeles", country: "United States", countryCode: "US", costIndex: 85, rentIndex: 85, groceriesIndex: 90, multiplier: 0.92 },
    { name: "Chicago", country: "United States", countryCode: "US", costIndex: 80, rentIndex: 75, groceriesIndex: 85, multiplier: 0.85 },
    { name: "Austin", country: "United States", countryCode: "US", costIndex: 75, rentIndex: 70, groceriesIndex: 80, multiplier: 0.80 },
    { name: "Other", country: "United States", countryCode: "US", costIndex: 78, rentIndex: 75, groceriesIndex: 80, multiplier: 0.82 }
  ],
  "GB": [
    { name: "London", country: "United Kingdom", countryCode: "GB", costIndex: 90, rentIndex: 95, groceriesIndex: 88, multiplier: 0.85 },
    { name: "Manchester", country: "United Kingdom", countryCode: "GB", costIndex: 70, rentIndex: 55, groceriesIndex: 72, multiplier: 0.68 },
    { name: "Birmingham", country: "United Kingdom", countryCode: "GB", costIndex: 68, rentIndex: 52, groceriesIndex: 70, multiplier: 0.66 },
    { name: "Other", country: "United Kingdom", countryCode: "GB", costIndex: 70, rentIndex: 55, groceriesIndex: 72, multiplier: 0.68 }
  ],
  "PK": [
    { name: "Karachi", country: "Pakistan", countryCode: "PK", costIndex: 35, rentIndex: 25, groceriesIndex: 32, multiplier: 0.18 },
    { name: "Lahore", country: "Pakistan", countryCode: "PK", costIndex: 32, rentIndex: 22, groceriesIndex: 30, multiplier: 0.17 },
    { name: "Islamabad", country: "Pakistan", countryCode: "PK", costIndex: 38, rentIndex: 28, groceriesIndex: 35, multiplier: 0.19 },
    { name: "Other", country: "Pakistan", countryCode: "PK", costIndex: 33, rentIndex: 24, groceriesIndex: 31, multiplier: 0.17 }
  ]
};

export function getCityMultiplier(countryCode: string, cityName: string | undefined): number {
  if (!cityName) return 0.5; // fallback
  const cities = cityDatabase[countryCode] || [];
  const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  return city?.multiplier || cities.find(c => c.name === "Other")?.multiplier || 0.5;
}

export function getCityOptions(countryCode: string): string[] {
  const cities = cityDatabase[countryCode] || [];
  return cities.map(c => c.name);
}
