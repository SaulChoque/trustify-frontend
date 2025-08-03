# 📖 Documentación Frontend - Scaffold-ETH 2

## 🌟 Introducción

Este documento proporciona una guía completa del frontend de **Scaffold-ETH 2**, un toolkit moderno para desarrollo de aplicaciones descentralizadas (dApps) con un enfoque especial en **firma asíncrona con wallets** en navegadores web.

## 🏗️ Arquitectura del Frontend

### Stack Tecnológico

- **Next.js 15.2.3**: Framework React con App Router
- **TypeScript**: Tipado estático y desarrollo seguro
- **Wagmi 2.15.6**: Hooks React para interacción con Ethereum
- **RainbowKit 2.2.7**: Librería de conexión de wallets
- **Viem 2.31.1**: Cliente Ethereum ligero y tipado
- **TailwindCSS + DaisyUI**: Estilizado moderno y componentes UI
- **Zustand**: Gestión de estado global

### Estructura del Proyecto

```
packages/nextjs/
├── app/                    # App Router de Next.js
├── components/             # Componentes reutilizables
│   ├── scaffold-eth/       # Componentes específicos del framework
│   └── assets/            # Recursos estáticos
├── hooks/                 # Custom hooks de React
├── services/              # Servicios web3 y configuración
├── utils/                 # Utilidades y helpers
└── scaffold.config.ts     # Configuración principal
```

## 🔐 Conexión y Firma de Wallets

### Configuración de Wallets

El sistema utiliza **RainbowKit** para gestionar múltiples tipos de wallets:

```typescript
// services/web3/wagmiConnectors.tsx
const wallets = [
  metaMaskWallet,
  walletConnectWallet,
  ledgerWallet,
  coinbaseWallet,
  rainbowWallet,
  safeWallet,
  rainbowkitBurnerWallet // Solo para desarrollo local
];
```

### Componente Principal de Conexión

El componente `RainbowKitCustomConnectButton` gestiona todo el ciclo de conexión:

```tsx
// components/scaffold-eth/RainbowKitCustomConnectButton/index.tsx
export const RainbowKitCustomConnectButton = () => {
  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        
        if (!connected) {
          return (
            <button 
              className="btn btn-primary btn-sm" 
              onClick={openConnectModal} 
              type="button"
            >
              Connect Wallet
            </button>
          );
        }
        // ... resto de la lógica
      }}
    </ConnectButton.Custom>
  );
};
```

## 🖋️ Firma Asíncrona con Wallets

### Conceptos Fundamentales

La **firma asíncrona** permite a los usuarios autenticar transacciones y mensajes sin bloquear la interfaz, proporcionando una experiencia fluida:

1. **Firma de Mensajes**: Autenticación de identidad
2. **Firma de Transacciones**: Autorización de operaciones
3. **Firma Tipada (EIP-712)**: Datos estructurados legibles

### Implementación de Firma de Mensajes

```typescript
// Ejemplo de firma de mensaje simple
import { useAccount, useSignMessage } from 'wagmi';

const SignMessageComponent = () => {
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();

  const handleSignMessage = async () => {
    try {
      const message = "Confirmo mi identidad en Trustify";
      const signature = await signMessageAsync({ message });
      
      console.log('Mensaje firmado:', signature);
      // Enviar firma al backend para verificación
    } catch (error) {
      console.error('Error al firmar:', error);
    }
  };

  return (
    <button onClick={handleSignMessage}>
      Firmar Mensaje
    </button>
  );
};
```

### Firma Tipada (EIP-712)

Para datos estructurados más seguros:

```typescript
import { useSignTypedData } from 'wagmi';

const SignTypedDataComponent = () => {
  const { signTypedDataAsync } = useSignTypedData();

  const domain = {
    name: 'Trustify',
    version: '1',
    chainId: 1,
    verifyingContract: '0x...' as `0x${string}`
  };

  const types = {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' }
    ]
  };

  const value = {
    name: 'Usuario',
    wallet: '0x...' as `0x${string}`
  };

  const handleSignTypedData = async () => {
    try {
      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: 'Person',
        message: value
      });
      
      // Procesar firma estructurada
      console.log('Datos tipados firmados:', signature);
    } catch (error) {
      console.error('Error en firma tipada:', error);
    }
  };

  return (
    <button onClick={handleSignTypedData}>
      Firmar Datos Estructurados
    </button>
  );
};
```

### Gestión Asíncrona de Estados

```typescript
import { useState } from 'react';
import { useSignMessage } from 'wagmi';

const AsyncSigningComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const { signMessageAsync } = useSignMessage();

  const handleAsyncSigning = async () => {
    setIsLoading(true);
    
    try {
      // Proceso asíncrono de firma
      const result = await signMessageAsync({ 
        message: "Operación asíncrona" 
      });
      
      setSignature(result);
      
      // Procesamiento adicional en segundo plano
      await processSignatureInBackground(result);
      
    } catch (error) {
      console.error('Error asíncrono:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handleAsyncSigning} 
        disabled={isLoading}
      >
        {isLoading ? 'Firmando...' : 'Firmar Asíncronamente'}
      </button>
      
      {signature && (
        <p>Firma completada: {signature.slice(0, 10)}...</p>
      )}
    </div>
  );
};

const processSignatureInBackground = async (signature: string) => {
  // Procesar firma sin bloquear UI
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Procesamiento completado:', signature);
      resolve(signature);
    }, 2000);
  });
};
```

## 🔧 Hooks Personalizados

### Hook para Firma Segura

```typescript
// hooks/scaffold-eth/useSecureSign.ts
import { useState } from 'react';
import { useSignMessage, useAccount } from 'wagmi';
import { notification } from '~~/utils/scaffold-eth';

export const useSecureSign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();

  const secureSign = async (message: string) => {
    if (!address) {
      notification.error('Wallet no conectada');
      return null;
    }

    setIsLoading(true);
    
    try {
      // Agregar contexto de seguridad al mensaje
      const secureMessage = `${message}
      
Dirección: ${address}
Timestamp: ${Date.now()}
Aplicación: Trustify`;

      const signature = await signMessageAsync({ 
        message: secureMessage 
      });

      notification.success('Mensaje firmado exitosamente');
      return { signature, message: secureMessage };
      
    } catch (error) {
      notification.error('Error al firmar mensaje');
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { secureSign, isLoading };
};
```

### Hook para Transacciones Asíncronas

```typescript
// hooks/scaffold-eth/useAsyncTransaction.ts
import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { notification } from '~~/utils/scaffold-eth';

export const useAsyncTransaction = () => {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { writeContractAsync } = useWriteContract();
  const { data: receipt } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
  });

  const executeAsync = async (contractConfig: any) => {
    setIsLoading(true);
    
    try {
      const hash = await writeContractAsync(contractConfig);
      setTxHash(hash);
      
      notification.info('Transacción enviada, esperando confirmación...');
      
      // La confirmación se maneja automáticamente por useWaitForTransactionReceipt
      return hash;
      
    } catch (error) {
      notification.error('Error en transacción');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para notificar cuando la transacción se confirma
  React.useEffect(() => {
    if (receipt) {
      notification.success('Transacción confirmada');
      setTxHash(null); // Reset para próxima transacción
    }
  }, [receipt]);

  return { executeAsync, isLoading, txHash, receipt };
};
```

## 🎯 Componentes de UI para Firma

### Componente de Firma Interactiva

```tsx
// components/scaffold-eth/SignatureComponent.tsx
import { useState } from 'react';
import { useSecureSign } from '~~/hooks/scaffold-eth/useSecureSign';

export const SignatureComponent = () => {
  const [message, setMessage] = useState('');
  const [signatureResult, setSignatureResult] = useState<any>(null);
  const { secureSign, isLoading } = useSecureSign();

  const handleSign = async () => {
    if (!message.trim()) return;
    
    const result = await secureSign(message);
    setSignatureResult(result);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Firma Digital</h2>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Mensaje a firmar</span>
          </label>
          <textarea 
            className="textarea textarea-bordered h-24" 
            placeholder="Ingresa tu mensaje aquí..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        <div className="card-actions justify-end">
          <button 
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            onClick={handleSign}
            disabled={!message.trim() || isLoading}
          >
            {isLoading ? 'Firmando...' : 'Firmar Mensaje'}
          </button>
        </div>
        
        {signatureResult && (
          <div className="alert alert-success mt-4">
            <div>
              <h3 className="font-bold">Firma Completada</h3>
              <div className="text-sm">
                <p><strong>Firma:</strong> {signatureResult.signature.slice(0, 20)}...</p>
                <p><strong>Mensaje:</strong> {signatureResult.message.split('\n')[0]}...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
```

## 🔒 Verificación de Firmas

### Verificación en Frontend

```typescript
// utils/signature-verification.ts
import { verifyMessage } from 'viem';

export const verifySignature = async (
  message: string,
  signature: string,
  address: string
): Promise<boolean> => {
  try {
    const isValid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });
    
    return isValid;
  } catch (error) {
    console.error('Error verificando firma:', error);
    return false;
  }
};

// Hook para verificación
export const useSignatureVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  
  const verify = async (message: string, signature: string, address: string) => {
    setIsVerifying(true);
    
    try {
      const isValid = await verifySignature(message, signature, address);
      return isValid;
    } finally {
      setIsVerifying(false);
    }
  };
  
  return { verify, isVerifying };
};
```

## 🌐 Integración con Backend

### Envío Seguro de Firmas

```typescript
// services/api/signature-service.ts
interface SignatureData {
  message: string;
  signature: string;
  address: string;
  timestamp: number;
}

export const submitSignature = async (data: SignatureData) => {
  try {
    const response = await fetch('/api/verify-signature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Error al enviar firma');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en submitSignature:', error);
    throw error;
  }
};

// Hook para integración
export const useSignatureSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const submitSecurely = async (signatureData: SignatureData) => {
    setIsSubmitting(true);
    
    try {
      const result = await submitSignature(signatureData);
      notification.success('Firma verificada en servidor');
      return result;
    } catch (error) {
      notification.error('Error al verificar firma');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return { submitSecurely, isSubmitting };
};
```

## 🎨 Componentes de Estado de Wallet

### Indicador de Estado de Conexión

El sistema incluye componentes visuales para el estado de la wallet:

```tsx
// Componente Balance
<Balance address={account.address} className="min-h-0 h-auto" />

// Información de red
<span className="text-xs" style={{ color: networkColor }}>
  {chain.name}
</span>

// Dropdown de información de dirección
<AddressInfoDropdown
  address={account.address}
  displayName={account.displayName}
  ensAvatar={account.ensAvatar}
  blockExplorerAddressLink={blockExplorerAddressLink}
/>
```

### Gestión de Redes

```tsx
// Cambio de red automático
const { switchChain } = useSwitchChain();

const handleNetworkSwitch = (chainId: number) => {
  switchChain?.({ chainId });
};

// Detección de red incorrecta
if (chain.unsupported || chain.id !== targetNetwork.id) {
  return <WrongNetworkDropdown />;
}
```

## 🛡️ Mejores Prácticas de Seguridad

### 1. Validación de Entrada

```typescript
const validateMessage = (message: string): boolean => {
  if (!message || message.trim().length === 0) return false;
  if (message.length > 1000) return false; // Límite de caracteres
  
  // Evitar caracteres maliciosos
  const dangerousPatterns = [/<script>/i, /javascript:/i, /on\w+=/i];
  return !dangerousPatterns.some(pattern => pattern.test(message));
};
```

### 2. Contexto de Firma

```typescript
const createSecureContext = (userMessage: string, address: string) => {
  return `${userMessage}

===== CONTEXTO DE SEGURIDAD =====
Aplicación: Trustify Frontend
Dirección: ${address}
Timestamp: ${Date.now()}
Red: ${chain?.name || 'Desconocida'}
===================================`;
};
```

### 3. Gestión de Errores

```typescript
const handleSigningError = (error: any) => {
  if (error.code === 4001) {
    notification.info('Firma cancelada por usuario');
  } else if (error.code === -32602) {
    notification.error('Parámetros inválidos');
  } else {
    notification.error('Error desconocido al firmar');
    console.error('Signing error:', error);
  }
};
```

## 📱 Responsividad y UX

### Adaptación Móvil

```tsx
const MobileSignatureComponent = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4">
          {/* Contenido optimizado para móvil */}
          <button className="btn btn-primary btn-block">
            Firmar en Móvil
          </button>
        </div>
      </div>
    </div>
  );
};
```

### Estados de Carga

```tsx
const LoadingStates = () => {
  return (
    <>
      {/* Botón con estado de carga */}
      <button className={`btn ${isLoading ? 'loading' : ''}`}>
        {isLoading ? 'Procesando...' : 'Firmar'}
      </button>
      
      {/* Spinner personalizado */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  );
};
```

## 🚀 Optimizaciones de Rendimiento

### Lazy Loading de Componentes

```typescript
import { lazy, Suspense } from 'react';

const SignatureComponent = lazy(() => import('./SignatureComponent'));

const App = () => (
  <Suspense fallback={<div className="loading loading-spinner"></div>}>
    <SignatureComponent />
  </Suspense>
);
```

### Memoización de Cálculos

```typescript
import { useMemo } from 'react';

const useSignatureValidation = (message: string) => {
  return useMemo(() => {
    return validateMessage(message);
  }, [message]);
};
```

## 📊 Monitoreo y Analytics

### Tracking de Eventos

```typescript
const trackSignatureEvent = (eventType: string, data: any) => {
  // Integración con analytics (ejemplo: Google Analytics, Mixpanel)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventType, {
      custom_parameter: data,
    });
  }
};

// Uso en componentes
const handleSignComplete = (signature: string) => {
  trackSignatureEvent('signature_completed', {
    signature_length: signature.length,
    wallet_type: connector?.name,
  });
};
```

## 🧪 Testing

### Testing de Componentes

```typescript
// __tests__/SignatureComponent.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SignatureComponent } from '../SignatureComponent';

describe('SignatureComponent', () => {
  test('should render signature form', () => {
    render(<SignatureComponent />);
    
    expect(screen.getByText('Firma Digital')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa tu mensaje aquí...')).toBeInTheDocument();
  });
  
  test('should handle message input', () => {
    render(<SignatureComponent />);
    
    const textarea = screen.getByPlaceholderText('Ingresa tu mensaje aquí...');
    fireEvent.change(textarea, { target: { value: 'Test message' } });
    
    expect(textarea.value).toBe('Test message');
  });
});
```

## 📚 Recursos Adicionales

### Enlaces Útiles

- [Documentación de Wagmi](https://wagmi.sh/)
- [RainbowKit Docs](https://www.rainbowkit.com/)
- [Viem Documentation](https://viem.sh/)
- [EIP-712 Standard](https://eips.ethereum.org/EIPS/eip-712)
- [MetaMask Best Practices](https://docs.metamask.io/guide/signing-data.html)

### Ejemplos de Código Completo

Consulta los archivos en:
- `components/scaffold-eth/RainbowKitCustomConnectButton/`
- `hooks/scaffold-eth/`
- `services/web3/`

## 🔄 Actualizaciones y Mantenimiento

### Versionado de Dependencias

Mantén actualizada las siguientes dependencias críticas:
- `wagmi`: Para nuevas funcionalidades de web3
- `@rainbow-me/rainbowkit`: Para soporte de nuevas wallets
- `viem`: Para mejoras de rendimiento
- `next.js`: Para optimizaciones del framework

### Migraciones

Al actualizar versiones mayores, revisa:
1. Cambios en API de Wagmi
2. Nuevos hooks disponibles
3. Deprecated features
4. Breaking changes en RainbowKit

---

*Esta documentación está diseñada para desarrolladores que trabajan con Scaffold-ETH 2 y necesitan implementar funcionalidades de firma asíncrona con wallets de manera segura y eficiente.*
