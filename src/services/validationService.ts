// Mock API endpoints - replace with actual API endpoints
const API_BASE_URL = 'https://api.example.com';

export interface ValidationResponse {
  isValid: boolean;
  message?: string;
}

type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export const validationService = {
  async checkBusinessNameAvailability(name: string): Promise<ValidationResponse> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`${API_BASE_URL}/check-business-name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to check business name');
      }

      const data = await response.json();
      return {
        isValid: data.available,
        message: data.available ? undefined : 'This business name is already taken',
      };
    } catch (error) {
      // Log error in development only
      if (import.meta.env.DEV) {
        console.error('Error checking business name:', error);
      }
      return {
        isValid: false,
        message: 'Failed to check business name availability',
      };
    }
  },

  async validateAddress(address: string): Promise<ValidationResponse> {
    try {
      // TODO: Replace with actual API call (e.g., Google Maps API)
      const response = await fetch(`${API_BASE_URL}/validate-address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error('Failed to validate address');
      }

      const data = await response.json();
      return {
        isValid: data.valid,
        message: data.valid ? undefined : 'Please enter a valid address',
      };
    } catch (error) {
      // Log error in development only
      if (import.meta.env.DEV) {
        console.error('Error validating address:', error);
      }
      return {
        isValid: false,
        message: 'Failed to validate address',
      };
    }
  },

  // Helper function to debounce API calls
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): DebouncedFunction<T> {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
}; 