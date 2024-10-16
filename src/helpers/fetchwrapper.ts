import { useAuthStore } from '@/stores/authStore';

export const fetchWrapper = {
    get: Request('GET'),
    post: Request('POST'),
    put: Request('PUT'),
    delete: Request('DELETE'),
};
/*
function Request(method: string) {
    return (url: string, body?: any, options: { credentials?: RequestCredentials } = {}) => {
        // Fusionar las opciones con las predeterminadas
        const RequestOptions: RequestInit = {
            method,
            headers: {
                ...authHeader(url), // Agregar los encabezados de autenticación
                'Content-Type': body ? 'application/json' : '', // Agregar el tipo de contenido solo si hay un body
            },
            body: body ? JSON.stringify(body) : undefined, // Si hay un body, lo convertimos en JSON
            ...options // Fusionar cualquier otra opción (como credentials)
        };

        // Hacemos la solicitud con fetch
        return fetch(url, RequestOptions).then(handleResponse);
    }
}*/

function Request(method: string) {
    return (url : string, body?: any, {credentials} : { credentials?: RequestCredentials } = {}) => {
        const RequestOptions: RequestInit = {
            method,
            headers: authHeader(url),           
        };
        if (body) {
            RequestOptions.headers = {
                ...RequestOptions.headers,
                'Content-Type': 'application/json'
            };
            RequestOptions.body = JSON.stringify(body);
        }
        if (credentials) {
            RequestOptions.credentials = credentials;
        }
        return fetch(url, RequestOptions).then(handleResponse);
    }
}

function authHeader(url: string) : Record<string, string> {
    const {auth} = useAuthStore();
    const isLoggedIn = !!auth.data?.jwtToken;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);

    if (isLoggedIn && isApiUrl) {
        return { 'Authorization': `Bearer ${auth.data?.jwtToken}` };
    } else {
        return {};
    }
}

async function handleResponse(response: Response): Promise<any> {
    const text = await response.text();
    const data: any = text ? JSON.parse(text) : null;

    if (!response.ok) {
        const { auth, logout } = useAuthStore();
        if ([401, 403].includes(response.status) && auth.data) {
            logout();
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}
    