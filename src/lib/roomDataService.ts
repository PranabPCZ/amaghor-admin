// Room Data Service - Demonstrates how hotel management updates sync with booking site

export interface RoomData {
  id: number;
  roomNumber: string;
  roomName: string;
  roomType: string;
  floor: string;
  capacity: number;
  basePrice: number;
  amenities: string[];
  description: string;
  status: string;
  images: string[];
  policies: {
    cancellation: string;
    extraNote: string;
    smokingPolicy: string;
    petPolicy: string;
  };
  guest?: string;
  lastUpdated?: string;
}

// Mock database - In a real app, this would be a database
let roomDatabase: RoomData[] = [];

// Mock API service
export class RoomDataService {
  
  // Add or update room in management system
  static async saveRoom(roomData: RoomData): Promise<{ success: boolean; message: string }> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Add timestamp
      roomData.lastUpdated = new Date().toISOString();
      
      // Update local "database"
      const existingIndex = roomDatabase.findIndex(room => room.id === roomData.id);
      
      if (existingIndex >= 0) {
        roomDatabase[existingIndex] = roomData;
      } else {
        roomDatabase.push(roomData);
      }
      
      // Simulate syncing to booking site
      await this.syncToBookingSite(roomData);
      
      return {
        success: true,
        message: `Room ${roomData.roomNumber} updated successfully and synced to booking site!`
      };
      
    } catch (error) {
      return {
        success: false,
        message: 'Failed to save room data'
      };
    }
  }
  
  // Get all rooms for management view
  static async getAllRooms(): Promise<RoomData[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...roomDatabase];
  }
  
  // Get rooms formatted for booking site
  static async getRoomsForBookingSite(hotelId: number) {
    const rooms = await this.getAllRooms();
    
    // Transform management data to booking site format
    return rooms
      .filter(room => room.status === 'available') // Only show available rooms on booking site
      .map(room => ({
        id: room.id,
        type: room.roomType,
        capacity: `${room.capacity} guests`,
        images: room.images,
        amenities: room.amenities.map(amenity => ({
          icon: this.getAmenityIcon(amenity),
          name: amenity
        })),
        pricing: {
          originalPrice: `${room.basePrice + 500}`, // Show discounted pricing
          discountedPrice: `${room.basePrice}`,
          discount: '10% off'
        },
        cancellation: room.policies.cancellation,
        extraNote: room.policies.extraNote || 'Comfortable accommodation with modern amenities',
        policies: {
          smoking: room.policies.smokingPolicy,
          pets: room.policies.petPolicy,
          additional: room.policies.extraNote
        }
      }));
  }
  
  // Simulate syncing data to booking site
  private static async syncToBookingSite(roomData: RoomData): Promise<void> {
    console.log('🔄 Syncing to booking site...');
    console.log('📊 Room data:', {
      roomNumber: roomData.roomNumber,
      images: roomData.images.length + ' photos',
      policies: roomData.policies,
      pricing: roomData.basePrice,
      amenities: roomData.amenities
    });
    
    // Simulate API call to booking site
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Successfully synced to booking site!');
    console.log('🌐 Room is now live and bookable by customers');
  }
  
  // Helper to get amenity icons
  private static getAmenityIcon(amenity: string): string {
    const iconMap: { [key: string]: string } = {
      'WiFi': '📶',
      'AC': '❄️',
      'TV': '📺',
      'Balcony': '🏠',
      'Kitchen': '🍳',
      'Minibar': '🍷',
      'Safe': '🔒',
      'Kitchenette': '🍴',
      'Living Room': '🛋️',
      'Bunk Beds': '🛏️',
      'Bathtub': '🛁',
      'Shower': '🚿',
      'Hair Dryer': '💨',
      'Iron': '👔',
      'Room Service': '🍽️',
      'Desk': '🏢',
      'Chair': '💺'
    };
    
    return iconMap[amenity] || '✨';
  }
  
  // Upload images to cloud storage (simulation)
  static async uploadImages(files: File[], roomNumber: string): Promise<string[]> {
    console.log(`📸 Uploading ${files.length} images for room ${roomNumber}...`);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock URLs (in real app, these would be actual cloud URLs)
    const uploadedUrls = files.map((file, index) => {
      const extension = file.type.split('/')[1];
      return `https://cdn.amaghor-hotel.com/rooms/${roomNumber}/photo-${index + 1}.${extension}`;
    });
    
    console.log('✅ Images uploaded successfully!');
    console.log('🔗 URLs:', uploadedUrls);
    
    return uploadedUrls;
  }
  
  // Get room availability for booking site
  static async checkRoomAvailability(roomId: number, checkIn: string, checkOut: string) {
    const room = roomDatabase.find(r => r.id === roomId);
    
    if (!room) {
      return { available: false, reason: 'Room not found' };
    }
    
    if (room.status !== 'available') {
      return { available: false, reason: 'Room is currently occupied or under maintenance' };
    }
    
    // In a real app, you'd check booking calendar
    return {
      available: true,
      pricing: {
        basePrice: room.basePrice,
        totalPrice: room.basePrice * this.calculateNights(checkIn, checkOut)
      },
      policies: room.policies
    };
  }
  
  private static calculateNights(checkIn: string, checkOut: string): number {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
