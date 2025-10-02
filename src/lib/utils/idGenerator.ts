export function generateId(prefix: string = '', length: number = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return prefix ? `${prefix}-${result}` : result;
}

export function generateVehicleId(): string {
  return generateId('VEH', 8);
}

export function generateTransportId(): string {
  return generateId('TRP', 8);
}

export function generateBookingId(): string {
  return generateId('BKG', 8);
}

export function generateEntityId(): string {
  return generateId('ENT', 8);
}
