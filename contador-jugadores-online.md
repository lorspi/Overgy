# Contador de Jugadores Online - Implementación

## Contexto

Actualmente el contador de jugadores en la web es **falso** (genera un número aleatorio entre 120-199 que fluctúa cada 5 segundos). Para mostrar datos reales necesitamos que el servidor tenga uno de los plugins de query instalados.

## ¿Cómo funciona?

Los servidores de Hytale pueden exponer una API de consulta mediante dos protocolos:

### Opción 1: Nitrado Query (HTTPS)

- **Puerto:** 5523 (por defecto)
- **Protocolo:** HTTPS JSON
- **Requisito:** Plugin **Nitrado WebServer** instalado en el servidor
- **Ventajas:** Información detallada (nombre, versión, jugadores, plugins, mundo)
- **Desventajas:** Más lento (overhead de HTTPS), requiere configuración SSL

### Opción 2: HyQuery (UDP)

- **Puerto:** 5520 (puerto del juego)
- **Protocolo:** UDP binario
- **Requisito:** Plugin **HyQuery** instalado en el servidor
- **Ventajas:** Muy rápido, funciona en el puerto del juego, no requiere configuración extra
- **Desventajas:** Menos información detallada

## Ejemplo de respuesta (Nitrado Query)

```json
{
  "online": true,
  "server": {
    "name": "Overgy",
    "version": "2026.01.13-dcad8778f",
    "max_players": 100
  },
  "players": {
    "online": 42,
    "max": 100,
    "list": []
  },
  "plugins": {
    "count": 10,
    "list": []
  }
}
```

## ¿Qué necesitamos?

1. **Instalar uno de los plugins** en el servidor:
   - Nitrado WebServer (para query HTTPS en puerto 5523)
   - HyQuery (para query UDP en puerto 5520)

2. **Abrir el puerto correspondiente** en el firewall del servidor (5523 o 5520)

3. Una vez activo, desde la web podemos hacer fetch a:
   ```
   https://<IP-DEL-SERVIDOR>:5523/
   ```
   Y obtener los jugadores conectados en tiempo real.

## Páginas que ya usan esto

Estas server lists obtienen los datos de la misma forma (polling periódico al endpoint del servidor):

- https://hytaleserverlist.me
- https://hytaleonlineservers.com

## Referencia técnica

Librería PHP de ejemplo para implementar tu propio polling:
- https://github.com/Hyvote/hytale-server-api

## Acción requerida

> **Para el admin del servidor:** Instalar el plugin Nitrado WebServer o HyQuery y confirmar la IP/puerto para que podamos conectar el contador real en la web.
