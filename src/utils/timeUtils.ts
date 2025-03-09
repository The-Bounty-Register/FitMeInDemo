
// Convert time string (e.g., "14:30") to minutes since midnight
export function parseTimeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

// Convert minutes since midnight to time string (e.g., "14:30")
export function formatMinutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// Round time to nearest 5-minute interval
export function formatTimeToFiveMinInterval(timeString: string): string {
  const minutes = parseTimeToMinutes(timeString);
  const roundedMinutes = Math.round(minutes / 5) * 5;
  return formatMinutesToTime(roundedMinutes);
}

// Check if a time is between two other times
export function isTimeBetween(time: string, start: string, end: string): boolean {
  const timeMinutes = parseTimeToMinutes(time);
  const startMinutes = parseTimeToMinutes(start);
  const endMinutes = parseTimeToMinutes(end);
  return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
}

// Find available machines based on time constraints
export function filterAvailableMachines(machines: any[], startTime: string, endTime: string): any[] {
  return machines.filter(machine => {
    const machineStartMinutes = parseTimeToMinutes(machine.startTime);
    const machineEndMinutes = parseTimeToMinutes(machine.endTime);
    const requestedStartMinutes = parseTimeToMinutes(startTime);
    const requestedEndMinutes = parseTimeToMinutes(endTime);
    
    // Machine is available if its time range fully contains the requested time range
    return machineStartMinutes <= requestedStartMinutes && 
           machineEndMinutes >= requestedEndMinutes;
  });
}
