// Transport Data Service - Handles image uploads and data management for transport

// Server-side safe timestamp generation
function getServerSafeTimestamp(): number {
  // Use a consistent timestamp during SSR to avoid hydration mismatches
  if (typeof window === 'undefined') {
    return 1640995200000; // Fixed timestamp for server-side rendering
  }
  return Date.now();
}

export interface TransportTypeData {
  id: string;
  name: string;
  description: string;
  icon: string;
  images: string[];
  baseFare: number;
  ratePerKm: number;
  isActive: boolean;
  lastUpdated?: string;
}

export interface VehicleData {
  id: string;
  name: string;
  model: string;
  registrationNo: string;
  capacity: number;
  features: string[];
  images: string[];
  transportTypeId: string;
  status: 'active' | 'maintenance' | 'inactive';
  driverId?: string;
  lastUpdated?: string;
}

export interface DriverData {
  id: string;
  name: string;
  phone: string;
  rating: number;
  experience: number;
  image?: string;
  vehicleIds: string[];
  isActive: boolean;
}

// Mock databases
let transportTypesDatabase: TransportTypeData[] = [];
let vehiclesDatabase: VehicleData[] = [];
let driversDatabase: DriverData[] = [];

export class TransportDataService {
  
  // Transport Type Management
  static async saveTransportType(typeData: TransportTypeData): Promise<{ success: boolean; message: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      typeData.lastUpdated = new Date().toISOString();
      
      const existingIndex = transportTypesDatabase.findIndex(type => type.id === typeData.id);
      
      if (existingIndex >= 0) {
        transportTypesDatabase[existingIndex] = typeData;
      } else {
        transportTypesDatabase.push(typeData);
      }
      
      return {
        success: true,
        message: `Transport type "${typeData.name}" saved successfully!`
      };
      
    } catch (error) {
      return {
        success: false,
        message: 'Failed to save transport type data'
      };
    }
  }

  static async getAllTransportTypes(): Promise<TransportTypeData[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...transportTypesDatabase];
  }

  // Vehicle Management
  static async saveVehicle(vehicleData: VehicleData): Promise<{ success: boolean; message: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      vehicleData.lastUpdated = new Date(getServerSafeTimestamp()).toISOString();
      
      const existingIndex = vehiclesDatabase.findIndex(vehicle => vehicle.id === vehicleData.id);
      
      if (existingIndex >= 0) {
        vehiclesDatabase[existingIndex] = vehicleData;
      } else {
        vehiclesDatabase.push(vehicleData);
      }
      
      return {
        success: true,
        message: `Vehicle "${vehicleData.name}" (${vehicleData.registrationNo}) saved successfully!`
      };
      
    } catch (error) {
      return {
        success: false,
        message: 'Failed to save vehicle data'
      };
    }
  }

  static async getAllVehicles(): Promise<VehicleData[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...vehiclesDatabase];
  }

  // Driver Management
  static async saveDriver(driverData: DriverData): Promise<{ success: boolean; message: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const existingIndex = driversDatabase.findIndex(driver => driver.id === driverData.id);
      
      if (existingIndex >= 0) {
        driversDatabase[existingIndex] = driverData;
      } else {
        driversDatabase.push(driverData);
      }
      
      return {
        success: true,
        message: `Driver "${driverData.name}" saved successfully!`
      };
      
    } catch (error) {
      return {
        success: false,
        message: 'Failed to save driver data'
      };
    }
  }

  static async getAllDrivers(): Promise<DriverData[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...driversDatabase];
  }

  // Image Upload Service
  static async uploadImages(files: File[], entityType: 'transport-type' | 'vehicle' | 'driver', entityId: string): Promise<string[]> {
    console.log(`📸 Uploading ${files.length} images for ${entityType} ${entityId}...`);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock URLs (in real app, these would be actual cloud URLs)
    const uploadedUrls = files.map((file, index) => {
      const extension = file.type.split('/')[1];
      const timestamp = getServerSafeTimestamp();
      return `https://cdn.amaghor-transport.com/${entityType}s/${entityId}/${timestamp}-${index + 1}.${extension}`;
    });
    
    console.log('✅ Images uploaded successfully!');
    console.log('🔗 URLs:', uploadedUrls);
    
    return uploadedUrls;
  }

  // Upload single profile image (for drivers)
  static async uploadProfileImage(file: File, driverId: string): Promise<string> {
    console.log(`📸 Uploading profile image for driver ${driverId}...`);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const extension = file.type.split('/')[1];
    const timestamp = getServerSafeTimestamp();
    const uploadedUrl = `https://cdn.amaghor-transport.com/drivers/${driverId}/profile-${timestamp}.${extension}`;
    
    console.log('✅ Profile image uploaded successfully!');
    console.log('🔗 URL:', uploadedUrl);
    
    return uploadedUrl;
  }

  // Get available vehicles by transport type
  static async getAvailableVehicles(transportTypeId: string): Promise<VehicleData[]> {
    const vehicles = await this.getAllVehicles();
    return vehicles.filter(vehicle => 
      vehicle.transportTypeId === transportTypeId && 
      vehicle.status === 'active'
    );
  }

  // Get active drivers
  static async getActiveDrivers(): Promise<DriverData[]> {
    const drivers = await this.getAllDrivers();
    return drivers.filter(driver => driver.isActive);
  }

  // Assign driver to vehicle
  static async assignDriverToVehicle(driverId: string, vehicleId: string): Promise<{ success: boolean; message: string }> {
    try {
      const driver = driversDatabase.find(d => d.id === driverId);
      const vehicle = vehiclesDatabase.find(v => v.id === vehicleId);

      if (!driver || !vehicle) {
        return {
          success: false,
          message: 'Driver or vehicle not found'
        };
      }

      // Update driver's vehicle assignments
      if (!driver.vehicleIds.includes(vehicleId)) {
        driver.vehicleIds.push(vehicleId);
      }

      // Update vehicle's driver assignment
      vehicle.driverId = driverId;

      return {
        success: true,
        message: `Driver ${driver.name} assigned to vehicle ${vehicle.name} successfully!`
      };

    } catch (error) {
      return {
        success: false,
        message: 'Failed to assign driver to vehicle'
      };
    }
  }

  // Seed some initial data
  static async seedInitialData(): Promise<void> {
    if (transportTypesDatabase.length === 0) {
      transportTypesDatabase = [
        {
          id: '1',
          name: 'CNG',
          description: 'Three-wheeler auto rickshaw for short distances',
          icon: '🛺',
          images: [],
          baseFare: 25,
          ratePerKm: 15,
          isActive: true
        },
        {
          id: '2',
          name: 'Bus',
          description: 'Large capacity vehicle for long distance travel',
          icon: '🚌',
          images: [],
          baseFare: 100,
          ratePerKm: 2.5,
          isActive: true
        },
        {
          id: '3',
          name: 'Boat',
          description: 'Water transport for river and coastal routes',
          icon: '🚢',
          images: [],
          baseFare: 50,
          ratePerKm: 8,
          isActive: true
        }
      ];
    }

    if (vehiclesDatabase.length === 0) {
      vehiclesDatabase = [
        {
          id: '1',
          name: 'Green CNG 001',
          model: 'Bajaj RE 4S',
          registrationNo: 'DHK-CNG-1234',
          capacity: 3,
          features: ['GPS Tracker', 'Meter System'],
          images: [],
          transportTypeId: '1',
          status: 'active'
        },
        {
          id: '2',
          name: 'Express Bus 001',
          model: 'Volvo B11R',
          registrationNo: 'DHK-BUS-5678',
          capacity: 40,
          features: ['AC', 'WiFi', 'Entertainment System', 'GPS Tracker'],
          images: [],
          transportTypeId: '2',
          status: 'active'
        }
      ];
    }

    if (driversDatabase.length === 0) {
      driversDatabase = [
        {
          id: '1',
          name: 'Md. Rafiqul Islam',
          phone: '+8801712345678',
          rating: 4.8,
          experience: 12,
          vehicleIds: ['1'],
          isActive: true
        },
        {
          id: '2',
          name: 'Abdul Karim',
          phone: '+8801823456789',
          rating: 4.6,
          experience: 8,
          vehicleIds: ['2'],
          isActive: true
        }
      ];
    }
  }
}