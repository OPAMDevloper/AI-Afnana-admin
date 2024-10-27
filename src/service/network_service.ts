// // src/service/network_service.ts

// import { toast } from "react-toastify";

// class ApiService {
//   baseURL: string;

//   constructor() {
//     this.baseURL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/';
//   }

//   // Change to a static method
//   private static getTokenFromCookies(): string | null {
//     console.log('Current cookies:', document.cookie); // Log current cookies
//     const match = document.cookie.match(/(^|;\s*)accesstoken=([^;]*)/); // Change 'accessToken' to 'accesstoken'
//     return match ? decodeURIComponent(match[2]) : null;
//   }

//   async apiCall(endpoint: string, method: string = 'GET', data: any = null) {
//     const url = `${this.baseURL}${endpoint}`;

//     const headers: Record<string, string> = {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     };

//     const token = ApiService.getTokenFromCookies(); // Call the static method

//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }

//     const options: RequestInit = {
//       method,
//       headers,
//     };

//     if (data) {
//       options.body = JSON.stringify(data);
//     }

//     try {
//       const response = await fetch(url, options);

//       console.log('API response:', response.status);

//       if (response.status === 403 || response.status === 401) {
//         toast.error('Your session has expired. Please login again.');
//         window.location.href = '/sign-in';
//       }


//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.messages || 'API call failed');

//       }

//       return await response.json();
//     } catch (error) {
//       console.error('API call error:', error);
//       throw error;
//     }
//   }

//   get(endpoint: string) {
//     return this.apiCall(endpoint, 'GET');
//   }

//   post(endpoint: string, data: any) {
//     return this.apiCall(endpoint, 'POST', data);
//   }

//   put(endpoint: string, data: any) {
//     return this.apiCall(endpoint, 'PUT', data);
//   }

//   delete(endpoint: string, data: any) {
//     return this.apiCall(endpoint, 'DELETE', data);
//   }
// }

// // Export the ApiService class
// export default ApiService;


// src/service/network_service.ts

import { toast } from "react-toastify";

class ApiService {
  baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_APP_BASE_URL ? `${import.meta.env.VITE_APP_BASE_URL}/` : 'http://localhost:3001/';

  }

  // Change to a static method
  private static getTokenFromCookies(): string | null {
    console.log('Current cookies:', document.cookie); // Log current cookies
    const match = document.cookie.match(/(^|;\s*)accesstoken=([^;]*)/); // Change 'accessToken' to 'accesstoken'
    return match ? decodeURIComponent(match[2]) : null;
  }

  async apiCall(endpoint: string, method: string = 'GET', data: any = null) {
    const url = `${this.baseURL}${endpoint}`;

    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    const token = ApiService.getTokenFromCookies();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    // Check if data is FormData
    if (data instanceof FormData) {
      // Do not set Content-Type header for FormData
      delete headers['Content-Type'];
      options.body = data;
    } else if (data) {
      headers['Content-Type'] = 'application/json'; // Set Content-Type for JSON
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      console.log('API response:', response.status);

      if (response.status === 403 || response.status === 401) {
        toast.error('Your session has expired. Please login again.');
        window.location.href = '/sign-in';
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.log('---------------------------', errorData);

        throw new Error(errorData.messages || 'API call failed');
      }

      return await response.json();
    } catch (error) {
      console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[[[', error);

      console.error('API call error:', error);
      throw error;
    }
  }

  get(endpoint: string) {
    return this.apiCall(endpoint, 'GET');
  }

  post(endpoint: string, data: any) {
    return this.apiCall(endpoint, 'POST', data);
  }

  put(endpoint: string, data: any) {
    return this.apiCall(endpoint, 'PUT', data);
  }

  delete(endpoint: string, data?: any) {
    return this.apiCall(endpoint, 'DELETE', data);
  }
}

// Export the ApiService class
export default ApiService;
